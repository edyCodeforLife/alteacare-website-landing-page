/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";

function ModalForgotEmail({ form, handleFormChange, checkEmailForgot }) {
  return (
    <div className="content">
      <div className="subheader text-center">Periksa Ketersediaan Email</div>
      <div className="form">
        <div className="form-group">
          <input
            type="email"
            name="forgotPassEmail"
            value={form.forgotPassEmail}
            onChange={handleFormChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <button onClick={checkEmailForgot} type="button" className="submit">
            SELANJUTNYA
          </button>
        </div>
      </div>
    </div>
  );
}

ModalForgotEmail.propTypes = {
  //   name: PropTypes.string,
};

export default ModalForgotEmail;
