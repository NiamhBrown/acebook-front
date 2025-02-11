import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { getPosts } from "../../services/posts";
import { updateUser } from "../../services/users";
import Post from "../Post/Post";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Navbar from "../../components/navbar/navbar";
import { getSignedInUser } from "../../services/users";
import FriendsPage from "../../pages/Friend/FriendsPage";
import EditProfileForm from "./EditProfileForm";

export const Profile = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profilePicture, setProfilePicture] = useState(null);
  const [signedInUser, setSignedInUser] = useState([]);

  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          const posts = data.posts.filter((post) => {
            return post.user === userId;
          });
          setPosts(posts);
          setToken(data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      getSignedInUser(token)
        .then((data) => {
          setSignedInUser(data.user[0]);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUpload = async (profilePicture) => {
    setProfilePicture(profilePicture);
  };

  const handleSave = async (updatedUser) => {
    try {
      console.log("User updated:", updatedUser);
      const token = localStorage.getItem("token");
      const updatedUserData = await updateUser(updatedUser, token);
      setSignedInUser(updatedUserData);
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return token ? (
    <>
      <Navbar />
      <main className="profile-main">
        <div className="profile-header">
          <ProfilePicture userId={userId} />
          <div className="modal">
            <button className="edit-profile-btn" onClick={openModal}>
              Edit Profile
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Edit Profile"
              // style={{content: {
              //   background: 'blue',
              // }}}
            >

              <EditProfileForm
                user={signedInUser}
                onSave={handleSave}
                onClose={closeModal}
                token={token}
                onUpload={handleUpload}
              />
            </Modal>
          </div>

          <h1 className="profile-name">
            {signedInUser.forename} {signedInUser.surname}
          </h1>
        </div>

        <div className="profile-container">
          <h2>
            Posts <span className="number">({posts.length})</span>
          </h2>
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  token={token}
                  user={signedInUser}
                />
              ))}
            </>
          ) : (
            <p className="none-found-msg">No posts found. </p>
          )}

          <FriendsPage />
        </div>
      </main>
    </>
  ) : null;
};

export default Profile;
