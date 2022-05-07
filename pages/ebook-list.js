import React from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import * as Config from "./../config";

import EBook from "../model/EBook";

import Header from "../components/header";
import TopBar from "../components/topbar";
import Footer from "../components/footer";

class EbookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        search: "",
      },
      ebookList: props.ebookList.map((item) => EBook.fromDB(item)),
    };

    this.handleFormChange = this.handleFormChange.bind(this);
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

  render() {
    return (
      <div className="main">
        <Header
          title={
            "AlteaCare EBook kesehatan terlengkap, terpercaya, dan teruji secara ilmiah"
          }
          metadata={
            "Daftar E-Book kesehatan terlengkap, terpercaya, dan teruji secara ilmiah. Kumpulan E-Book kesehatan dari AlteaCate Mitra Keluarga"
          }
          tags={
            "E-Book, EBook, publikasi, ilmiah, informasi, kesehatan, covid19, swab, antigen, mitra keluarga"
          }
        ></Header>
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
                <div>Ebook</div>
              </div>
            </div>
            <div className="container">
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
              {this.state.ebookList.length > 0 && (
                <div className="d-flex flex-md-row flex-column">
                  <div className="article-filter flex-grow-1">
                    <input
                      name="search"
                      type="text"
                      onChange={this.handleFormChange}
                      placeholder="Cari ebook berdasarkan judul, topik, tag"
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
              {this.state.ebookList.length > 0 && (
                <div className="ebook-article">
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="d-flex justify-content-between">
                    {this.state.form.search === "" && (
                      <div className="title">Publikasi</div>
                    )}
                    {this.state.form.search !== "" && (
                      <div className="title">
                        Hasil Pencarian untuk &quot;{this.state.form.search}
                        &quot;
                      </div>
                    )}
                  </div>
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="ebook-splide d-flex flex-wrap">
                    {this.state.ebookList
                      .filter(
                        (item, index) =>
                          this.state.form.search === "" ||
                          item.search(this.state.form.search)
                      )
                      .map((item, index) => (
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
                                style={{ minWidth: "13px", minHeight: "13px" }}
                              ></div>
                              <div className="ebook-date">
                                {moment(item.date).format("dddd, DD MMMM YYYY")}
                              </div>
                              <div
                                style={{ minWidth: "13px", minHeight: "13px" }}
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
                </div>
              )}
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
            </div>
          </div>

          <Footer></Footer>
        </main>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = { ebookList: [] };
  let response;
  response = await axios.get(`${Config.API_PUBLIC_URL}/ebook`);
  try {
    props.ebookList = response.data.data;
  } catch (error) {}
  return { props: props };
}

export default EbookList;
