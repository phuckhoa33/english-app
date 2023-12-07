import classNames from "classnames/bind";
import Style from "./Achievment.module.scss";
import {useLocation} from 'react-router-dom';

const cx = classNames.bind(Style);

function Achievment() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);
  return (
    <div>
      <div className="container">
        <div className={cx("achievment-container")}>
          <ul className={cx("achievment-list")}>
            <li className={cx("achievment-item")}>
              <div className="row">
                <div className="col-2">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/217492e7baf0961abdd2ddfb5881e7f9.svg"
                    alt=""
                  />
                </div>
                <div className="col-10"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Achievment;
