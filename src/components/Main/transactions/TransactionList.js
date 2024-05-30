import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchtransactions } from '../../../redux/reducers/transaction/transactionSlice';
import Transactionslists from './Transactionslists';
const TransactionList = () => {
    const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const dispatch = useDispatch();
  const { mytransactions, lastTransaction,isLoading } = useSelector(
    (state) => state.transactions
  );
  useEffect(() => {
    dispatch(fetchtransactions({ userToken }));
  }, [dispatch, userToken]);

  let content;
  if (!isLoading && mytransactions?.length > 0) {
    content = mytransactions
      .map((transaction) => (
        <Transactionslists key={transaction._id} transaction={transaction} />
      ));
  }
    return (
        <div className="popup-container ">
            <div className="main-navbar h-20 flex items-center gap-4">
                <div className=''>
                    <Link to='/'>
                    <BsArrowLeft className='text-white text-xl ml-4'/>
                    </Link>
                </div>
                <div className='w-full'>
                    <h1 className='text-md text-white text-start'>All Transactions</h1>
                </div>
            </div>
            <div>{content}</div>
        </div>
    );
};

export default TransactionList;