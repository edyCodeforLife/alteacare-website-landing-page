/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Config from "../config";

class Download extends React.Component {
  render() {
    return (
      <div id="download" className="download">
        <div className="container">
          <div className="title">
            Telekonsultasi dan daftar Vaksinasi COVID-19 <br />
            di AlteaCare
          </div>

          <div className="download-btn d-flex flex-column flex-md-row justify-content-center">
            <div>
              <a
                href={Config.URL_MOBILE_APPS_ANDROID}
                className="gtm linkClick"
              >
                <img src="img/play-download.png" alt="icon play alteacare" />
              </a>
            </div>
            <div style={{ width: "30px" }}></div>
            <div>
              <a href={Config.URL_MOBILE_APPS_IOS} className="gtm linkClick">
                <img src="img/store-download.png" alt="altea store download" />
              </a>
            </div>
          </div>

          <div className="list">
            <div className="d-flex flex-md-row flex-column">
              <div className="item flex-grow-1">
                <img src="img/download-1.png" alt="altea download" />
              </div>
              <div className="item flex-grow-1">
                <img src="img/download-2.png" alt="altea download" />
              </div>
              <div className="item flex-grow-1">
                <img src="img/download-3.png" alt="altea download" />
              </div>
              <div className="item flex-grow-1">
                <img src="img/download-4.png" alt="altea download" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
