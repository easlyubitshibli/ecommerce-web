import React from "react";
import { useParams, Link } from "react-router-dom";
import { XCircle, AlertTriangle } from "lucide-react";

const PaymentFail = () => {
    const { tranId } = useParams();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
                {/* Error Icon */}
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
                    <XCircle className="h-10 w-10 text-red-600" />
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Payment Failed!
                </h2>

                <p className="text-gray-500 mb-6">
                    Unfortunately, your transaction could not be processed.
                </p>

                {/* Transaction Details Box */}
                <div className="bg-red-50 rounded-lg p-4 mb-8 text-left border border-red-100">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-red-800">
                                Transaction Failed
                            </p>
                            <p className="text-xs text-red-600 mt-1 break-all">
                                ID:{" "}
                                <span className="font-mono select-all">
                                    {tranId}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        to="/cart"
                        className="block w-full bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        Try Again
                    </Link>

                    <Link
                        to="/contact"
                        className="block w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
