/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import validator from "validator";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { reactLocalStorage } from "reactjs-localstorage";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import * as Config from "./../config";
import * as ga from "../lib/ga";
import "react-datepicker/dist/react-datepicker.css";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.switchAuth = this.switchAuth.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkOTP = this.checkOTP.bind(this);
    this.checkEmailForgot = this.checkEmailForgot.bind(this);
    this.checkOTPForgot = this.checkOTPForgot.bind(this);
    this.forgotPasswordUpdate = this.forgotPasswordUpdate.bind(this);
    this.setBirthdate = this.setBirthdate.bind(this);
    this.getPasswordValidity = this.getPasswordValidity.bind(this);
    this.getConfirmPasswordValidity =
      this.getConfirmPasswordValidity.bind(this);
    this.state = {
      countryList: [],
      isLoading: false,
      menu: false,
      user: process.browser ? reactLocalStorage.getObject("user", null) : null,
      userAccess: process.browser
        ? reactLocalStorage.getObject("access_user", null)
        : null,
      authType: {
        list: ["LOGIN", "REGISTER_EMAIL", "REGISTER_OTP", "REGISTER_PROFILE"],
        val: "LOGIN",
      },
      afterLogin: "RELOAD",
      topicList: [],
      topicSelected: [],
      isSubscriber: false,
      isSubscribeDone: false,
      form: {
        // login
        loginEmail: "",
        loginPassword: "",
        loginPasswordVisibility: false,

        // check mail
        checkMailEmail: "",

        // register OTP
        registerKodeOTP: "",

        // register profile
        email: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        ktpNo: "",
        genderList: ["Laki - Laki", "Perempuan"],
        gender: "",
        country_id: "",
        birthDate: new Date(),
        birthPlace: "",
        registerPassword: "",
        registerPasswordVisibility: false,
        registerConfirmPassword: "",
        registerConfirmPasswordVisibility: false,

        // forgot password check mail
        forgotPassEmail: "",
        forgotKodeOTP: "",
        forgotNewPassword: "",
        forgotNewPasswordVisibility: "",
        forgotNewPasswordConfirm: "",
        forgotNewPasswordConfirmVisibility: "",
        forgotPasswordToken: "",
      },
    };
  }

  componentDidMount() {
    if (this.props.login) document.getElementById("register-vaccine").click();
    this.setState({
      userSave: JSON.parse(localStorage.getItem("user")),
    });
  }

  getPasswordValidity(password) {
    let result = [];
    // if(password === '') return '';
    if (!/\d/.test(password))
      result.push(
        <div key="1" className="text-danger">
          password harus mengandung angka
        </div>
      );
    if (!/[A-Z]/.test(password))
      result.push(
        <div key="2" className="text-danger">
          password harus mengandung huruf besar
        </div>
      );
    if (!/[a-z]/.test(password))
      result.push(
        <div key="3" className="text-danger">
          password harus mengandung huruf kecil
        </div>
      );
    if (password.length < 8)
      result.push(
        <div key="4" className="text-danger">
          password minimal 8 karakter
        </div>
      );
    return <div key="5">{result}</div>;
  }

  getConfirmPasswordValidity(password1, password2) {
    let result = [];
    // if(password === '') return '';
    if (password1 != password2)
      result.push(
        <div key="1" className="text-danger">
          password tidak sesuai
        </div>
      );
    if (password1 == "")
      result.push(
        <div key="2" className="text-danger">
          password tidak sesuai
        </div>
      );
    return <div key="3">{result}</div>;
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  }

  setBirthdate(date) {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        birthDate: moment(date).toDate(),
      },
    }));
  }

  switchAuth(type) {
    if (type === "REGISTER_PROFILE") {
      this.getCountryList();
    }
    this.setState((prevState) => ({
      authType: {
        ...prevState.authType,
        val: type,
      },
    }));
  }

  async getCountryList() {
    let responseCountry = await axios.get(
      `${Config.API_URL_AUTH}/data/countries?_limit=1000`
    );
    let data = responseCountry.data;
    if (data.status) {
      let countryList = data.data;
      this.setState({ countryList: countryList });
    }
  }

  //LEGACY
  async login() {
    if (this.state.isLoading) return;
    if (validator.isEmpty(this.state.form.loginEmail))
      return Swal.fire("Email wajib diisi");
    if (!validator.isEmail(this.state.form.loginEmail))
      return Swal.fire("Email tidak valid");
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
        this.state.form.loginPassword
      )
    )
      return Swal.fire(
        "Format Password Salah (Harus mengandung huruf besar, huruf kecil, dan angka. Password minimal 8 karakter)"
      );
    this.setState({ isLoading: true });
    let formData = {};
    formData.email = this.state.form.loginEmail;
    formData.password = this.state.form.loginPassword;
    try {
      let response = await axios.post(
        `${Config.API_URL_AUTH}/user/auth/login`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      let data = response.data;

      if (data.status) {
        reactLocalStorage.setObject("access_user", data.data);
        setCookies("access_user", JSON.stringify(data.data));
        reactLocalStorage.setObject("refresh_token", data.data.refresh_token);
        setCookies("refresh_token", JSON.stringify(data.data.refresh_token));
        let responseMe = await axios.get(
          `${Config.API_URL_AUTH}/user/profile/me`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + data.data.access_token, //the token is a variable which holds the token
            },
          }
        );
        let dataMe = responseMe.data;
        await Swal.fire("Success", data.statusMessage, "success");

        reactLocalStorage.setObject("user", dataMe.data);
        setCookies("user", JSON.stringify(dataMe.data));

        // check login by article comment guest section
        let gotoArticle = document.getElementsByClassName("goto-article");
        if (gotoArticle.length > 0) {
          window.location.reload();
        } else {
          if (this.state.afterLogin === "VACCINE") {
            window.location.href = `${Config.BASE_URL}/vaccine?email=${dataMe.data.email}`;
          } else {
            window.location.reload();
          }
        }
      } else {
        await Swal.fire(response.message);
      }
    } catch (error) {
      let data = error.response.data;
      let message = "Terjadi sebuah kesalahan pada system";
      if (data.message !== null) message = data.message;
      if (error.response.status === 404) {
        if (data.message === "User not registered")
          message = "Email belum terdaftar";
      } else if (error.response.status === 400) {
        if (data.message === "Invalid Username or Password")
          message = "Email atau password salah";
      }
      await Swal.fire(message);
    }
    this.setState({ isLoading: false });
  }

  logout() {
    reactLocalStorage.clear();
    removeCookies("user");
    removeCookies("access_user");
    window.location.reload();
  }

  async checkEmail() {
    if (this.state.isLoading) return;
    if (validator.isEmpty(this.state.form.checkMailEmail))
      return Swal.fire("Email wajib diisi");
    if (!validator.isEmail(this.state.form.checkMailEmail))
      return Swal.fire("Email tidak valid");
    this.setState({ isLoading: true });
    let formData = {};
    formData.email = this.state.form.checkMailEmail;
    try {
      let response = await axios.post(
        `${Config.API_URL}/register/check_mail`,
        formData
      );
      let data = response.data;
      if (data.statusCode === 200) {
        await Swal.fire("Success", data.statusMessage, "success");
        // skip OTP
        // this.switchAuth('REGISTER_OTP');
        this.switchAuth("REGISTER_PROFILE");
      } else {
        await Swal.fire("Email tidak tersedia");
      }
    } catch (error) {
      await Swal.fire("Unable to connect to server");
    }
    this.setState({ isLoading: false });
  }

  async checkEmailForgot() {
    if (this.state.isLoading) return;
    if (validator.isEmpty(this.state.form.forgotPassEmail))
      return Swal.fire("Email wajib diisi");
    if (!validator.isEmail(this.state.form.forgotPassEmail))
      return Swal.fire("Email tidak valid");
    this.setState({ isLoading: true });
    let formData = {};
    formData.email = this.state.form.forgotPassEmail;
    try {
      let response = await axios.post(
        `${Config.API_URL_AUTH}/user/password/forgot`,
        formData
      );
      let data = response.data;
      if (data.status) {
        await Swal.fire("Success", data.statusMessage, "success");
        this.switchAuth("FORGOT_OTP");
      } else {
        await Swal.fire("Email tidak tersedia");
      }
    } catch (error) {
      await Swal.fire("Unable to connect to server");
    }
    this.setState({ isLoading: false });
  }

  async checkOTP() {
    if (this.state.isLoading) return;
    if (validator.isEmpty(this.state.form.registerKodeOTP))
      return Swal.fire("Kode OTP wajib diisi");
    this.setState({ isLoading: true });
    let formData = {};
    formData.email = this.state.form.email;
    formData.otp = this.state.form.registerKodeOTP;
    try {
      let response = await axios.post(
        `${Config.API_URL_AUTH}/user/email/verify`,
        formData
      );
      let data = response.data;
      if (data.status) {
        await Swal.fire("Success", data.message, "success");
        this.switchAuth("LOGIN");
      } else {
        await Swal.fire("Kode OTP tidak sesuai");
      }
    } catch (error) {
      await Swal.fire("Kode OTP Salah");
    }
    this.setState({ isLoading: false });
  }

  async checkOTPForgot() {
    if (this.state.isLoading) return;
    if (validator.isEmpty(this.state.form.forgotKodeOTP))
      return Swal.fire("Kode OTP wajib diisi");
    this.setState({ isLoading: true });
    let formData = {};
    formData.email = this.state.form.forgotPassEmail;
    formData.otp = this.state.form.forgotKodeOTP;
    try {
      let response = await axios.post(
        `${Config.API_URL_AUTH}/user/password/verify`,
        formData
      );
      let data = response.data;
      if (data.status) {
        this.setState({ forgotPasswordToken: data.data.access_token });
        await Swal.fire("Success", data.statusMessage, "success");
        this.switchAuth("FORGOT_UPDATE");
      } else {
        await Swal.fire("Kode OTP tidak sesuai");
      }
    } catch (error) {
      await Swal.fire("Unable to connect to server");
    }
    this.setState({ isLoading: false });
  }

  async forgotPasswordUpdate() {
    if (this.state.isLoading) return;
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
        this.state.form.forgotNewPassword
      )
    )
      return Swal.fire(
        "Format Password Salah (Harus mengandung huruf besar, huruf kecil, dan angka. Password minimal 8 karakter)"
      );
    if (
      this.state.form.forgotNewPassword !==
      this.state.form.forgotNewPasswordConfirm
    )
      return Swal.fire("Konfirmasi password tidak sesuai");
    this.setState({ isLoading: true });
    let formData = {};
    formData.password = this.state.form.forgotNewPassword;
    formData.password_confirmation = this.state.form.forgotNewPasswordConfirm;
    try {
      let response = await axios.post(
        `${Config.API_URL_AUTH}/user/password/change`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + this.state.forgotPasswordToken, //the token is a variable which holds the token
          },
        }
      );
      let data = response.data;
      if (data.status) {
        await Swal.fire("Success", data.statusMessage, "success");
        window.location.reload();
      } else {
        await Swal.fire("Kode OTP tidak sesuai");
      }
    } catch (error) {
      await Swal.fire("Unable to connect to server");
    }
    this.setState({ isLoading: false });
  }

  async register() {
    if (this.state.isLoading) return;
    if (validator.isEmpty(this.state.form.email))
      return Swal.fire("Email wajib diisi");
    if (validator.isEmpty(this.state.form.firstName))
      return Swal.fire("Nama Depan wajib diisi");
    if (validator.isEmpty(this.state.form.lastName))
      return Swal.fire("Nama Belakang wajib diisi");
    if (!validator.isMobilePhone(this.state.form.phoneNo, ["id-ID"]))
      return Swal.fire("Nomor handphone tidak valid");
    //if(validator.isEmpty(this.state.form.ktpNo)) return Swal.fire('Nomor KTP wajib diisi');
    if (validator.isEmpty(this.state.form.birthPlace))
      return Swal.fire("Tempat Lahir wajin di isi");
    if (!validator.isEmail(this.state.form.email))
      return Swal.fire("Format Email tidak valid");
    //if(this.state.form.ktpNo.length !== 16) return Swal.fire('Nomor KTP harus 16 angka');
    if (this.state.form.gender === "")
      return Swal.fire("Jenis Kelamin wajib diisi");
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
        this.state.form.registerPassword
      )
    )
      return Swal.fire(
        "Format Password Salah (Harus mengandung huruf besar, huruf kecil, dan angka. Password minimal 8 karakter)"
      );
    if (
      this.state.form.registerPassword !==
      this.state.form.registerConfirmPassword
    )
      return Swal.fire("Konfirmasi password tidak sesuai");
    this.setState({ isLoading: true });

    let formData = {};
    formData.email = this.state.form.email;
    formData.password = this.state.form.registerPassword;
    formData.first_name = this.state.form.firstName;
    formData.last_name = this.state.form.lastName;
    //formData.cardId = this.state.form.ktpNo;
    formData.phone = this.state.form.phoneNo;
    formData.gender =
      this.state.form.gender === "Perempuan" ? "FEMALE" : "MALE";
    formData.birth_date = moment(this.state.form.birthDate).format(
      "YYYY-MM-DD"
    );
    formData.birth_place = this.state.form.birthPlace;
    formData.birth_country = this.state.form.country_id;
    try {
      let response = await axios.post(
        `${Config.API_URL_AUTH}/user/auth/register`,
        formData
      );
      let data = response.data;
      if (data.status) {
        let formDataSendMail = {};
        formDataSendMail.email = this.state.form.email;
        let responseMail = await axios.post(
          `${Config.API_URL_AUTH}/user/email/verification`,
          formDataSendMail
        );
        await Swal.fire(
          "Success",
          "Silahkan periksa periksa email anda untuk mendapatkan kode otp",
          "success"
        );
        this.switchAuth("REGISTER_OTP");
      } else {
        await Swal.fire("Email / password tidak sesuai");
      }
    } catch (error) {
      if (error.response !== undefined) {
        if (
          error.response.status !== undefined &&
          error.response.status === 400
        ) {
          await Swal.fire(
            error.response.data.message === "Email has been used"
              ? "Email sudah digunakan"
              : error.response.data.message
          );
        } else {
          await Swal.fire("Terjadi sebuah kesalahan pada system");
        }
      } else {
        await Swal.fire("Terjadi sebuah kesalahan pada system");
      }
    }
    this.setState({ isLoading: false });
  }

  getMobileOperatingSystem() {
    if (!process.browser) return "OTHERS";
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) return "ANDROID";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "IOS";
    return "OTHERS";
  }

  goToDevice() {
    const deviceType = this.getMobileOperatingSystem();

    if (deviceType === "ANDROID") {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Download Mobile Apps Android",
          event_category: "Homepage",
        },
      });
      window.open(Config.URL_MOBILE_APPS_ANDROID, "_ blank");
    } else if (deviceType === "IOS") {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Download Mobile Apps IOS",
          event_category: "Homepage",
        },
      });
      window.open(Config.URL_MOBILE_APPS_IOS, "_ blank");
    } else {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Banner Download Mobile Apps OTHERS",
          event_category: "Homepage",
        },
      });
      window.open(Config.URL_MOBILE_APPS_OTHERS, "_ blank");
    }
  }

  getFullname(user) {
    let name = user?.first_name;

    if (user?.last_name.trim() !== "") name += " " + user?.last_name;
    return name;
  }

  name() {
    const { user } = this.state;
    return user.first_name;
  }

  componentDidUpdate(prevState, propState) {
    if (prevState.user !== this.state.user) {
      this.topBar();
    }
  }

  topBar = () => {
    const { userSave } = this.state;
    console.log("userSave", userSave);
    if (userSave === null) {
      return (
        <li className="nav-item">
          <div className="profile-user-login dropdown clickable">
            <img
              data-toggle="dropdown"
              src={`${Config.BASE_URL}/img/topbar-login-button.png`}
              className="clickable"
              alt="image"
            />
            <div className="profile-menu-dropdown dropdown-menu">
              <div
                data-toggle="modal"
                onClick={() => {
                  this.setState({ afterLogin: "RELOAD" });
                  this.switchAuth("LOGIN");
                }}
                data-target="#auth-modal"
                className="profile-menu"
              >
                <div className="d-flex justify-content-between">
                  <div className="align-self-center">Masuk</div>
                  <div className="align-self-center">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </div>
              </div>
              <div
                data-toggle="modal"
                onClick={() => {
                  this.setState({ afterLogin: "RELOAD" });
                  this.switchAuth("REGISTER_PROFILE");
                }}
                data-target="#auth-modal"
                className="profile-menu"
              >
                Daftar
              </div>
            </div>
          </div>
        </li>
      );
    } else {
      // let name = this.state.userSave?.first_name;

      // if (userSave?.last_name.trim() !== "") name += " " + userSave?.last_name;

      return (
        <li className="nav-item align-self-center">
          <div className="profile-user-login dropdown clickable">
            <div
              data-toggle="dropdown"
              className="d-flex"
              style={{ minHeight: "93%" }}
            >
              <div className="icon align-self-center">
                <img
                  src={`${Config.BASE_URL}/img/user-white-icon.png`}
                  alt="icon-profile"
                />
              </div>
              <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
              <div className="username align-self-center">
                {this.getFullname(this.state.userSave).length > 12
                  ? this.getFullname(this.state.userSave).substr(0, 12) + "..."
                  : this.getFullname(this.state.userSave)}
              </div>
              <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
              <div className="align-self-center">
                <i className="fa fa-chevron-down text-white"></i>
              </div>
            </div>
            <div className="profile-menu-dropdown dropdown-menu">
              <div
                data-toggle="modal"
                data-target="#subscriber-modal"
                className="profile-menu"
              >
                <div className="d-flex justify-content-between">
                  <div className="align-self-center">Berlangganan</div>
                  <div className="align-self-center">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </div>
              </div>
              <div onClick={this.logout} className="profile-menu">
                Keluar
              </div>
            </div>
          </div>
        </li>
      );
    }
  };

  render() {
    const DatepickerInput = ({ ...props }) => (
      <input type="text" {...props} readOnly />
    );

    return (
      <div className="topbar">
        <nav className="navbar navbar-expand-md navbar-light fixed-top">
          <div className="container">
            <a href="/" className="navbar-brand">
              <div className="d-flex flex-row">
                <img
                  src={`/img/logo.png`}
                  alt="AlteaCare"
                  className="altea-logo"
                />
                <div
                  className="align-self-center d-flex"
                  style={{ height: "32px" }}
                >
                  <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                  <img
                    src={`/img/mitra-keluarga-logo.png`}
                    className="mitra-logo"
                    alt="Mitra Keluarga"
                  />
                  <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                  <img
                    src={`/img/Logo-Baru-Kementerian-Kesehatan.png`}
                    className="menkes-logo"
                    alt="Kementerian Kesehatan"
                    style={{ maxHeight: "32px" }}
                  />
                </div>
              </div>
            </a>

            <button
              onClick={this.toggleMenu}
              className="navbar-toggler"
              type="button"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={
                "collapse navbar-collapse " + (this.state.menu ? "show" : "")
              }
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {this.state.user === null && (
                    <span
                      id="register-vaccine"
                      className="nav-link clickable"
                      data-toggle="modal"
                      onClick={() => {
                        this.setState({ afterLogin: "VACCINE" });
                        this.switchAuth("LOGIN");
                      }}
                      data-target="#auth-modal"
                    >
                      Vaksin COVID-19
                    </span>
                  )}
                  {this.state.user !== null && (
                    <a
                      href={`/vaccine?email=${this.state.user.email}`}
                      id="register-vaccine"
                      className="nav-link"
                    >
                      Vaksin COVID-19
                    </a>
                  )}
                </li>

                <li className="nav-item">
                  <a href={`/#about-us`} className="nav-link">
                    Tentang Kami
                  </a>
                </li>

                <li className="nav-item">
                  <a href={`/#contact-us`} className="nav-link">
                    Kontak Kami
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => this.goToDevice()}
                    className="nav-link download-link nowrap"
                    href="#"
                  >
                    Download App
                  </a>
                </li>

                {this.topBar()}
              </ul>
            </div>
          </div>
        </nav>
        <div className="modal fade" id="auth-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                {this.state.authType.val === "LOGIN" && (
                  <div className="content">
                    <div className="subheader text-center">
                      Silahkan Login terlebih dahulu
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="email"
                          name="loginEmail"
                          value={this.state.form.loginEmail}
                          onChange={this.handleFormChange}
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <div className="form-password">
                          <input
                            type={
                              this.state.form.loginPasswordVisibility
                                ? "text"
                                : "password"
                            }
                            name="loginPassword"
                            value={this.state.form.loginPassword}
                            onChange={this.handleFormChange}
                            placeholder="Password"
                          />
                          <div
                            onClick={() => {
                              this.setState((prevState) => ({
                                form: {
                                  ...prevState.form,
                                  loginPasswordVisibility:
                                    !this.state.form.loginPasswordVisibility,
                                },
                              }));
                            }}
                            className="eye-icon clickable"
                          >
                            <i
                              className={`fa ${
                                this.state.form.loginPasswordVisibility
                                  ? "fa-eye-slash"
                                  : "fa-eye"
                              }`}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div
                          onClick={() => this.switchAuth("FORGOT_EMAIL")}
                          className="forgot-password clickable"
                        >
                          Lupa Password ?
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.login}
                          type="button"
                          className="submit"
                        >
                          Login
                        </button>
                      </div>

                      <div
                        onClick={() => this.switchAuth("REGISTER_PROFILE")}
                        className="no-account clickable"
                      >
                        Belum Punya Akun ? Daftar
                      </div>
                    </div>
                  </div>
                )}
                {this.state.authType.val === "REGISTER_EMAIL" && (
                  <div className="content">
                    <div className="subheader text-center">
                      Periksa Ketersediaan Email
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="email"
                          name="checkMailEmail"
                          value={this.state.form.checkMailEmail}
                          onChange={this.handleFormChange}
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.checkEmail}
                          type="button"
                          className="submit"
                        >
                          SELANJUTNYA
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.authType.val === "REGISTER_OTP" && (
                  <div className="content">
                    <div className="subheader text-center">
                      Masukkan kode otp yang telah dikirim ke Email anda
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="text"
                          name="registerKodeOTP"
                          value={this.state.form.registerKodeOTP}
                          onChange={this.handleFormChange}
                          placeholder="Kode OTP"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.checkOTP}
                          type="button"
                          className="submit"
                        >
                          SELANJUTNYA
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.authType.val === "REGISTER_PROFILE" && (
                  <div className="content">
                    <div className="subheader">
                      Lengkapi data diri kamu <br />
                      <small className="text-danger">
                        <em>(Semua data wajib di isi)</em>
                      </small>
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <label>
                          <strong>Nama Depan</strong>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={this.state.form.firstName}
                          onChange={this.handleFormChange}
                          placeholder="Nama Depan"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <strong>Nama Belakang</strong>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={this.state.form.lastName}
                          onChange={this.handleFormChange}
                          placeholder="Nama Belakang"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>Nomor HP</strong>
                        </label>
                        <input
                          type="text"
                          name="phoneNo"
                          value={this.state.form.phoneNo}
                          onChange={this.handleFormChange}
                          placeholder="No. HP (Aktif WhatsApp)"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>Jenis Kelamin</strong>
                        </label>
                        <select
                          name="gender"
                          value={this.state.form.gender}
                          onChange={this.handleFormChange}
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          {this.state.form.genderList.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>Kewarganegaraan</strong>
                        </label>
                        <select
                          name="country_id"
                          value={this.state.form.country_id}
                          onChange={this.handleFormChange}
                        >
                          <option value="">Pilih Negara</option>
                          {this.state.countryList.map((item, index) => (
                            <option key={index} value={item.country_id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>Tanggal Lahir</strong>
                        </label>
                        <DatePicker
                          withPortal
                          customInput={<DatepickerInput />}
                          dateFormat="dd-MM-yyyy"
                          onFocus={(e) => (e.target.readOnly = true)}
                          onChangeRaw={(e) => e.preventDefault()}
                          onChange={(date) => this.setBirthdate(date)}
                          selected={this.state.form.birthDate}
                          showYearDropdown={true}
                          dropdownMode={"select"}
                          maxDate={moment().toDate()}
                          placeholderText="Tanggal Lahir"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <strong>Tempat Lahir</strong>
                        </label>
                        <input
                          type="text"
                          name="birthPlace"
                          value={this.state.form.birthPlace}
                          onChange={this.handleFormChange}
                          placeholder="Tempat Lahir"
                        />
                      </div>
                      <div style={{ minHeight: "40px" }}></div>

                      <div className="form-group">
                        <label>
                          <strong>E-mail</strong>
                        </label>
                        <div className="form-password">
                          <input
                            type={"email"}
                            name="email"
                            value={this.state.form.email}
                            onChange={this.handleFormChange}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <strong>Password</strong>
                        </label>
                        <div className="form-password">
                          <input
                            type={
                              this.state.form.registerPasswordVisibility
                                ? "text"
                                : "password"
                            }
                            name="registerPassword"
                            value={this.state.form.registerPassword}
                            onChange={this.handleFormChange}
                            placeholder="Password"
                          />
                          <div
                            onClick={() => {
                              this.setState((prevState) => ({
                                form: {
                                  ...prevState.form,
                                  registerPasswordVisibility:
                                    !this.state.form.registerPasswordVisibility,
                                },
                              }));
                            }}
                            className="eye-icon clickable"
                          >
                            <i
                              className={`fa ${
                                this.state.form.registerPasswordVisibility
                                  ? "fa-eye-slash"
                                  : "fa-eye"
                              }`}
                            ></i>
                          </div>
                        </div>
                        <div>
                          <small>
                            <em>
                              {this.getPasswordValidity(
                                this.state.form.registerPassword
                              )}
                            </em>
                          </small>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <strong>Konfirmasi Password</strong>
                        </label>
                        <div className="form-password">
                          <input
                            type={
                              this.state.form.registerConfirmPasswordVisibility
                                ? "text"
                                : "password"
                            }
                            name="registerConfirmPassword"
                            value={this.state.form.registerConfirmPassword}
                            onChange={this.handleFormChange}
                            placeholder="Konfirmasi Password"
                          />
                          <div
                            onClick={() => {
                              this.setState((prevState) => ({
                                form: {
                                  ...prevState.form,
                                  registerConfirmPasswordVisibility:
                                    !this.state.form
                                      .registerConfirmPasswordVisibility,
                                },
                              }));
                            }}
                            className="eye-icon clickable"
                          >
                            <i
                              className={`fa ${
                                this.state.form
                                  .registerConfirmPasswordVisibility
                                  ? "fa-eye-slash"
                                  : "fa-eye"
                              }`}
                            ></i>
                          </div>
                        </div>
                        <div>
                          <small>
                            <em>
                              {this.getConfirmPasswordValidity(
                                this.state.form.registerPassword,
                                this.state.form.registerConfirmPassword
                              )}
                            </em>
                          </small>
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.register}
                          type="button"
                          className="submit"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.authType.val === "FORGOT_EMAIL" && (
                  <div className="content">
                    <div className="subheader text-center">
                      Periksa Ketersediaan Email
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="email"
                          name="forgotPassEmail"
                          value={this.state.form.forgotPassEmail}
                          onChange={this.handleFormChange}
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.checkEmailForgot}
                          type="button"
                          className="submit"
                        >
                          SELANJUTNYA
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.authType.val === "FORGOT_OTP" && (
                  <div className="content">
                    <div className="subheader text-center">
                      Masukkan kode otp yang telah dikirim ke Email anda
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="text"
                          name="forgotKodeOTP"
                          value={this.state.form.forgotKodeOTP}
                          onChange={this.handleFormChange}
                          placeholder="Kode OTP"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.checkOTPForgot}
                          type="button"
                          className="submit"
                        >
                          SELANJUTNYA
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.authType.val === "FORGOT_UPDATE" && (
                  <div className="content">
                    <div className="subheader text-center">
                      Masukkan password anda yang baru
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <div className="form-password">
                          <input
                            type={
                              this.state.form.forgotNewPasswordVisibility
                                ? "text"
                                : "password"
                            }
                            name="forgotNewPassword"
                            value={this.state.form.forgotNewPassword}
                            onChange={this.handleFormChange}
                            placeholder="Password"
                          />
                          <div
                            onClick={() => {
                              this.setState((prevState) => ({
                                form: {
                                  ...prevState.form,
                                  forgotNewPasswordVisibility:
                                    !this.state.form
                                      .forgotNewPasswordVisibility,
                                },
                              }));
                            }}
                            className="eye-icon clickable"
                          >
                            <i
                              className={`fa ${
                                this.state.form.forgotNewPasswordVisibility
                                  ? "fa-eye-slash"
                                  : "fa-eye"
                              }`}
                            ></i>
                          </div>
                        </div>
                        <div>
                          <small>
                            <em>
                              {this.getPasswordValidity(
                                this.state.form.forgotNewPassword
                              )}
                            </em>
                          </small>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-password">
                          <input
                            type={
                              this.state.form.forgotNewPasswordConfirmVisibility
                                ? "text"
                                : "password"
                            }
                            name="forgotNewPasswordConfirm"
                            value={this.state.form.forgotNewPasswordConfirm}
                            onChange={this.handleFormChange}
                            placeholder="Konfirmasi Password"
                          />
                          <div
                            onClick={() => {
                              this.setState((prevState) => ({
                                form: {
                                  ...prevState.form,
                                  forgotNewPasswordConfirmVisibility:
                                    !this.state.form
                                      .forgotNewPasswordConfirmVisibility,
                                },
                              }));
                            }}
                            className="eye-icon clickable"
                          >
                            <i
                              className={`fa ${
                                this.state.form
                                  .forgotNewPasswordConfirmVisibility
                                  ? "fa-eye-slash"
                                  : "fa-eye"
                              }`}
                            ></i>
                          </div>
                        </div>
                        <div>
                          <small>
                            <em>
                              {this.getConfirmPasswordValidity(
                                this.state.form.forgotNewPassword,
                                this.state.form.forgotNewPasswordConfirm
                              )}
                            </em>
                          </small>
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.forgotPasswordUpdate}
                          type="button"
                          className="submit"
                        >
                          SELANJUTNYA
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.isLoading && (
                  <div className="spinner-border text-info"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
