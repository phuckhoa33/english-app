/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { payBill } from "../axios/userAxios";
import { useUserContext } from "./UserContext";


const PaymentContext = createContext();

const initialPaymentDetail = {
    total: null,
    cardNumber: null,
    cVV: null,
    expiredDate: null,
    currency: null,
    method: null,
    intent: null,
    description: null,
    cancelUrl: "http://localhost:3000/payment/error",
    successUrl: "http://localhost:3000/payment/success",    
    userId: null
}

export const PaymentProvider = ({children}) => {
    const [paymentDetail, setPaymentDetail] = useState(() => {
        const paymentDetailStorage = JSON.parse(localStorage.getItem("paymentDetail"));
        return paymentDetailStorage===null?initialPaymentDetail:paymentDetailStorage;
    });


    const payBillApi = async() => {
        const {data} = await payBill(paymentDetail);
    }

    const saveBillDetail = () => {
        localStorage.setItem("paymentDetail", JSON.stringify(paymentDetail));
    }
    
    return (
        <PaymentContext.Provider
            value={{
                paymentDetail,
                payBillApi,
                setPaymentDetail,
                saveBillDetail
            }}
        >
            {children}
        </PaymentContext.Provider>
    )
}

export const usePaymentContext = () => useContext(PaymentContext);