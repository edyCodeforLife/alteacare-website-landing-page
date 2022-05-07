import React from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import * as Config from "./../../config";

import EBook from "../../model/EBook";

import Header from "../../components/header";
import TopBar from "../../components/topbar";
import Footer from "../../components/footer";

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: props.article,
      ebook: props.ebook.map((item) => EBook.fromDB(item)),
      maxNewestArticle: 8,
      maxNewestEbook: 6,
      form: {
        search: "",
      },
      topic: props.topic,
      type: "ARTICLE",
    };
    this.viewNewestArticle = this.viewNewestArticle.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addMoreNewest = this.addMoreNewest.bind(this);
  }

  async componentDidMount() {
    let url = window.location.href;
    if (url.includes("?ebook=1")) this.setState({ type: "EBOOK" });
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  }

  viewNewestArticle() {
    let result = [];
    let haveMore = false;
    for (let i = 0; i < this.state.article.length; i++) {
      if (result.length >= this.state.maxNewestArticle) {
        haveMore = true;
        break;
      }
      let item = this.state.article[i];
      let tagExist = false;
      for (let s = 0; s < item.tags.length; s++) {
        let tag = item.tags[s];
        if (tag.toLowerCase().includes(this.state.form.search.toLowerCase())) {
          tagExist = true;
          break;
        }
      }
      if (
        item.title
          .toLowerCase()
          .includes(this.state.form.search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(this.state.form.search.toLowerCase()) ||
        tagExist
      ) {
        result.push(this.state.article[i]);
      }
    }
    return { list: result, haveMore: haveMore };
  }

  viewNewestEbook() {
    let result = [];
    let haveMore = false;
    for (let i = 0; i < this.state.ebook.length; i++) {
      if (result.length >= this.state.maxNewestEbook) {
        haveMore = true;
        break;
      }
      let item = this.state.ebook[i];
      let tagExist = false;
      for (let s = 0; s < item.tags.length; s++) {
        let tag = item.tags[s];
        if (tag.toLowerCase().includes(this.state.form.search.toLowerCase())) {
          tagExist = true;
          break;
        }
      }
      if (
        item.title
          .toLowerCase()
          .includes(this.state.form.search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(this.state.form.search.toLowerCase()) ||
        tagExist
      ) {
        result.push(this.state.ebook[i]);
      }
    }
    return { list: result, haveMore: haveMore };
  }

  addMoreNewest(type) {
    if (type === "ARTICLE")
      this.setState({
        maxNewestArticle: this.state.maxNewestArticle + 8,
      });
    if (type === "EBOOK")
      this.setState({
        maxNewestEbook: this.state.maxNewestEbook + 8,
      });
  }

  render() {
    return (
      <div className="main">
        <Header></Header>
        <main>
          <TopBar login={this.props.login}></TopBar>

          <div id="article-detail" className="article-detail">
            <div className="tab-panel">
              <div className="container d-flex">
                <div>
                  <Link href="/">
                    <a>Beranda</a>
                  </Link>
                </div>
                <div style={{ minWidth: "4px" }}></div>
                <div>/</div>
                <div style={{ minWidth: "4px" }}></div>
                <div>
                  <Link href="/topic-list">Topik</Link>
                </div>
                <div style={{ minWidth: "4px" }}></div>
                <div>/</div>
                <div style={{ minWidth: "4px" }}></div>
                <div>{this.state.topic}</div>
              </div>
            </div>
            <div className="container">
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
              <div className="d-flex flex-md-row flex-column">
                <div className="article-filter flex-grow-1">
                  <input
                    name="search"
                    type="text"
                    onChange={this.handleFormChange}
                    placeholder="Cari artikel/ebook berdasarkan judul, topik, tag"
                  />
                  <div className="search-icon">
                    <Image
                      src={`/img/search-icon.png`}
                      width={28}
                      height={28}
                      alt=""
                    />
                  </div>
                </div>
                <div style={{ minWidth: "36px", minHeight: "36px" }}></div>
                <div className="article-filter-subscribe align-self-center">
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#subscriber-modal"
                  >
                    Dapatkan Berlangganan
                  </button>
                </div>
              </div>
              <div style={{ minWidth: "24px", minHeight: "24px" }}></div>
              <div className="article-label d-flex">
                <div className="align-self-center">Topik : </div>
                <div style={{ minWidth: "4px", minHeight: "4px" }}></div>
                <div className="tag-circle">
                  <a href={`${Config.BASE_URL}/topic/${this.state.topic}`}>
                    {this.state.topic}
                  </a>
                </div>
              </div>
              <div style={{ minWidth: "24px", minHeight: "24px" }}></div>
              <div className="tab-list d-flex">
                <button
                  onClick={() => this.setState({ type: "ARTICLE" })}
                  className={`${this.state.type === "ARTICLE" ? "active" : ""}`}
                >
                  Artikel
                </button>
                <div style={{ minWidth: "16px", minHeight: "16px" }}></div>
                <button
                  onClick={() => this.setState({ type: "EBOOK" })}
                  className={`${this.state.type === "EBOOK" ? "active" : ""}`}
                >
                  E-book
                </button>
              </div>
              {this.state.type === "ARTICLE" && (
                <>
                  {this.state.article.length === 0 && (
                    <div className="text-center text-muted my-3">
                      <small>
                        <em>Tidak ada data ditemukan</em>
                      </small>
                    </div>
                  )}
                  {this.state.article.length > 0 && (
                    <div className="newest-article">
                      {this.state.form.search !== "" && (
                        <>
                          <div
                            style={{ minWidth: "24px", minHeight: "24px" }}
                          ></div>
                          <div className="title">
                            Hasil Pencarian untuk &quot;{this.state.form.search}
                            &quot;
                          </div>
                        </>
                      )}
                      <div
                        style={{ minWidth: "24px", minHeight: "24px" }}
                      ></div>
                      <div
                        className="d-flex flex-column flex-md-row flex-wrap"
                        style={{ marginLeft: "-16px", marginRight: "-16px" }}
                      >
                        {this.viewNewestArticle().list.map((item, index) => (
                          <React.Fragment key={index}>
                            <Link href={`/article-detail/${item.slug}`}>
                              <a
                                style={{
                                  maxWidth: "360px",
                                  flexBasis: "22%",
                                  margin: "16px",
                                }}
                                className="article-card"
                              >
                                <div className="d-flex flex-column h-100">
                                  <div
                                    className="top"
                                    style={{
                                      backgroundImage: `url('${item.image}')`,
                                    }}
                                  ></div>
                                  <div className="bottom flex-grow-1 d-flex flex-column">
                                    <div className="article-title flex-grow-1">
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
                              </a>
                            </Link>
                          </React.Fragment>
                        ))}
                      </div>
                      <div
                        style={{ minWidth: "20px", minHeight: "20px" }}
                      ></div>
                      {this.viewNewestArticle().haveMore && (
                        <div className="text-center">
                          <button
                            className="add-more"
                            onClick={() => this.addMoreNewest("ARTICLE")}
                          >
                            Selanjutnya
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {this.state.type === "EBOOK" && (
                <>
                  {this.state.ebook.length === 0 && (
                    <div className="text-center text-muted my-3">
                      <small>
                        <em>Tidak ada data ditemukan</em>
                      </small>
                    </div>
                  )}
                  {this.state.ebook.length > 0 && (
                    <div className="ebook-article">
                      {this.state.form.search !== "" && (
                        <>
                          <div
                            style={{ minWidth: "24px", minHeight: "24px" }}
                          ></div>
                          <div className="title">
                            Hasil Pencarian untuk &quot;{this.state.form.search}
                            &quot;
                          </div>
                        </>
                      )}
                      <div
                        style={{ minWidth: "24px", minHeight: "24px" }}
                      ></div>
                      <div
                        className="d-flex flex-column flex-md-row flex-wrap"
                        style={{ marginLeft: "-16px", marginRight: "-16px" }}
                      >
                        {this.viewNewestEbook().list.map((item, index) => (
                          <div key={index} className="ebook-item">
                            <div className="d-flex ebook-item-wrapper shadow">
                              <div
                                className="ebook-img"
                                style={{
                                  backgroundImage: `url('${item.cover}')`,
                                }}
                              ></div>
                              <div className="ebook-right d-flex flex-column">
                                <div className="ebook-title flex-grow-1">
                                  {item.title}
                                </div>
                                <div
                                  style={{
                                    minWidth: "13px",
                                    minHeight: "13px",
                                  }}
                                ></div>
                                <div className="ebook-date">
                                  {moment(item.date).format(
                                    "dddd, DD MMMM YYYY"
                                  )}
                                </div>
                                <div
                                  style={{
                                    minWidth: "13px",
                                    minHeight: "13px",
                                  }}
                                ></div>
                                <div className="ebook-detail">
                                  <Link
                                    href={`/ebook/${encodeURIComponent(
                                      item.slug
                                    )}`}
                                  >
                                    <a>
                                      <button>Lihat e-book</button>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{ minWidth: "20px", minHeight: "20px" }}
                      ></div>
                      {this.viewNewestEbook().haveMore && (
                        <div className="text-center">
                          <button
                            className="add-more"
                            onClick={() => this.addMoreNewest("EBOOK")}
                          >
                            Selanjutnya
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = { topic: "", article: [], ebook: [] };
  props.topic = context.params.topic;
  let response;
  try {
    response = await axios.get(
      `${Config.API_PUBLIC_URL}/article/category/${props.topic}`
    );
    props.article = response.data.data.articles;
  } catch (error) {}
  try {
    response = await axios.get(
      `${Config.API_PUBLIC_URL}/ebook/category/${props.topic}`
    );
    props.ebook = response.data.data.ebook;
  } catch (error) {}
  return {
    props: props,
  };
}

export default Topic;
