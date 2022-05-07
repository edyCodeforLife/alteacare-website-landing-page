import axios from "axios";

import * as Config from "../../../config";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const patientList = async (email, token) => {
  return new Promise((resolve, reject) => {
    let response = axios
      .get(
        `${Config.API_URL}/list_data_vaccine_user?email=${email}&email_normalize=${email}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        }
      )
      .then((response) => {
        let patientList = response.data.data;
        for (let i = 0; i < patientList.length; i++) {
          let patient = patientList[i];
          patient.full_name = patient.fullname;
          patient.birthdate = moment(patient.birthdate, "DD/MM/YYYY");
          patient.phone = patient.phone_number;
          // patient.vaccine_location = patient.category;
          patient.id = patient.register_vaccine_new_id;
          if (patient.vaccine_date != null)
            patient.vaccine_date = moment(
              patient.vaccine_date,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD");
          for (let s = 0; s < patient.schedule_all.length; s++) {
            let schedule = patient.schedule_all[s];
            schedule.hour_start = schedule.timeslot_start_time;
            schedule.hour_end = schedule.timeslot_end_time;
          }
          patient.status_timeslot = patient.status;
          patient.status = patient.status_screening;
          if (patient.status === "" || patient.status === null)
            patient.status = "PENDING";
          patient.program_name = patient.type_vaccine;
          patient.vaccine_no = patient.status_vaccine;
        }
        console.log("RESPONSE", response);
        resolve(patientList);
      });
  }).catch((error) => {
    console.log("error", error);
    if (error.response.status == 401) {
      refreshToken(email);
    } else {
      alert(
        "Gagal mendapatkan data, Pastikan koneksi internet anda berjalan dengan baik"
      );
    }
  });
};

export const getVaccineLatestSchedule = async (vaccine) => {
  if (getVaccineSchedule(vaccine, "KETIGA") != null)
    return getVaccineSchedule(vaccine, "KETIGA");
  if (getVaccineSchedule(vaccine, "KEDUA") != null)
    return getVaccineSchedule(vaccine, "KEDUA");
  if (getVaccineSchedule(vaccine, "PERTAMA") != null)
    return getVaccineSchedule(vaccine, "PERTAMA");
  return null;
};

export const getVaccineSchedule = (vaccine, vaccineNo) => {
  if (vaccine != undefined) {
    if (vaccine.schedule_all.length === 0) {
      return null;
    } else {
      for (let i = 0; i < vaccine.schedule_all.length; i++) {
        let item = vaccine.schedule_all[i];
        if (item.status_vaccine === vaccineNo) return item;
      }
    }
  }
};

export const getStatus = (item) => {
  if (item.schedule_all.length !== 0) {
    if (item.schedule_all[0].status_schedule === "CANCELED") {
      return (
        <>
          <div className="isi-kuisioner-container-rejected">
            <div>Tidak Lolos Screening</div>
          </div>
        </>
      );
    }
  } else {
    if (item.status === "REJECTED") {
      return (
        <>
          <div className="text">Kuisioner Skrining Vaksin</div>
          <div className="isi-kuisioner-container-rejected">
            <div>Tidak Lolos Screening</div>
          </div>
        </>
      );
    } else if (item.status === "UPDATED") {
      return (
        <>
          <div className="text">Kuisioner Skrining Vaksin</div>
          <div className="isi-kuisioner-container-updated">
            <div>Isi Ulang Skrining</div>
          </div>
        </>
      );
    } else if (item.status === "ACCEPTED") {
      return (
        <>
          <div className="text">Kuisioner Skrining Vaksin</div>
          <div className="isi-kuisioner-container-accepted">
            <div>Lolos Skrining</div>
          </div>
        </>
      );
    } else if (item.status === "PENDING") {
      return (
        <>
          <div className="text">Kuisioner Skrining Vaksin</div>
          <div className="isi-kuisioner-container-pending">
            <div className="left">Isi Kuisioner Skrining</div>
            <div className="right">
              <img src={`${Config.BASE_URL}/img/arrow-right.png`} />
            </div>
          </div>
        </>
      );
    }
  }
};

export const refreshToken = async (email) => {
  let refresh = reactLocalStorage.getObject("refresh_token");
  let responseRefreshToken = axios.post(
    `${Config.API_URL_AUTH}/user/auth/refresh-token`,
    {
      refresh_token: refresh,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  responseRefreshToken.then((response) => {
    console.log("response", response);
    if (response.status == 200) {
      let access_user = {
        access_token: response.data.data.access_token,
        username: email,
        username_type: "EMAIL",
      };
      reactLocalStorage.setObject(
        "refresh_token",
        response.data.data.refresh_token
      );
      reactLocalStorage.setObject("access_user", access_user);
      window.location.reload();
    }
  });
};
