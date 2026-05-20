import API from "../../api/axios";

// Get all notes
export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

// Delete note by id
export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};

export const toggleFavorite = async (id) => {
  const res = await API.put(`/notes/favorite/${id}`);

  return res.data;
};
