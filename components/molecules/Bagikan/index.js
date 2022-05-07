/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Image from "next/image";
import ReactTooltip from "react-tooltip";
import * as Config from "../../../config";

const Breadcrumbs = ({ url, article }) => {
  return (
    <div>
      <div className="share-text align-self-center">Bagikan</div>
      <div style={{ minHeight: "12px", minWidth: "12px" }}></div>
      <div className="share-socmed d-flex align-self-center">
        <div className="clickable">
          {process.browser && (
            <a
              href={`https://twitter.com/intent/tweet?url=${url}&text=${article.title}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`/img/share-twitter-icon.png`}
                width={39}
                height={39}
                alt=""
              />
            </a>
          )}
        </div>
        <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
        <div className="clickable">
          {process.browser && (
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`/img/share-linkedin-icon.png`}
                width={39}
                height={39}
                alt=""
              />
            </a>
          )}
        </div>
        <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
        <div className="clickable">
          {process.browser && (
            <a
              href={`https://www.facebook.com/share.php?u=${url}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`/img/share-fb-icon.png`}
                width={39}
                height={39}
                alt=""
              />
            </a>
          )}
        </div>
        <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
        <div className="clickable">
          {process.browser && (
            <a
              href={`https://wa.me/?text=${url}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`/img/share-wa-icon.png`}
                width={39}
                height={39}
                alt=""
              />
            </a>
          )}
        </div>
        <div style={{ minHeight: "8px", minWidth: "8px" }}></div>
        <div className="clickable">
          <Image
            src={`/img/share-link-icon.png`}
            width={39}
            height={39}
            alt=""
            data-tip="Link telah di Copy"
          />
          <ReactTooltip
            place="bottom"
            event="click"
            eventOff="mouseleave mouseout scroll"
            effect="float"
            afterShow={() => {
              setTimeout(ReactTooltip.hide, 5000);
              navigator.clipboard.writeText(url);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
