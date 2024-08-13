import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRecentTransactions, } from '../../../redux/reducers/transaction/transactionSlice';
import Transactionslists from './Transactionslists';
import Lottie from "lottie-react";
import preloaderAnimation from "../../../json/Animation - 1715745618808.json";
const TransactionList = () => {
    const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const dispatch = useDispatch();
  const { recentTransactions,isLoading,lastTransaction } = useSelector(
    (state) => state.transactions
  );
  console.log('lastTransaction',lastTransaction);
  useEffect(() => {
    dispatch(fetchRecentTransactions({ userToken }));
  }, [dispatch, userToken]);

  let content;
  if (!isLoading && recentTransactions?.length > 0) {
    content = recentTransactions
      .map((transaction) => (
        <Transactionslists key={transaction._id} transaction={transaction} />
      ));
  }
    return (
        <div className="popup-container ">
            <div className='m-2'>{content}</div>
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

export default TransactionList;