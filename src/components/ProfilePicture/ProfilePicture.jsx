import "../../../css/main.css";
import { useState, useEffect } from "react";
import { getSignedInUser, getUser } from "../../services/users";
import defaultProfilePicture from "../../assets/default_picture.png";

export const ProfilePicture = ({ userId }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    defaultProfilePicture
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUser(userId, token)
        .then((data) => {
          console.log("NEW SEVICE-data", data.user.profilePicture);
            const bucketBaseUrl =
              "https://my-acebook-bucket.s3.eu-north-1.amazonaws.com/";
          const profilePictureKey = data.user.profilePicture;
          setProfilePictureUrl(`${bucketBaseUrl}${profilePictureKey}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
;

  const handleError = (event) => {
    event.target.src = defaultProfilePicture;
  };

  return (
    <img
      src={profilePictureUrl}
      alt="User's profile pic"
      onError={handleError}
      className="circular-image"
    />
  );
};

export default ProfilePicture;
