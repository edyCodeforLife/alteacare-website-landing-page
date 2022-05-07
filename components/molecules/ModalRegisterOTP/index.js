/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";

function ModalRegisterOTP({ form, handleFormChange, checkOTP }) {
  return (
    <div className="content">
      <div className="subheader text-center">
        Masukkan kode otp yang telah dikirim ke Email anda
      </div>
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            name="registerKodeOTP"
            value={form.registerKodeOTP}
            onChange={handleFormChange}
            placeholder="Kode OTP"
          />
        </div>
        <div className="form-group">
          <button onClick={checkOTP} type="button" className="submit">
            SELANJUTNYA
          </button>
        </div>
      </div>
    </div>
  );
}

ModalRegisterOTP.propTypes = {
  //   name: PropTypes.string,
};

export default ModalRegisterOTP;
