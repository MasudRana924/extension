import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllTransactions from "./AllTransactions";
import {
  clearLastTransaction,
  fetchtransactions,
} from "../../../redux/reducers/transaction/transactionSlice";
import addNotification from "react-push-notification";
import "./Transaction.css";
import Lottie from "lottie-react";
import preloaderAnimation from "../../../json/Animation - 1715745618808.json";
const AllTransaction = () => {
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const dispatch = useDispatch();

  const [searchPhone, setSearchPhone] = useState("");
  const { mytransactions, lastTransaction,isLoading } = useSelector(
    (state) => state.transactions
  );
  // const { isLoading } = useSelector((state) => state.transactions);
  const isSpeakEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isSpeakEnabled
  );
  const isNotificationEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isNotificationEnabled
  );
  const handleSearch = () => {
    dispatch(fetchtransactions({ userToken, senderphone: searchPhone }));
  };
  let content;
  if (!isLoading && mytransactions?.length > 0) {
    content = mytransactions
      .slice(0, 3)
      .map((transaction) => (
        <AllTransactions key={transaction._id} transaction={transaction} />
      ));
  }

  const speakNotification = (message) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "bn-BD";
      window.speechSynthesis.speak(utterance);
    } else if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported in this browser.");
    }
  };

  useEffect(() => {
    if (lastTransaction) {
      const notificationMessage = `You got a payment of ${lastTransaction.amount} from ${lastTransaction.senderphone}`;
      if (isNotificationEnabled) {
        addNotification({
          title: `${lastTransaction.type}`,
          message: notificationMessage,
          native: true,
        });
      }
      if (isSpeakEnabled) {
        const message = "আপনি একটি পেমেন্ট পেয়েছেন";
        speakNotification(message);
      }
      dispatch(clearLastTransaction());
    }
  }, [lastTransaction, dispatch, isSpeakEnabled, isNotificationEnabled]);
  return (
    <div className="m-2">
      <div className="w-full flex">
        <input
          type="text"
          placeholder="Enter bKash Number"
          className="w-full h-8  outline-none border  border-pink-500 pl-4"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="h-8 w-20 text-white"
          style={{ backgroundColor: "#E2136E" }}
        >
          Search
        </button>
      </div>
      <div>{content}</div>
      {isLoading && (
        <div className="search-popup-overlay">
          <div className="searchpopup">
            <Lottie
              animationData={preloaderAnimation}
              className="h-32 w-44"
            ></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllTransaction;
