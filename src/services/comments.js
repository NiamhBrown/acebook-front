// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllComments = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
    Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch comments");
    }

    const data = await response.json();
    return data;
    
};

export const createComment = async (token, message, postId) => {
    const payload = {
        token: token,
        message: message,
        postId: postId
    };

    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    };
    let response = await fetch(`${BACKEND_URL}/comments`, requestOptions); //i had to add comment:comment to the response to access the new comment
    if (response.status !== 201) {
    throw new Error("Unable to create comment");
    } else {
    let newCommentResponse = await response.json();
    const newComment = newCommentResponse.comment;
    return newComment;

    }

};

export const likeComment = async (token, commentId) => {
    const payload = {
        token: token,
        commentId: commentId

    };
    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    };

    let response = await fetch(`${BACKEND_URL}/comments/likes`, requestOptions);
        if (response.status !== 200) {
        throw new Error("Unable to like comment");
    } else {
        return;
    }
};

export const unlikeComment = async (token, commentId) => {
    const payload = {
        token: token,
        commentId: commentId

    };
    const requestOptions = {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    };

    let response = await fetch(`${BACKEND_URL}/comments/likes`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to unlike comment");
    } else {
        return;
    }
};
