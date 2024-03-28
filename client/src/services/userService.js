import axios from "axios";
import { API_URL } from "../constants";
import Cookie from "js-cookie";

async function ShowUser() {
  try {
    const response = await axios.get(API_URL + `/show/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Échec de la récupération de l'utilisateur : " + error.message
    );
  }
}

async function UpdateUser(userId, userData) {
  try {
    const response = await axios.patch(API_URL + `/users/${userId}`, {
      user: userData,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Échec de la mise à jour de l'utilisateur : " + error.message
    );
  }
}

async function DeleteUser(userId) {
  try {
    const response = await axios.delete(API_URL + `/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      "Échec de la suppression de l'utilisateur : " + error.message
    );
  }
}

export { ShowUser, UpdateUser, DeleteUser };
