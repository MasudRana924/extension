import React from 'react';
import { GrConfigure } from "react-icons/gr";
import { MdOutlineSendToMobile } from "react-icons/md";
import { Link } from 'react-router-dom';
const PaymentCategory = () => {
    return (
        <div className="mt-4 border border-stone-100 bg-stone-100 rounded-lg ml-2 mr-2 payment-category-section">
            <div className="flex justify-between gap-2 m-4">
                <div className="bg-teal-300 w-full   border-teal-300 rounded-lg p-2 h-16">
                    <Link to="/send">
                        <div className="flex items-center justify-center ">
                            <MdOutlineSendToMobile className="text-xl  text-red-500  mb-1"></MdOutlineSendToMobile>
                        </div>
                        <p className="text-xs  text-center">Recent Data</p>
                    </Link>
                </div>
                <div className="bg-fuchsia-300 border-fuchsia-300 rounded-lg p-2 w-full h-16">
                    <Link to="/configure">
                        <div className="flex justify-center">
                            <GrConfigure className="text-xl  text-gray-900  mb-1"></GrConfigure>
                        </div>
                        <p className="text-xs text-center" >Configure </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default PaymentCategory;