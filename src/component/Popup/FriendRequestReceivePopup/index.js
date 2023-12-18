import classNames from "classnames/bind";
import Style from "./FriendRequestReceivePopup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightArrowLeft,
  faCheck,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(Style);

function FriendRequestReceivePopup(props) {



  return (
    <>
      <div className={cx("friend-request-receive-popup-wrapper")}>
        <button
          className={cx("close-btn")}
          onClick={() => {
            props.ClickToShow();
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className={cx("friend-request-receive-title-container", "pb-3")}>
          <h1 className={cx("friend-request-receive-title")}>
            Yêu cầu kết bạn
          </h1>
        </div>
        <div className={cx("pending-user-container", "py-4")}>
          <div className={cx("pending-user-list")}>
            {props.friendRequests?.map(friendRequest => (
              
              <div className={cx("pending-user-item", "mb-3", "rounded-4")}>
                <div className="row justify-content-center align-items-center">
                  <div className="col-3">
                    <div className={cx("pengding-user-avatar-container")}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0P6wm44mHnNrjQMQ7EdGgsz5iT4rsqnY_4Q&usqp=CAU"
                        alt=""
                        className={cx(
                          "pengding-user-avatar",
                          "w-100",
                          "h-100",
                          "rounded-circle"
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h1 style={{overflow: "scroll"}} className={cx("pengding-user-name", "mb-3")}>
                      {friendRequest?.username}
                    </h1>
                    <h3 className={cx("pengding-user-nick-name")}>{friendRequest?.email}</h3>
                  </div>
                  <div className="col-3">
                    <button
                      className={cx(
                        "accept-button",
                        "pending-request-btn",
                        "mb-3"
                      )}
                      onClick={() => props.acceptFriendRequest(friendRequest)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button className={cx("deny-button", "pending-request-btn")}
                      onClick={() => props.refuseFriendRequest(friendRequest)}
                    
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>

                    {/* //neu da la ban be be thi hien nut nay len */}

                    {/* <button className={cx("view-profile-button")}>
                      Xem Trang cá nhân
                    </button> */}
                  </div>
                </div>
              </div>
            ))}

            
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendRequestReceivePopup;