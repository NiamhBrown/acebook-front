import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Post from "../Post/Post";
import FriendToggle from "./FriendToggle";
import { OtherFriendsPage } from "../../pages/Friend/OtherFriendsPage";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const UserProfile = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [friendUser, setFriendUser] = useState({ forename: "Loading User", friends: [] });
    const [signedInUser, setSignedInUser] = useState({ friends: [] });
    const [isFriend, setIsFriend] = useState(false);
    const navigate = useNavigate();
    const { userid: friendUserId } = useParams();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await fetch(`${BACKEND_URL}/posts`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!postsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const postsData = await postsResponse.json();
                const userPosts = postsData.posts.filter((post) => post.user === friendUserId);
                setPosts(userPosts);
                window.localStorage.setItem("token", postsData.token);
                setToken(postsData.token);

                const usersResponse = await fetch(`${BACKEND_URL}/users`);
                if (!usersResponse.ok) {
                    throw new Error('Network response was not ok ' + usersResponse.statusText);
                }
                const usersData = await usersResponse.json();
                const friendUserData = usersData.users.find((user) => user._id === friendUserId);
                const signedInUserData = usersData.users.find((user) => user._id === userId);

                setFriendUser(friendUserData);
                setSignedInUser(signedInUserData);

                if (signedInUserData.friends.includes(friendUserId)) {
                    setIsFriend(true);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, friendUserId, userId]);

    return token ? (
        <>
            <Navbar />
            <main className="profile-main">
                <div className="profile-header">
                <ProfilePicture userId={friendUserId}/>
                <h1>{friendUser.forename} {friendUser.surname}</h1>
                <div >
                <FriendToggle friendId={friendUserId} userId={userId}  user={signedInUser} isFriend={isFriend} setIsFriend={setIsFriend} />
                </div>
                </div>
                <h2 className="post-heading">Posts</h2>
                <div className="profile-container" role="profile">
                    {posts.map(post => (
                        <Post key={post._id} post={post} token={token} user={user} />
                    ))}
                    <OtherFriendsPage friendUserId={friendUserId}/>
                </div>
                
            </main>
        </>
    ) : null;
};

export default UserProfile;
