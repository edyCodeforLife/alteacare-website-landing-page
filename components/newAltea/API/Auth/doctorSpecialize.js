import axios from "axios";
import * as Config from "../../../../config";

export const doctorSpecialize = async () => {
  return new Promise((resolve, reject) => {
    let response = fetch(Config.URL_SPECIALIZATIONS, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {});
  });
};
