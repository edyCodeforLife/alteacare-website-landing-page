import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import * as Config from "./../config";

import EBook from "../model/EBook";

import Header from "../components/header";
import TopBar from "../components/topbar";
import Footer from "../components/footer";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fetchArticleCallback: null,
      article: props.article,
      articleMeta: props.articleMeta,
      articleRecommended: props.articleRecommended,
      maxNewestArticle: 8,
      maxNewestEbook: 8,
      type: "ARTICLE",
      search: "",
      topicList: props.topicList,
      ebookList: props.ebookList.map((item) => EBook.fromDB(item)),
      topicSplideInitialScroll: -1,
      ebookSplideInitialScroll: -1,
      limit: 8,
    };

    // this.handleFormChange = this.handleFormChange.bind(this);
    // this.fetchArticle = this.fetchArticle.bind(this);
    // this.addMoreNewest = this.addMoreNewest.bind(this);
  }

  handleFormChange(search) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState({ search });
    }, 500);
  }

  componentDidMount() {
    this.fetchArticle(1);
    this.splideTopicList();
    this.splideEbook();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchArticle(1);
    }
    if (prevState.limit !== this.state.limit) {
      this.fetchArticle(1);
    }
  }

  splideEbook() {
    if (this.state.ebookList.length > 0) {
      let ebookSplide = new Splide(".ebook-splide", {
        autoWidth: true,
        margin: "20px",
        pagination: false,
        type: "slide",
        perPage: 3,
        breakpoints: {
          640: {
            perPage: 1,
          },
        },
      });
      ebookSplide.on("mounted move", () => {
        var scrollPosition = ebookSplide.Components.Controller.getEnd() + 1;
        scrollPosition = (100 * (ebookSplide.index + 1)) / scrollPosition;
        if (this.state.ebookSplideInitialScroll === -1)
          this.setState({ ebookSplideInitialScroll: scrollPosition });
        let leftArrow = document.querySelector(
          ".ebook-splide .splide__arrow--prev"
        );
        let rightArrow = document.querySelector(
          ".ebook-splide .splide__arrow--next"
        );
        if (
          this.state.ebookSplideInitialScroll === -1 ||
          scrollPosition <= this.state.ebookSplideInitialScroll
        )
          leftArrow.style.display = "none";
        else leftArrow.style.display = "flex";
        if (scrollPosition === 100) rightArrow.style.display = "none";
        else rightArrow.style.display = "flex";
      });
      ebookSplide.mount();
    }
  }
  splideTopicList() {
    if (this.state.topicList.length > 0) {
      let topicSplide = new Splide(".topic-splide", {
        autoWidth: true,
        margin: "20px",
        pagination: false,
        type: "slide",
        perPage: 4,
        breakpoints: {
          640: {
            perPage: 1,
          },
        },
      });
      topicSplide.on("mounted move", () => {
        var scrollPosition = topicSplide.Components.Controller.getEnd() + 1;
        scrollPosition = (100 * (topicSplide.index + 1)) / scrollPosition;
        if (this.state.topicSplideInitialScroll === -1)
          this.setState({ topicSplideInitialScroll: scrollPosition });
        let leftArrow = document.querySelector(
          ".topic-splide .splide__arrow--prev"
        );
        let rightArrow = document.querySelector(
          ".topic-splide .splide__arrow--next"
        );
        if (
          this.state.topicSplideInitialScroll === -1 ||
          scrollPosition <= this.state.topicSplideInitialScroll
        )
          leftArrow.style.display = "none";
        else leftArrow.style.display = "flex";
        if (scrollPosition === 100) rightArrow.style.display = "none";
        else rightArrow.style.display = "flex";
      });
      topicSplide.mount();
    }
  }

  fetchArticle = async (n) => {
    const { search, limit } = this.state;
    let searchCond = `&keyword=${search}`;
    let numberPage = n === 1 ? 1 : this.state.articleMeta.page + 1;
    let response = [];
    if (search) {
      response = await axios.get(
        `${Config.API_PUBLIC_URL}/article?is_popular=true&current_page=${numberPage}&limit=${limit}${searchCond}`
      );
    } else {
      response = await axios.get(
        `${Config.API_PUBLIC_URL}/article?is_popular=true&current_page=${numberPage}&limit=${limit}`
      );
    }
    this.setState({
      article: response.data.data.article,
      articleMeta: response.data.data.meta,
    });
  };

  selanjutnya = () => {
    this.setState({
      limit: this.state.limit + 8,
    });
  };

  render() {
    return (
      <div className="main">
        <Header
          title={
            "AlteaCare Artikel kesehatan terlengkap, terpercaya, dan teruji secara ilmiah"
          }
          metadata={
            "Daftar artikel kesehatan terlengkap, terpercaya, dan teruji secara ilmiah. Kumpulan artikel kesehatan dari AlteaCate Mitra Keluarga"
          }
          tags={
            "Artikel, informasi, kesehatan, covid19, swab, antigen, mitra keluarga"
          }
        />
        <main>
          <TopBar login={this.props.login} />
          <div id="article-detail" className="article-detail gradient-blue">
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
                <div>Artikel</div>
              </div>
            </div>
            <div className="container">
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
              <div className="d-flex flex-md-row flex-column">
                <div className="article-filter flex-grow-1">
                  <input
                    name="search"
                    type="text"
                    onChange={(e) => this.handleFormChange(e.target.value)}
                    readOnly={this.state.isLoading}
                    placeholder="Cari artikel/ebook berdasarkan judul, topik, tag"
                  />
                  <div className="search-icon">
                    <Image
                      src={`/img/search-icon.png`}
                      height={28}
                      width={28}
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
              {this.state.search === "" && (
                <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
              )}

              {this.state.search === "" &&
                this.state.articleRecommended.length > 0 && (
                  <div className="popular-article">
                    <div className="title">Artikel Populer</div>
                    <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                    <div className="d-flex flex-column flex-md-row">
                      <div
                        className="article-img flex-grow-1"
                        style={{
                          backgroundImage: `url('${this.state.articleRecommended[0].image}')`,
                        }}
                      >
                        <Link
                          href={`/article-detail/${this.state.articleRecommended[0].slug}`}
                        >
                          <a>
                            <div className="article-img-wrapper">
                              <div className="article-img-title">
                                {this.state.articleRecommended[0].title}
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div
                        style={{ minWidth: "32px", minHeight: "32px" }}
                      ></div>
                      <div className="article-small-list">
                        {this.state.articleRecommended.map(
                          (item, index) =>
                            index > 0 &&
                            index < 5 && (
                              <React.Fragment key={index}>
                                <Link href={`/article-detail/${item.slug}`}>
                                  <a>
                                    <div className="article-small d-flex">
                                      <div
                                        className="article-small-img"
                                        style={{
                                          backgroundImage: `url('${item.image}')`,
                                        }}
                                      ></div>
                                      <div
                                        style={{
                                          minWidth: "20px",
                                          minHeight: "20px",
                                        }}
                                      ></div>
                                      <div className="article-small-title align-self-center">
                                        {item.title}
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                                {index < 4 && (
                                  <div
                                    style={{
                                      minWidth: "16px",
                                      minHeight: "16px",
                                    }}
                                  ></div>
                                )}
                              </React.Fragment>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              {this.state.topicList.length > 0 && (
                <div
                  className="topic-article"
                  style={{
                    display: this.state.search === "" ? "inherit" : "none",
                  }}
                >
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="d-flex justify-content-between">
                    <div className="title">Topik Pilihan</div>
                    <Link href={`/topic-list`}>
                      <a className="align-self-center">
                        <div className="view-all">Lihat Semua</div>
                      </a>
                    </Link>
                  </div>
                  <div style={{ minWidth: "24px", minHeight: "24px" }}></div>
                  <div className="topic-splide splide">
                    <div className="splide__track">
                      <ul className="splide__list">
                        {this.state.topicList.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="splide__slide topic-item"
                            >
                              <a
                                href={`/topic/${encodeURIComponent(item.name)}`}
                              >
                                <div
                                  className="topic-img"
                                  style={{
                                    backgroundImage: `url('${
                                      item.image !== null
                                        ? item.image
                                        : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                    }')`,
                                  }}
                                ></div>
                                <div className="topic-title">{item.name}</div>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {this.state.ebookList.length > 0 && (
                <div
                  className="ebook-article"
                  style={{
                    display: this.state.search === "" ? "inherit" : "none",
                  }}
                >
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="d-flex justify-content-between">
                    <div className="title">E-book Terbaru</div>
                    {this.state.ebookList.length > 3 && (
                      <Link href={`/ebook-list`}>
                        <a className="align-self-center">
                          <div className="view-all">Lihat Semua</div>
                        </a>
                      </Link>
                    )}
                  </div>
                  <div style={{ minWidth: "24px", minHeight: "24px" }}></div>
                  <div className="ebook-splide splide">
                    <div className="splide__track">
                      <ul className="splide__list">
                        {this.state.ebookList.map((item, index) => (
                          <li key={index} className="splide__slide ebook-item">
                            <div className="d-flex ebook-item-wrapper">
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {(this.state.search === "" || this.state.type === "ARTICLE") && (
                <div className="newest-article">
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  {this.state.search === "" && (
                    <div className="title">Artikel Terbaru</div>
                  )}
                  {this.state.search !== "" && (
                    <div className="title">
                      Hasil Pencarian untuk &quot;{this.state.search}&quot;
                    </div>
                  )}
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>

                  {this.state.search !== "" && (
                    <div className="tab-list d-flex">
                      <button
                        onClick={() => this.setState({ type: "ARTICLE" })}
                        className={`${
                          this.state.type === "ARTICLE" ? "active" : ""
                        }`}
                      >
                        Artikel
                      </button>
                      <div
                        style={{ minWidth: "16px", minHeight: "16px" }}
                      ></div>
                      <button
                        onClick={() => this.setState({ type: "EBOOK" })}
                        className={`${
                          this.state.type === "EBOOK" ? "active" : ""
                        }`}
                      >
                        E-book
                      </button>
                    </div>
                  )}

                  <div
                    className="d-flex flex-column flex-md-row flex-wrap"
                    style={{ marginLeft: "-16px", marginRight: "-16px" }}
                  >
                    {this.state.article
                      ? this.state.article.map((item, index) => (
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
                        ))
                      : ""}
                  </div>
                  <div style={{ minWidth: "20px", minHeight: "20px" }}></div>
                  {this.state.articleMeta.page <
                    this.state.articleMeta.total_page && (
                    <div className="text-center">
                      <button
                        className="add-more"
                        onClick={() => this.selanjutnya()}
                      >
                        Selanjutnya
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = { articleRecommended: [], article: [] };
  let response;
  response = await axios.get(`${Config.API_PUBLIC_URL}/article/recommend`);
  try {
    props.articleRecommended = response.data.data.articles;
  } catch (error) {}
  response = await axios.get(
    `${Config.API_PUBLIC_URL}/article?is_popular=true&current_page=1&limit=8`
  );
  try {
    props.article = response.data.data.article;
    props.articleMeta = response.data.data.meta;
  } catch (error) {}
  response = await axios.get(`${Config.API_PUBLIC_URL}/category`);
  try {
    props.topicList = response.data.data.categories;
  } catch (error) {}
  response = await axios.get(`${Config.API_PUBLIC_URL}/ebook`);
  try {
    props.ebookList = response.data.data;
  } catch (error) {}
  return { props: props };
}

export default ArticleList;
