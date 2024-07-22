const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const checkEmailAvailability = async (email) => {
  const payload = { email: email };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(
    `${BACKEND_URL}/users/check-email`,
    requestOptions
  );
  if (response.status !== 200) {
    throw new Error("Email check failed");
  }

  const data = await response.json();
  return data.available;
};

export const getAllUsers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

export const getSignedInUser = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/users/getSignedInUser`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

export const getUser = async (userId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/users/getUser?userId=${userId}`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

export const updateUser = async (updatedUser, token) => {
  const payload = {
    updatedUser: updatedUser,
    token: token,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users/profile`, requestOptions);
  // Check if the response is OK
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error updating user:", errorData);
    throw new Error(errorData.message || "Failed to update user");
  }

  // Parse the JSON response
  let responseData = await response.json();
  console.log("THIS IS THE RESPONSE DATA:", responseData);
  return responseData;
};

export const addFriend = async (token = null, friendUserId) => {
  const payload = {
    token: token,
    friendUserId: friendUserId,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users/friends`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to add friend");
  } else {
    return;
  }
};

export const removeFriend = async (token, friendUserId) => {
  const payload = {
    token: token,
    friendUserId: friendUserId,
  };
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users/friends`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to remove friend");
  } else {
    return;
  }
};

export const uploadProfilePicture = async (token, file) => {
  const formData = new FormData();
  formData.append("file", file); //"file" must match the beckend key, which is "file"

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const response = await fetch(`${BACKEND_URL}/users/upload`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to add profile picture");
  } else {
    return await response.json();
  }
};

export const denyFriend = async (token, friendUserId) => {
  const payload = {
    token: token,
    friendUserId: friendUserId,
  };
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  let response = await fetch(
    `${BACKEND_URL}/users/friends/deny`,
    requestOptions
  );
  if (response.status !== 200) {
    throw new Error("Unable to remove friend");
  } else {
    return;
  }
};
