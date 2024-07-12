import "../../../css/post.css"
import "../../../css/main.css"
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { likeComment, unlikeComment } from "../../services/comments"; //createComment needs to be added
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Comment = (props) => {
    console.log("PROPSSSSS:",props)
    const token = props.token;
    const commentId = props.comment._id;
    const commentTimestamp = props.comment.createdAt;
    const userId = localStorage.getItem("userId");
    const initialLikeCount = props.comment.likes.length;
    const initialLikeStatus = props.comment.likes.includes(userId)

    const [likeStatus, setLikeStatus] = useState(initialLikeStatus)
    const [likeCount, setLikeCount] = useState(initialLikeCount)

    function formatTimestamp(timestamp) {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }

    const formattedTimestamp = formatTimestamp(commentTimestamp);

    const handleLike = async () => {

        if (likeStatus == false) {
        setLikeCount(likeCount + 1);

        try {
            await likeComment(token, commentId);
    }   catch (err) {
            console.error(err);
            setLikeCount(likeCount);
    }
    }   else if (likeStatus == true) {
        setLikeCount(likeCount - 1);
        try {
            await unlikeComment(token, commentId);
    }   catch (err) {
            console.error(err);
            setLikeCount(likeCount);

    }}

    setLikeStatus(!likeStatus)}

    return <div key={props.comment._id} className="comment">
    <div className="comment-body">
        <div className="comment-header">
            <a href={`/profile/${props.comment.user}`}>
            <ProfilePicture userId={props.comment.user}/>
            </a>
        </div>

        <div className="single-comment">
            <div className="comment-header">
                <p className="comment-username-handle ">{props.comment.username}</p>
                <p className="comment-timestamp">{formattedTimestamp}</p> 
            </div>
            <article className="comment-content">{props.comment.message}</article>
        </div>
    </div>
        <div className="comment-like-section">
            <button className="comment-like-button" onClick={ handleLike }>{likeStatus ? <AiFillLike /> : <AiOutlineLike />}</button>
            <p className="comment-like-count">{likeCount} likes</p>
        </div>
        </div>
};

export default Comment;
