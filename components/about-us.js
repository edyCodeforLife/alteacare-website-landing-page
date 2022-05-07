/* eslint-disable @next/next/no-img-element */
import React from "react";

class AboutUs extends React.Component {
  render() {
    return (
      <div id="about-us" className="about-us">
        <div className="container">
          <div className="d-flex flex-column flex-md-row">
            <div className="left">
              <div className="wrapper">
                <img src="img/about-us-img.png" alt="about altecare" />
              </div>
            </div>
            <div className="middle"></div>
            <div className="right align-self-center">
              <h5>Tentang kami</h5>
              <p>
                AlteaCare adalah aplikasi kesehatan terintegrasi dan terlengkap
                di Indonesia. Berdiri di bawah naungan PT. Sehat Digital
                Nusantara, AlteaCare menawarkan berbagai layanan kesehatan,
                mulai dari telekonsultasi via panggilan video dengan dokter
                spesialis, pembelian dan pengiriman resep obat, pendaftaran
                vaksinasi, hingga informasi kesehatan terkini.
              </p>
              <p>
                Dengan menggandeng Mitra Keluarga sebagai mitra fasilitas
                layanan kesehatan pertama, AlteaCare siap memberikan layanan
                kesehatan terbaik melalui aplikasi yang tersedia di Android dan
                iOS. Temukan promo-promo menarik untuk telekonsultasi dan pembelian
                obat di aplikasi AlteaCare!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
