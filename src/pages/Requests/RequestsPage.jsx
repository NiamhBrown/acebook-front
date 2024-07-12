// get all users

// filter where userID is not in otheruser friends list
//          also where user id != user id

// list => Request componenet

//Request Component:

// other User details
// approve button - post(/friends) => signedin user database
//Deny button - delete(/friends) => otheruser database
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { Request } from "../../components/Request/Requests";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const RequestPage = () => {
    const [request, setRequest] = useState([]);
    const [currentUser, setCurrentUser] = useState(null) 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userId");

    useEffect(()=>{
        const fetchData = async () => {
            try{
            const usersResponse = await fetch(`${BACKEND_URL}/users`);
            console.log("useEffect fetch")
            if (!usersResponse.ok) {
                throw new Error('Network response was not ok ' + usersResponse.statusText);
            }
            const usersData = await usersResponse.json();
            // console.log("usersData",usersData)
            // console.log("line 36",userID)
            const currentUser = usersData.users.find((user) =>user._id === userID);
            // console.log("line 38",userID)
            // console.log("current user", currentUser)
            const requestedUsers = usersData.users.filter(user => 
                user.friends.includes(userID) &&
                !currentUser.friends.includes(user._id) &&
                user._id !== userID
            )
            // console.log('Requested users',requestedUsers)
            setRequest(requestedUsers);
            setCurrentUser(currentUser) 
        } catch(error) {
                setError(error);
                setLoading(false);
            };

        } // fetch data
        if (token){
            fetchData()
        }
    },[token, userID] // use effect      
    ) // use effect

    return token ? (
            <>
                <Navbar/>
                <h1>Friend Requests</h1>
                <div className="requests-container">
                    {request.map(user =>(
                        //<p key={user._id} user={user}>{user.forename}</p>
                        <Request key={user._id}user = {user}  currentUser = {currentUser}/>
                    ))}
                </div>
                {/* <p>{request}</p> */}


            </>        
    ): null;
};