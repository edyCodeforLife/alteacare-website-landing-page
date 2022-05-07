import axios from "axios";
import * as Config from "../../../../config";

export const promoProgram = async () => {
  return new Promise((resolve, reject) => {
    let response = fetch(Config.URL_PROMO_PROGRAMS, {
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
