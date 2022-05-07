/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import axios from "axios";
import validator from "validator";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";
import * as Config from "./../config";

class SubscribeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: process.browser ? reactLocalStorage.getObject("user", null) : null,
      userAccess: process.browser
        ? reactLocalStorage.getObject("access_user", null)
        : null,
      topicList: [],
      topicSelected: [],
      isSubscriber: false,
      isSubscribeDone: false,
      form: {
        name: "",
        email: "",
        accept: false,
      },
    };

    this.fetchTopicList = this.fetchTopicList.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchTopicList().then(() => {
      if (this.state.user !== null) this.fetchSubscribeList();
    });
    if (this.state.user !== null) {
      let name = this.state.user.first_name;
      if (
        this.state.user.last_name != null &&
        this.state.user.last_name.trim() != ""
      )
        name += " " + this.state.user.last_name;
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          name: name,
          email: this.state.user.email,
        },
      }));
    }

    setInterval(() => {
      let modal = document.getElementById("subscriber-modal");
      if (modal != null) {
        let display = window
          .getComputedStyle(modal)
          .getPropertyValue("display");
        if (display === "none" && this.state.isSubscribeDone) {
          this.setState({ isSubscribeDone: false });
        }
      }
    }, 800);
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  }

  toggleTopic(topic) {
    let selectedTopic = this.state.topicSelected;
    if (this.state.topicSelected.includes(topic))
      selectedTopic.splice(selectedTopic.indexOf(topic), 1);
    else selectedTopic.push(topic);
    this.setState({ topicSelected: selectedTopic });
  }

  async fetchSubscribeList() {
    this.setState({ topicSelected: [] });
    let form = {};
    form.email = this.state.user.email;
    try {
      let response = await axios.post(
        `${Config.API_PUBLIC_URL}/check-subscriber`,
        form
      );

      let data = response.data;
      if (data.statusCode === 200) {
        let topics = data.data.topic;
        let topicSelected = topics.map((item) => item.id);
        let result = [];
        for (let i = 0; i < this.state.topicList.length; i++) {
          let item = this.state.topicList[i];
          if (topicSelected.includes(item.id)) {
            result.push(item);
          }
        }
        this.setState({ topicSelected: result, isSubscriber: true });
      } else {
        Swal.fire("Failed", data.message, "error");
      }
    } catch (error) {}
  }

  async fetchTopicList() {
    this.setState({ topicList: [] });
    let response = await axios.get(`${Config.API_PUBLIC_URL}/category`);

    try {
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState({ topicList: data.data.categories });
      } else {
        Swal.fire("Failed", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to connect to server", "error");
    }
  }

  allowSubmit() {
    if (this.state.topicSelected.length === 0) return false;
    if (this.state.form.name.trim() === "") return false;
    if (this.state.form.email.trim() === "") return false;
    if (!this.state.form.accept) return false;
    return true;
  }

  async subscribe() {
    if (this.state.isLoading) return;
    if (!this.state.form.accept)
      return Swal.fire("Syarat dan Ketentuan wajib dicetik");
    if (this.state.form.name === "") return Swal.fire("Nama wajib diisi");
    if (this.state.form.email === "") return Swal.fire("Email wajib diisi");
    if (!validator.isEmail(this.state.form.email))
      return Swal.fire("Email tidak valid");
    this.setState({ isLoading: true });
    try {
      let formData = {};
      if (this.state.user === null) {
        formData.name = this.state.form.name;
        formData.email = this.state.form.email;
      }
      formData.list_topic_id = this.state.topicSelected.map((item) => item.id);
      let response;
      if (this.state.user === null)
        response = await axios.post(
          `${Config.API_PUBLIC_URL}/subscriber-non-login`,
          formData
        );
      else if (this.state.isSubscriber)
        response = await axios.put(
          `${Config.API_PUBLIC_URL}/subscriber`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + this.state.userAccess.access_token,
            },
          }
        );
      else
        response = await axios.post(
          `${Config.API_PUBLIC_URL}/subscriber`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + this.state.userAccess.access_token,
            },
          }
        );
      let data = response.data;
      if (data.statusCode === 200 || data.statusCode === 201) {
        this.setState({ isSubscribeDone: true });
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="modal fade" id="subscriber-modal">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              {!this.state.isSubscribeDone && (
                <div className="d-flex flex-column flex-md-row h-100">
                  <div className="select-topic">
                    <div className="title">Pilih Topik Kesehatan</div>
                    <div className="selection-list">
                      {this.state.topicList.map((item, index) => (
                        <div
                          key={item.id}
                          onClick={() => this.toggleTopic(item)}
                          className={`topic-item ${
                            this.state.topicSelected.includes(item)
                              ? "active"
                              : ""
                          } d-flex clickable`}
                        >
                          <div className="checkbox align-self-center">
                            <i className="fa fa-check"></i>
                          </div>
                          <div
                            style={{
                              minHeight: "10px",
                              minWidth: "10px",
                            }}
                          ></div>
                          <div className="topic-name">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="subscribe-topic">
                    <div className="subscribe-topic-form">
                      <div className="subscribe-topic-img">
                        <img
                          src={`${Config.BASE_URL}/img/subscribe-logo-icon.png`}
                          alt="subs"
                        />
                      </div>
                      <div
                        style={{ minHeight: "20px", minWidth: "20px" }}
                      ></div>
                      <div className="subscribe-topic-title">
                        Berlangganan newsletter kami
                      </div>
                      <div
                        style={{ minHeight: "20px", minWidth: "20px" }}
                      ></div>
                      <div className="subscribe-topic-desc">
                        Agar tidak ketinggalan informasi terbaru seputar
                        kesehatan.
                      </div>
                      <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
                      <div className="subscribe-input-form">
                        {this.state.user !== null && (
                          <span>
                            <input
                              name="name"
                              type="text"
                              onChange={this.handleFormChange}
                              value={this.state.form.name}
                              disabled={true}
                              placeholder="Nama"
                            />
                          </span>
                        )}
                        {this.state.user === null && (
                          <input
                            name="name"
                            type="text"
                            onChange={this.handleFormChange}
                            value={this.state.form.name}
                            placeholder="Nama"
                          />
                        )}
                      </div>
                      <div className="subscribe-input-form">
                        {this.state.user !== null && (
                          <span>
                            <input
                              name="email"
                              type="text"
                              onChange={this.handleFormChange}
                              value={this.state.form.email}
                              disabled={true}
                              placeholder="Masukkan Email"
                            />
                          </span>
                        )}
                        {this.state.user === null && (
                          <input
                            name="email"
                            type="text"
                            onChange={this.handleFormChange}
                            value={this.state.form.email}
                            placeholder="Masukkan Email"
                          />
                        )}
                      </div>
                      <div className="subscribe-note-form">
                        <div
                          className={`checkbox-item ${
                            this.state.form.accept && "active"
                          } d-flex`}
                        >
                          <div
                            onClick={() =>
                              this.setState((prevState) => ({
                                form: {
                                  ...prevState.form,
                                  accept: !this.state.form.accept,
                                },
                              }))
                            }
                            className="checkbox align-self-center clickable"
                          >
                            <i className="fa fa-check"></i>
                          </div>
                          <div
                            style={{
                              minHeight: "10px",
                              minWidth: "10px",
                            }}
                          ></div>
                          <div className="checkbox-note">
                            Baca selengkapnya{" "}
                            <a
                              href={`${Config.BASE_URL}/kebijakan-privasi`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Kebijakan Privasi
                            </a>{" "}
                            AlteaCare
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ minHeight: "20px", minWidth: "20px" }}
                      ></div>
                      <button
                        onClick={this.subscribe}
                        disabled={!this.allowSubmit()}
                        className="subscribe-button"
                      >
                        {this.state.isSubscriber
                          ? "Perbarui Langganan"
                          : "Berlangganan"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {this.state.isSubscribeDone && (
                <div className="d-flex flex-column-reverse flex-md-row h-100 justify-content-center text-center">
                  <div className="subscribe-done">
                    <div className="subscribe-topic-img">
                      <img
                        src={`${Config.BASE_URL}/img/subscribe-logo-icon.png`}
                        alt=""
                      />
                    </div>
                    <div style={{ minHeight: "30px", minWidth: "30px" }}></div>
                    <div className="subscribe-topic-title">
                      Terima Kasih <br />
                      Atas Kepercayaannya
                    </div>
                    <div style={{ minHeight: "40px", minWidth: "40px" }}></div>
                    <div className="subscribe-topic-desc">
                      Kami akan mengirimkan informasi rutin terkait topik yang
                      Anda pilih melalui email. <br />
                      Semoga sehat selalu
                    </div>
                    <div style={{ minHeight: "80px", minWidth: "80px" }}></div>
                    <div className="align-self-center">
                      <strong>Ikuti Kami</strong>
                    </div>
                    <div style={{ minHeight: "14px", minWidth: "14px" }}></div>
                    <div className="d-flex justify-content-center">
                      <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                      <div className="align-self-center">
                        <a
                          href="https://www.instagram.com/alteacare.id/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={`${Config.BASE_URL}/img/footer-ig-logo.png`}
                            alt=""
                          />
                        </a>
                      </div>
                      <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                      <div className="align-self-center">
                        <a
                          href="https://www.facebook.com/AlteaCare/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={`${Config.BASE_URL}/img/footer-fb-logo.png`}
                            alt=""
                          />
                        </a>
                      </div>
                      <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                      <div className="align-self-center">
                        <a
                          href="https://www.youtube.com/channel/UCNWx4hWEgCp_NoQxoM0o1hA"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={`${Config.BASE_URL}/img/footer-youtube-logo.png`}
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscribeModal;
