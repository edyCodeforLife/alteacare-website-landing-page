/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";

function ModalForgotUpdate({
  form,
  handleFormChange,
  forgotNewPasswordVisibility,
  getPasswordValidity,
  forgotNewPasswordConfirmVisibility,
  getConfirmPasswordValidity,
  forgotPasswordUpdate,
}) {
  return (
    <div className="content">
      <div className="subheader text-center">
        Masukkan password anda yang baru
      </div>
      <div className="form">
        <div className="form-group">
          <div className="form-password">
            <input
              type={form.forgotNewPasswordVisibility ? "text" : "password"}
              name="forgotNewPassword"
              value={form.forgotNewPassword}
              onChange={handleFormChange}
              placeholder="Password"
            />
            <div
              onClick={forgotNewPasswordVisibility}
              className="eye-icon clickable"
            >
              <i
                className={`fa ${
                  form.forgotNewPasswordVisibility ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </div>
          </div>
          <div>
            <small>
              <em>{getPasswordValidity}</em>
            </small>
          </div>
        </div>
        <div className="form-group">
          <div className="form-password">
            <input
              type={
                form.forgotNewPasswordConfirmVisibility ? "text" : "password"
              }
              name="forgotNewPasswordConfirm"
              value={form.forgotNewPasswordConfirm}
              onChange={handleFormChange}
              placeholder="Konfirmasi Password"
            />
            <div
              onClick={forgotNewPasswordConfirmVisibility}
              className="eye-icon clickable"
            >
              <i
                className={`fa ${
                  form.forgotNewPasswordConfirmVisibility
                    ? "fa-eye-slash"
                    : "fa-eye"
                }`}
              ></i>
            </div>
          </div>
          <div>
            <small>
              <em>{getConfirmPasswordValidity}</em>
            </small>
          </div>
        </div>
        <div className="form-group">
          <button
            onClick={forgotPasswordUpdate}
            type="button"
            className="submit"
          >
            SELANJUTNYA
          </button>
        </div>
      </div>
    </div>
  );
}

ModalForgotUpdate.propTypes = {
  //   name: PropTypes.string,
};

export default ModalForgotUpdate;
