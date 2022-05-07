/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";

function ModalLogin({
  form,
  handleFormChange,
  handlePrevState,
  switchAuthForgotEmail,
  onClickLogin,
  switchAuthRegisterProfile,
}) {
  return (
    <div className="content">
      <div className="subheader text-center">
        Silahkan Login terlebih dahulu
      </div>
      <div className="form">
        <div className="form-group">
          <input
            type="email"
            name="loginEmail"
            value={form.loginEmail}
            onChange={handleFormChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <div className="form-password">
            <input
              type={form.loginPasswordVisibility ? "text" : "password"}
              name="loginPassword"
              value={form.loginPassword}
              onChange={handleFormChange}
              placeholder="Password"
            />
            <div onClick={handlePrevState} className="eye-icon clickable">
              <i
                className={`fa ${
                  form.loginPasswordVisibility ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div
            onClick={switchAuthForgotEmail}
            className="forgot-password clickable"
          >
            Lupa Password ?
          </div>
        </div>
        <div className="form-group">
          <button onClick={onClickLogin} type="button" className="submit">
            Login
          </button>
        </div>

        <div
          onClick={switchAuthRegisterProfile}
          className="no-account clickable"
        >
          Belum Punya Akun ? Daftar
        </div>
      </div>
    </div>
  );
}

ModalLogin.propTypes = {
  //   name: PropTypes.string,
};

export default ModalLogin;
