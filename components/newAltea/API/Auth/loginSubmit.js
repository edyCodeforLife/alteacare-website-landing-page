import axios from "axios";
import validator from "validator";
import Swal from "sweetalert2";
import * as Config from "../../../../config";
import { reactLocalStorage } from "reactjs-localstorage";

export const loginSubmit = async (email, password) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmpty(email)) return Swal.fire("Email wajib diisi");
    if (!validator.isEmail(email)) return Swal.fire("Email tidak valid");
    if (validator.isEmpty(password)) return Swal.fire("Password wajib diisi");
    let formData = {};
    formData.email = email;
    formData.password = password;
    let response = axios
      .post(`${Config.API_URL_AUTH}/user/auth/login`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        let access_user = {
          access_token: response.data.data.access_token,
          username: response.data.data.username,
          username_type: response.data.data.username_type,
        };
        reactLocalStorage.setObject("access_user", access_user);
        reactLocalStorage.setObject(
          "refresh_token",
          response.data.data.refresh_token
        );
        Swal.fire("Success", "Login Success");
        resolve(response);
      })
      .catch((error) => {
        Swal.fire(error.response.data.message);
      });
  });
};
