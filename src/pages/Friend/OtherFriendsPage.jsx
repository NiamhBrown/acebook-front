import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Friend } from "../../components/Friend";
import { addFriend, removeFriend } from "../../services/users";
import Navbar from "../../components/navbar/navbar";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const OtherFriendsPage = ({friendUserId}) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userId");
    const otherUserId  =  friendUserId; 

    useEffect(() => {
        console.log('other user id',otherUserId)
        fetch(`${BACKEND_URL}/users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                const otherUser = json.users.find((user) => user._id === otherUserId)
                const results = json.users.filter((user) => {
                    return (
                        user &&
                        otherUser.friends.includes(user._id) && // if theyre are in your friends lists
                        user.friends.includes(otherUserId) // if you are in their friends lists
                    );
                });
                setResults(results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [userID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log('error',error)
        return (<>
            <h1>Friends</h1>
            <div>Error: No Friends Found</div>
            </>)};

    return (
        <>
            <Navbar/>
            <h1>Friends</h1>
            {results.length > 0 ? (
                results.map((friend) => (
                    <div key={friend._id}>
                        <Friend friend={friend} />
                    </div>
                ))
            ) : (
                <p>No friends found.</p>
            )}
        </>
    );
};

