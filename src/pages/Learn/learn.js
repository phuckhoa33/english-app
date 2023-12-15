/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import Style from "./learn.module.scss";
import { BlockLearnPage } from "../../component/Block/BlockLearnPage";
import { useCourseContext } from "../../context/CourseContext";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import loadingGif from '../../assets/gif/HfpPD3Ne.gif';
import {useLocation} from 'react-router-dom';
const cx = classNames.bind(Style);

function Learn() {
  const [level, setLevel] = useState();
  const {blocks} = useCourseContext();
  const {player} = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  useEffect(() => {
    if(player === null) {
      const account = JSON.parse(localStorage.getItem("account"));
      setLevel(account?.level);
    }
    else {
      setLevel(player?.currentLevel);
    }

    
  }, [])
  
  return (
    <div>
      <div className={cx("container", "my-4")}>
        {/* course section  */}
        <>
            {blocks?.length > 0 ? (
              <div className="row">
                {blocks?.map((block, index) => (
                  <BlockLearnPage block={block} index={index+1} level={level}/>

                ))}
              </div>

            ): (
              <>
                <div style={{
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  width: "100%"
                }}>
                  <img style={{width: "70%"}} src={loadingGif} alt="wait until the page loads" />
    
                </div>
                <h1 style={{textAlign: "center", color: "grey", fontWeight: "bold"}}>Xin lỗi vì sự bất tiện này. Hiện chưa có bài học ở trình độ của bạn</h1>
              </>
            )}
        </>
        
        {/* each course section */}

        {/* course section  */}
      </div>
    </div>
  );
}

export default Learn;
