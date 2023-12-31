import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import classNames from "classnames/bind";
import Style from "./Setting.module.scss";
import {Link} from "react-router-dom"
import { SaveButton } from "../../component/Buttons/SaveButton";
import { ErrorNotification } from "../../component/LoginLayout/ErrorNotification";

const cx = classNames.bind(Style);

export const ChangePasswordDefaultPage = () => {
    const {user, setUser, errorMessage} = useUserContext();
    const [oldPassword, setOldPassword] = useState("");
    return (
        <div
          className={cx(
            "container",
            "d-flex",
            "justify-content-center",
            "align-items-center"
          )}
        >
          <div className={cx("change-pass-container", "my-3")}>
          <Link to={"/setting"} className={cx("back-to-setting-btn", "btn","d-absolute" ,"d-xxl-none")}>
            Trở vể
          </Link>
            <h1 className={cx("setting-title", "my-3")}>Mật khẩu</h1>
            <div className="my-5">
              <div className="row">
                <div className="col-12 col-lg-5 text-start text-lg-end">
                  <label htmlFor="" className={cx("setting-item-label", "me-5")}>
                    Mật khẩu hiện tại
                  </label>
                </div>
                <div className="col-12 col-lg-7 ps-5">
                  <input
                    type="password"
                    className={cx(
                      "w-100",
                      "input-setting",
                      "p-3",
                      "rounded-4"
                    )}
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}

                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="row">
              <div className="col-12 col-lg-5 text-start text-lg-end">
                <label htmlFor="" className={cx("setting-item-label", "me-5")}>
                    Mật khẩu mới
                  </label>
                </div>
                <div className="col-12 col-lg-7 ps-5">
                  <input
                    type="password"
                    className={cx(
                      "w-100",
                      "input-setting",
                      "p-3",
                      "rounded-4"
                    )}
                    name="user-gmail"
                    value={user?.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <ErrorNotification errorNotification={errorMessage}/>
            <div className="mt-5">
              <SaveButton oldPassword={oldPassword}/>
            </div>
          </div>
        </div>
        
    )
}