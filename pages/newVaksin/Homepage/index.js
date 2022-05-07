import React, { Component } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Header from "../../../components/header";
import * as Config from "../../../config";
import {
  getStatus,
  getVaccineLatestSchedule,
  getVaccineSchedule,
  patientList,
} from "../../../components/newVaksin/Homepage/hooks";
import moment from "moment";
import { getMobileOperatingSystem } from "../../../lib/utils";
import Link from "next/link";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_user: "",
      refresh_token: "",
      email: "",
      device: "OTHERS",
      patientList: [],
    };
  }

  componentDidMount = async () => {
    await this.typeDevice();
    await this.getFirstCredentials();
    await this.fetchPatientList();
  };

  typeDevice = async () => {
    this.setState({
      device: getMobileOperatingSystem(),
    });
  };

  getFirstCredentials = async () => {
    if (typeof window !== "undefined") {
      this.setState({
        access_user: reactLocalStorage.getObject("access_user"),
        refresh_token: reactLocalStorage.getObject("refresh_token"),
        email: new URLSearchParams(window.location.search).get("email"),
        patientList: [],
      });
    }
  };

  fetchPatientList = async () => {
    const { email, access_user } = this.state;
    await patientList(email, access_user.access_token).then((response) => {
      this.setState({
        patientList: response,
      });
    });
  };

  getStatuss = (item) => {
    // item.schedule_all.length !== 0 && (
    //   <>
    //     {item.schedule_all[0].status_schedule === "CANCELED" && (
    //       <div className="red-warning-notice">
    //         Pendaftaran Anda telah dibatalkan
    //       </div>
    //     )}
    //   </>
    // );
  };

  render() {
    console.log(this.state);
    const { device } = this.state;
    return (
      <div className="main">
        <div className="vaccine-2">
          <Header></Header>
          <div className="main-page">
            <div className="topbar">
              <div style={{ minWidth: "16px" }}></div>
              <div className="arrow clickable">
                <img
                  src={`${Config.BASE_URL}/img/back-arrow-icon.png`}
                  alt="img"
                />
              </div>
              <div className="text">Skrining Vaksin</div>
              <div style={{ minWidth: "40px" }}></div>
            </div>

            {/* Corousel */}
            <div
              className={` ${
                device === "OTHERS" ? "container-new" : "container-mobile"
              }`}
            >
              <p className="blue-text">Daftar Pasien Vaksinasi COVID-19</p>
              <div
                id="main-carousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="false"
              >
                <div className="overflow">
                  <ul className="carousel-indicators">
                    <li
                      data-target="#main-carousel"
                      data-slide-to={0}
                      className={`${
                        this.state.patientList?.length >= 0 ? `active` : ``
                      }`}
                    ></li>
                    {this.state.patientList !== 0
                      ? this.state.patientList.map((item, index) => (
                          <li
                            key={index + 1}
                            data-target="#main-carousel"
                            data-slide-to={index + 1}
                          ></li>
                        ))
                      : ""}
                  </ul>
                </div>
                <div className="carousel-inner">
                  <div
                    className={`carousel-item ${
                      this.state.patientList?.length >= 0 ? `active` : ``
                    }`}
                  >
                    <div className="homepage-daftar-pasien">
                      <div className="primary">
                        <div className="add-new-patient clickable">
                          <div className="d-flex justify-content-center">
                            <div className="">
                              <img
                                src={`${Config.BASE_URL}/img/main-page-vaccine.png`}
                              />
                            </div>
                          </div>
                          <div
                            className="text align-self-center"
                            style={{
                              color: "#2C528B",
                              fontSize: 12,
                              marginTop: 12,
                            }}
                          >
                            Daftar Vaksinasi COVID-19 <br /> dengan aman dan
                            nyaman di AlteaCare
                          </div>
                          <Link
                            href={{
                              pathname: "/newVaksin/RegisterJalurVaksinasi",
                              query: { email: this.state.email },
                            }}
                          >
                            <a className="text align-self-center button-primary">
                              <div>Yuk Daftar Vaksin</div>
                            </a>
                          </Link>
                        </div>
                      </div>
                      {this.state.patientList?.length > 0 && (
                        <div className="shadow"></div>
                      )}
                    </div>
                  </div>

                  {this.state.patientList.length !== 0
                    ? this.state.patientList.map((item, index) => (
                        <div key={index + 1} className={`carousel-item`}>
                          <div className="data-pasien">
                            <div className="data-pasien-saat-ini">
                              <div className="primary-font">
                                {item.register_vaccine_new_id} -{" "}
                                {item.program_name || "-"}
                              </div>
                              <div className="primary-font">
                                {item.hospital_name || "-"}
                              </div>
                              <div style={{ minHeight: "4px" }}></div>
                              <div className="primary-font">
                                {item.full_name}
                              </div>
                              <div className="secondary-font">
                                KTP {item.card_id_number}
                              </div>
                              <div className="secondary-font">
                                {moment(item.birthdate).format("DD MMMM YYYY")}{" "}
                                (
                                {moment().diff(
                                  moment(item.birthdate).format("YYYY-MM-DD"),
                                  "years"
                                )}{" "}
                                Tahun)
                              </div>
                              <div className="secondary-font">
                                {item.gender}
                              </div>
                              <div className="secondary-font">{item.phone}</div>
                              <div className="secondary-font">{item.email}</div>
                              <div style={{ minHeight: "4px" }}></div>

                              {getStatus(item)}

                              {/* {(getVaccineLatestSchedule(item) == null ||
                                getVaccineLatestSchedule(item)
                                  .status_schedule != "CANCELED") && (
                                <div>
                                  <div className="text">
                                    Kuisioner Skrining Vaksin
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  {item.status === "PENDING" && (
                                    <div
                                      onClick={() => {
                                        this.setState(
                                          {
                                            patientVal: item,
                                          },
                                          () =>
                                            this.goPage(
                                              "SCREENING WELCOME PAGE"
                                            )
                                        );
                                      }}
                                      className="white-button clickable"
                                    >
                                      <div className="left">
                                        Isi Kuisioner Skrining
                                      </div>
                                      <div className="right">
                                        <img
                                          src={`${Config.BASE_URL}/img/arrow-right.png`}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {item.status === "ACCEPTED" && (
                                    <div className="green-notice">
                                      Lolos Skrining
                                    </div>
                                  )}
                                  {item.status === "UPDATED" && (
                                    <div className="green-notice">
                                      Isi Ulang Skrining
                                    </div>
                                  )}
                                  {item.status === "REJECTED" && (
                                    <div className="red-warning-notice">
                                      Tidak Lolos Skrining
                                    </div>
                                  )}
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="text">
                                    {getVaccineSchedule(item, "KEDUA") != null
                                      ? "Vaksin Kedua"
                                      : getVaccineSchedule(item, "KETIGA") !=
                                        null
                                      ? "Vaksin Ketiga"
                                      : getVaccineSchedule(item, "PERTAMA") !=
                                        null
                                      ? "Vaksin Pertama"
                                      : item.vaccine_no == "KEDUA"
                                      ? "Vaksin Kedua"
                                      : "Vaksin Pertama"}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                </div>
                              )} */}
                              <button className="btn draw-border">
                                Lihat Detail
                              </button>
                            </div>
                            {this.state.patientList?.length > 0 && (
                              <div className="data-pasien-shadow"></div>
                            )}
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
