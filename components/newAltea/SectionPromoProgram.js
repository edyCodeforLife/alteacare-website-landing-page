import React, { Component } from "react";
import { promoProgram } from "./API/Auth/promoProgram";

class SectionPromoProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promo_programs: [],
    };
  }
  componentDidMount() {
    this.getPromoPrograms();
  }

  getPromoPrograms = async () => {
    await promoProgram().then((response) => {
      this.setState({
        promo_programs: response.data,
      });
    });
  };
  render() {
    return (
      <div className="section-promo-program">
        <div className="container">
          <div className="section-promo-program-title">Promo Program</div>
        </div>
        <div className="container">
          <div className="d-flex flex-row flex-nowrap overflow-auto">
            {this.state.promo_programs.map((x, index) => {
              return (
                <div className="new-altea-card-promo-program" key={index}>
                  <img src={x.image_desktop} alt={x.category} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SectionPromoProgram;
