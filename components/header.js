import React from "react";
import Head from "next/head";
import Script from "next/script";
import TagManager from "react-gtm-module";
import * as Config from "./../config";

class Header extends React.Component {
  componentDidMount() {
    if (process.browser) TagManager.initialize({ gtmId: "GTM-KK7HQH2" });
  }

  render() {
    const { title, metadata, tags } = this.props;
    return (
      <Head>
        <meta charSet="utf-8" />
        <title>{title ? title : "AlteaCare"}</title>
        <link rel="icon" href={`${Config.BASE_URL}/favicon.ico`} />
        <meta name="yandex-verification" content="3805309f9cfd42f0" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="description"
          content={
            metadata
              ? metadata
              : "AlteaCare adalah layanan kesehatan di Indonesia. AlteaCare membantu pasien untuk dapat memperoleh manfaat spesial setelah bertransaksi di Rumah Sakit Mitra Keluarga."
          }
        />
        <meta
          name="keywords"
          content={tags ? tags : "Mitra Keluarga, covid19, vaksin, vaksinasi"}
        />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
        <link
          rel="apple-touch-icon"
          href={`${Config.BASE_URL}/altealogo192.png`}
        />
        <link rel="manifest" href={`${Config.BASE_URL}/manifest.json`} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href={`${Config.BASE_URL}/css/style.css?v=0.7`}
        />

        <link rel="stylesheet" href={`${Config.BASE_URL}/css/newAltea.css`} />
        <script
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
          defer
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
          defer
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          defer
        ></script>

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-213149462-1`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-213149462-1', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
    );
  }
}

export default Header;
