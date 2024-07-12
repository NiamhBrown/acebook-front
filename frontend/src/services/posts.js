// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const createPost = async (token, message) => {
  const payload = {
    token: token,
    message: message,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${BACKEND_URL}/posts`, requestOptions); //i had to add post:post to the response to access the new post
  if (response.status !== 201) {
    throw new Error("Unable to create post");
  } else {
    let newPostResponse = await response.json();
    const newPost = newPostResponse.post
    return newPost;
  }

};

export const likePost = async (token, postId) => {
  const payload = {
    token: token,
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

  let response = await fetch(`${BACKEND_URL}/posts/likes`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to like post");
  } else {
    return;
  }
};

export const unlikePost = async (token, postId) => {
  const payload = {
    token: token,
    postId: postId

  };
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/posts/likes`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to unlike post");
  } else {
    return;
  }
};
