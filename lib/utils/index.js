/* eslint-disable import/no-anonymous-default-export */
export const getQueryVariable = async (variable) => {
  if (typeof window !== "undefined") {
    // browser code
    const data = new URLSearchParams(window.location.search).get(variable);
    return data;
  } else {
    return "";
  }
};

export const getMobileOperatingSystem = () => {
  if (!process.browser) return "OTHERS";
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) return "ANDROID";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "IOS";
  return "OTHERS";
};

export const getPasswordValidity = (password) => {
  let result = [];
  // if(password === '') return '';
  if (!/\d/.test(password))
    result.push(
      <div key="1" className="text-danger">
        password harus mengandung angka
      </div>
    );
  if (!/[A-Z]/.test(password))
    result.push(
      <div key="2" className="text-danger">
        password harus mengandung huruf besar
      </div>
    );
  if (!/[a-z]/.test(password))
    result.push(
      <div key="3" className="text-danger">
        password harus mengandung huruf kecil
      </div>
    );
  if (password.length < 8)
    result.push(
      <div key="4" className="text-danger">
        password minimal 8 karakter
      </div>
    );
  return <div key="5">{result}</div>;
};

export const getConfirmPasswordValidity = (password1, password2) => {
  let result = [];
  // if(password === '') return '';
  if (password1 != password2)
    result.push(
      <div key="1" className="text-danger">
        password tidak sesuai
      </div>
    );
  if (password1 == "")
    result.push(
      <div key="2" className="text-danger">
        password tidak sesuai
      </div>
    );
  return <div key="3">{result}</div>;
};
