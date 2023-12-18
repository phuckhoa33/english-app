import { Link, useNavigate,useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../../assets/images/logo.png";
import {
  faDumbbell,
  faEllipsis,
  faHome,
  faNoteSticky,
  faScroll,
  faShield,
  faShop,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./Sidebar.module.scss";
import { useUserContext } from "../../../../context/UserContext.js";
import { useEffect, useState } from "react";
import { useCourseContext } from "../../../../context/CourseContext.js";
import { useTestContext } from "../../../../context/TestContext.js";




const cx = classNames.bind(Style);
function Sidebar() {
  const {logout} = useUserContext();
  const [checked, setChecked] = useState(true);
  const {course} = useCourseContext();
  const {resetAllCachingTestDetails} = useTestContext();
  const [chosenItem, setChosenItem] = useState("learn");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(localStorage.getItem("token")){
      setChecked(false);
    }
    
    if(location.pathname.includes("practice") || location.pathname.includes("randomTest")){
      setChosenItem("practice");
    }
    else if(location.pathname.includes("test")){
      setChosenItem("test");
    }
    else if(location.pathname.includes("leaderBoard")){
      setChosenItem("leaderBoard");
    
    }
    else if(location.pathname.includes("quest")){
      setChosenItem("quest");
    
    }
    else if(location.pathname.includes("shop")){
      setChosenItem("shop");
    
    }
    else if(location.pathname.includes("profile")){
      setChosenItem("profile");
    
    }
  }, []);

  const handleClick = () => {
    resetAllCachingTestDetails();
  }

  const handleClickItem = (itemName) => {
    setChosenItem(itemName);
  }

  return (
    <div>
      <div onClick={handleClick} className={cx("nav")}>
        <div
          className={cx(
            "container",
            "p-0",
            "px-sm-3",
            "border-right",
            "nav-list-container"
          )}
        >
          <div
            className={cx(
              "d-flex",
              "flex-row",
              "flex-sm-column",
              "nav-list",

              "px-sm-0"
            )}
          >
            <div
              className={cx(
                "my-4",
                "nav-item",
                "d-none",
                "d-sm-flex",
                "d-flex",
                "justify-content-center",
                "align-items-center"
              )}
              onClick={() => setChosenItem("learn")}
            >
              <Link className={cx(
                "mb-2",
                "nav-item",
                "rounded-4",
                "text-center",
                "text-md-start",
                `${chosenItem==="learn"&&"isActive"}`
              )} to="/learn">
                <div className={cx("logo-container")}>
                  <img src={logo} alt="logo" className="img-fluid" />
                </div>
              </Link>
            </div>

            <Link
              className={cx(
                "mb-2",
                "nav-item",
                "rounded-4",
                "text-center",
                "text-md-start",
                `${chosenItem==="learn"&&"isActive"}`
              )}
              onClick={() => setChosenItem("learn")}
              to="/learn"
              
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faHome} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Học
              </span>
            </Link>
            <div
              className={cx(
                "mb-2",
                "nav-item",
                "rounded-4",
                "text-center",
                "text-md-start",
                "position-relative",
                "practice-open-sub-menu",
                `${chosenItem==="practice"&&"isActive"}`
              )}
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faDumbbell} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Luyện tập
              </span>

              <div className={cx("pratice-sub-menu", "py-5", "rounded-5")}>
                <div className={cx("d-flex", "flex-column")}>
                  <Link 
                    to={`/readQuestionPage/randomTest/${course?.id}`} 
                    className={cx("btn", "item-link", "py-3", "rounded-3")}
                    onClick={() => handleClickItem("practice")}
                  >
                    Luyện tập Cơ bản
                  </Link>
                  <Link
                    to={`/practices/${course?.id}`}
                    className={cx("btn", "item-link", "py-3", "rounded-3")}
                    onClick={() => handleClickItem("practice")}
                  >
                    Luyện tập Nâng cao
                  </Link>
                </div>
              </div>
            </div>
            <Link
              className={cx(
                "my-2",
                "text-center",
                "text-md-start",
                "nav-item",
                "rounded-4",
                `${chosenItem==="test"&&"isActive"}`
              )}
              onClick={() => handleClickItem("test")}
              to="/tests"
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faNoteSticky} />
              <span className="d-none d-md-inline-block ms-md-4">
                Bài kiểm tra
              </span>
            </Link>
            <Link
              className={cx(
                "my-2",
                "text-center",
                "text-md-start",
                "nav-item",
                "rounded-4",
                `${chosenItem==="leaderBoard"&&"isActive"}`
              )}
              to="/leaderBoard"
              onClick={() => handleClickItem("leaderBoard")}
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faShield} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Bảng Xếp Hạng
              </span>
            </Link>

            <Link
              className={cx(
                "my-2",
                "text-center",
                "text-md-start",
                "nav-item",
                "rounded-4",
                `${chosenItem==="quest"&&"isActive"}`
              )}
              to="/quest"
              onClick={() => handleClickItem("quest")}
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faScroll} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Nhiệm vụ
              </span>
            </Link>

            <Link
              className={cx(
                "my-2",
                "text-center",
                "text-md-start",
                "nav-item",
                "rounded-4",
                `${chosenItem==="shop"&&"isActive"}`
              )}
              to="/shop"
              onClick={() => handleClickItem("shop")}
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faShop} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Cửa Hàng
              </span>  
            </Link>
            {!checked && (

              <Link
              className={cx(
                "my-2",
                "text-center",
                "text-md-start",
                "nav-item",
                "rounded-4",
                `${chosenItem==="profile"&&"isActive"}`
              )}
              to="/profile"
              onClick={() => handleClickItem("profile")}
              >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faUser} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Hồ Sơ
              </span>
              </Link>
            )}

            <div
              className={cx(
                "my-2",
                "text-center",
                "text-md-start",
                "nav-item",
                "rounded-4",
                "position-relative",
                "show-sub-menu",
              )}
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faEllipsis} />
              <span
                className={cx(
                  "d-none d-md-inline-block m-0 ms-md-4",
                  "sidebar-title"
                )}
              >
                Xem Thêm
              </span>
              <div className={cx("sub-menu", "rounded-5")}>
                <ul className={cx("sub-menu-list")}>
                  {checked && (
                    <li className={cx("rounded-4", "sub-menu-item")}>
                      <Link
                        to={"/signin"}
                        className={cx("btn", "item-link", "py-3")}
                      >
                        Tạo Hồ Sơ
                      </Link>
                    </li>

                  )}
                  {!checked && (
                      <li className={cx("rounded-4", "sub-menu-item")}>
                        <Link to={"/"} className={cx("btn", "item-link", "py-3")}>
                          Giới Thiệu
                        </Link>
                      </li>
                    
                    )}
                  {!checked && (
                    <li className={cx("rounded-4", "sub-menu-item")}>
                      <Link
                        to={"/setting"}
                        className={cx("btn", "item-link", "py-3")}
                      >
                        cài đặt
                      </Link>
                    </li>
                  
                  )}
                  {!checked && (
                    <li className={cx("rounded-4", "sub-menu-item")}>
                      <Link
                        to={"/signin"}
                        className={cx("btn", "item-link", "py-3")}
                        onClick={logout}
                      >
                        Đăng Xuất
                      </Link>
                    </li>

                  )}
                  {checked && (
                    
                      <li className={cx("rounded-4", "sub-menu-item")}>
                        <Link
                          to={"/signin"}
                          className={cx("btn", "item-link", "py-3")}
                        >
                          Đăng Nhập
                        </Link>
                      </li>
                    )}
                <li className={cx("rounded-4", "sub-menu-item")}>
                    <Link
                      to={"/license"}
                      className={cx("btn", "item-link", "py-3")}
                    >
                      Chính sách
                    </Link>
                  </li>
                </ul>

              </div>
            </div>

            {/* <Link to="/leaderBoard"> Học </Link>
            <Link to="/quest"> Học </Link>
            <Link to="/shop"> Học </Link>
            <Link to="/profile"> Học </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
