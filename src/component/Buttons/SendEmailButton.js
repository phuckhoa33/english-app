import classNames from "classnames/bind";
import Style from "../../pages/SettingPage/Setting.module.scss";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import {Spinner} from 'react-bootstrap';

const cx = classNames.bind(Style);

export const SendEmailButton = ({email, setChecked}) => {
    const {sendEmailForResetPassword} = useUserContext();
    const [loading, setLoading] = useState(false);


    

    const handleClickSend = async() => {
        setLoading(true);
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!String(email).toLocaleLowerCase().match(emailRegex)){
            setChecked({
                validateEmail: false,
                running: false
            });
            return;
        }
        setChecked({
            validateEmail: null,
            running: true
        });

        await sendEmailForResetPassword(email);
        setChecked({
            validateEmail: true,
            running: false
        });
        setLoading(false);
    }

    return (
        <button 
            className={cx("save-setting-btn", email!==""?null:"disabled")} 
            disabled={email!==""?false:true} 
            onClick={handleClickSend}
        >
            {loading?<Spinner/>:"Gửi email"}
            
        </button>
    )
}