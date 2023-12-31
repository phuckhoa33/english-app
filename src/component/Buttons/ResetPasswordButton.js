import { useUserContext } from "../../context/UserContext";
import classNames from "classnames/bind";
import Style from "../../pages/SettingPage/Setting.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Spinner} from 'react-bootstrap';

const cx = classNames.bind(Style);


export const ResetPasswordButton = ({ disableButton, newPassword }) => {
    const {updateUser, setUser, user} = useUserContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickSave = async(e) => {
        e.preventDefault();
        setUser({...user, password: newPassword});
        setLoading(true);
        await updateUser(null, "");
        setLoading(false);
        setUser(null);
        navigate("/signin");
    }


    return (
        <button className={cx("save-setting-btn", disableButton?null:"disabled")} disabled={disableButton?false:true} onClick={handleClickSave}>
            {loading?<Spinner/>:"Reset Mật khẩu"}
            
        </button>
    )
}