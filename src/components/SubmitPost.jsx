import { useState } from "react";
import { createPost } from '../services/posts';
import "../../css/post.css"

export const SubmitPost = (props) => {
    const [message, setMessage] = useState("");
    const token = props.token;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPost = await createPost(token, message);
            props.onPostCreated(newPost);
            setMessage("");
        } catch (err) {
            console.error(err);
        }
        
    };

    return(
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                name="message"
                value={message}
                placeholder="What's on your mind..."
                className="textarea"
                onChange={(event) => setMessage(event.target.value)}></textarea>
                <br />
                <button type="submit" className="primary-button">Create Post</button>
            </form>
        </div>
    );
};

export default SubmitPost;