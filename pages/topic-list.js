import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import * as Config from "./../config";

import Header from "../components/header";
import TopBar from "../components/topbar";

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: props.topicList,
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
                  <Link href="/">
                    <a>Beranda</a>
                  </Link>
                </div>
                <div style={{ minWidth: "4px" }}></div>
                <div>/</div>
                <div style={{ minWidth: "4px" }}></div>
                <div>Topik</div>
              </div>
            </div>
            <div className="container">
              {this.state.topicList.length > 0 && (
                <div className="topic-article">
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="d-flex justify-content-between">
                    <div className="title">Semua Topik</div>
                  </div>
                  <div style={{ minWidth: "32px", minHeight: "32px" }}></div>
                  <div className="topic-splide d-flex flex-wrap">
                    {this.state.topicList.map((item, index) => (
                      <div key={index} className="topic-item">
                        <Link
                          href={`${Config.BASE_URL}/topic/${encodeURIComponent(
                            item.name
                          )}`}
                        >
                          <a>
                            <div
                              className="topic-img"
                              style={{
                                backgroundImage: `url('${item.image}')`,
                              }}
                            ></div>
                            <div className="topic-title">{item.name}</div>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ minWidth: "40px", minHeight: "40px" }}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let props = { topicList: [] };
  let response;
  response = await axios.get(`${Config.API_PUBLIC_URL}/category`);
  try {
    props.topicList = response.data.data.categories;
  } catch (error) {}
  return { props: props };
}

export default TopicList;
