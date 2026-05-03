import API from "./axios";

export const getProfile = async () => {
  const res = await API.get("/user/me");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/user/me", data);
  return res.data;
};
