import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllTransactions from "./AllTransactions";
import {
  clearLastTransaction,
  fetchtransactions,
} from "../../../redux/reducers/transaction/transactionSlice";
import addNotification from "react-push-notification";
import './Transaction.css'
import { Link } from "react-router-dom";
const AllTransaction = () => {
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const dispatch = useDispatch();
  const { mytransactions, lastTransaction } = useSelector(
    (state) => state.transactions
  );
  const { isLoading } = useSelector((state) => state.transactions);
  const isSpeakEnabled = useSelector((state) => state.isConfigurationEnabled.isSpeakEnabled);
  const isNotificationEnabled = useSelector((state) => state.isConfigurationEnabled.isNotificationEnabled);
 console.log('isSpeakEnabled',isSpeakEnabled);
  useEffect(() => {
    dispatch(fetchtransactions({ userToken }));
  }, [dispatch, userToken]);

  let content;
  if (!isLoading && mytransactions?.length > 0) {
    content = mytransactions
      .slice(0, 3)
      .map((transaction) => (
        <AllTransactions key={transaction._id} transaction={transaction} />
      ));
  }

  const speakNotification = (message) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'bn-BD';
      window.speechSynthesis.speak(utterance);
    } else if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported in this browser.');
    }
  };

  useEffect(() => {
    if (lastTransaction) {
      const notificationMessage = `You got a payment of ${lastTransaction.amount} from ${lastTransaction.senderphone}`;
      if(isNotificationEnabled){
        addNotification({
          title: `${lastTransaction.type}`,
          message: notificationMessage,
          native: true,
        });
      }
      if(isSpeakEnabled){
        const message='আপনি একটি পেমেন্ট পেয়েছেন'
        speakNotification(message);
      }
      dispatch(clearLastTransaction());
    }
  }, [lastTransaction, dispatch,isSpeakEnabled,isNotificationEnabled]);
  return (
    <div className="m-2">
      <div className="flex justify-between">
        <p className="text-start text-xs">Transactions Summary</p>
        <Link to="/transactios">
        <p className="text-start text-xs" style={{color:'#E2136E'}}>see all</p>
        </Link>
      </div>
      <div>{content}</div>
    </div>
  );
};
export default AllTransaction;
