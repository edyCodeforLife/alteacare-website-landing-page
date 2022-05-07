/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";

function ModalForgotOTP({ form, handleFormChange, checkOTPForgot }) {
  return (
    <div className="content">
      <div className="subheader text-center">
        Masukkan kode otp yang telah dikirim ke Email anda
      </div>
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            name="forgotKodeOTP"
            value={form.forgotKodeOTP}
            onChange={handleFormChange}
            placeholder="Kode OTP"
          />
        </div>
        <div className="form-group">
          <button onClick={checkOTPForgot} type="button" className="submit">
            SELANJUTNYA
          </button>
        </div>
      </div>
    </div>
  );
}

ModalForgotOTP.propTypes = {
  //   name: PropTypes.string,
};

export default ModalForgotOTP;
