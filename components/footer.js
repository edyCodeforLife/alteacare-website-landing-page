/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import axios from "axios";
import validator from "validator";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";
import * as Config from "./../config";
import SubscribeModal from "./subscribe-modal";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer>
        <div className="container">
          <div className="d-flex flex-md-row flex-column">
            <div className="footer-subscribe flex-grow-1 flex-basis-0">
              <div className="text-caption">
                Dapatkan berita-berita terbaru terkait kesehatan dan juga
                berbagai tips untuk menjadi orang yang lebih sehat
              </div>
              <div style={{ minHeight: "24px", minWidth: "24px" }}></div>
              <button
                id="subscriber-button"
                className="subscribe-button"
                data-toggle="modal"
                data-target="#subscriber-modal"
              >
                Berlangganan
              </button>
            </div>
            <div style={{ minHeight: "24px", minWidth: "24px" }}></div>
            <div className="footer-sitemap flex-grow-1 flex-basis-0">
              <div className="footer-logo">
                <a href={Config.BASE_URL}>
                  <img
                    src={`${Config.BASE_URL}/img/footer-logo-img.png`}
                    alt=""
                  />
                </a>
              </div>
              <div style={{ minHeight: "16px", minWidth: "16px" }}></div>
              <div className="d-flex flex-column">
                <Link href="/article-list">
                  <a>Artikel Kesehatan</a>
                </Link>
                <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
                <Link href="/vaksin">
                  <a>Vaksinasi Covid-19</a>
                </Link>
                <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
                <Link href="/#about-us">
                  <a>Tentang Kami</a>
                </Link>

                <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
                <Link href="/#contact-us">
                  <a>Hubungi Kami</a>
                </Link>
                <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
                <Link href="/kebijakan-privasi">
                  <a>Kebijakan Privasi</a>
                </Link>
              </div>
            </div>
            <div style={{ minHeight: "24px", minWidth: "24px" }}></div>
            <div className="footer-contact flex-grow-1 flex-basis-0">
              <p>
                <strong>Kontak</strong>
              </p>
              <p>
                Jalan Raya Bintaro Utama, Bintaro Jaya <br /> Sektor 3A
                Tangerang Selatan 15225
              </p>
              <p>
                Hotline WA Alteacare <br />
                <strong>+62 811 1913 9245</strong>
                <br />
                email : cs@alteacare.com
              </p>
              <div className="d-flex">
                <div className="align-self-center">
                  <strong>Ikuti Kami</strong>
                </div>
                <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                <div className="align-self-center">
                  <a
                    href="https://www.instagram.com/alteacare.id/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`${Config.BASE_URL}/img/footer-ig-logo.png`}
                      alt=""
                    />
                  </a>
                </div>
                <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                <div className="align-self-center">
                  <a
                    href="https://www.facebook.com/AlteaCare/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`${Config.BASE_URL}/img/footer-fb-logo.png`}
                      alt=""
                    />
                  </a>
                </div>
                <div style={{ minHeight: "4px", minWidth: "4px" }}></div>
                <div className="align-self-center">
                  <a
                    href="https://www.youtube.com/channel/UCNWx4hWEgCp_NoQxoM0o1hA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`${Config.BASE_URL}/img/footer-youtube-logo.png`}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <div style={{ minHeight: "24px", minWidth: "24px" }}></div>
            <div className="footer-download">
              <div className="d-flex flex-column">
                <div>
                  <strong>Download Aplikasi</strong>
                </div>
                <div style={{ minHeight: "14px", minWidth: "14px" }}></div>
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.dre.loyalty"
                    target="_blank"
                    rel="noreferrer"
                    className="gtm linkClick"
                  >
                    <img
                      src={`${Config.BASE_URL}/img/footer-google-play-download.png`}
                      alt=""
                    />
                  </a>
                </div>
                <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
                <div>
                  <a
                    href="https://apps.apple.com/id/app/alteacare/id1571455658"
                    target="_blank"
                    rel="noreferrer"
                    className="gtm linkClick"
                  >
                    <img
                      src={`${Config.BASE_URL}/img/footer-appstore-download.png`}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ minHeight: "80px", minWidth: "80px" }}></div>
        <div className="copyright">©2021 Alteacare All Rights Reserved</div>
        <SubscribeModal></SubscribeModal>
      </footer>
    );
  }
}

export default Footer;
