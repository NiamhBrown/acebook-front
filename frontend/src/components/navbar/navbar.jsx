import "../../../css/navbar.css";
// import "../../App.css";
import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { SearchBar } from "./searchbar/SearchBar";
import { SearchResultsList } from "./searchbar/SearchResultsList";
import logo from "../../assets/Mountain-logo.png";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar =  (token) => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const [requests, setRequests] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userID = localStorage.getItem("userId")

    const handleLogout = () =>{
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login")
        };
    useEffect(()=>{
            const fetchData = async () => {
                try{
                const usersResponse = await fetch(`${BACKEND_URL}/users`);
                console.log("useEffect fetch")
                if (!usersResponse.ok) {
                    throw new Error('Network response was not ok ' + usersResponse.statusText);
                }
                const usersData = await usersResponse.json();
                const currentUser = usersData.users.find((user) =>user._id === userID);
                const requestedUsers = usersData.users.filter(user => 
                    user.friends.includes(userID) &&
                    !currentUser.friends.includes(user._id) &&
                    user._id !== userID
                )

                console.log('Requested users',requestedUsers)
                console.log("reqeusted users length", requestedUsers.length)                
                setRequests(requestedUsers.length); 
            } catch(error) {
                    setError(error);
                    setLoading(false);
                };
            }
            if (token && userID){
                fetchData()
            }
        },[token, userID] )

    return (
        <nav className="navbar" id="navbar">
            <div className = "container">
                <img src={logo} alt="page logo" id="logo_img"/>
                <div>
                    <Link to="/posts">
                        <div className="logo">Acebook</div>
                    </Link>
                </div>
            </div>
            <div className = "navbar-left">
                <div>
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && <SearchResultsList results={results} token={token}/>}
                </div>
            </div>
            <div className= "navbar-right">
                <Link to = {"/requests"} className={requests > 0 ? 'link-notification': 'link'}>Friend Requests({requests})</Link>
                <Link to = {"/friends"} className="link">Friends</Link>
                <Link to = {"/profile"} className="link">Profile</Link>
                <button onClick={handleLogout} id="navbar-logout-button">
                    Log out 
                </button>
            </div>
        </nav>
    )        
};

export default Navbar;

