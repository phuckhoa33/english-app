import classNames from "classnames/bind";
import Style from "./UserEnviroment.module.scss";
import { useUserContext } from "../../../../context/UserContext";

const cx = classNames.bind(Style);

function UserEnviroment() {
  const {player, streakTotal, hearts} = useUserContext();
  return (
    <>
      <div className="row w-100">
            
            <div
              className={cx(
                "col-4",
                "d-flex",
                "justify-content-around",
                "align-items-center",
                "streak-container"
              )}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
                alt=""
              />
              {player?.id ? streakTotal: 0}
            </div>
            <div
              className={cx(
                "col-4",
                "d-flex",
                "justify-content-around",
                "align-items-center",
                "gem-container"
              )}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg"
                alt=""
              />
              {player?.score}
            </div>
            <div
              className={cx(
                "col-4",
                "d-flex",
                "justify-content-evenly",
                "align-items-center",
                "heart-container"
              )}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
                alt=""
              />
              {hearts}
            </div>
          </div>
    </>
  );
}

export default UserEnviroment;
