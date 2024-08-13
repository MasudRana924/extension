import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllTransactions from "./AllTransactions";
import {
  clearLastTransaction,
  fetchSearchTransactions,
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
  const { mytransactions, lastTransaction, isLoading } = useSelector(
    (state) => state.transactions
  );
  console.log("lastTransaction", lastTransaction);
  // const { isLoading } = useSelector((state) => state.transactions);
  const isSpeakEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isSpeakEnabled
  );
  const isNotificationEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isNotificationEnabled
  );
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchPhone) {
      dispatch(
        fetchSearchTransactions({ userToken, senderphone: searchPhone })
      );
    }
  };
  let content;
  if (!isLoading && mytransactions?.length > 0) {
    content = mytransactions.map((transaction) => (
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
      <div className="">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            className="w-20 h-8 border  border-pink-500 outline-none pl-2"
            placeholder="amount"
          />
          <div className="flex">
          <input
            type="text"
            placeholder="Enter bKash Number"
            className="w-full h-8  outline-none border-b  border-pink-500 pl-2"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            required
          />
          <button
            // onClick={handleSearch}
            className="h-8 w-20 text-white"
            style={{ backgroundColor: "#E2136E" }}
          >
            Search
          </button>
          </div>
        </form>
      </div>
      <div className="">{content}</div>

      {isLoading && (
        <div className="search-popup-overlay">
          <div className="searchpopup bg-gray-100">
            <Lottie
              animationData={preloaderAnimation}
              className="h-20 w-32"
            ></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllTransaction;
