import React from "react";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/id";
import * as Config from "./../config";
import api from "../@api";
import Router, { withRouter } from "next/router";
import * as ga from "../lib/ga";

class HomeArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    api
      .get(`${Config.PATH_ARTICLE}`, {
        params: {
          is_popular: false,
        },
      })
      .then((response) => {
        try {
          this.setState({ article: response.data.data.article });
        } catch (error) {
          Swal.fire(error.message);
        }
      });
  };

  goToDetail = (to, title, path, id) => {
    const detail = `Go to ${to} : ${title} `;
    ga.event({
      action: detail,
      params: {
        search_term: title,
        event_category: "Homepage",
      },
    });
    Router.push(`${Config.BASE_URL}${path}/${id}`);
  };

  render() {
    return (
      <div id="article-section" className="article">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="title">Artikel Kesehatan Terbaru</div>
            <div className="align-self-end view-all">
              <span
                className="spanButton view-all clickable"
                onClick={() =>
                  this.goToDetail(
                    "List Articles",
                    "All Articles",
                    "/article-list",
                    ""
                  )
                }
              >
                Lihat Semua
              </span>
            </div>
          </div>
          <div style={{ minWidth: "30px", minHeight: "30px" }}></div>
          <div className="d-flex flex-column flex-md-row">
            {this.state.article
              ? this.state.article.map(
                  (item, index) =>
                    index < 3 && (
                      <React.Fragment key={index}>
                        <span
                          onClick={() =>
                            this.goToDetail(
                              "Detail Article",
                              item.title,
                              "/article-detail",
                              item.slug
                            )
                          }
                          style={{ maxWidth: "360px", flexBasis: "33%" }}
                          className="article-card spanButton clickable"
                        >
                          <div className="d-flex flex-column h-100">
                            <div
                              className="top"
                              style={{
                                backgroundImage: `url('${item.image}')`,
                              }}
                            ></div>
                            <div className="bottom flex-grow-1 d-flex flex-column">
                              <div className="article-title">{item.title}</div>
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
                        </span>
                        {index < 2 && (
                          <div
                            style={{ minWidth: "45px", minHeight: "45px" }}
                          ></div>
                        )}
                      </React.Fragment>
                    )
                )
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeArticle;
