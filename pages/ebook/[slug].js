import React from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import validator from "validator";
import { reactLocalStorage } from "reactjs-localstorage";
import { getCookies } from "cookies-next";
import * as Config from "./../../config";

import EBook from "../../model/EBook";

import Header from "../../components/header";
import TopBar from "../../components/topbar";

class EbookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: process.browser ? reactLocalStorage.getObject("user", null) : null,
      ebook: EBook.fromDB(props.ebook),
      ebookRecommended: props.ebookRecommended.map((item) =>
        EBook.fromDB(item)
      ),
    };
    this.handleFormChange = this.handleFormChange.bind(this);
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

  downloadEbook(slug) {
    axios
      .post(`${Config.API_PUBLIC_URL}/ebook/${slug}`)
      .then((response) => console.log(response));
  }

  render() {
    return (
      <div className="main">
        <Header
          title={this.state.ebook.title}
          metadata={this.state.ebook.title}
          tags={this.state.ebook.tags}
        ></Header>
        <main>
          <TopBar login={this.props.login}></TopBar>

          <div className="ebook-detail-page">
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
                  <Link href={`/ebook-list`}>
                    <a>E-book</a>
                  </Link>
                </div>
                <div style={{ minWidth: "4px" }}></div>
                <div>/</div>
                <div style={{ minWidth: "4px" }}></div>
                {this.state.ebook != null && (
                  <div>{this.state.ebook.title}</div>
                )}
              </div>
            </div>
            {this.state.ebook != null && (
              <>
                <div className="container" style={{ maxWidth: "700px" }}>
                  <div style={{ minHeight: "40px" }}></div>
                  <div className="article-title">{this.state.ebook.title}</div>
                  <div className="article-meta">
                    <div className="writer">
                      Penyusun :{" "}
                      <span className="text-info">
                        {this.state.ebook.createdBy}
                      </span>
                    </div>
                  </div>
                  <div className="article-meta d-flex justify-content-between">
                    {this.state.ebook.reviewer != null &&
                      this.state.ebook.reviewer !== "" && (
                        <div className="writer">
                          Ditinjau oleh :{" "}
                          <span className="text-info">
                            {this.state.ebook.reviewer}
                          </span>
                        </div>
                      )}
                    <div className="date">
                      {moment(this.state.ebook.date).format(
                        "dddd, DD MMMM YYYY"
                      )}
                    </div>
                  </div>
                  <div className="article-category">
                    <a
                      href={`${Config.BASE_URL}/topic/${this.state.ebook.category}?ebook=1`}
                    >
                      {this.state.ebook.category}
                    </a>
                  </div>
                  <div style={{ minHeight: "30px" }}></div>
                  <div className="d-flex flex-column flex-md-row">
                    <div className="cover">
                      <img src={this.state.ebook.cover} alt="" />
                      <div style={{ minHeight: "30px" }}></div>
                      <div className="download-button">
                        <a
                          href={this.state.ebook.download}
                          onClick={() =>
                            this.downloadEbook(this.state.ebook.slug)
                          }
                          download
                        >
                          <button>Unduh e-book</button>
                        </a>
                      </div>
                    </div>
                    <div style={{ minHeight: "40px", minWidth: "40px" }}></div>
                    <div
                      className="description d-flex flex-column"
                      style={{ minWidth: "65%" }}
                    >
                      <div className="description-header">Deskripsi</div>
                      <div
                        style={{ minHeight: "16px", minWidth: "16px" }}
                      ></div>
                      <div
                        className="content flex-grow-1"
                        dangerouslySetInnerHTML={{
                          __html: this.state.ebook.description,
                        }}
                      ></div>
                      <div
                        style={{ minHeight: "16px", minWidth: "16px" }}
                      ></div>
                      <div className="article-share d-flex flex-column flex-md-row">
                        <div className="share-text align-self-center">
                          Bagikan
                        </div>
                        <div
                          style={{ minHeight: "12px", minWidth: "12px" }}
                        ></div>
                        <div className="share-socmed d-flex align-self-center">
                          <div className="clickable">
                            {process.browser && (
                              <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                  window.location.href
                                )}&text=${this.state.ebook.title}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Image
                                  src={`/img/share-twitter-icon.png`}
                                  width={39}
                                  height={39}
                                  alt=""
                                />
                              </a>
                            )}
                          </div>
                          <div
                            style={{ minHeight: "2px", minWidth: "2px" }}
                          ></div>
                          <div className="clickable">
                            {process.browser && (
                              <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                  window.location.href
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Image
                                  src={`/img/share-linkedin-icon.png`}
                                  width={39}
                                  height={39}
                                  alt=""
                                />
                              </a>
                            )}
                          </div>
                          <div
                            style={{ minHeight: "2px", minWidth: "2px" }}
                          ></div>
                          <div className="clickable">
                            {process.browser && (
                              <a
                                href={`https://www.facebook.com/share.php?u=${encodeURIComponent(
                                  window.location.href
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Image
                                  src={`/img/share-fb-icon.png`}
                                  width={39}
                                  height={39}
                                  alt=""
                                />
                              </a>
                            )}
                          </div>
                          <div
                            style={{ minHeight: "2px", minWidth: "2px" }}
                          ></div>
                          <div className="clickable">
                            {process.browser && (
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                  window.location.href
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Image
                                  src={`/img/share-wa-icon.png`}
                                  width={39}
                                  height={39}
                                  alt=""
                                />
                              </a>
                            )}
                          </div>
                          <div
                            style={{ minHeight: "2px", minWidth: "2px" }}
                          ></div>
                          <div className="clickable">
                            <Image
                              src={`/img/share-link-icon.png`}
                              width={39}
                              height={39}
                              alt=""
                              data-tip="Link telah di Copy"
                            />
                            <ReactTooltip
                              place="bottom"
                              event="click"
                              eventOff="mouseleave mouseout scroll"
                              effect="float"
                              afterShow={() => {
                                setTimeout(ReactTooltip.hide, 5000);
                                this.copyText(window.location.href);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minHeight: "30px" }}></div>
                  {this.state.ebook.tags.length > 0 && (
                    <div className="article-tags">
                      {this.state.ebook.tags.map((item, index) => (
                        <Link key={index} href={`/tags/${item}?ebook=1`}>
                          <a>
                            <div className="tag">{item}</div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div style={{ minHeight: "30px" }}></div>
                </div>
                <div className="container">
                  {this.state.ebookRecommended.length > 0 && (
                    <div className="ebook-article">
                      <div className="d-flex justify-content-between">
                        <div className="title-2">Rekomendasi e-book</div>
                        <Link
                          // href={`/tags/${this.state.ebook.tags
                          //   .map((item) => encodeURIComponent(item))
                          //   .join("/")}?ebook=1`}
                          // href="ebook-list"
                          href={`${Config.BASE_URL}/ebook-list`}
                        >
                          <a className="align-self-center">
                            <div className="view-all">Lihat Semua</div>
                          </a>
                        </Link>
                      </div>
                      <div className="ebook-splide d-flex flex-column flex-md-row justify-content-between">
                        {this.state.ebookRecommended.map((item, index) => (
                          <div key={index} className="ebook-item">
                            <div className="d-flex ebook-item-wrapper">
                              {item.id != null && (
                                <>
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
                                      <a
                                        href={`${
                                          Config.BASE_URL
                                        }/ebook/${encodeURIComponent(
                                          item.slug
                                        )}`}
                                      >
                                        <button>Lihat e-book</button>
                                      </a>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            <div style={{ minHeight: "30px" }}></div>
          </div>
        </main>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = {};
  let slug = context.params.slug;
  let response;
  response = await axios.get(`${Config.API_PUBLIC_URL}/ebook/${slug}`);
  try {
    props.ebook = response.data.data;
  } catch (error) {}
  response = await axios.get(
    `${Config.API_PUBLIC_URL}/ebook/recommend-tag/${props.ebook.ebook_id}`
  );
  try {
    props.ebookRecommended = response.data.data.ebook;
    while (props.ebookRecommended.length < 3) props.ebookRecommended.push({});
  } catch (error) {}
  return {
    props: props,
  };
}

export default EbookDetail;
