/**
 *
 * Header
 *
 */

import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";

const DatepickerInput = ({ ...props }) => (
  <input type="text" {...props} readOnly />
);

function ModalRegisterProfile({
  form,
  handleFormChange,
  countryList,
  onChangeRaw,
  onChangeSetBirthdate,
  handlePrevStateRegisterPassword,
  handlePrevStateConfirmPassword,
  getPasswordValidity,
  getConfirmPasswordValidity,
  register,
}) {
  return (
    <div className="content">
      <div className="subheader">
        Lengkapi data diri kamu <br />
        <small className="text-danger">
          <em>(Semua data wajib di isi)</em>
        </small>
      </div>
      <div className="form">
        <div className="form-group">
          <label>
            <strong>Nama Depan</strong>
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleFormChange}
            placeholder="Nama Depan"
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Nama Belakang</strong>
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleFormChange}
            placeholder="Nama Belakang"
          />
        </div>

        <div className="form-group">
          <label>
            <strong>Nomor HP</strong>
          </label>
          <input
            type="text"
            name="phoneNo"
            value={form.phoneNo}
            onChange={handleFormChange}
            placeholder="No. HP (Aktif WhatsApp)"
          />
        </div>

        <div className="form-group">
          <label>
            <strong>Jenis Kelamin</strong>
          </label>
          <select name="gender" value={form.gender} onChange={handleFormChange}>
            <option value="">Pilih Jenis Kelamin</option>
            {form.genderList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            <strong>Kewarganegaraan</strong>
          </label>
          <select
            name="country_id"
            value={form.country_id}
            onChange={handleFormChange}
          >
            <option value="">Pilih Negara</option>
            {countryList.map((item, index) => (
              <option key={index} value={item.country_id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            <strong>Tanggal Lahir</strong>
          </label>
          <DatePicker
            withPortal
            customInput={<DatepickerInput />}
            dateFormat="dd-MM-yyyy"
            onFocus={(e) => (e.target.readOnly = true)}
            onChangeRaw={onChangeRaw}
            onChange={onChangeSetBirthdate}
            selected={form.birthDate}
            showYearDropdown={true}
            dropdownMode={"select"}
            maxDate={moment().toDate()}
            placeholderText="Tanggal Lahir"
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Tempat Lahir</strong>
          </label>
          <input
            type="text"
            name="birthPlace"
            value={form.birthPlace}
            onChange={handleFormChange}
            placeholder="Tempat Lahir"
          />
        </div>
        <div style={{ minHeight: "40px" }}></div>

        <div className="form-group">
          <label>
            <strong>E-mail</strong>
          </label>
          <div className="form-password">
            <input
              type={"email"}
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group">
          <label>
            <strong>Password</strong>
          </label>
          <div className="form-password">
            <input
              type={form.registerPasswordVisibility ? "text" : "password"}
              name="registerPassword"
              value={form.registerPassword}
              onChange={handleFormChange}
              placeholder="Password"
            />
            <div
              onClick={handlePrevStateRegisterPassword}
              className="eye-icon clickable"
            >
              <i
                className={`fa ${
                  form.registerPasswordVisibility ? "fa-eye-slash" : "fa-eye"
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
          <label>
            <strong>Konfirmasi Password</strong>
          </label>
          <div className="form-password">
            <input
              type={
                form.registerConfirmPasswordVisibility ? "text" : "password"
              }
              name="registerConfirmPassword"
              value={form.registerConfirmPassword}
              onChange={handleFormChange}
              placeholder="Konfirmasi Password"
            />
            <div
              onClick={handlePrevStateConfirmPassword}
              className="eye-icon clickable"
            >
              <i
                className={`fa ${
                  form.registerConfirmPasswordVisibility
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
          <button onClick={register} type="button" className="submit">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

ModalRegisterProfile.propTypes = {
  //   name: PropTypes.string,
};

export default ModalRegisterProfile;
