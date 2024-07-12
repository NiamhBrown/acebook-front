import { FaSearch } from "react-icons/fa";
import { useState} from "react";
import "../../../../css/SearchBar.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    
    
    const fetchData = (value) => {
        console.log(BACKEND_URL)
        fetch(`${BACKEND_URL}/users`) 
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
        .then((json) => {
            console.log(json)
                const results = json.users.filter((user) => {
                    console.log(user)
                return (
                    value &&
                    user &&
                    (user.forename.toLowerCase().includes(value)||
                    user.surname.toLowerCase().includes(value))
                );
            });
            setResults(results);

            console.log(results)
        });
};
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);

    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                id="searchinput" autoComplete="off" type="text" placeholder="Search for new friends.." 
                value={input}  onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}