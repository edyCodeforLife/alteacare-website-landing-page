import React, { Component } from "react";
import { doctorSpecialize } from "./API/Auth/doctorSpecialize";

class SectionDoctorSpecialize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialization: [],
    };
  }
  componentDidMount() {
    this.getSpecialization();
  }

  getSpecialization = async () => {
    await doctorSpecialize().then((response) => {
      this.setState({
        specialization: response.data,
      });
    });
  };
  render() {
    return (
      <div className="section-doctor-specialize">
        <div className="container">
          <div className="section-doctor-specialize-title">
            Dokter Spesialis
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-row flex-nowrap overflow-auto">
            {this.state.specialization.map((x, index) => {
              return (
                <div className="new-altea-card" key={index}>
                  <div className="flex-column text-center">
                    <div className="new-altea-icon-of-doctor-specialize">
                      <img src={x.icon.formats.thumbnail} alt={x.name} />
                    </div>
                    <div className="new-altea-title-of-doctor-specialize">
                      {x.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SectionDoctorSpecialize;
