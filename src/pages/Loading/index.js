/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import loadingGif from '../../assets/gif/loading.gif';
import { Spinner } from '../../component/Spinner/Spinner';
import {useParams, useNavigate} from 'react-router-dom';
import { useTestContext } from '../../context/TestContext';
import { useCourseContext } from '../../context/CourseContext';

export const LoadingPage = () => {
    const {type, questionType, lessonNumber} = useParams();
    const {getTestByType} = useTestContext();
    const {loading} = useCourseContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            if(type !== undefined && questionType!== undefined && lessonNumber!== undefined){
                await getTestByType(type,lessonNumber); 
            }
        }
        fetchData();
    }, [])

    useEffect(() => {

        const timeout = setTimeout(() => {
            if(type !== undefined && questionType!== undefined && lessonNumber!== undefined) {
                navigate(`/lesson/${type}/${questionType}/${lessonNumber}`);

            }
            else if(!loading) {
                navigate("/learn");
            }
        }, 4000);
    
        // Clear the timeout to prevent potential memory leaks
        return () => clearTimeout(timeout);
    }, [loading])




    return (
        <div>
            <Spinner/>
            <img src={loadingGif}/>
        </div>
    )
}