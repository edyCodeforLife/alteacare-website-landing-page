/* eslint-disable @next/next/no-img-element */
import React from "react";
import validator from "validator";
import { reactLocalStorage } from "reactjs-localstorage";
import Swal from "sweetalert2";
import axios from "axios";
import * as Config from "./../config";

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      form: {
        email: "",
        name: "",
        message: "",
      },
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  }

  async submit() {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    if (validator.isEmpty(this.state.form.name))
      return Swal.fire("Failed", "Name is required", "warning");
    if (!validator.isEmail(this.state.form.email))
      return Swal.fire("Failed", "Email is invalid", "warning");
    if (validator.isEmpty(this.state.form.message))
      return Swal.fire("Failed", "Message is required", "warning");
    let formData = {};
    formData.name = this.state.form.name;
    formData.email = this.state.form.email;
    formData.message = this.state.form.message;
    let response = await axios.post(
      `${Config.API_PUBLIC_URL}/contact-us`,
      formData
    );
    try {
      let data = response.data;
      if (data.statusCode === 200) {
        return Swal.fire("Success", data.statusMessage, "success");
      } else {
        return Swal.fire("Success", data.statusMessage, "error");
      }
    } catch (error) {
      return Swal.fire("Error", "Unable to connect to server", "error");
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div id="contact-us" className="contact-us">
        <div className="container">
          <div className="d-flex flex-md-row flex-column-reverse justify-content-between">
            <div className="left align-self-center">
              <h5>Kontak Kami</h5>
              <form>
                <div className="form-field">
                  <label>Nama</label>
                  <input
                    type="text"
                    name="name"
                    onChange={this.handleFormChange}
                    value={this.state.form.name}
                    placeholder="Masukkan nama kamu"
                  />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleFormChange}
                    value={this.state.form.email}
                    placeholder="Masukkan email kamu"
                  />
                </div>
                <div className="form-field">
                  <label>Pesan</label>
                  <textarea
                    name="message"
                    onChange={this.handleFormChange}
                    value={this.state.form.message}
                    cols="30"
                    rows="5"
                    placeholder="Masukkan pesan kamu"
                  ></textarea>
                </div>
                <div className="form-field">
                  <button
                    onClick={this.submit}
                    type="submit"
                    disabled={this.state.isLoading}
                  >
                    {this.state.isLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      ""
                    )}{" "}
                    <span>Kirim Pesan</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="middle"></div>
            <div className="right align-self-center">
              <div className="img">
                <img
                  src="img/contact-us-mail.png"
                  className="w-75"
                  alt="alteacare"
                />
              </div>
              <div className="contact">
                <div className="d-flex flex-column flex-md-row justify-content-center">
                  <div className="left-contact">
                    <div className="item">
                      <div className="label">Email</div>
                      <a href={`mailto:${Config.URL_EMAIL}}`}>
                        <div className="content">
                          <img src="img/mail-icon.png" alt="alteacare" />
                          <span>{Config.URL_EMAIL}</span>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <div className="label">Hotline WA AlteaCare</div>
                        <div className="content">
                          <img src="img/phone-icon.png" alt=""/>
                          <a href={`https://api.whatsapp.com/send?phone=${Config.URL_CONTACT1}`}><span>+62 811 1913 9245</span></a>
                        </div>
                    </div>
                  </div>
                  <div className="middle-contact"></div>
                  <div className="right-contact align-self-center">
                    <a href={Config.URL_INSTAGRAM}>
                      <img src="img/ig-icon.png" alt="altea instagram" />
                    </a>
                    <a href={Config.URL_FACEBOOK}>
                      <img src="img/fb-icon.png" alt="altea facebook" />
                    </a>
                    <a href={Config.URL_YOUTUBE}>
                      <img src="img/youtube-icon.png" alt="altea youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;