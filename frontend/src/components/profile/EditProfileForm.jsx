import React, { useState } from "react";
import ProfilePictureUpload from "../ProfilePicture/ProfilePictureUpload";

const EditProfileForm = ({ user, onSave, onClose, token, onUpload }) => {
  const [formData, setFormData] = useState({
    forename: user.forename || "",
    surname: user.surname || "",
    email: user.email || "",
    gender: user.gender || "",
    location: user.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <ProfilePictureUpload token={token} onUpload={onUpload} />
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="forename"
            value={formData.forename}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default EditProfileForm;
