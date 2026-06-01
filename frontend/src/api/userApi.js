import API from "./axios";

// GET PROFILE
export const getProfile = async () => {
  const res = await API.get("/user/me");

  return res.data;
};

// UPDATE PROFILE
export const updateProfile = async (data) => {
  const res = await API.put("/user/me", data);

  return res.data;
};

// UPDATE SETTINGS
export const updateSettings = async (data) => {
  const res = await API.put("/user/settings", data);

  return res.data;
};

// UPLOAD PROFILE PIC
export const uploadProfilePic = async (formData) => {
  const res = await API.post("/user/profile-pic", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// DELETE PROFILE PIC
export const deleteProfilePic = async () => {
  const res = await API.delete("/user/profile-pic");

  return res.data;
};
