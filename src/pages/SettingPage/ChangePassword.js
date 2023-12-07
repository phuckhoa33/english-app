import Sidebar from "../../component/Layout/DefaultLayout/Sidebar";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";
import SettingNav from "../../component/Layout/SettingLayout/SettingNav";
import { useLocation, useParams } from "react-router-dom";
import Task from "../../component/Layout/DefaultLayout/Task";
import { ChangePasswordDefaultPage } from "./ChangePasswordDefaultPage";
import classNames from "classnames/bind";
import Style from "./Setting.module.scss";
import { SendEmailForResetPasswordPage } from "./SendEmailForResetPasswordPage";
import { WaitingForEmailPage } from "./WaitingForEmailPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
const cx = classNames.bind(Style);
function ChangePassword() {
  const location = useLocation();
  const {player} = useUserContext();


  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [location.pathname]);


  const getCorrectPage = () => {
    if(location.pathname==="/sendEmail") {
      return <SendEmailForResetPasswordPage/>
    }
    else if(location.pathname==="/waitingPage"){
      return <WaitingForEmailPage/>
    }
    else if(player?.userId !== undefined) {
      return <ChangePasswordDefaultPage/>
    }
    else {
      return <ResetPasswordPage/>
    }
  }

  return (
    <div>
      {getCorrectPage()}
      
    </div>
  );
}

export default ChangePassword;
