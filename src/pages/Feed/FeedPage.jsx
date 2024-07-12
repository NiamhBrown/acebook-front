import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import Navbar from "../../components/navbar/navbar";
import SubmitPost from "../../components/SubmitPost";
import "../../../css/main.css"

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return(
    <>
      <Navbar token={token}/>
      <h1 className="heading">Feed page</h1>
      <div className="submit-post-section">
      <SubmitPost token={token} onPostCreated={handlePostCreated}/>
      </div>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} token={token} key={post._id}/>
        ))}
      </div>
    </>
  );
};
