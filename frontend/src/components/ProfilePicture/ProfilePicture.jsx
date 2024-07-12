
import "../../../css/main.css"
import defaultProfilePicture from "../../assets/default_picture.png";



export const ProfilePicture = ({userId}) => {
    const serverUrl = "http://localhost:3000";
    const profileImageUrl =`${serverUrl}/uploads/${userId}`;

    const handleError = (event) => {
        event.target.src = defaultProfilePicture;
    };

    return (

            <img src={profileImageUrl} 
            alt="User's profile pic"
            onError={handleError}
            className = "circular-image" />
    );
};

export default ProfilePicture;

