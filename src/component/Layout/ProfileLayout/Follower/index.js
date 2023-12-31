/* eslint-disable no-useless-computed-key */
import classNames from "classnames/bind";
import Style from "../Follower/Follower.module.scss";
import UserEnviroment from "../../LayoutsComponent/UserEnviroment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClose,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FriendRequestReceivePopup from "../../../Popup/FriendRequestReceivePopup";
import { useUserContext } from "../../../../context/UserContext";

const cx = classNames.bind(Style);

function Follower(props) {
  const [showFriendFilter, setShowFriendFilter] = useState(false);
  const [showFriendRequestReceived, setShowFriendRequestReceived] =
    useState(false);
  const {friends, getUsersByCondition, user, friendRequests, refuseFriendRequest, acceptFriendRequest} = useUserContext();

  const showFriendFilterHandle = () => {
    setShowFriendFilter(!showFriendFilter);
  };
  const ClickToShowFriendRequestReceived = () => {
    setShowFriendRequestReceived(!showFriendRequestReceived);
  };


  const handleClickAddNewFriend = () => {
    getUsersByCondition(user?.id);
    props.clickToOpenHandle();
  }
  return (
    <>
      <div className="container-fluid p-0 p-lg-3 my-4">
        <div className={cx("follower-section-container")}>
          <div className={cx("follower-container")}>
            <div className={cx("friend-header", "row", "mb-3")}>
              <div className="col-7 col-xl-8">
                <h1 className={cx("friend-section-title", "title")}>Bạn bè</h1>
              </div>
              <div className="col-5 col-xl-4">
                <div className="row justify-content-center align-items-center">
                  <div className="col-4">
                    <div
                      className={cx(
                        "friend-request-receive-btn-container",
                        "position-relative"
                      )}
                    >
                      <div
                        className={cx(
                          "d-none",
                          "friend-request-received-container",
                          { ["show"]: showFriendRequestReceived }
                        )}
                      >
                        <FriendRequestReceivePopup
                          ClickToShow={ClickToShowFriendRequestReceived}
                          friendRequests={friendRequests}
                          refuseFriendRequest={refuseFriendRequest}
                          acceptFriendRequest={acceptFriendRequest}
                        />
                      </div>
                      <button
                        className={cx(
                          "friend-request-receive-btn",
                          "p-1",
                          "friend-header-btn",
                          "position-relative"
                        )}
                        onClick={() => {
                          ClickToShowFriendRequestReceived();
                        }}
                      >
                        <div className={cx("notifi-hightlight-dot")}></div>
                        <FontAwesomeIcon icon={faBell} />
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className={cx("add-friend-btn-container")}>
                      <button
                        className={cx(
                          "add-friend-btn",
                          "p-1",
                          "friend-header-btn"
                        )}
                        onClick={() => {
                          props.clickToOpenHandle();
                        }}
                      >
                        <FontAwesomeIcon icon={faUserPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className={cx("search-friend-btn-container")}>
                      <button
                        className={cx(
                          "search-friend-btn",
                          "p-1",
                          "friend-header-btn"
                        )}
                        onClick={showFriendFilterHandle}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx(
                "filter-friend-container",
                "py-3",
                "position-relative",
                {
                  ["show"]: showFriendFilter,
                }
              )}
            >
              <div>
                <input
                  type="text"
                  className={cx(
                    "input-search-filter",
                    "w-100",
                    "py-1",
                    "px-3",
                    "rounded-4"
                  )}
                  placeholder="Tên hoặc tên người dùng"
                />
                <button
                  className={cx("close-filter-friend-btn", "rounded-5")}
                  onClick={() => setShowFriendFilter(!showFriendFilter)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>

            <div className={cx("friend-container")}>
              <ul className={cx("friend-list")}>
                {friends?.length > 0 ? (
                  <>
                    {friends?.map(friend => (
                      <li className={cx("friend-display", "mb-3", "py-2", "px-3")}>
                        <div className="row">
                          <div className="col-lg-4 col-xl-2">
                            <div className={cx("friend-avatar-container")}>
                              <div
                                className={cx("user-status", "online-status")}
                              ></div>
                              <img
                                src={friend?.avatar ? friend.avatar :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0P6wm44mHnNrjQMQ7EdGgsz5iT4rsqnY_4Q&usqp=CAU"}
                                className={cx(
                                  "friend-avatar",
                                  "img-fluid",
                                  "mb-3",
                                  "rounded-circle"
                                )}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className=" col-lg-8 col-xl-10 px-3 py-2">
                            <h3 className={cx("friend-name", "my-0")}>{friend?.username}</h3>
                            <small className={cx("friend-status")}>Online</small>
                          </div>
                        </div>
                      </li>

                    ))}
                  </>

                ): (
                  <h1 style={{color: "white"}}>Hãy thêm bạn bè để cùng nhau leo tháp nào</h1>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Follower;