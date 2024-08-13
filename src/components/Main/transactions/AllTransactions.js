import React, { useState } from 'react';
import { formatDate } from '../../../redux/utilities/helper';
import { useSelector } from 'react-redux';
import logo from '../../../assets/user.png'
import { FiCopy } from 'react-icons/fi';
import { message } from 'antd';

const AllTransactions = ({ transaction }) => {
    const { loggeduser, } = useSelector(
        (state) => state.userDetails
    );
    const user = loggeduser.user;
    const [copy, setCopy] = useState(transaction.tranId);
    const fCopy = () => {
        navigator.clipboard.writeText(copy);
        message.success("Copied")
    }
    return (
        <div className="mt-4 card col-span-12  md:col-span-3  gap-4 lg:col-span-4  2xl:col-span-3 ">
            <div className="text-start flex justify-between gap-5 bg-white border border-gray-100  p-2">
                <div className="flex">
                    <div>
                        {
                            user._id === transaction.senduserId ? <div>
                                <img src={transaction.receiveuserAvatar || logo} alt="" className="h-10 w-10 mt-2 border border-gray-300 rounded-full shadow p-1" />
                            </div> : <div> {
                                user._id === transaction.receiveuserId ? <div>
                                    <img src={transaction.senderuserAvatar || logo} alt="" className="h-10 w-10 mt-2 rounded-full shadow p-1" />
                                </div> : null
                            }</div>
                        }
                    </div>
                    <div>
                        {
                            user._id === transaction.senduserId ? <div>
                                <p className="text-xs text-gray-500 font-medium ml-2 mt-1">{transaction.type}</p>

                                <p className="text-xs text-gray-500 font-medium ml-2 mt-1">{transaction.receiverphone}</p>

                            </div> : null
                        }
                        {
                            user._id === transaction.receiveuserId ? <div>
                                {/* <p className="text-xs text-gray-500 font-medium ml-2 mt-1">{transaction.receiverType}</p> */}
                                <p className="text-xs text-gray-500 font-medium ml-2 mt-1">Payment Received</p>

                                <p className="text-xs text-gray-500 font-medium ml-2 mt-1">{transaction.senderphone}</p>

                            </div> : null
                        }

                        <div className="flex gap-4 mt-2">
                            <p className="text-xs font-medium ml-2 text-gray-500">Trans ID : {transaction.tranId}</p>
                            <FiCopy className="text-sm text-pink-500 font-medium" onClick={fCopy}></FiCopy>
                        </div>
                        <p className="text-xs font-medium ml-2 mt-1 mb-2 text-gray-500">{formatDate(transaction.createdAt)}</p>
                    </div>
                </div>
                <div>
                    {
                        user._id === transaction.senduserId ? <div>
                            <p className="text-xs font-medium mt-2 text-end text-red-500">- {transaction.amount}.00TK</p>

                        </div> : null
                    }
                    {
                        user._id === transaction.receiveuserId ? <div>
                            <p className="text-xs font-medium  mt-2 text-end text-green-500">+ {transaction.amount}.00TK</p>

                        </div> : null
                    }
                    <div>
                        <p className="text-xs text-gray-500 font-medium text-end mt-5">Charge ট 0.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTransactions;