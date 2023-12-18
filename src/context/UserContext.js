/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import { addFriend, checkTokenResetPasswordApi, createAchivement, getFriend, getLeaderBoard, getPlayer, getStreaks, getUser, getUserExceptUserId, login, sendEmailForResetPasswordApi, updatePlayerApi, updateUserApi } from "../axios/userAxios";
import { useCourseContext } from "./CourseContext";
import NotificationReducer from "../reducer/NotificationReducer";
import {db} from '../Firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [currentUserDetail, setCurrentUserDetail] = useState();
    const [player, setPlayer] = useState(null);
    const [errorMessage, setErrorMesage] = useState("");
    const [streak, setStreak] = useState([]);
    const [hearts, setHearts] = useState(0);
    const {getLessonsAndBlocksAndLessons} = useCourseContext();
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [friendRequests, dispatchFriendRequests] = useReducer(NotificationReducer, []);



    useEffect(() => {
        registerUser();
        registerAdmin();
        const q = query(collection(db, "friendRequest"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          let friendRequestFetch = [];
          querySnapshot.forEach((doc) => {
            friendRequestFetch.push({ ...doc.data(), id: doc.id });
          });

          dispatchFriendRequests({ type: 'SET', friendRequests: friendRequestFetch });
        });
        
        

    
        // Unsubscribe from the snapshot listener when the component unmounts
        return () => unsub();
    }, []);


    useEffect(() => {
        dispatchFriendRequests({type: 'SET_DEPEND_ON_USER_ID', id: user?.id});
        const friendRequestIds = friendRequests.map(friendRequest => friendRequest.requestedUserId);
        const friendsIds = friends.map(friend => friend.id);


        const conditionIds = friendRequestIds.concat(friendsIds);

        const filterUsers = users.filter(u => conditionIds.indexOf(u.id) !== -1);
        setUsers(filterUsers);
    }, [user])

    
    const checkPlayerAndGetCourse = () => {
        if(player){
            getLessonsAndBlocksAndLessons(player.currentLevel);
            localStorage.removeItem("account");
        }
        else {
            let account = JSON.parse(localStorage.getItem("account"));
            if(account === null) {
                account = {
                    currentLevel: "1.0.0",
                    currentLesson: 1,
                    currentBlock: 1,
                    currentCourse: 1,
                    expPoint: 0,
                    hearts: 5,
                    score: 0
                }
                
            }
            const courseNumber = account?.currentLevel?.split(".")[0];
            localStorage.setItem("account", JSON.stringify(account));
            setHearts(account.hearts);
            setPlayer(account);
            setStreak(account.streak);
            getLessonsAndBlocksAndLessons(courseNumber);
        }
        
    }


    const registerUser = async() => {
        try {
            const {data} = await getUser();
            const playerData = await getPlayer("English");
            const streakData = await getStreaks("English");
            const ranksData = await getLeaderBoard();
            
            setRanks(ranksData.data.data);
            setUser(data.data);
            setCurrentUserDetail(data.data);
            setStreak(streakData.data.data);
            setPlayer(playerData.data.data);
            await getUsersByCondition(data.data.id);
            await getFriends(data.data.id);
            await updatePlayer(playerData.data.data);
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
        }

        checkPlayerAndGetCourse();
    }

    const getUsersByCondition = async(id) => {
        const usersData = await getUserExceptUserId(id);
        setUsers(usersData.data.data);
    }

    const getFriends = async(id) => {
        const friendData = await getFriend(id);
        setFriends(friendData.data.data);
    }


    const registerAdmin = async() => {
        const admin  = {
            "username": "phuckhoa",
            "password": "332003"
        }

        const {data} = await login(admin);
        localStorage.setItem("tokenAdmin", JSON.stringify(data.data.token));
    }

    const logout = () => {
        setUser(null);
        setUser(null);
        setPlayer(null);
        setCurrentUserDetail(null);
        localStorage.removeItem("token");
        const account = JSON.parse(localStorage.getItem("account"));
        setPlayer(account);
        setUser(account);
    }



    const updatePlayer = async(player) => {
        try {
            const {data} = await updatePlayerApi(player);
            setPlayer(data.data);
            setHearts(data.data.heart)
        } catch (error) {
            localStorage.removeItem('token');
            setPlayer(null);
            setUser(null);
        }
    }

    const updateUser = async(oldPassword, reset, premium) => {
        const userInput = {
            username: user.username,
            password: user.password,
            email: user.email,
            avatar: user.avatar,
            id: user.id,
            roleId: user.roleId,
            oldPassword
        }
        if(premium) {
            userInput.premium = premium;
        }
        const {data} = await updateUserApi(userInput);
        if(data.data.token && reset == null){
            localStorage.setItem('token', JSON.stringify(data.data.token));
        }
        else {
            
            setErrorMesage(data.data.message);
        }

    }

    const checkProgressOfPlayer = (lessonIndex, blockIndex) => {
        const currentLevel = player?.currentLevel+"";
        if(currentLevel?.indexOf(".") !== -1){
            const arr = currentLevel?.split(".");
            if(arr[1].match(""+blockIndex) && arr[2].match(""+lessonIndex)){
                return true;
            }
        }
        return false;
    }

    const addNewFriend = async(friendId) => {
        const {data} = await addFriend({userId: user?.id, friendId});
        console.log(data);
    }

    const checkChangeProperty = () => {
        return currentUserDetail?.username !== user?.username
                || currentUserDetail?.avatar !== user?.avatar
                || currentUserDetail?.email !== user?.email
                || currentUserDetail?.password !== user?.password;
    }

    const getRankOfCurrentPlayer = () => {
        
        for(let i = 0; i < ranks?.length; i++){
            if(ranks[i].playerId === player?.id) {
                return i+1;
            }
        }

        return "-";
    }


    const sendEmailForResetPassword = async(email) => {
        await sendEmailForResetPasswordApi({email});
    }

    const checkTokenWhenResetPassword = async(token) => {
        const {data} = await checkTokenResetPasswordApi(token);
        return data.data;
    }


    const createNewAchievement = async(achivement) => {
        const {data} = createAchivement(achivement);
        console.log(data);
    }


    const sendFriendRequest = async(addedFriendId) => {
        const newAddFriendRequest = {...user, userId: addedFriendId, requestedUserId: user?.id};
        dispatchFriendRequests({type: 'CREATE', newAddFriendRequest});
        await addDoc(collection(db, "friendRequest"), newAddFriendRequest);
    }


    const refuseFriendRequest = async(friendRequest) => {
        const id = friendRequest.requestedUserId;
        dispatchFriendRequests({type: "DELETE", id});
        await deleteDoc(doc(db, "friendRequest", id));
    }

    const acceptFriendRequest = async(friendRequest) => {
        console.log(friendRequest);
        await refuseFriendRequest(friendRequest);
        await addNewFriend(friendRequest.requestedUserId);
    }

    return (
        <UserContext.Provider
            value={{
                user,
                errorMessage,
                player,
                streakTotal: streak?.length,
                hearts,
                friends,
                users,
                ranks,
                setUser,
                setPlayer,
                updatePlayer,
                registerUser,
                logout,
                updateUser,
                setHearts,
                createNewAchievement,
                checkProgressOfPlayer,
                addNewFriend,
                friendRequests,
                sendFriendRequest,
                refuseFriendRequest,
                acceptFriendRequest,
                checkChangeProperty,
                getRankOfCurrentPlayer,
                setUsers,
                getUsersByCondition,
                getFriends,
                sendEmailForResetPassword,
                checkTokenWhenResetPassword,
                setErrorMesage
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);