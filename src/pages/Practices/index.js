import classNames from "classnames/bind";
import Style from "./Practices.module.scss";

import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import blockImage from '../../assets/images/block.png';

const cx = classNames.bind(Style);

function Tests() {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const handleClickToPremium = () => {
  
    if(user){
      navigate("/premium");
    }
    else {
      navigate("/signin");
    }
  }


  return (
    <>
      <div className="container justify-content-center align-items-center d-flex">
        <div className={cx("practice-section-container", )}>
          {!user?.premium && (
            <div className={cx("card", "card-container", "my-4")}>
              <div className="card-body">
                <div className="row">
                  <div className="col-2 p-3">
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/e07e459ea20aef826b42caa71498d85f.svg"
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-10">
                    <p className={cx("card-text", "premium-text")}>
                      Bắt đầu 2 tuần dùng thử miễn phí để tận hưởng các quyền lợi
                      độc quyền của Super
                    </p>
                  </div>
                </div>
                <button
                  className={cx(
                    "btn",
                    "premium-btn",
                    "w-100",
                    "p-3",
                    "my-3",
                    "rounded-4"
                  )}
                  onClick={handleClickToPremium}
                >
                  Bắt đầu 14 ngày dùng thử miễn phí
                </button>
              </div>
            </div>
          )}
            
          <div className={cx("overlay-container")}>
            {!user?.premium && (
              <div className={cx("overlay")}>
                <div className={cx("overlay-content")}>
                  <img src={blockImage} alt="" width={30}/>
                  {/* Additional content goes here */}
                </div>
              </div>

            )}
            <div className={cx("content")}>

              <h1
                className={cx("advance-practice-section-sub-title", "pb-3", "ps-4", "mt-5")}
              >
                Chứng chỉ Quốc Tế
              </h1>

              <div className="d-flex flex-column">

                <div className={cx("border-top")}>
                  <Link
                    to={`/allTestOfType/ielts`}
                    className={cx(
                      "pratice-section",
                      "p-4",
                      "btn",
                      "text-start",
                      "THPTQG-tests-section"
                    )}
                  >
                    <h1 className={cx("title")}>Ielts</h1>
                    <small className={cx("desc")}>
                      Thử thách bản thân với bài kiểm tra chuẩn IELTS
                    </small>
                  </Link>
                </div><div className={cx("border-top")}>
                  <Link
                    to={"/allTestOfType/toiec"}
                    className={cx(
                      "pratice-section",
                      "p-4",
                      "btn",
                      "text-start",
                      "THPTQG-tests-section"
                    )}
                  >
                    <h1 className={cx("title")}>Toeic</h1>
                    <small className={cx("desc")}>
                    Thử thách bản thân với bài kiểm tra chuẩn TOEIC
                    </small>
                  </Link>
                </div>  
                <h1
                  className={cx(
                    "advance-practice-section-sub-title",
                    "py-3",
                    "ps-4"
                  )}
                >
                  Ôn thi THPTQG
                </h1>
                <div className={cx("border-top")}>
                  <Link
                    to={"/allTestOfType/university"}
                    className={cx(
                      "pratice-section",
                      "p-4",
                      "btn",
                      "text-start",
                      "THPTQG-tests-section"
                    )}
                  >
                    <h1 className={cx("title")}>Tổng hợp các bài thi THPTQG</h1>
                    <small className={cx("desc")}>
                      Tổng hợp các bài thi THPTQG của các năm gần đây giúp ôn tập và
                      rèn luyện tư duy để chuẩn bị cho các kỳ thi sau này
                    </small>
                  </Link>
                </div>
              </div>
            </div>

          </div>
         
        </div>
      </div>
    </>
  );
}

export default Tests;