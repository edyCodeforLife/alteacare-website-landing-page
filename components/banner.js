/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Config from "./../config";
import * as ga from "../lib/ga";

class Banner extends React.Component {
  onClick() {
    window.location.href = "https://bit.ly/AlteaCare122";
  }

  getMobileOperatingSystem() {
    if (!process.browser) return "OTHERS";
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) return "ANDROID";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "IOS";
    return "OTHERS";
  }

  goToDevice() {
    const deviceType = this.getMobileOperatingSystem();

    if (deviceType === "ANDROID") {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Download Mobile Apps Android",
          event_category: "Homepage",
        },
      });
      window.open(Config.URL_MOBILE_APPS_ANDROID, "_ blank");
    } else if (deviceType === "IOS") {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Download Mobile Apps IOS",
          event_category: "Homepage",
        },
      });
      window.open(Config.URL_MOBILE_APPS_IOS, "_ blank");
    } else {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Banner Download Mobile Apps OTHERS",
          event_category: "Homepage",
        },
      });
      window.open(Config.URL_MOBILE_APPS_OTHERS, "_ blank");
    }
  }

  render() {
    return (
      <div onClick={() => this.goToDevice()} className="new-banner clickable">
        <img
          src={`${Config.BASE_URL}/img/Campaign_IG_Feed_10_Feb_FIN_1500x500_B.jpg.jpg`}
          alt=""
          style={{ width: "100%" }}
        />
      </div>
    );
  }
}

export default Banner;
