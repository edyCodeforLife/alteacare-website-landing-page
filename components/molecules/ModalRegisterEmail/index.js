/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";

function ModalRegisterEmail({ form, handleFormChange, checkEmail }) {
  return (
    <div className="content">
      <div className="subheader text-center">Periksa Ketersediaan Email</div>
      <div className="form">
        <div className="form-group">
          <input
            type="email"
            name="checkMailEmail"
            value={form.checkMailEmail}
            onChange={handleFormChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <button onClick={checkEmail} type="button" className="submit">
            SELANJUTNYA
          </button>
        </div>
      </div>
    </div>
  );
}

ModalRegisterEmail.propTypes = {
  //   name: PropTypes.string,
};

export default ModalRegisterEmail;
