import React, { Component } from "react";
import * as Config from "../../config";
import { loginSubmit } from "./API/Auth/loginSubmit";
import { reactLocalStorage } from "reactjs-localstorage";

class Topmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authType: "",
      countryList: "",
      form: {
        loginEmail: "",
        loginPassword: "",
      },
      isLoading: false,
      user: process.browser ? reactLocalStorage.getObject("user", "") : "",
      access_user: process.browser
        ? reactLocalStorage.getObject("access_user", "")
        : "",
      refresh_token: process.browser
        ? reactLocalStorage.getObject("refresh_token", "")
        : "",
    };
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

  getCountryList = async () => {
    let responseCountry = await axios.get(
      `${Config.API_URL_AUTH}/data/countries?_limit=1000`
    );
    let data = responseCountry.data;
    if (data.status) {
      let countryList = data.data;
      this.setState({ countryList: countryList });
    }
  };

  login = async () => {
    await loginSubmit(
      this.state.form.loginEmail,
      this.state.form.loginPassword
    ).then((response) => {
      console.log("hasil", response);
    });
  };

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  }

  credentials = () => {
    if (this.state.access_user !== "") {
      return (
        <div className="navbar-text" style={{ marginLeft: 20 }}>
          <img src={`${Config.BASE_URL}/icon/profile.png`} alt="icon-profile" />
        </div>
      );
    } else {
      return (
        <div
          data-toggle="modal"
          data-target="#auth-modal"
          onClick={() => {
            this.switchAuth("LOGIN");
          }}
        >
          <div className="new-altea-login-button">Log In</div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#">
              <img
                src={`${Config.BASE_URL}/icon/logo.svg`}
                alt="icon-profile"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link new-altea-menu-item new-altea-menu-item-active"
                    href="#"
                  >
                    Beranda
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link new-altea-menu-item" href="#">
                    Dokter Spesialis
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link new-altea-menu-item" href="#">
                    Konsultasi Saya
                  </a>
                </li>
              </ul>
              {this.credentials()}
            </div>
          </nav>
        </div>

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
                          onChange={(e) => this.handleFormChange(e)}
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
                            onChange={(e) => this.handleFormChange(e)}
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
                      {/* <div className="form-group">
                        <div
                          onClick={() => this.switchAuth("FORGOT_EMAIL")}
                          className="forgot-password clickable"
                        >
                          Lupa Password ?
                        </div>
                      </div> */}
                      <div className="form-group">
                        <button
                          onClick={() => this.login()}
                          type="button"
                          className="submit"
                        >
                          Login
                        </button>
                      </div>

                      {/* <div
                        onClick={() => this.switchAuth("REGISTER_PROFILE")}
                        className="no-account clickable"
                      >
                        Belum Punya Akun ? Daftar
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {this.state.isLoading && (
          <div className="spinner-border text-info new-altea-loading"></div>
        )}
      </div>
    );
  }
}

export default Topmenu;
