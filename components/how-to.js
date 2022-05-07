/* eslint-disable @next/next/no-img-element */
import React from "react";

class HowTo extends React.Component {
  render() {
    return (
      <div className="how-to">
        <div className="container">
          <div className="title">Cara Telekonsultasi di AlteaCare</div>
          <div className="list">
            <div className="d-flex flex-md-row flex-column">
              <div className="item flex-grow-1">
                <div className="d-flex flex-column h-100">
                  <div className="img">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <div className="text-center">
                        <img src={`/img/how-to-1.png`} alt="AlteaCare" />
                      </div>
                    </div>
                  </div>
                  <div className="caption flex-grow-1">
                    <h5>1. Download dan Registrasi</h5>
                    <p>Download Aplikasi AlteaCare dan Registrasi data diri</p>
                  </div>
                </div>
              </div>
              <div className="item flex-grow-1">
                <div className="d-flex flex-column h-100">
                  <div className="img">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <div className="text-center">
                        <img src={`/img/how-to-2.png`} alt="AlteaCare" />
                      </div>
                    </div>
                  </div>
                  <div className="caption flex-grow-1">
                    <h5>2. Pilih Dokter Spesialis</h5>
                    <p>Cari dan pilih Dokter yang sesuai dengan keluhan</p>
                  </div>
                </div>
              </div>
              <div className="item flex-grow-1">
                <div className="d-flex flex-column h-100">
                  <div className="img">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <div className="text-center">
                        <img src={`/img/how-to-3.png`} alt="AlteaCare" />
                      </div>
                    </div>
                  </div>
                  <div className="caption flex-grow-1">
                    <h5>3. Pilih Jadwal Telekonsultasi</h5>
                    <p>
                      Pilih slot waktu yang tersedia untuk jadwal Telekonsultasi
                    </p>
                  </div>
                </div>
              </div>
              <div className="item flex-grow-1">
                <div className="d-flex flex-column h-100">
                  <div className="img">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <div className="text-center">
                        <img src={`/img/how-to-4.png`} alt="AlteaCare" />
                      </div>
                    </div>
                  </div>
                  <div className="caption flex-grow-1">
                    <h5>4. Telekonsultasi dari rumah</h5>
                    <p>Temui Dokter Spesialis dari Rumah dengan Video Call</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowTo;
