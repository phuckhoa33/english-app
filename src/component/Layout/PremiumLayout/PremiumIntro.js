import classNames from "classnames/bind";
import Style from "../PremiumLayout/Premium.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { usePaymentContext } from "../../../context/PaymentContext";

const cx = classNames.bind(Style);

function PremiumIntro() {
  const {setPaymentDetail, paymentDetail} = usePaymentContext();

  const handleClickPerchase = () => {
    setPaymentDetail({...paymentDetail, total: 3});
  }

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
        <div className={cx("premium-intro-container", "d-flex", "flex-column")}>
          <h1
            className={cx("premium-intro-title", "text-white", "pb-5", "px-3")}
          >
            Học Tiếng Anh nhanh hơn cùng Super!
          </h1>
          <div
            className={cx(
              "premium-content-container",
              "my-5",
              "position-relative"
            )}
          >
            <table className={cx("table", "premium-content")}>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Miễn Phí</th>
                  <th scope="col">
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
                      alt=""
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="position-relative">
                <div className={cx("hightlight-background")}></div>
                <tr>
                  <td>Các bài học</td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Trái tim vô hạn</td>
                  <td></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Gỡ giới hạn Huyền thoại</td>
                  <td></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Không quảng cáo</td>
                  <td></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={cx(
              "premium-submit-container",
              "d-flex",
              "justify-content-center",
              "align-items-center"
            )}
          >
            <Link onClick={handleClickPerchase} to={"/payment"} className={cx("premium-submit-btn", "btn")}>
              Trả Phí để sử dụng 14 ngày miễn phí
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PremiumIntro;