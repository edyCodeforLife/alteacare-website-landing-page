import React from "react";
import * as Config from "../../config";

const data = [
  {
    title: "1. Download dan Registrasi",
    substitle: "Download Aplikasi AlteaCare dan Registrasi data diri",
    image1: "playstore.svg",
    image2: "appstore.svg",
    main_image: "cara-konsultasi/1.png",
  },
  {
    title: "2. Pilih Dokter Spesialis",
    substitle: "Cari dan pilih Dokter yang sesuai dengan keluhan",
    image1: "",
    image2: "",
    main_image: "cara-konsultasi/2.png",
  },
  {
    title: "3. Pilih Jadwal Telekonsultasi",
    substitle: "Pilih slot waktu yang tersedia untuk jadwal Telekonsultasi",
    image1: "",
    image2: "",
    main_image: "cara-konsultasi/3.png",
  },
  {
    title: "4. Telekonsultasi dari rumah",
    substitle: "Temui Dokter Spesialis dari Rumah dengan Video Call",
    image1: "",
    image2: "",
    main_image: "cara-konsultasi/4.png",
  },
];
const delay = 3500;

function SectionCaraKonsultasi(props) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  console.log(index);
  return (
    <div className="container">
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{
            transform: `translate3d(${-index * 100}%, 0, 0)`,
            opacity: 1,
          }}
        >
          {data.map((x, index) => (
            <div className="slide" key={index}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="slideshow-title">
                      Cara Berkonsultasi di <br /> AlteaCare
                    </div>
                    <div className="slideshow-card">
                      <div className="slideshow-card-title">{x.title}</div>
                      <div className="slideshow-card-subtitle">
                        {x.substitle}
                      </div>
                      <div>
                        {x.image1 !== "" && (
                          <img
                            src={`${Config.BASE_URL}/icon/${x.image1}`}
                            alt="x.image1"
                            style={{ marginRight: 12 }}
                          />
                        )}
                        {x.image2 !== "" && (
                          <img
                            src={`${Config.BASE_URL}/icon/${x.image2}`}
                            alt="x-image2"
                          />
                        )}
                      </div>
                      <div className="slideshowDots">
                        {data.map((_, idx) => (
                          <div
                            key={idx}
                            className={`slideshowDot${
                              index === idx ? " active" : ""
                            }`}
                            onClick={() => {
                              setIndex(idx);
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    {x.main_image !== "" && (
                      <img
                        className="slideshow-main-image"
                        src={`${Config.BASE_URL}/icon/${x.main_image}`}
                        alt="x.main_image"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionCaraKonsultasi;
