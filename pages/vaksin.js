import React from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import TagManager from "react-gtm-module";
import * as Config from "./../config";

import Home from "./index";

class Vaksin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="main">
        <Home login={true}></Home>
      </div>
    );
  }
}

export async function getStaticProps() {
  return {
    props: {
      test: "hola",
    },
  };
}

export default Vaksin;
