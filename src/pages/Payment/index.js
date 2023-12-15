/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import Style from "./Payment.module.scss";
import {useNavigate} from 'react-router-dom';
import Tabs from "../../component/Tab";
import { useEffect } from "react";
import { usePaymentContext } from "../../context/PaymentContext";
const cx = classNames.bind(Style);

function Payment() {
  const navigate = useNavigate();
  const {paymentDetail} = usePaymentContext();



  useEffect(() => {
    if(!paymentDetail.userId){
      navigate("/NotFound");
    }
    else {
      localStorage.setItem("paymentDetail", JSON.stringify(paymentDetail));
    }
  }, [])

  return (
    <>
      <div
        className={cx(
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "my-5"
        )}
      >
        <div className={cx("payment-container", "p-5", "rounded-4")}>
          <Tabs />
        </div>
      </div>
    </>
  );
}

export default Payment;