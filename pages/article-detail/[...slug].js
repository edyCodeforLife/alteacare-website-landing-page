/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Component } from "react";
import axios from "axios";
import * as Config from "./../../config";
import moment from "moment";
import "moment/locale/id";
import validator from "validator";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";
import { getCookies } from "cookies-next";
import ReactTooltip from "react-tooltip";
import * as ga from "../../lib/ga";

import Guest from "../../model/Guest";
import Comment from "../../model/Comment";
import Header from "../../components/header";
import TopBar from "../../components/topbar";
import { Breadcrumbs, Bagikan } from "../../components/molecules";
import Footer from "../../components/footer";
import Pagging from "../../components/molecules/Pagging";

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.browser ? window.location.href : "",
      user: process.browser ? reactLocalStorage.getObject("user", null) : null,
      userAccess: process.browser
        ? reactLocalStorage.getObject("access_user", null)
        : null,
      slug: props.slug,
      article: props.article,
      articleRecommended: props.articleRecommended,
      form: {
        previewPage: props.page,
        totalPage: props.totalPage,

        // for non login
        commentGuest: null,
        commentName: "",
        commentEmail: "",

        comments: [],
        commentText: "",
        editedComment: null,
        commentEditText: "",
        repliedComment: null,
        replyText: "",
      },
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.getArticleComments = this.getArticleComments.bind(this);
    this.setGuest = this.setGuest.bind(this);
    this.addComment = this.addComment.bind(this);
    this.replyComment = this.replyComment.bind(this);
    this.addReply = this.addReply.bind(this);
    this.toggleComment = this.toggleComment.bind(this);
    this.setCommentEdit = this.setCommentEdit.bind(this);
    this.editComment = this.editComment.bind(this);
    this.editReply = this.editReply.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.getTotalComments = this.getTotalComments.bind(this);
  }

  handleFormChange(event, callback = null) {
    const target = event.target;
    let value =
      target.type === "number"
        ? target.value.replace(/\D/, "").replace("d", "")
        : target.type === "checkbox"
        ? target.checked
        : target.value;
    let name = target.name;
    if (callback == null)
      this.setState((prevState) => ({
        form: { ...prevState.form, [name]: value },
      }));
    else
      this.setState(
        (prevState) => ({ form: { ...prevState.form, [name]: value } }),
        callback
      );
  }

  copyText(text) {
    navigator.clipboard.writeText(text);
  }

  async componentDidMount() {
    this.getArticleComments();
  }

  async setLike(status) {
    if (this.state.user == null) {
      return Swal.fire("Wajib login sebelum memberi like");
    }
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    try {
      let formData = {};
      if (this.state.user != null) formData.user_id = this.state.user.id;
      formData.article_id = this.state.article.id;
      formData.status = status;
      let response = await axios.post(
        `${Config.API_PUBLIC_URL}/article/like`,
        formData
      );
      let data = response.data;
      if (data.statusCode === 200) {
        if (status === "LIKE") {
          this.state.article.is_liked = 1;
          this.state.article.total_like++;
        } else {
          this.state.article.is_liked = 0;
          this.state.article.total_like--;
        }
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

  getTotalComments() {
    let total = 0;
    this.state.form.comments.forEach((comment) => {
      total++;
      total += comment.totalReplies;
    });
    return total;
  }

  getArticleComments() {
    axios
      .get(`${Config.API_PUBLIC_URL}/comment_article/${this.state.article.id}`)
      .then((response) => {
        try {
          let comments = response.data.data;
          let commentList = [];
          for (let i = 0; i < comments.length; i++) {
            let item = comments[i];
            commentList.push(
              new Comment({
                id: item.comment_article_id,
                userID: item.user_id,
                name: item.name,
                createdDate: item.created_at,
                content: item.comment,
                replies: [],
                totalReplies: item.total_reply,
                isOpen: false,
              })
            );
          }
          this.setState((prevState) => ({
            form: { ...prevState.form, comments: commentList },
          }));
        } catch (error) {
          Swal.fire(error.message);
        }
      });
  }

  async setGuest() {
    if (validator.isEmpty(this.state.form.commentName))
      return Swal.fire("Nama wajib diisi");
    if (!validator.isEmail(this.state.form.commentEmail))
      return Swal.fire("Email tidak valid");
    let confirm = await Swal.fire({
      text: "Anda belum login, komentar yang Anda tambahkan tidak dapat dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3E8CB9",
      cancelButtonColor: "#61C7B5",
      confirmButtonText: "OK",
      cancelButtonText: "Login",
    });
    if (!confirm.value) {
      let loginLink = document.getElementById("register-vaccine");
      let closeModal = document.getElementById("comment-close-modal");
      if (closeModal !== null) {
        closeModal.click();
      }
      if (loginLink !== null) {
        loginLink.classList.add("goto-article");
        loginLink.click();
      }
      return;
    }
    this.setState(
      (prevState) => ({
        form: {
          ...prevState.form,
          commentGuest: new Guest({
            name: this.state.form.commentName,
            email: this.state.form.commentEmail,
          }),
        },
      }),
      () => console.log(this.state.form.commentGuest)
    );
  }

  getCommentUser() {
    if (this.state.user !== null) {
      let name = this.state.user.first_name;
      if (
        this.state.user.last_name.trim() !== "" &&
        this.state.user.last_name !== null
      )
        name += " " + this.state.user.last_name;
      return { name: name, email: this.state.user.email };
    }
    if (this.state.form.commentGuest !== null) {
      return this.state.form.commentGuest;
    }
  }

  async addComment() {
    if (this.state.isLoading) return;
    if (this.state.form.commentText === "")
      return Swal.fire("Komentar wajib diisi");
    this.setState({ isLoading: true });
    try {
      let userState = "USER";
      if (this.state.user === null && this.state.form.commentGuest !== null)
        userState = "GUEST";
      let formData = {};
      formData.comment = this.state.form.commentText;
      formData.article_id = this.state.article.id;
      formData.comment_type = "PARENT";
      if (userState === "GUEST") {
        formData.name = this.getCommentUser().name;
        formData.email = this.getCommentUser().email;
      }
      let url = `${Config.API_PUBLIC_URL}/comment_article`;
      if (this.state.user === null && this.state.form.commentGuest !== null)
        url += "/non-login";
      let header = {};
      if (userState === "USER")
        header = {
          headers: {
            Authorization: "Bearer " + this.state.userAccess.access_token,
          },
        };
      let response = await axios.post(url, formData, header);
      let data = response.data;
      if (data.statusCode === 201) {
        this.setState(
          (prevState) => ({
            form: {
              ...prevState.form,
              commentText: "",
            },
          }),
          this.getArticleComments
        );
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

  replyComment(comment) {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        repliedComment: comment,
      },
    }));
  }

  async addReply(comment) {
    if (this.state.isLoading) return;
    if (this.state.form.replyText === "")
      return Swal.fire("Komentar wajib diisi");
    this.setState({ isLoading: true });
    try {
      let userState = "USER";
      if (this.state.user === null && this.state.form.commentGuest !== null)
        userState = "GUEST";
      let formData = {};
      formData.comment = this.state.form.replyText;
      formData.article_id = this.state.article.id;
      formData.comment_type = "CHILD";
      if (userState === "GUEST") {
        formData.name = this.getCommentUser().name;
        formData.email = this.getCommentUser().email;
      }
      formData.parent_comment_id = comment.id;
      let url = `${Config.API_PUBLIC_URL}/comment_article`;
      if (this.state.user === null && this.state.form.commentGuest !== null)
        url += "/non-login";
      let header = {};
      if (userState === "USER")
        header = {
          headers: {
            Authorization: "Bearer " + this.state.userAccess.access_token,
          },
        };
      let response = await axios.post(url, formData, header);
      let data = response.data;
      if (data.statusCode === 201) {
        this.setState(
          (prevState) => ({
            form: {
              ...prevState.form,
              repliedComment: null,
              replyText: "",
            },
          }),
          this.getArticleComments
        );
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

  toggleComment(comment) {
    if (comment.isOpen) {
      comment.isOpen = false;
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          editedComment: null,
          repliedComment: null,
        },
      }));
      return;
    }
    axios
      .get(`${Config.API_PUBLIC_URL}/comment_reply/${comment.id}`)
      .then((response) => {
        try {
          let comments = response.data.data;

          let commentList = [];
          for (let i = 0; i < comments.length; i++) {
            let item = comments[i];
            commentList.push(
              new Comment({
                id: item.comment_article_id,
                userID: item.user_id,
                name: item.name,
                createdDate: item.created_at,
                content: item.comment,
                replies: [],
                totalReplies: item.total_reply,
                isOpen: false,
              })
            );
          }
          comment.replies = commentList;
          comment.isOpen = !comment.isOpen;
          this.setState((prevState) => ({
            form: {
              ...prevState.form,
              editedComment: null,
              repliedComment: null,
            },
          }));
        } catch (error) {
          Swal.fire(error.message);
        }
      });
  }

  setCommentEdit(comment) {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        editedComment: comment,
        commentEditText: comment.content,
      },
    }));
  }

  async editComment(comment) {
    if (this.state.isLoading) return;
    if (this.state.form.commentEditText === "")
      return Swal.fire("Komentar wajib diisi");
    this.setState({ isLoading: true });
    try {
      let formData = {};
      formData.comment = this.state.form.commentEditText;
      formData.article_id = this.state.article.id;
      formData.comment_type = "PARENT";
      let response = await axios.put(
        `${Config.API_PUBLIC_URL}/comment_article/${comment.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + this.state.userAccess.access_token,
          },
        }
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState(
          (prevState) => ({
            form: {
              ...prevState.form,
              editedComment: null,
              commentEditText: "",
            },
          }),
          this.getArticleComments
        );
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

  async editReply(comment) {
    if (this.state.isLoading) return;
    if (this.state.form.commentEditText === "")
      return Swal.fire("Komentar wajib diisi");
    this.setState({ isLoading: true });
    try {
      let formData = {};
      formData.comment = this.state.form.commentEditText;
      formData.article_id = this.state.article.id;
      formData.comment_type = "CHILD";
      formData.parent_comment_id = comment.id;
      let response = await axios.put(
        `${Config.API_PUBLIC_URL}/comment_article/${comment.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + this.state.userAccess.access_token,
          },
        }
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState(
          (prevState) => ({
            form: {
              ...prevState.form,
              editedComment: null,
              commentEditText: "",
            },
          }),
          this.getArticleComments
        );
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

  async deleteComment(comment) {
    if (this.state.isLoading) return;
    let confirm = await Swal.fire({
      text: "Apakah Anda yakin ingin menghapus komentar ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3E8CB9",
      cancelButtonColor: "#FF5C5C",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });
    if (!confirm.value) return;
    this.setState({ isLoading: true });
    try {
      let response = await axios.delete(
        `${Config.API_PUBLIC_URL}/comment_article/${comment.id}`,
        {
          headers: {
            Authorization: "Bearer " + this.state.userAccess.access_token,
          },
        }
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.getArticleComments();
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

  goToDetail = (to, title, path, id) => {
    const detail = `Go to ${to} : ${title} `;
    ga.event({
      action: detail,
      params: {
        search_term: title,
        event_category: "Recommandation Artikel",
      },
    });
    window.location = `${Config.BASE_URL}${path}/${id}`;
    // Router.replace(`${Config.BASE_URL}${path}/${id}`);
  };

  render() {
    return (
      <div className="main">
        <Header
          title={this.state.article.title}
          metadata={this.state.article.metadata}
          tags={this.state.article.tags}
        ></Header>
        <main>
          <TopBar login={this.props.login}></TopBar>
          <div id="article-detail" className="article-detail">
            <Breadcrumbs
              firstUrl={Config.BASE_URL}
              firstLabel={"Beranda"}
              secondUrl={`${Config.BASE_URL}/article-list`}
              secondLabel={"Artikel"}
              thirdUrl={""}
              thirdLabel={
                this.state.article != null && (
                  <div>{this.state.article.title}</div>
                )
              }
            />
            {this.state.article != null && (
              <div className="container" style={{ maxWidth: "700px" }}>
                <div style={{ minHeight: "40px" }}></div>
                <div className="article-title">{this.state.article.title}</div>
                <div className="article-meta d-flex justify-content-between">
                  <div className="writer">
                    Ditulis oleh :{" "}
                    <span className="text-info">
                      {this.state.article.created_by}
                    </span>
                  </div>
                  <div className="date">
                    {moment(this.state.article.created_at).format(
                      "dddd, DD MMMM YYYY"
                    )}
                  </div>
                </div>
                {this.state.article.peninjau_matery != null && (
                  <div className="article-meta">
                    <div className="writer">
                      Ditinjau oleh :{" "}
                      <span className="text-info">
                        {this.state.article.peninjau_matery}
                      </span>
                    </div>
                  </div>
                )}
                <div className="article-topic">
                  <Link
                    href={`/topic/${encodeURIComponent(
                      this.state.article.category
                    )}`}
                  >
                    <a>{this.state.article.category}</a>
                  </Link>
                </div>
                <div style={{ minHeight: "20px" }}></div>
                <div className="article-img">
                  <Image
                    src={this.state.article.image}
                    height={420}
                    width={670}
                    alt=""
                  />
                  <div style={{ minHeight: "16px" }}></div>
                  <div className="img-desc">
                    {this.state.article.image_description}
                  </div>
                </div>
                <div style={{ minHeight: "30px" }}></div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: this.state.article.text }}
                ></div>

                <div style={{ minHeight: "30px" }}></div>
                {this.state.form.totalPage > 1 && (
                  <Pagging
                    form={this.state.form}
                    article={this.state.article}
                  />
                )}
                <div style={{ minHeight: "30px" }}></div>

                <div className="article-tags">
                  {this.state.article.tags.map((item, index) => (
                    <a key={index} href={`${Config.BASE_URL}/tags/${item}`}>
                      <div className="tag">{item}</div>
                    </a>
                  ))}
                </div>
                <div style={{ minHeight: "30px" }}></div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <div className="article-action d-flex">
                    <div className="like d-flex">
                      <div
                        onClick={() => this.setLike("LIKE")}
                        className="clickable align-self-center"
                        style={{
                          display:
                            this.state.article.is_liked === 0
                              ? "block"
                              : "none",
                        }}
                      >
                        <Image
                          src={`/img/like-icon.png`}
                          width={30}
                          height={31}
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() => this.setLike("DISLIKE")}
                        className="clickable align-self-center"
                        style={{
                          display:
                            this.state.article.is_liked === 1
                              ? "block"
                              : "none",
                        }}
                      >
                        <Image
                          src={`/img/liked-icon.png`}
                          width={30}
                          height={31}
                          alt=""
                        />
                      </div>
                      <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                      <div className="like-qty align-self-center">
                        {this.state.article.total_like} Disukai
                      </div>
                    </div>
                    <div style={{ minHeight: "20px", minWidth: "20px" }}></div>
                    <div className="comment like d-flex">
                      <div
                        className="clickable align-self-center"
                        data-toggle="modal"
                        data-target="#comment-modal"
                      >
                        <Image
                          src={`/img/comment-icon.png`}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </div>
                      <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                      <div className="like-qty align-self-center">
                        {this.getTotalComments()} Komentar
                      </div>
                      <div className="modal fade" id="comment-modal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <div className="head d-flex justify-content-between">
                                <div className="head-title">Kolom Komentar</div>
                                <div
                                  id="comment-close-modal"
                                  className="modal-close"
                                  data-dismiss="modal"
                                >
                                  &times;
                                </div>
                              </div>
                              <div className="comment-content">
                                {this.state.form.comments.length === 0 && (
                                  <div className="no-comment">
                                    Tidak ada komentar di artikel ini, jadilah
                                    yang pertama memberikan komentar untuk
                                    artikel ini.
                                  </div>
                                )}

                                {this.state.form.comments.map((item, index) => (
                                  <div key={index} className="comment-list">
                                    <div className="d-flex justify-content-between">
                                      <div className="comment-name align-self-center">
                                        {item.name}
                                      </div>
                                      {this.state.user !== null &&
                                        this.state.user.id === item.userID && (
                                          <div className="comment-opt">
                                            <div className="dropdown">
                                              <img
                                                src={`${Config.BASE_URL}/img/comment-opt-icon.png`}
                                                data-toggle="dropdown"
                                                alt=""
                                              />
                                              <div className="dropdown-menu">
                                                <div
                                                  onClick={() =>
                                                    this.setCommentEdit(item)
                                                  }
                                                  className="dropdown-item dropdown-item-red"
                                                >
                                                  Ubah
                                                </div>
                                                <div
                                                  onClick={() =>
                                                    this.deleteComment(item)
                                                  }
                                                  className="dropdown-item dropdown-item-red"
                                                >
                                                  Hapus
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                    <div
                                      style={{
                                        minHeight: "4px",
                                        minWidth: "4px",
                                      }}
                                    ></div>
                                    <div className="comment-date">
                                      {moment(item.createdDate).format(
                                        "DD MMMM YYYY HH:mm"
                                      )}
                                    </div>
                                    <div
                                      style={{
                                        minHeight: "8px",
                                        minWidth: "8px",
                                      }}
                                    ></div>
                                    {this.state.form.editedComment !== item && (
                                      <div className="comment-text">
                                        {item.content}
                                      </div>
                                    )}
                                    {this.state.form.editedComment === item && (
                                      <div className="comment-input">
                                        <textarea
                                          name="commentEditText"
                                          onChange={this.handleFormChange}
                                          value={
                                            this.state.form.commentEditText
                                          }
                                          rows="5"
                                          placeholder="Masukkan Komentar Anda"
                                        ></textarea>
                                        <div className="comment-input">
                                          <button
                                            onClick={() =>
                                              this.editComment(item)
                                            }
                                            className="blue-button"
                                          >
                                            Ubah Komentar
                                          </button>
                                        </div>
                                        <div className="comment-input">
                                          <button
                                            onClick={() =>
                                              this.setState((prevState) => ({
                                                form: {
                                                  ...prevState.form,
                                                  editedComment: null,
                                                  commentEditText: "",
                                                },
                                              }))
                                            }
                                            className="red-button"
                                          >
                                            Tutup
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                    <div
                                      style={{
                                        minHeight: "8px",
                                        minWidth: "8px",
                                      }}
                                    ></div>
                                    {item.totalReplies > 0 && (
                                      <>
                                        <div className="comment-action d-flex clickable">
                                          <div className="comment-icon-img">
                                            <Image
                                              src={`/img/green-comment-icon.png`}
                                              width={24}
                                              height={24}
                                              alt=""
                                            />
                                          </div>
                                          <div
                                            style={{
                                              minHeight: "8px",
                                              minWidth: "8px",
                                            }}
                                          ></div>
                                          <div className="comment-reply-qty align-self-center">
                                            {item.totalReplies} Balasan
                                          </div>
                                          <div
                                            style={{
                                              minHeight: "8px",
                                              minWidth: "8px",
                                            }}
                                          ></div>
                                          <div
                                            onClick={() =>
                                              this.toggleComment(item)
                                            }
                                            className="comment-reply-text align-self-center"
                                          >
                                            {item.isOpen ? "Tutup" : "Lihat"}
                                          </div>
                                        </div>
                                        {item.totalReplies > 0 && item.isOpen && (
                                          <div className="comment-replies">
                                            {item.replies.map(
                                              (subitem, subindex) => (
                                                <div
                                                  key={subindex}
                                                  className="reply-list"
                                                >
                                                  <div className="d-flex justify-content-between">
                                                    <div className="comment-name align-self-center">
                                                      {subitem.name}
                                                    </div>
                                                    {this.state.user !== null &&
                                                      this.state.user.id ===
                                                        subitem.userID && (
                                                        <div className="comment-opt">
                                                          <div className="dropdown">
                                                            <img
                                                              src={`${Config.BASE_URL}/img/comment-opt-icon.png`}
                                                              data-toggle="dropdown"
                                                              alt=""
                                                            />
                                                            <div className="dropdown-menu">
                                                              <div
                                                                onClick={() =>
                                                                  this.setCommentEdit(
                                                                    subitem
                                                                  )
                                                                }
                                                                className="dropdown-item dropdown-item-red"
                                                              >
                                                                Ubah
                                                              </div>
                                                              <div
                                                                onClick={() =>
                                                                  this.deleteComment(
                                                                    subitem
                                                                  )
                                                                }
                                                                className="dropdown-item dropdown-item-red"
                                                              >
                                                                Hapus
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}
                                                  </div>
                                                  <div
                                                    style={{
                                                      minHeight: "4px",
                                                      minWidth: "4px",
                                                    }}
                                                  ></div>
                                                  <div className="comment-date">
                                                    {moment(
                                                      subitem.createdDate
                                                    ).format(
                                                      "DD MMMM YYYY HH:mm"
                                                    )}
                                                  </div>
                                                  <div
                                                    style={{
                                                      minHeight: "8px",
                                                      minWidth: "8px",
                                                    }}
                                                  ></div>
                                                  {this.state.form
                                                    .editedComment !==
                                                    subitem && (
                                                    <div className="comment-text">
                                                      {subitem.content}
                                                    </div>
                                                  )}
                                                  {this.state.form
                                                    .editedComment ===
                                                    subitem && (
                                                    <div className="comment-input">
                                                      <textarea
                                                        name="commentEditText"
                                                        onChange={
                                                          this.handleFormChange
                                                        }
                                                        value={
                                                          this.state.form
                                                            .commentEditText
                                                        }
                                                        rows="5"
                                                        placeholder="Masukkan Komentar Anda"
                                                      ></textarea>
                                                      {this.state.form
                                                        .commentGuest !==
                                                        null &&
                                                        this.state.user ===
                                                          null && (
                                                          <div className="comment-guest">
                                                            Beri komentar
                                                            sebagai <br />
                                                            <strong>
                                                              {
                                                                this.state.form
                                                                  .commentGuest
                                                                  .name
                                                              }
                                                            </strong>
                                                          </div>
                                                        )}
                                                      <div className="comment-input">
                                                        <button
                                                          onClick={() =>
                                                            this.editReply(
                                                              subitem
                                                            )
                                                          }
                                                          className="blue-button"
                                                        >
                                                          Ubah Komentar{" "}
                                                          {this.state
                                                            .isLoading && (
                                                            <div className="spinner-border text-light"></div>
                                                          )}
                                                        </button>
                                                      </div>
                                                      <div className="comment-input">
                                                        <button
                                                          onClick={() =>
                                                            this.setState(
                                                              (prevState) => ({
                                                                form: {
                                                                  ...prevState.form,
                                                                  editedComment:
                                                                    null,
                                                                  commentEditText:
                                                                    "",
                                                                },
                                                              })
                                                            )
                                                          }
                                                          className="red-button"
                                                        >
                                                          Tutup
                                                        </button>
                                                      </div>
                                                    </div>
                                                  )}
                                                  <div
                                                    style={{
                                                      minHeight: "12px",
                                                      minWidth: "12px",
                                                    }}
                                                  ></div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {this.state.form.repliedComment !== item &&
                                      (this.state.user !== null ||
                                        this.state.form.commentGuest !==
                                          null) &&
                                      (item.totalReplies === 0 ||
                                        (item.totalReplies > 0 &&
                                          item.isOpen)) && (
                                        <div
                                          onClick={() =>
                                            this.replyComment(item)
                                          }
                                          className="comment-action d-inline-flex clickable"
                                        >
                                          <div className="comment-icon-img">
                                            <Image
                                              src={`/img/green-comment-icon.png`}
                                              width={24}
                                              height={24}
                                              alt=""
                                            />
                                          </div>
                                          <div
                                            style={{
                                              minHeight: "8px",
                                              minWidth: "8px",
                                            }}
                                          ></div>
                                          <div className="comment-reply-text align-self-center">
                                            Balas
                                          </div>
                                        </div>
                                      )}
                                    {this.state.form.repliedComment ===
                                      item && (
                                      <>
                                        {this.state.user !== null && (
                                          <div className="comment-user">
                                            {this.getCommentUser().name}
                                          </div>
                                        )}
                                        <div className="comment-input">
                                          <textarea
                                            name="replyText"
                                            onChange={this.handleFormChange}
                                            value={this.state.form.replyText}
                                            rows="5"
                                            placeholder="Masukkan Komentar Anda"
                                          ></textarea>
                                        </div>
                                        {this.state.user === null &&
                                          this.state.form.commentGuest !==
                                            null && (
                                            <div className="comment-guest">
                                              Beri komentar sebagai <br />
                                              <strong>
                                                {
                                                  this.state.form.commentGuest
                                                    .name
                                                }
                                              </strong>
                                            </div>
                                          )}
                                        <div className="comment-input">
                                          <button
                                            onClick={() => this.addReply(item)}
                                            className="blue-button"
                                          >
                                            Buat Komentar{" "}
                                            {this.state.isLoading && (
                                              <div className="spinner-border text-light"></div>
                                            )}
                                          </button>
                                        </div>
                                        <div className="comment-input">
                                          <button
                                            onClick={() =>
                                              this.setState((prevState) => ({
                                                form: {
                                                  ...prevState.form,
                                                  repliedComment: null,
                                                  replyText: "",
                                                },
                                              }))
                                            }
                                            className="red-button"
                                          >
                                            Tutup
                                          </button>
                                        </div>
                                      </>
                                    )}
                                    <div
                                      style={{
                                        minHeight: "12px",
                                        minWidth: "12px",
                                      }}
                                    ></div>
                                  </div>
                                ))}

                                <div
                                  style={{
                                    minHeight: "12px",
                                    minWidth: "12px",
                                  }}
                                ></div>

                                {this.state.user === null &&
                                  this.state.form.commentGuest === null && (
                                    <>
                                      <div className="comment-input">
                                        <input
                                          name="commentName"
                                          type="text"
                                          onChange={this.handleFormChange}
                                          value={this.state.form.commentName}
                                          placeholder="Nama"
                                        />
                                      </div>
                                      <div className="comment-input">
                                        <input
                                          name="commentEmail"
                                          type="text"
                                          onChange={this.handleFormChange}
                                          value={this.state.form.commentEmail}
                                          placeholder="Masukkan Email"
                                        />
                                      </div>
                                      <div className="comment-input">
                                        <button
                                          onClick={this.setGuest}
                                          className="blue-button"
                                        >
                                          Buat Komentar Baru{" "}
                                          {this.state.isLoading && (
                                            <div className="spinner-border text-light"></div>
                                          )}
                                        </button>
                                      </div>
                                    </>
                                  )}

                                {(this.state.user !== null ||
                                  this.state.form.commentGuest !== null) && (
                                  <>
                                    {this.state.user !== null && (
                                      <div className="comment-user">
                                        {this.getCommentUser().name}
                                      </div>
                                    )}
                                    <div className="comment-input">
                                      <textarea
                                        name="commentText"
                                        onChange={this.handleFormChange}
                                        value={this.state.form.commentText}
                                        rows="5"
                                        placeholder="Masukkan Komentar Anda"
                                      ></textarea>
                                    </div>
                                    {this.state.user === null &&
                                      this.state.form.commentGuest !== null && (
                                        <div className="comment-guest">
                                          Beri komentar sebagai <br />
                                          <strong>
                                            {this.state.form.commentGuest.name}
                                          </strong>
                                        </div>
                                      )}
                                    <div style={{ minHeight: "8px" }}></div>
                                    <div className="comment-input">
                                      <button
                                        onClick={this.addComment}
                                        className="blue-button"
                                      >
                                        Buat Komentar{" "}
                                        {this.state.isLoading && (
                                          <div className="spinner-border text-light"></div>
                                        )}
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minHeight: "30px", minWidth: "30px" }}></div>
                  <div className="article-share d-flex flex-column flex-md-row">
                    <Bagikan
                      url={this.state.url}
                      article={this.state.article}
                    />
                  </div>
                </div>
              </div>
            )}
            <div style={{ minHeight: "30px" }}></div>
            {this.state.article != null &&
              this.state.articleRecommended.length > 0 && (
                <div className="container">
                  <div id="article-section" className="article">
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                      <div className="title">Rekomendasi Artikel</div>
                      <div className="align-self-end view-all">
                        <Link
                          href={`${
                            Config.BASE_URL
                          }/tags/${this.state.article.tags
                            .map((item) => encodeURIComponent(item))
                            .join("/")}`}
                        >
                          Lihat Semua
                        </Link>
                      </div>
                    </div>
                    <div style={{ minWidth: "30px", minHeight: "30px" }}></div>
                    <div className="d-flex flex-column flex-md-row">
                      {this.state.articleRecommended.map(
                        (item, index) =>
                          index < 3 && (
                            <React.Fragment key={index}>
                              <a
                                href={`${
                                  Config.BASE_URL
                                }/article-detail/${encodeURIComponent(
                                  item.slug
                                )}`}
                              >
                                <div
                                  style={{
                                    maxWidth: "360px",
                                    flexBasis: "33%",
                                  }}
                                  className="article-card clickable"
                                >
                                  <div className="d-flex flex-column h-100">
                                    <div
                                      className="top"
                                      style={{
                                        backgroundImage: `url('${item.image}')`,
                                      }}
                                    ></div>
                                    <div className="bottom flex-grow-1 d-flex flex-column">
                                      <div className="article-title">
                                        {item.title}
                                      </div>
                                      <div style={{ minHeight: "12px" }}></div>
                                      <div className="article-desc flex-grow-1">
                                        {item.metadata}
                                      </div>
                                      <div style={{ minHeight: "16px" }}></div>
                                      <div className="article-date">
                                        {moment(item.created_at).format(
                                          "dddd, DD MMMM YYYY"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                              {index < 2 && (
                                <div
                                  style={{
                                    minWidth: "45px",
                                    minHeight: "45px",
                                  }}
                                ></div>
                              )}
                            </React.Fragment>
                          )
                      )}
                    </div>
                  </div>
                  <div style={{ minHeight: "30px" }}></div>
                </div>
              )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = {
    slug: "",
    userID: "",
    page: "",
  };
  let params = context.params.slug;
  let user = getCookies(context);
  if (user.user != null) {
    user = JSON.parse(user.user);
    props.userID = user.id;
  }
  props.slug = params[0];
  if (params[1] != null) props.page = Number(params[1]);
  else props.page = 1;

  let response;
  let url = `${Config.API_PUBLIC_URL}/article/detail/${props.slug}`;
  if (props.userID !== "") url += "/" + props.userID;
  url += `?page=${props.page}`;
  response = await axios.get(url);
  try {
    let data = response.data.data;
    props.article = data.articles[0];
    props.articleRecommended = data.article_recomend;
    props.totalPage = data.total_content === 0 ? 1 : data.total_content;
  } catch (error) {}

  return {
    props: props,
  };
}

export default ArticleDetails;
