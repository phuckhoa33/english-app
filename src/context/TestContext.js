import { createContext, useContext, useState } from "react";
import { createNewStreak, getAllTestByTestType, getAnswersByChatGPT, getQuestionsInBlockWithBlockId, getRandomTest, getTest } from "../axios/userAxios";
import { useNavigate } from "react-router";
import { useUserContext } from "./UserContext";
import { useCourseContext } from "./CourseContext";
const TestContext = createContext();

// Initial a test for deploy random question in this course for basic test
const initialTest =  {
    title: "Bài thực hành cơ bản của khóa học",
    description: "Chúng ta hãy ôn lại những bài học mà ta đã học qua dưới dạng các bài test",
    questionAmount: "random",
    interval: "60"
}


const levelUpTest = {
    title: "Bài test để giúp bạn chuyển qua block mới",
    description: "Chúng ta hãy ôn lại những bài học mà ta đã học qua dưới dạng các bài test",
    questionAmount: "90",
    interval: "60"
}

export const TestProvider = ({children}) => {
    const [questions, setQuestions] = useState(() => {
        const questionsStorage = JSON.parse(localStorage.getItem("questions"));
        return questionsStorage===null?[]:questionsStorage;
    });
    const [testDetail, setTestDetail] = useState(() => {
        const testDetailStorage = JSON.parse(localStorage.getItem("testDetail"));
        return testDetailStorage;
    });
    const [questionNumber, setQuestionNumber] = useState(() => {
        const questionNumberStorage = JSON.parse(localStorage.getItem("questionNumber"));
        return questionNumberStorage===null?0:questionNumberStorage;
    });
    const [answerQuestion, setAnswerQuestion] = useState(() => {
        const answerQuestionStorage = JSON.parse(localStorage.getItem("answerQuestion"));
        return answerQuestionStorage===null?[]:answerQuestionStorage;
    });

    const [skippedQuestions, setSkippedQuestions] = useState(() => {
        const skippedQuestionsStorage = JSON.parse(localStorage.getItem("skippedQuestions"));
        return skippedQuestionsStorage===null?[]:skippedQuestionsStorage;
    });

    const [score, setScore] = useState(() => {
        const scoreStorage = JSON.parse(localStorage.getItem("score"));
        return scoreStorage===null?0:scoreStorage;
    });
    const [exp, setExp] = useState(() => {
        const expStorage = JSON.parse(localStorage.getItem("exp"));
        return expStorage===null?0:expStorage;
    });

    const [skippedQuestionNumber, setSkippedQuestionNumber] = useState(() => {
        const skippedQuestionNumberStorage = JSON.parse(localStorage.getItem("skippedQuestionNumber"));
        return skippedQuestionNumberStorage===null?0:skippedQuestionNumberStorage;
    });
    const [answers, setAnswers] = useState(() => {
        const answersStorage = JSON.parse(localStorage.getItem("answers"));
        return answersStorage===null?[]:answersStorage;
    })
    const [chosenAnswers, setChosenAnswers] = useState(() => {
        const chosenAnswerStorage = JSON.parse(localStorage.getItem("chosenAnswers"));
        return chosenAnswerStorage===null?[]:chosenAnswerStorage;
    })
    const [directPopup, setDirectPopup] = useState(""); 
    const [loading, setLoading] = useState();
    const [tests, setTests] = useState([]);

    const navigate = useNavigate();
    const {player, updatePlayer, setPlayer, createNewAchievement} = useUserContext();
    const {blocks} = useCourseContext();


    const getAllTestAtTestType = async(testType) => {
        const {data} = await getAllTestByTestType(testType);
        setTests(data?.data);
    }


    const getTestByType = async(testType, testId) => {
        let questionsStorage = JSON.parse(localStorage.getItem("questions"));
        let testDetailStorage = JSON.parse(localStorage.getItem("testDetail"));
        let questionNumberStorage = JSON.parse(localStorage.getItem("questionNumber"));
        let answerQuestionStorage = JSON.parse(localStorage.getItem("answerQuestion"));
        let skippedQuestionsStorage = JSON.parse(localStorage.getItem("skippedQuestions"));
        let skippedQuestionNumberStorage = JSON.parse(localStorage.getItem("skippedQuestionNumber"));
        const checked = questionNumberStorage === null && 
                        questionsStorage === null &&
                        answerQuestionStorage === null;
        if(checked) {
            if(testType==="randomTest" || testType==="entryTest"){
                const {data} = await getRandomTest(testId);
                testDetailStorage = initialTest;
                questionsStorage = data?.data?.questions;
            }
            else if(testType === "levelUp") {
                const levelOfPlayer = player?.currentLevel?.split('.');

                const blockNumber = Number.parseInt(levelOfPlayer[1]);

                const currentBlockOfPlayer = blocks[blockNumber];
                const {data} = await getQuestionsInBlockWithBlockId(currentBlockOfPlayer?.id);
                
               
                
                testDetailStorage = levelUpTest;
                questionsStorage = data?.data;
            }
            else {
                const {data} = await getTest(testId);
                questionsStorage = data?.data;
            }
            questionNumberStorage = 0;
            answerQuestionStorage = [];
            skippedQuestionsStorage = [];
            skippedQuestionNumberStorage = 0;
        }


        setQuestions(questionsStorage);
        setTestDetail(testDetailStorage);
        setQuestionNumber(questionNumberStorage);
        setAnswerQuestion(answerQuestionStorage);
        setSkippedQuestions(skippedQuestionsStorage);
        setSkippedQuestionNumber(skippedQuestionNumberStorage);

                
        localStorage.setItem("questions", JSON.stringify(questionsStorage));
        localStorage.setItem("testDetail", JSON.stringify(testDetailStorage));
        localStorage.setItem("answerQuestion", JSON.stringify(answerQuestionStorage));
        localStorage.setItem("skippedQuestions", JSON.stringify(skippedQuestionsStorage));
        localStorage.setItem("questionNumber", questionNumberStorage);
        localStorage.setItem("skippedQuestionNumber", skippedQuestionNumberStorage);
    }

    // const determineLevel = () => {
    //     const scoreTotal = questions?.reduce((accumulator, currentValue) => {
    //         return accumulator + currentValue.score;
    //       }, 0);
    //     const percent = Math.floor(score/scoreTotal*100);
    //     return Math.floor(percent/20);
    // }

    const getQuestion = async(testype, playerId, funcShow) => {
        if(questionNumber > questions?.length 
            || (questions[questionNumber] === undefined 
                && questionNumber !== 0)) {
            
            if(skippedQuestions?.length === 0 || skippedQuestionNumber===skippedQuestions?.length) {

                navigate(`/lesson/complete/normal/${testype}`);
                calculateScoreForTest(testype, playerId);
                
            }

            else if(skippedQuestionNumber===0) {
                setDirectPopup("skipped");
                funcShow();
                return skippedQuestions[skippedQuestionNumber];
            }
            else{
                saveTestDetailInLocalStorage();
                return skippedQuestions[skippedQuestionNumber];
            }
        }
        else {
            navigate(`/lesson/${testype}/${questions[questionNumber]?.questionType}/${questions[questionNumber]?.id}`)
        }

        if(player?.id) {
            createNewStreakItem(playerId);
        }
        return questions[questionNumber];
    };

    const calculateScoreForTest = async(testype, playerId) => {
        const scoreTotal = questions?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.score;
        }, 0);

        if(score/scoreTotal>= 0.8 ) {

            if(testype.includes("lesson")){
                player.expPoint += 10;
                player.score += 5;
    
                player.level = levelUp(player?.currentLevel, testype, scoreTotal);
                setPlayer(player);
    
            }
            else if(score === scoreTotal && player?.id) {
                const achivement = {
                    playerId,
                    score,
                    sourceId: "",
                    title: "Hoàn thành bài học với điểm tối đa"
                }
    
                await createNewAchievement(achivement);
            }
            else if((testype.includes("test") || testype.includes("practice"))
            && score/scoreTotal > 0.8 ){
                const achivement = {
                    playerId,
                    score,
                    sourceId: testDetail?.id,
                    title: "Hoàn thành bài kiểm tra"
                }
    
                await createNewAchievement(achivement);
            }
            else if(testype === "levelUp"){
                
            }
        }
        

        if(player?.id){
            updatePlayer(player);
        }

    }


    const levelUp = (level, testtype, scoreTotal) => {
        let levelArray = level.split(".");
        let courseLevel = Number.parseInt(levelArray[0]);
        let blockLevel = Number.parseInt(levelArray[1]);
        let lessonLevel = Number.parseInt(levelArray[2]);

        if(Number.parseInt(testtype[7])!==lessonLevel){
            lessonLevel += 1;
        }
        if(lessonLevel === 9 && (testtype === "levelUp" && score/scoreTotal > 0.8)) {
            blockLevel += 1;
            lessonLevel = 0
            if(blockLevel === 3) {
                blockLevel +=  1;
                lessonLevel = 0;
            }
        }
        
        return courseLevel+"."+blockLevel+"."+lessonLevel;

    }

    const createNewStreakItem = async(playerId) => {
        await createNewStreak({playerId});
    }

    const saveTestDetailInLocalStorage = (refresh) => {
        let questionCount = questionNumber+1;
        if(refresh) {
            questionCount -= 1;
        }


        localStorage.setItem("questions", JSON.stringify(questions));
        localStorage.setItem("testDetail", JSON.stringify(testDetail));
        localStorage.setItem("answerQuestion", JSON.stringify(answerQuestion));
        localStorage.setItem("skippedQuestions", JSON.stringify(skippedQuestions));
        localStorage.setItem("skippedQuestionNumber", skippedQuestionNumber);
        localStorage.setItem("questionNumber", questionCount);
        localStorage.setItem("score", score);
        localStorage.setItem("exp", exp);
        localStorage.setItem("chosenAnswers", JSON.stringify(chosenAnswers));
    };

    const resetAllCachingTestDetails = () => {
        localStorage.removeItem("questions");
        localStorage.removeItem("testDetail");
        localStorage.removeItem("questionNumber");
        localStorage.removeItem("answerQuestion");
        localStorage.removeItem("score");
        localStorage.removeItem("exp");
        localStorage.removeItem("skippedQuestions");
        localStorage.removeItem("skippedQuestionNumber")
        localStorage.removeItem("chosenAnswers");
        localStorage.removeItem("answers");
        localStorage.removeItem("timer");
        setQuestions([]);
        setSkippedQuestions([]);
        setAnswerQuestion([]);
        setQuestionNumber(0);
        setScore(0);
        setExp(0);
        setTestDetail({});
        setSkippedQuestionNumber(0);
        setChosenAnswers([]);
    }


    const getAnswers = async() => {
        const answersStorage = JSON.parse(localStorage.getItem("answers"));
        setLoading(false);
        if(answersStorage===null || answersStorage.length < 2){
            const {data} = await getAnswersByChatGPT(answerQuestion);
            console.log(data);
            setAnswers(data.data);
            localStorage.setItem("answers", JSON.stringify(data.data));
        }
        else {
            setAnswers(answers);
        }
        setLoading(true);

    }

    

    return (
        <TestContext.Provider value={{
            testDetail,
            questionNumber,
            score,
            loading,
            exp,
            answerQuestion,
            questions,
            questionsTotal: questions?.length,
            skippedQuestionsTotal: skippedQuestions?.length,
            scoreTotalOfTest: questions?.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.score;
              }, 0),
            skippedQuestions,
            directPopup,
            skippedQuestionNumber,
            chosenAnswers,
            answers,
            tests,
            calculateScoreForTest,
            setTestDetail,
            setChosenAnswers,
            setSkippedQuestionNumber,
            setDirectPopup,
            setScore,
            setExp,
            setAnswerQuestion,
            getQuestion,
            setQuestionNumber,
            getTestByType,
            saveTestDetailInLocalStorage,
            resetAllCachingTestDetails,
            setSkippedQuestions,
            getAnswers,
            getAllTestAtTestType
        }}>
            {children}
        </TestContext.Provider>
    )
}

export const useTestContext = () => useContext(TestContext);