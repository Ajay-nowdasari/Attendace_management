import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/";

export const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(API_URL + "user_profile/", {
  
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };
  
export const deleteStudent = (id) =>{
  const token = localStorage.getItem('access_token');
  fetch(`${API_URL +'user_profile/'}${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const updateStudent = (id, updates) =>{
  const token = localStorage.getItem('access_token');
  fetch(`${API_URL + "user_profile/"}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,},
    body: JSON.stringify(updates),
  }).then((response) => response.json());
}