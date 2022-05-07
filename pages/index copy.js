/* eslint-disable @next/next/no-document-import-in-page */
import React, { Component } from "react";
import Header from "../components/header";
import TopBar from "../components/topbar";
import Banner from "../components/banner";
import HowTo from "../components/how-to";
import Download from "../components/download";
import HomeArticle from "../components/home-article";
import AboutUs from "../components/about-us";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";

class index extends Component {
  render() {
    console.log("this.props", this.props);
    return (
      <div className="main">
        <Header></Header>
        <main>
          <TopBar login={this.props.login}></TopBar>
          <Banner></Banner>
          <HowTo></HowTo>
          <Download></Download>
          <HomeArticle></HomeArticle>
          <AboutUs></AboutUs>
          <ContactUs></ContactUs>
          <Footer></Footer>
        </main>
      </div>
    );
  }
}

export default index;
