import "../../../css/main.css";
import defaultProfilePicture from "../../assets/default_picture.png";

export const ProfilePicture = ({ userId, signedInUser }) => {
  const bucketBaseUrl =
    "https://my-acebook-bucket.s3.eu-north-1.amazonaws.com/";
  const profilePictureKey = signedInUser.profilePicture;
  const profileImageUrl = `${bucketBaseUrl}${profilePictureKey}`;

  const handleError = (event) => {
    event.target.src = defaultProfilePicture;
  };

  return (
    <img
      src={profileImageUrl}
      alt="User's profile pic"
      onError={handleError}
      className="circular-image"
    />
  );
};

export default ProfilePicture;
