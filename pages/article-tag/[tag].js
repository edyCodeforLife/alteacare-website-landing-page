/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import * as Config from "./../../config";

import Header from "../../components/header";
import TopBar from "../../components/topbar";
import Footer from "../../components/footer";

class TopicArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag,
      article: props.article,
      maxNewestArticle: 8,
      form: {
        search: "",
      },
    };

    this.viewarticle = this.viewarticle.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addMoreNewest = this.addMoreNewest.bind(this);
  }

  async componentDidMount() {}

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form: form });
  }

  viewarticle() {
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

  addMoreNewest() {
    this.setState({ maxNewestArticle: this.state.maxNewestArticle + 6 });
  }

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
        ></Header>
        <main>
          <TopBar login={this.props.login}></TopBar>

          <div id="article-detail" className="article-detail">
            <div className="tab-panel">
              <div className="container d-flex">
                <div>
                  <a href="/">Beranda</a>
                </div>
                <div style={{ minWidth: "4px" }}></div>
                <div>/</div>
                <div style={{ minWidth: "4px" }}></div>
                <div>Tags</div>
                <div style={{ minWidth: "4px" }}></div>
                <div>/</div>
                <div style={{ minWidth: "4px" }}></div>
                <div>{this.state.tag}</div>
              </div>
            </div>
            <div className="container">
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
              {this.state.article.length > 0 && (
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
              )}
              {this.state.form.search !== "" && (
                <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
              )}
              {this.state.article.length > 0 && (
                <div className="newest-article">
                  {this.state.form.search !== "" && (
                    <div className="title">
                      Hasil Pencarian untuk &quot;{this.state.form.search}&quot;
                    </div>
                  )}
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="tags-title">
                    Tags :{" "}
                    <span>
                      <a href={`${Config.BASE_URL}/tags/${this.state.tag}`}>
                        {this.state.tag}
                      </a>
                    </span>
                  </div>
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div
                    className="d-flex flex-column flex-md-row flex-wrap"
                    style={{ marginLeft: "-16px", marginRight: "-16px" }}
                  >
                    {this.viewarticle().list.map((item, index) => (
                      <React.Fragment key={index}>
                        <a
                          href={`/article-detail/${item.slug}`}
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
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ minWidth: "20px", minHeight: "20px" }}></div>
                  {this.viewarticle().haveMore && (
                    <div className="text-center">
                      <button className="add-more" onClick={this.addMoreNewest}>
                        Selanjutnya
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = { article: [] };
  props.tag = context.params.tag;
  let response;
  try {
    response = await axios.get(
      `${Config.API_PUBLIC_URL}/article/tag/${props.tag}`
    );
    props.article = response.data.data.articles;
  } catch (error) {}
  return {
    props: props,
  };
}

export default TopicArticle;
