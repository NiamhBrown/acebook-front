import { useEffect, useState } from "react";
import { Friend } from "../../components/Friend";
import Navbar from "../../components/navbar/navbar";
import "../../../css/main.css"
import "../../../css/post.css"


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const FriendsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userID = localStorage.getItem("userId");
    

    useEffect(() => {
        fetch(`${BACKEND_URL}/users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                const loggedInUser = json.users.find((user) => user._id === userID)
                const results = json.users.filter((user) => {
                    return (
                        user &&
                        loggedInUser.friends.includes(user._id)&& // if theyre are in your friends lists
                        user.friends.includes(userID) // if you are in their friends lists
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
        return <div>Error: {error.message}</div>;
    }

    return (
      <>
        <Navbar />
        <h2>
          Friends <span className="number">({results.length})</span>
        </h2>
        <div className="friends-container">
          {results.length > 0 ? (
            results.map((friend) => (
              <div key={friend._id}>
                <Friend friend={friend} />
              </div>
            ))
          ) : (
            <p>No friends found.</p>
          )}
        </div>
      </>
    );
};

export default FriendsPage;

