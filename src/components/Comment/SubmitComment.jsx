import "../../../css/main.css"
import { useState } from "react";
import { createComment } from "../../services/comments";

export const SubmitComment = (props) => {
    const [message, setMessage] = useState("");
    const token = props.token;
    const postId = props.postId;
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newComment = await createComment(token, message, postId);
            props.handleCommentCreated(newComment)
            setMessage("");
        } catch (err) {
            console.error(err);
        }
        
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                name="message"
                value={message}
                placeholder="Add a comment..."
                onChange={(event) => setMessage(event.target.value)}></textarea>
                <br />
                <button type="submit" className="primary-button">Create Comment</button>
            </form>
        </div>
    );
};

export default SubmitComment;