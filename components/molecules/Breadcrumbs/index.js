/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

const Breadcrumbs = ({
  firstUrl,
  firstLabel,
  secondUrl,
  secondLabel,
  thirdUrl,
  thirdLabel,
}) => {
  return (
    <div className="tab-panel">
      <div className="container d-flex">
        <div>
          <a href={firstUrl}>{firstLabel}</a>
        </div>
        <div style={{ minWidth: "4px" }}></div>
        <div>/</div>
        <div style={{ minWidth: "4px" }}></div>
        <div>
          {secondUrl === "" ? (
            secondLabel
          ) : (
            <a href={secondUrl}>{secondLabel}</a>
          )}
        </div>
        <div style={{ minWidth: "4px" }}></div>
        <div>{secondUrl === "" ? "" : "/"}</div>
        <div style={{ minWidth: "4px" }}></div>
        {thirdLabel}
      </div>
    </div>
  );
};

export default Breadcrumbs;
