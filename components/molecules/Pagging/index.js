import React, { Component, Fragment } from "react";
import Image from "next/image";
import * as Config from "../../../config";

class Pagging extends Component {
  generatePreviewPagination() {
    let pagination = {
      page: [],
    };
    const { form } = this.props;
    let currentPage = form.previewPage;
    let totalPage = form.totalPage;
    if (currentPage === 1) {
      let after = totalPage - currentPage;
      if (after === 0) {
        pagination.page.push(currentPage);
      } else if (after === 1) {
        pagination.page.push(currentPage);
        pagination.page.push(currentPage + 1);
      } else if (after === 2) {
        pagination.page.push(currentPage);
        pagination.page.push(currentPage + 1);
        pagination.page.push(currentPage + 2);
      } else if (after > 2) {
        pagination.page.push(currentPage);
        pagination.page.push(currentPage + 1);
        pagination.page.push(currentPage + 2);
      }
    } else if (currentPage === totalPage) {
      if (currentPage - 2 > 0) pagination.page.push(currentPage - 2);
      if (currentPage - 1 > 0) pagination.page.push(currentPage - 1);
      pagination.page.push(currentPage);
    } else {
      pagination.page.push(currentPage - 1);
      pagination.page.push(currentPage);
      pagination.page.push(currentPage + 1);
    }
    return pagination.page;
  }

  render() {
    const { form, article } = this.props;
    return (
      <div style={{ minHeight: "30px" }}>
        <div className="pagination d-flex justify-content-center">
          <div className="note align-self-center">Lanjut ke halaman</div>
          <div className="page clickable">
            {form.previewPage > 1 ? (
              <a
                href={`/article-detail/${article.slug}/${form.previewPage - 1}`}
                className="d-flex flex-column"
              >
                <Image
                  src={`/img/page-arrow-left.png`}
                  height={18}
                  width={18}
                  alt="arrow-left"
                />
              </a>
            ) : (
              <Image
                src={`/img/page-arrow-left.png`}
                height={18}
                width={18}
                alt="arrow-left"
              />
            )}
          </div>
          {this.generatePreviewPagination().map((item, index) => (
            <a
              key={index}
              href={`${Config.BASE_URL}/article-detail/${article.slug}/${item}`}
            >
              <div
                className={`page ${
                  item === form.previewPage ? "active" : ""
                } clickable`}
              >
                {item}
              </div>
            </a>
          ))}
          <div className="page clickable">
            {form.previewPage < form.totalPage ? (
              <a
                href={`/article-detail/${article.slug}/${form.previewPage + 1}`}
                className="d-flex flex-column"
              >
                <Image
                  src={`/img/page-arrow-right.png`}
                  height={18}
                  width={18}
                  alt="arrow-right"
                />
              </a>
            ) : (
              <Image
                src={`/img/page-arrow-right.png`}
                height={18}
                width={18}
                alt="arrow-right"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Pagging;
