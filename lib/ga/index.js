export const pageview = (url) => {
  try {
    if (window.gtag)
      window.gtag("config", "UA-213149462-1", {
        page_path: url,
      });
  } catch (error) {
    console.log("Error from the trackerPageView => ", error);
  }
};

export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
