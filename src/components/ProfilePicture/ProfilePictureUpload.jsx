import { useState } from "react";
import { uploadProfilePicture } from "../../services/users";
import "../../../css/post.css";
import "../../../css/main.css";

const ProfilePictureUpload = ({ token, onUpload }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
    console.log("(((((((((event.target.files[0]:", event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const data = await uploadProfilePicture(token, profilePicture);
      console.log("Profile picture uploaded:", data);
      console.log("this is the PP:", profilePicture);
      onUpload(profilePicture);
      setIsFormVisible(false);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  return (
    <div>
      <button
        className="primary-button"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Cancel" : "Upload Picture"}
      </button>
      {isFormVisible && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
