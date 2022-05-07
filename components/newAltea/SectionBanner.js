import React, { Component } from "react";
import * as Config from "../../config";

class SectionBanner extends Component {
  render() {
    return (
      <div className="container-fluid new-altea-section-one">
        <div className="row">
          <div className="col-sm new-altea-section-one-description">
            <div className="new-altea-homepage-title">
              Konsultasi Dengan Dokter <br /> Spesialis Berpengalaman
            </div>
            <div className="new-altea-homepage-subtitle">
              Memberikan konsultasi kesehatan Anda <br /> dengan Dokter
              Spesialis berpengalaman
            </div>
            <div>
              <span className="new-altea-button-primary">
                Konsultasi Sekarang
              </span>
            </div>
          </div>
          <div className="col-sm">
            <div>
              <img
                src={`${Config.BASE_URL}/icon/section-one-image.png`}
                alt="icon-profile"
                className="new-altea-section-one-image"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionBanner;
