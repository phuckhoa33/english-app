/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import Style from "../../pages/Learn/learn.module.scss";
import { useCourseContext } from "../../context/CourseContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import catFoot from '../../assets/images/Cat_leg.png';
import AskForLevelUpTest from "../Popup/AskForLevelUpTest";

const cx = classNames.bind(Style);
export const BlockLearnPage = ({block, index, level}) => {
    const [lessons, setLessons] = useState([]);
    const {getLessonsByBlockId} = useCourseContext();
    const {checkProgressOfPlayer, player} = useUserContext();
    const [lessonColors, setLessonColors] = useState(() => {
      let myArray = Array.from({ length: 3 }, () => Array(9).fill(false));
      return myArray;
    });
    const [showAskPopup, setShowAskPopup] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
      setLessons(getLessonsByBlockId(block.id));
      // Clear the timeout to prevent potential memory leaks

      checkAndRestartLessonColors();
    }, []);

    useEffect(() => {
      // "document.documentElement.scrollTo" is the magic for React Router Dom v6
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
      });
    }, [showAskPopup]);


    const checkAndRestartLessonColors = () => {
      const currentLevel = player?.currentLevel?.split(".");

      if(currentLevel?.length > 0) {

        const lessonNumberInLevel = Number.parseInt(currentLevel[2]);
        const blockNumberInLevel = Number.parseInt(currentLevel[1]);
        let colorLessonsTemplate = lessonColors;
  
        for(let i = 0; i < 9; i++) {
          if(blockNumberInLevel === index-1) {
            if(i <= lessonNumberInLevel-1){
              colorLessonsTemplate[index-1][i] = true;
            }
          }
        }
        colorLessonsTemplate[index-1][0] = true;



        const block1 = new Array(9).fill(true);
        if(blockNumberInLevel >= 1){

          colorLessonsTemplate[0] = block1;

          if(blockNumberInLevel >= 2) {
            colorLessonsTemplate[1] = block1;
          }


        }
        setLessonColors(colorLessonsTemplate);

        
      }
    }


    const handleClickLesson = (e, lessonNumber) => {
        e.preventDefault();
        const currentLevelInPlayer = player?.currentLevel?.split(".");

        const blockNumber = Number.parseInt(currentLevelInPlayer[1]);
        if(blockNumber>=index || blockNumber === index-1) {
          const lessonDetail = lessons?.find(lesson => lesson?.id === lessonNumber); 
          navigate(`/loading/lesson${lessonDetail?.title}/read/${lessonNumber}`);

        }
        else {
          setShowAskPopup(!showAskPopup);
        }
    }


    const ClickToShowPopupHandle = (price) => {
      setShowAskPopup(!showAskPopup);
    };


    return (
      <>
        <div className={cx("d-none", { ["show"]: showAskPopup })}>
          <AskForLevelUpTest  ClickToClosePopup={ClickToShowPopupHandle}/>
        </div>
        <div className="col-12">

            <div className={cx("course-section", "mb-5", "mt-3")}>
              <div
                className={cx(
                  "bange-container",
                  "d-flex",
                  "justify-content-center"
                )}
              >
                <div style={{backgroundColor: `${block?.blockColor}`}} className={cx("bange", "w-100")}>
                  <h1 className={cx("section-title")}>Gate {index}</h1>
                  <p className={cx("section-desc")}>
                    {block?.title}
                  </p>
                </div>
              </div>

              <div
                className={cx(
                  "row",
                  "align-items-center",

                  "py-5",
                  "px-3"
                )}
              >
                {lessons?.map((lesson, lessonIndex) => (
                    <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center aligns-items-center p-1">
                    <button
                        
                        style={{width: "7rem", height: "6rem",backgroundColor: `${checkProgressOfPlayer(lessonIndex, index) || lessonColors[index-1][lessonIndex]?block?.blockColor:"rgb(229,229,229)"}`}}
                        className={cx(
                        "lesson-disable",
                        "button-to-get-in-lesson",
                        "lesson-active",
                        "my-3",
                        "position-relative",
                        
                        )}
                        onClick={e => handleClickLesson(e, lesson?.id)}
                        disabled={checkProgressOfPlayer(lessonIndex, index) || lessonColors[index-1][lessonIndex]?false: true}
                    >
                        <img
                        src={catFoot}
                        width={30}
                        alt=""
                        />
                    </button>
                    </div>
                ))}
               
              </div>
            </div>
          </div>
      </>
    )
}