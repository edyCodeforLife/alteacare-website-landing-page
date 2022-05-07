import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { reactLocalStorage } from "reactjs-localstorage";
import imageCompression from "browser-image-compression";

import moment from "moment";
import "moment/locale/id";
import validator from "validator";
import Swal from "sweetalert2";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import * as Config from "./../config";
import { getDay } from "date-fns";

import { getMobileOperatingSystem } from "../lib/utils";
import * as ga from "../lib/ga";
import Header from "../components/header";

class VaccineV3 extends React.Component {
  constructor(props) {
    super(props);

    this.mainPage = this.mainPage.bind(this);
    this.patientDataFormPage2 = this.patientDataFormPage2.bind(this);
    this.vaccineLocationSelectPage = this.vaccineLocationSelectPage.bind(this);
    this.hospitalSelectionPage = this.hospitalSelectionPage.bind(this);
    this.hospitalSelectionEditPage = this.hospitalSelectionEditPage.bind(this);
    this.patientDataFormPage = this.patientDataFormPage.bind(this);
    this.patientEditFormPage = this.patientEditFormPage.bind(this);
    this.submitNewPatient = this.submitNewPatient.bind(this);
    this.editPatient = this.editPatient.bind(this);
    this.patientDetailPage = this.patientDetailPage.bind(this);
    this.generateStepBar = this.generateStepBar.bind(this);

    this.getScreeningPatient = this.getScreeningPatient.bind(this);
    this.screeningWelcomePage = this.screeningWelcomePage.bind(this);
    this.screeningAlergicPage = this.screeningAlergicPage.bind(this);
    this.screeningAlergicAfterPage = this.screeningAlergicAfterPage.bind(this);
    this.screeningPregnantPage = this.screeningPregnantPage.bind(this);
    this.screeningAutoimmunePage = this.screeningAutoimmunePage.bind(this);
    this.screeningBloodPage = this.screeningBloodPage.bind(this);
    this.screeningChemoPage = this.screeningChemoPage.bind(this);
    this.screeningHeartPage = this.screeningHeartPage.bind(this);
    this.screeningStairsPage = this.screeningStairsPage.bind(this);
    this.screeningFatiquePage = this.screeningFatiquePage.bind(this);
    this.screeningIllnessPage = this.screeningIllnessPage.bind(this);
    this.screeningWalkingPage = this.screeningWalkingPage.bind(this);
    this.screeningWeightPage = this.screeningWeightPage.bind(this);
    this.screeningKidLastMonthPage = this.screeningKidLastMonthPage.bind(this);
    this.screeningKidInfectedPage = this.screeningKidInfectedPage.bind(this);
    this.screeningKidContactedPage = this.screeningKidContactedPage.bind(this);
    this.screeningKidFeverPage = this.screeningKidFeverPage.bind(this);
    this.screeningKidFluPage = this.screeningKidFluPage.bind(this);
    this.screeningChildFluPage = this.screeningChildFluPage.bind(this);
    this.screeningKidImmunePage = this.screeningKidImmunePage.bind(this);
    this.screeningKidMedicinePage = this.screeningKidMedicinePage.bind(this);
    this.screeningKidAlergicPage = this.screeningKidAlergicPage.bind(this);
    this.screeningKidBloodPage = this.screeningKidBloodPage.bind(this);
    this.screeningChildLast2WeeksPage =
      this.screeningChildLast2WeeksPage.bind(this);
    this.screeningChildFeverPage = this.screeningChildFeverPage.bind(this);
    this.screeningPregnantDurationPage =
      this.screeningPregnantDurationPage.bind(this);
    this.screeningPregnantPreclampPage =
      this.screeningPregnantPreclampPage.bind(this);
    this.screeningPregnantAlergicPage =
      this.screeningPregnantAlergicPage.bind(this);
    this.screeningPregnantAlergicAfterPage =
      this.screeningPregnantAlergicAfterPage.bind(this);
    this.screeningPregnantSicknessPage =
      this.screeningPregnantSicknessPage.bind(this);
    this.screeningPregnantAutoimmunePage =
      this.screeningPregnantAutoimmunePage.bind(this);
    this.screeningPregnantBloodPage =
      this.screeningPregnantBloodPage.bind(this);
    this.screeningPregnantChemoPage =
      this.screeningPregnantChemoPage.bind(this);
    this.screeningPregnantPositivePage =
      this.screeningPregnantPositivePage.bind(this);
    this.screeningSuccessPage = this.screeningSuccessPage.bind(this);
    this.screeningFailedPage = this.screeningFailedPage.bind(this);
    this.confirmationDetailPage = this.confirmationDetailPage.bind(this);
    this.scheduleCancelPage = this.scheduleCancelPage.bind(this);
    this.submitScreening = this.submitScreening.bind(this);
    this.generateCalendar = this.generateCalendar.bind(this);
    this.submitSchedule = this.submitSchedule.bind(this);
    this.cancelSchedule = this.cancelSchedule.bind(this);
    this.confirmPatient = this.confirmPatient.bind(this);
    this.fetchPasscodeLocation = this.fetchPasscodeLocation.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleKTPFileChange = this.handleKTPFileChange.bind(this);
    this.handleCertFileChange = this.handleCertFileChange.bind(this);

    this.handleTicketFileChange = this.handleTicketFileChange.bind(this);

    this.setBirthdate = this.setBirthdate.bind(this);
    this.clearIdentityImg = this.clearIdentityImg.bind(this);
    this.deleteIdentityImg = this.deleteIdentityImg.bind(this);
    this.clearKTPImg = this.clearKTPImg.bind(this);
    this.clearCertImg = this.clearCertImg.bind(this);
    this.clearTicketImg = this.clearTicketImg.bind(this);
    this.goPage = this.goPage.bind(this);
    this.fetchHospitalList = this.fetchHospitalList.bind(this);
    this.fetchHospitalVaccineNo = this.fetchHospitalVaccineNo.bind(this);
    this.getPatientType = this.getPatientType.bind(this);
    this.filterGenderByTypeVaccine = this.filterGenderByTypeVaccine.bind(this);
    this.fetchFirstVaccineLocationList =
      this.fetchFirstVaccineLocationList.bind(this);
    this.fetchSecondVaccineLocationList =
      this.fetchSecondVaccineLocationList.bind(this);

    this.state = {
      isLoading: null,
      user: process.browser ? reactLocalStorage.getObject("user", null) : null,
      access_user: process.browser
        ? reactLocalStorage.getObject("access_user", null)
        : null,
      accessUser: process.browser
        ? reactLocalStorage.getObject("access_user", null)
        : null,
      header: null,
      page: null,
      patientList: [],
      patientVal: null,
      vaccine: null,
      form: null,
    };
  }

  resetState = async (page = null) => {
    let accessUser = await reactLocalStorage.getObject("access_user", null);
    let accessToken =
      accessUser === null
        ? await this.getQueryVariable("at")
        : accessUser.access_token;
    this.setState(
      (prevState) => ({
        isLoading: false,
        header: { headers: { Authorization: "Bearer " + accessToken } },
        page: page === null ? "MAIN PAGE" : page,
        form: {
          ...prevState.form,

          userId: "",
          vaccineLocation: "",
          passcode: "",
          passcodeLocation: "",
          passcodeVaccineType: "",
          passcodeMinAge: "",
          passcodeMaxAge: "",
          hospitalList: [],
          hospitalVal: "",
          location_vaccine_list_id: "",
          programList: [],
          programVal: "",
          professionList: [],
          professionVal: "",
          loadingTimeSlot: true,

          vaccinationState: "", // PERTAMA or KEDUA
          vaccinationBrand: "",
          // Fajar Tambah brand vaksin ke dua saat memilih vaksinasi ke tiga
          second_brand_vaccine: "",
          list_vaccine_allowed: [],
          nationality: "", // WNI or WNA
          firstVaccinationDate: "",
          firstVaccinationLocationList: [],
          firstVaccinationLocationVal: "",
          // Fajar Tambah vaksin ke dua untuk validasi vaksin ke tiga
          secondVaccinationDate: "",
          secondVaccinationLocationList: [],
          secondVaccinationLocationVal: "",
          nik: "",
          fullName: "",
          birthDate: "",
          genderList: ["Laki-Laki", "Perempuan"],
          genderVal: "",
          phoneNo: "",
          email: "",
          address: "",
          isDomicileSame: false,
          address2: "",
          ktpImg: null,
          ktpImgPreview: null,
          certImg: null,
          certImgPreview: null,
          ticketImg: null,
          ticketImgPreview: null,
          identityImg: [null],
          identityImgPreview: [null],
          // screening
          alergic: "",
          alergicAfter: "",
          pregnant: "",
          autoimmune: "",
          blood: "",
          chemo: "",
          heart: "",
          stairs: "",
          fatique: "",
          illness: "",
          walking: "",
          weight: "",

          kidLastMonth: "",
          kidInfected: "",
          kidContacted: "",
          kidFever: "",
          kidFlu: "",
          kidImmune: "",
          kidMedicine: "",
          kidAlergic: "",
          kidBlood: "",

          pregnantDuration: "",
          pregnantPreclamp: "",
          pregnantAlergic: "",
          pregnantAlergicAfter: "",
          pregnantSickness: "",
          pregnantAutoimmune: "",
          pregnantBlood: "",
          pregnantChemo: "",
          pregnantPositive: "",

          // schedule
          schedule: moment(),
          allowedDateList: [],
          hourList: [],
          hourVal: "",
          askAddCalendar: false,
          askChooseCalendar: false,
          term1: false,
          term2: false,
          term3: false,
          calendar: null,
        },
      }),
      () => {
        let carouselList = document.querySelector("li.active");
        if (carouselList != null) carouselList.click();
      }
    );
  };

  async componentDidMount() {
    const accessTokenFromMobile = new URLSearchParams(
      window.location.search
    ).get("at");
    const email = await this.getQueryVariable("email");

    if (accessTokenFromMobile !== null) {
      let access_user = {
        access_token: accessTokenFromMobile,
        username: email,
        username_type: "EMAIL",
      };
      reactLocalStorage.setObject("access_user", access_user);
    }

    const userProfile = await this.fetchMe();
    // const email = await this.getQueryVariable("email");
    // if (email == "undefined") {
    //   reactLocalStorage.clear();
    //   window.location.href = `${Config.BASE_URL}/vaksin`;
    // } else {
    //   this.setState((prevState) => ({
    //     form: {
    //       ...prevState.form,
    //       user_email: email,
    //     },
    //   }));
    // }
    // if (this.state.user !== null && this.state.user.email !== email)
    //   window.location.href = `${Config.BASE_URL}/vaccine?email=${this.state.user.email}`;
    // this.resetState();
    // await this.fetchPatientList();
    // const userId = await this.fetchUserId();
  }

  disableFillFormVaksinasiKedua() {
    if (
      this.state.form.vaccinationBrand === "" ||
      this.state.form.nationality === ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  disableFillForm() {
    if (
      this.state.form.vaccinationState === "" ||
      this.state.form.nationality === ""
    )
      return true;
    if (
      this.state.form.vaccineLocation === "RUMAH SAKIT" &&
      this.state.form.programVal === ""
    )
      return true;
    return false;
  }

  filterGenderByTypeVaccine(gender) {
    if (gender === "Perempuan") return true;
    if (gender === "Laki-Laki") {
      if (this.state.form.programVal === "") return true;
      if (
        this.state.form.programList[this.state.form.programVal].type_vaccine
          .toLowerCase()
          .includes("hamil")
      )
        return false;
    }
    return true;
  }

  allowFirstVaccine() {
    if (this.state.form.vaccineLocation === "PASSCODE") {
      if (this.state.form.passcodeLocation.vaksinasi_ke == null) return true;
      if (this.state.form.passcodeLocation.vaksinasi_ke === "ALL") return true;
      if (this.state.form.passcodeLocation.vaksinasi_ke === "PERTAMA")
        return true;
    } else {
      if (this.state.form.programVal === "") return false;
      else if (this.state.form.programVal === "NOT EXIST") return false;
      else if (
        this.state.form.programList[this.state.form.programVal].vaksinasi_ke
          .pertama != null
      )
        return true;
    }
    return false;
  }

  allowSecondVaccine() {
    if (this.state.form.vaccineLocation === "PASSCODE") {
      if (this.state.form.passcodeLocation.vaksinasi_ke == null) return true;
      if (this.state.form.passcodeLocation.vaksinasi_ke === "ALL") return true;
      if (this.state.form.passcodeLocation.vaksinasi_ke === "KEDUA")
        return true;
    } else {
      if (this.state.form.programVal === "") return false;
      else if (this.state.form.programVal === "NOT EXIST") return false;
      else if (
        this.state.form.programList[this.state.form.programVal].vaksinasi_ke
          .kedua != null
      )
        return true;
    }
    return false;
  }

  allowThirdVaccine() {
    if (this.state.form.vaccineLocation === "PASSCODE") {
      if (this.state.form.passcodeLocation.vaksinasi_ke == null) return true;
      if (this.state.form.passcodeLocation.vaksinasi_ke === "ALL") return true;
      if (this.state.form.passcodeLocation.vaksinasi_ke === "TIGA") return true;
    } else {
      if (this.state.form.programVal === "") return false;
      else if (this.state.form.programVal === "NOT EXIST") return false;
      else if (
        this.state.form.programList[this.state.form.programVal].vaksinasi_ke
          .ketiga != null
      )
        return true;
    }
    return false;
  }

  getVaccinationBrandList() {
    if (this.state.form.vaccineLocation === "PASSCODE") {
      return this.state.form.passcodeLocation.brand_vaccine;
    }
    if (this.state.form.vaccineLocation === "RUMAH SAKIT") {
      if (this.state.form.programVal === "") return [];
      if (this.state.form.vaccinationState === "") return [];
      if (this.state.form.programVal === "NOT EXIST") return [];
      return this.state.form.programList[this.state.form.programVal]
        .vaksinasi_ke[this.state.form.vaccinationState.toLowerCase()]
        .list_brand_vaccine_and_nationality;
    }
    return [];
  }

  allowWNA() {
    if (this.state.form.vaccineLocation === "RUMAH SAKIT") {
      if (this.state.form.programVal === "") return false;
      if (this.state.form.programVal === "NOT EXIST") return false;
      if (this.state.form.vaccinationState === "") return false;
      if (this.state.form.vaccinationBrand === "") return false;
      let nationality =
        this.getVaccinationBrandList()[this.state.form.vaccinationBrand]
          .nationality;
      if (["ALL", "WNA"].includes(nationality)) return true;
    } else {
      if (["ALL", "WNA"].includes(this.state.form.passcodeLocation.citizenship))
        return true;
    }
    return false;
  }

  allowWNI() {
    if (this.state.form.vaccineLocation === "RUMAH SAKIT") {
      if (this.state.form.programVal === "") return false;
      if (this.state.form.programVal === "NOT EXIST") return false;
      if (this.state.form.vaccinationState === "") return false;
      if (this.state.form.vaccinationBrand === "") return false;
      let nationality =
        this.getVaccinationBrandList()[this.state.form.vaccinationBrand]
          .nationality;
      if (["ALL", "WNI"].includes(nationality)) return true;
    } else {
      if (["ALL", "WNI"].includes(this.state.form.passcodeLocation.citizenship))
        return true;
    }
    return false;
  }

  async fetchHospitalList() {
    try {
      let response = await axios.get(
        `${Config.API_URL}/location_vaccine_active`,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            hospitalList: data.data,
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchFirstVaccineLocationList() {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        firstVaccinationLocationList: [],
        firstVaccinationLocationVal: "",
      },
    }));
    try {
      let formData = {};
      formData.location_vaccine_id =
        this.state.form.vaccineLocation === "PASSCODE"
          ? this.state.form.passcodeLocation.location_vaccine_id
          : this.state.form.hospitalList[this.state.form.hospitalVal]
              .location_vaccine_id;
      let response = await axios.post(
        `${Config.API_URL}/v4/location_vaccine_list`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            firstVaccinationLocationList: data.data,
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  // Fajar Tambah fetch second Vaccine Location List

  async fetchSecondVaccineLocationList() {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        secondVaccinationLocationList: [],
        secondVaccinationLocationVal: "",
      },
    }));
    try {
      let formData = {};
      formData.location_vaccine_id =
        this.state.form.vaccineLocation === "PASSCODE"
          ? this.state.form.passcodeLocation.location_vaccine_id
          : this.state.form.hospitalList[this.state.form.hospitalVal]
              .location_vaccine_id;
      let response = await axios.post(
        `${Config.API_URL}/v4/location_vaccine_list`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            secondVaccinationLocationList: data.data,
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchHospitalVaccineNo(patient) {
    try {
      let formData = {};
      formData.location_vaccine_id = patient.location_vaccine_id;
      formData.type_vaccine = patient.type_vaccine;
      let response = await axios.post(
        `${Config.API_URL}/location_vaccine_status`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        let vaccineNo = data.data;
        let allowedVaccineNo = [];
        for (let i = 0; i < vaccineNo.length; i++)
          allowedVaccineNo.push(vaccineNo[i].vaccine_status);
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            allowedVaccineNo: allowedVaccineNo,
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchHospitalProgram() {
    let index = this.state.form.hospitalVal;
    if (index === "") {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          programList: [],
          programVal: "",
        },
      }));
      return;
    }
    let hospital = this.state.form.hospitalList[index];
    let formData = {};
    formData.location_vaccine_id = hospital.location_vaccine_id;
    try {
      let response = await axios.post(
        `${Config.API_URL}/location_vaccine_available`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        let programList = data.data;
        for (let i = 0; i < programList.length; i++) {
          let item = programList[i];
          item.program_name = item.type_vaccine;
        }
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            programList: programList,
            location_vaccine_list_id: formData.location_vaccine_id,
          },
        }));
        await this.fetchFirstVaccineLocationList();
        await this.fetchSecondVaccineLocationList();
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchHospitalProgramALL() {
    let index = this.state.form.hospitalVal;
    if (index === "") {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          programList: [],
          programVal: "",
        },
      }));
      return;
    }
    let hospital = this.state.form.hospitalList[index];
    let formData = {};
    formData.location_vaccine_id = hospital.location_vaccine_id;
    try {
      let response = await axios.post(
        `${Config.API_URL}/v4/location_vaccine`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        let programList = data.data.avail.concat(data.data.not_avail);
        for (let i = 0; i < programList.length; i++) {
          let item = programList[i];
          item.program_name = item.type_vaccine;
        }

        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            programList: programList,
          },
        }));
        await this.fetchFirstVaccineLocationList();
        await this.fetchSecondVaccineLocationList();
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchHospitalProfession() {
    let index = this.state.form.hospitalVal;
    if (index === "") {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          professionList: [],
          professionVal: "",
        },
      }));
      return;
    }
    let programIndex = this.state.form.programVal;
    if (programIndex === "") {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          professionList: [],
          professionVal: "",
        },
      }));
      return;
    }
    let hospital = this.state.form.hospitalList[index];
    let program = this.state.form.programList[programIndex];
    let formData = {};
    formData.hospital_name = hospital.location_vaccine_name;
    formData.type_vaccine = program.type_vaccine;
    try {
      let response = await axios.post(
        `${Config.API_URL}/admin_vaccine/get_category`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        let result = data.data;
        let professionList = [];
        for (let i = 0; i < result.length; i++)
          professionList.push(result[i].profession);
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            professionList: professionList,
            professionVal: "",
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  fetchMerekVaksinasiKeduaSaatEditPasienOnChange = async (e) => {
    console.log("RUNNING fetchMerekVaksinasiKeduaSaatEditPasien");
    console.log(
      "STATE fetchMerekVaksinasiKeduaSaatEditPasienOnChange :",
      this.state
    );
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        list_vaccine_allowed: [],
        second_brand_vaccine: "",
        vaccinationBrand: e.target.value,
      },
    }));
    let request = {
      brand_vaccine:
        this.state.form.programList[this.state.form.programVal].vaksinasi_ke[
          this.state.form.vaccinationState.toLowerCase()
        ].list_brand_vaccine_and_nationality[e.target.value].brand,
      location_vaccine_list_id: this.state.patientVal.location_vaccine_id,
      type_vaccine: this.state.patientVal.type_vaccine,
    };
    console.log("request", request);

    try {
      let response = await axios.post(
        `${Config.API_URL}/brand-vaccine-allowed`,
        request,
        this.state.header
      );
      console.log(
        "RESPONSE ON fetchMerekVaksinasiKeduaSaatEditPasien",
        response.data
      );
      if (response.data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: response.data.data.list_vaccine_allowed,
            second_brand_vaccine: this.state.patientVal.second_brand_vaccine,
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: [],
            second_brand_vaccine: "",
          },
        }));
      }

      // let data = response.data;
    } catch (error) {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          list_vaccine_allowed: [],
          second_brand_vaccine: "",
        },
      }));
    }
  };

  fetchMerekVaksinasiKeduaSaatEditPasien = async () => {
    console.log("RUNNING fetchMerekVaksinasiKeduaSaatEditPasien");
    console.log("STATE FETCh :", this.state);
    console.log("brand_vaccine :", this.state.patientVal.brand_vaccine);
    console.log(
      "location_vaccine_list_id :",
      this.state.patientVal.location_vaccine_id
    );
    console.log("type_vaccine :", this.state.patientVal.type_vaccine);
    let request = {
      brand_vaccine: this.state.patientVal.brand_vaccine,
      location_vaccine_list_id: this.state.patientVal.location_vaccine_id,
      type_vaccine: this.state.patientVal.type_vaccine,
    };
    console.log("request on fetchMerekVaksinasiKeduaSaatEditPasien", request);
    try {
      let response = await axios.post(
        `${Config.API_URL}/brand-vaccine-allowed`,
        request,
        this.state.header
      );
      console.log(
        "RESPONSE ON fetchMerekVaksinasiKeduaSaatEditPasien",
        response.data
      );
      if (response.data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: response.data.data.list_vaccine_allowed,
            second_brand_vaccine: this.state.patientVal.second_brand_vaccine,
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: [],
            second_brand_vaccine: "",
          },
        }));
      }

      // let data = response.data;
    } catch (error) {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          list_vaccine_allowed: [],
          second_brand_vaccine: "",
        },
      }));
    }
  };

  fetchMerekVaksinasiKeduaSaatEditPasienPerusahaanOnChange = async (e) => {
    console.log(
      "RUNNING fetchMerekVaksinasiKeduaSaatEditPasienPerusahaanOnChange"
    );
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        list_vaccine_allowed: [],
        second_brand_vaccine: "",
        vaccinationBrand: e.target.value,
      },
    }));
    let request = {
      brand_vaccine: e.target.value.trim(),
      location_vaccine_list_id: this.state.patientVal.location_vaccine_id,
      type_vaccine: this.state.patientVal.type_vaccine,
    };
    console.log(
      "request on fetchMerekVaksinasiKeduaSaatEditPasienPerusahaanOnChange",
      request
    );
    try {
      let response = await axios.post(
        `${Config.API_URL}/brand-vaccine-allowed`,
        request,
        this.state.header
      );
      console.log(
        "RESPONSE ON fetchMerekVaksinasiKeduaSaatEditPasienPerusahaan",
        response.data
      );
      if (response.data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: response.data.data.list_vaccine_allowed,
            // second_brand_vaccine: this.state.patientVal.second_brand_vaccine,
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: [],
            second_brand_vaccine: "",
          },
        }));
      }

      // let data = response.data;
    } catch (error) {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          list_vaccine_allowed: [],
          second_brand_vaccine: "",
        },
      }));
    }
  };

  fetchMerekVaksinasiKeduaSaatEditPasienPerusahaan = async () => {
    console.log("RUNNING fetchMerekVaksinasiKeduaSaatEditPasienPerusahaan");
    let request = {
      brand_vaccine: this.state.patientVal.brand_vaccine.trim(),
      location_vaccine_list_id: this.state.patientVal.location_vaccine_id,
      type_vaccine: this.state.patientVal.type_vaccine,
    };
    console.log(
      "request on fetchMerekVaksinasiKeduaSaatEditPasienPerusahaan",
      request
    );
    try {
      let response = await axios.post(
        `${Config.API_URL}/brand-vaccine-allowed`,
        request,
        this.state.header
      );
      console.log(
        "RESPONSE ON fetchMerekVaksinasiKeduaSaatEditPasienPerusahaan",
        response.data
      );
      if (response.data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: response.data.data.list_vaccine_allowed,
            second_brand_vaccine: this.state.patientVal.second_brand_vaccine,
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: [],
            second_brand_vaccine: "",
          },
        }));
      }

      // let data = response.data;
    } catch (error) {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          list_vaccine_allowed: [],
          second_brand_vaccine: "",
        },
      }));
    }
  };

  fetchMerekVaksinasiKedua = async () => {
    try {
      let data =
        this.getVaccinationBrandList()[this.state.form.vaccinationBrand];

      let response = await axios.post(
        `${Config.API_URL}/brand-vaccine-allowed`,
        {
          brand_vaccine: data.brand,
          location_vaccine_list_id: this.state.form.location_vaccine_list_id,
          type_vaccine:
            this.state.form.programList[this.state.form.programVal]
              .type_vaccine,
        },
        this.state.header
      );
      if (response.data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: response.data.data.list_vaccine_allowed,
            second_brand_vaccine: "",
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: [],
            second_brand_vaccine: "",
          },
        }));
      }

      // let data = response.data;
    } catch (error) {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          list_vaccine_allowed: [],
          second_brand_vaccine: "",
        },
      }));
    }
  };

  fetchMerekVaksinasiKeduaPilihPerusahaan = async () => {
    console.log("fetchMerekVaksinasiKeduaPilihPerusahaan");
    let formdata = {
      brand_vaccine: this.state.form.vaccinationBrand,
      location_vaccine_list_id:
        this.state.form.passcodeLocation.location_vaccine_id,
      type_vaccine: this.state.form.passcodeLocation.type_vaccine,
    };
    console.log("fetchMerekVaksinasiKeduaPilihPerusahaan FORM", formdata);
    try {
      let response = await axios.post(
        `${Config.API_URL}/brand-vaccine-allowed`,
        {
          brand_vaccine: this.state.form.vaccinationBrand,
          location_vaccine_list_id:
            this.state.form.passcodeLocation.location_vaccine_id,
          type_vaccine: this.state.form.passcodeLocation.type_vaccine,
        },
        this.state.header
      );
      if (response.data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: response.data.data.list_vaccine_allowed,
            second_brand_vaccine: "",
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            list_vaccine_allowed: [],
            second_brand_vaccine: "",
          },
        }));
      }

      // let data = response.data;
    } catch (error) {
      console.log(
        "fetchMerekVaksinasiKeduaPilihPerusahaan Error",
        JSON.stringify(error)
      );
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          list_vaccine_allowed: [],
          second_brand_vaccine: "",
        },
      }));
    }
  };

  async getQueryVariable(variable) {
    const query = await window.location.search.substring(1);
    let vars = await query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return null;
  }

  async fetchUserId() {
    const email = await this.getQueryVariable("email");
    const param = {
      user_email: email,
    };
    try {
      let response = await axios.post(
        `${Config.API_URL}/get-user-id`,
        param,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            userId: data.data.userId,
            user_email: email,
          },
        }));
      } else {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            userId: 0,
            user_email: email,
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchPatientList() {
    this.setState({ patientList: [] });
    const access1 = new URLSearchParams(window.location.search).get("at");
    const access2 = this.state.accessUser;
    const hello = access1 === null ? access2.access_token : access1;

    try {
      const queryemail = await this.getQueryVariable("email");
      let response = await axios.get(
        `${Config.API_URL}/list_data_vaccine_user?email=${queryemail}&email_normalize=${queryemail}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + hello, //the token is a variable which holds the token
          },
        }
      );
      //let response = await axios.get(`${Config.API_URL}/list_data_vaccine_user/${this.props.match.params.userID}`);
      let data = response.data;
      if (data.statusCode === 200) {
        let patientList = data.data;
        for (let i = 0; i < patientList.length; i++) {
          let patient = patientList[i];
          patient.full_name = patient.fullname;
          patient.birthdate = moment(patient.birthdate, "DD/MM/YYYY");
          patient.phone = patient.phone_number;
          // patient.vaccine_location = patient.category;
          patient.id = patient.register_vaccine_new_id;
          if (patient.vaccine_date != null)
            patient.vaccine_date = moment(
              patient.vaccine_date,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD");
          for (let s = 0; s < patient.schedule_all.length; s++) {
            let schedule = patient.schedule_all[s];
            schedule.hour_start = schedule.timeslot_start_time;
            schedule.hour_end = schedule.timeslot_end_time;
          }
          patient.status_timeslot = patient.status;
          patient.status = patient.status_screening;
          if (patient.status === "" || patient.status === null)
            patient.status = "PENDING";
          patient.program_name = patient.type_vaccine;
          patient.vaccine_no = patient.status_vaccine;
        }
        this.setState({ patientList: data.data });
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchPasscodeLocation(passcode = this.state.form.passcode) {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        passcodeLocation: "",
      },
    }));
    let formData = {};
    formData.card_id_number = passcode;
    formData.passcode = passcode;
    try {
      let response = await axios.post(
        `${Config.API_URL}/data_person_company`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        if (data.data.length === 0)
          return Swal.fire(
            "Gagal",
            "Passcode atau No. KTP tidak ditemukan",
            "warning"
          );
        let passcodeLocation = data.data[0];
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            passcodeLocation: passcodeLocation,
            targetVal: passcodeLocation.vaccine_for ?? "",
            nik: passcodeLocation.card_id_number ?? "",
            address: passcodeLocation.address ?? "",
            fullName: passcodeLocation.fullname ?? "",
            birthDate: moment(
              passcodeLocation.birthdate,
              "YYYY/MM/DD"
            ).toDate(),
            vaccinationState: passcodeLocation.vaksinasi_ke,
            genderVal: passcodeLocation.gender ?? "",
            phoneNo: passcodeLocation.phone_number ?? "",
            email: passcodeLocation.email ?? "",
            passcodeVaccineType: passcodeLocation.type_vaccine ?? "",
            passcodeMinAge: passcodeLocation.min_age ?? 0,
            passcodeMaxAge: passcodeLocation.max_age ?? 0,
            location_vaccine_list_id: passcodeLocation.location_vaccine_id,
          },
        }));
        await this.fetchFirstVaccineLocationList();
        await this.fetchSecondVaccineLocationList();
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async fetchLocationVaccineCalendar() {
    console.log("fetchLocationVaccineCalendar");
    let formData = {};
    formData.location_vaccine_id = this.state.patientVal.location_vaccine_id;
    formData.type_vaccine = this.state.patientVal.type_vaccine;
    formData.nationality = this.state.patientVal.citizenship;
    formData.vaccine_status =
      this.state.patientVal.activeSchedule == null
        ? this.state.patientVal.status_vaccine
        : this.state.patientVal.activeSchedule;
    formData.brand_vaccine = this.state.patientVal.brand_vaccine;
    let response = await axios.post(
      `${Config.API_URL}/location_vaccine_calendar`,
      formData,
      this.state.header
    );

    console.log("RESPONSE", response);
    try {
      let data = response.data;
      if (data.statusCode === 200) {
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            allowedDateList: data.data,
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  fetchLocationVaccineHour = async (date) => {
    let dateSelected = moment(date).format("YYYY-MM-DD");
    let get_calender = await this.fetchLocationVaccineCalendar();
    let get_slot = await this.fetchLocationVaccineHour2(date);
  };

  async fetchLocationVaccineHour2(date) {
    let dateSelected = moment(date).format("YYYY-MM-DD");

    let locationVaccineCalendarID;
    for (let i = 0; i < this.state.form.allowedDateList.length; i++) {
      let item = this.state.form.allowedDateList[i];
      if (item.date === dateSelected) {
        locationVaccineCalendarID = item.location_vaccine_calendar_id;
        break;
      }
    }
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        hourList: [],
        hourVal: "",
      },
    }));

    let formData = {};
    formData.location_vaccine_id = this.state.patientVal.location_vaccine_id;
    formData.location_vaccine_calendar_id = locationVaccineCalendarID;
    formData.vaccine_status2 = this.state.patientVal.status_vaccine;
    formData.date = moment(date).format("YYYY-MM-DD");
    formData.vaccine_status = this.state.patientVal.status_vaccine;
    formData.brand_vaccine = this.state.patientVal.brand_vaccine;
    formData.type_vaccine = this.state.patientVal.type_vaccine;
    formData.vaccine_status =
      this.state.patientVal.activeSchedule == null
        ? this.state.patientVal.vaccine_no
        : this.state.patientVal.activeSchedule;
    let response = await axios.post(
      `${Config.API_URL}/get_data_timeslot`,
      formData,
      this.state.header
    );
    try {
      let data = response.data;
      if (data.statusCode === 200) {
        let hourList = data.data;
        for (let i = 0; i < hourList.length; i++) {
          let hour = hourList[i];
          hour.hour_start = hour.timeslot_start_time;
          hour.hour_end = hour.timeslot_end_time;
        }
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            hourList: hourList,
            hourVal: "",
          },
        }));
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
  }

  async submitNewPatient() {
    if (this.state.isLoading) return;
    let form = this.state.form;

    if (validator.isEmpty(form.nik)) return Swal.fire("Wajib isi NIK");

    if (form.vaccinationState === "KETIGA") {
      if (form.secondVaccinationDate === "")
        return Swal.fire("Wajib Pilih Tanggal Vaksinasi Kedua");
      if (form.second_brand_vaccine === "")
        return Swal.fire("Wajib Pilih Merek Vaksinasi Kedua");
      if (form.secondVaccinationLocationVal === "")
        return Swal.fire("Wajib Pilih Lokasi Vaksinasi Kedua");
    }

    if (form.nik.length < 16) return Swal.fire("NIK harus 16 digit");
    if (form.vaccinationState === "")
      return Swal.fire("Vaksinasi ke wajib diisi");
    if (form.vaccinationBrand === "")
      return Swal.fire("Merek vaksinasi wajib dipilih");
    if (form.nationality === "")
      return Swal.fire("Kewarganegaraan wajib diisi");
    if (form.fullName === "") return Swal.fire("Wajib isi nama lengkap");
    if (form.birthDate === "") return Swal.fire("Wajib isi tanggal lahir");
    if (form.genderVal === "") return Swal.fire("Wajib isi jenis kelamin");
    if (form.phoneNo === "") return Swal.fire("Wajib isi nomor telpon");
    if (!validator.isMobilePhone(form.phoneNo, "id-ID"))
      return Swal.fire("Nomor handphone tidak valid");
    if (!validator.isEmail(form.email)) return Swal.fire("Email tidak valid");
    if (validator.isEmpty(form.address)) return Swal.fire("Wajib isi Alamat");
    let age = moment().diff(
      moment(form.birthDate).format("YYYY-MM-DD"),
      "years"
    );
    if (form.vaccineLocation === "RUMAH SAKIT") {
      if (form.programVal === "")
        return Swal.fire("Wajib pilih program vaksinasi");
      if (form.programList[form.programVal].max_age !== null) {
        if (age > form.programList[form.programVal].max_age)
          return Swal.fire(
            `Maximal usia pendaftar vaksin adalah ${
              form.programList[form.programVal].max_age
            } tahun`
          );
      }
      if (
        Number(form.programList[form.programVal].is_category) === 1 &&
        form.professionVal == ""
      )
        return Swal.fire("Kategori wajib diisi");
      if (form.programList[form.programVal].min_age !== null) {
        if (age < form.programList[form.programVal].min_age)
          return Swal.fire(
            `Minimal usia pendaftar vaksin adalah ${
              form.programList[form.programVal].min_age
            } tahun`
          );
      }
    } else {
      if (age > this.state.form.passcodeMaxAge)
        return Swal.fire(
          `Maximal usia pendaftar vaksin adalah ${this.state.form.passcodeMaxAge} tahun`
        );
      if (age < this.state.form.passcodeMinAge)
        return Swal.fire(
          `Minimal usia pendaftar vaksin adalah ${this.state.form.passcodeMinAge} tahun`
        );
    }
    if (form.ktpImg === null)
      return Swal.fire("Foto Kartu Identitas wajib diunggah");
    if (form.vaccinationState === "KEDUA") {
      if (form.firstVaccinationDate === "")
        return Swal.fire("Tanggal Vaksinasi Pertama wajib diisi");
      if (form.firstVaccinationLocationVal === "")
        return Swal.fire("Lokasi Vaksinasi Pertama wajib dipilih");
      if (form.certImg == null)
        return Swal.fire(
          "Foto Kartu Sertifikat Vaksinasi pertama wajib diunggah"
        );
    }
    if (form.vaccinationState === "KETIGA") {
      if (form.certImg === null)
        return Swal.fire("Foto Kartu Vaksinasi Kedua wajib diunggah");
      if (form.ticketImg === null)
        return Swal.fire("Foto Tiket Vaksinasi wajib diunggah");
    }

    this.setState({ isLoading: true });
    let formData = new FormData();
    formData.append("userId", form.userId);
    formData.append("user_email", form.user_email);
    formData.append("vaccine_location", form.vaccineLocation);
    formData.append(
      "type_vaccine",
      form.vaccineLocation === "RUMAH SAKIT"
        ? form.programList[form.programVal].program_name
        : this.state.form.passcodeVaccineType
    );
    formData.append("status_vaccine", form.vaccinationState);
    formData.append(
      "brand_vaccine",
      form.vaccineLocation === "RUMAH SAKIT"
        ? this.getVaccinationBrandList()[form.vaccinationBrand].brand
        : form.vaccinationBrand
    );
    formData.append("citizenship", form.nationality);
    formData.append("fullname", form.fullName);
    formData.append("birthdate", moment(form.birthDate).format("DD-MM-YYYY"));
    formData.append("gender", form.genderVal);
    formData.append("phone_number", form.phoneNo);
    formData.append("email", form.email);
    formData.append("address", form.address);
    formData.append("is_same_address", form.isDomicileSame ? "1" : "0");
    formData.append("address_domicile", form.address2);
    formData.append(
      "hospital_name",
      form.vaccineLocation === "RUMAH SAKIT"
        ? form.hospitalList[form.hospitalVal].name
        : form.passcodeLocation.location_vaccine_company
    );
    formData.append(
      "category",
      form.vaccineLocation === "RUMAH SAKIT" ? form.professionVal : ""
    );
    formData.append("card_id_number", form.nik);
    formData.append("ktpPhotoPath", form.ktpImg);
    let imgIndex = 0;
    for (let i = 0; i < this.state.form.identityImg.length; i++) {
      if (this.state.form.identityImg[i] == null) continue;
      formData.append(
        "photoPath" + (imgIndex === 0 ? "" : imgIndex),
        this.state.form.identityImg[i]
      );
      imgIndex++;
    }
    if (form.vaccinationState === "KEDUA") {
      formData.append(
        "first_vaccine_date",
        moment(form.firstVaccinationDate).format("DD-MM-YYYY")
      );
      formData.append(
        "first_vaccine_location",
        form.firstVaccinationLocationList[form.firstVaccinationLocationVal]
          .hospital_name
      );
      formData.append("photo_certificate", form.certImg);
    }

    // Fajar Tambah

    if (form.vaccinationState === "KETIGA") {
      formData.append(
        "second_vaccine_date",
        moment(form.secondVaccinationDate).format("DD-MM-YYYY")
      );
      formData.append(
        "second_vaccine_location",
        form.secondVaccinationLocationList[form.secondVaccinationLocationVal]
          .hospital_name
      );
      formData.append("second_certificate", form.certImg);
      formData.append("ticket_vaccine", form.ticketImg);
      formData.append("second_brand_vaccine", form.second_brand_vaccine);
    }

    if (form.vaccineLocation === "PASSCODE") {
      formData.append("passcode", form.passcodeLocation.passcode);
    }
    try {
      let response = await axios.post(
        `${Config.API_URL}/v4/create_register_vaccine_update`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        this.setState(
          {
            isLoading: false,
            patientVal: this.state.patientList[0],
          },
          () => this.resetState("PATIENT DETAIL PAGE")
        );
        if (form.vaccineLocation === "PASSCODE")
          this.fetchHospitalVaccineNo(this.state.patientList[0]);
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  async editPatient() {
    if (this.state.isLoading) return;
    let form = this.state.form;
    let patient = this.state.patientVal;
    let age = moment().diff(form.birthDate, "years");
    if (validator.isEmpty(form.nik)) return Swal.fire("Wajib isi NIK");
    if (form.nik.length < 16) return Swal.fire("NIK harus 16 digit");
    if (form.vaccinationState === "")
      return Swal.fire("Vaksinasi ke wajib diisi");
    if (form.vaccinationBrand === "")
      return Swal.fire("Merek vaksinasi wajib dipilih");
    if (form.nationality === "")
      return Swal.fire("Kewarganegaraan wajib diisi");
    if (form.fullName === "") return Swal.fire("Wajib isi nama lengkap");
    if (form.birthDate === "") return Swal.fire("Wajib isi tanggal lahir");
    if (form.genderVal === "") return Swal.fire("Wajib isi jenis kelamin");
    if (form.phoneNo === "") return Swal.fire("Wajib isi nomor telpon");
    if (!validator.isMobilePhone(form.phoneNo, "id-ID"))
      return Swal.fire("Nomor handphone tidak valid");
    if (!validator.isEmail(form.email)) return Swal.fire("Email tidak valid");
    if (validator.isEmpty(form.address)) return Swal.fire("Wajib isi Alamat");
    let vaccineType = "";
    let vaccineLocation = form.vaccineLocation;
    let professionVal = form.professionVal;
    let hospitalName;
    if (vaccineLocation === "RUMAH SAKIT") {
      hospitalName = form.hospitalList[form.hospitalVal].name;
      if (form.programVal === "")
        return Swal.fire("Wajib pilih program vaksinasi");
      if (form.programVal === "NOT EXIST") {
        vaccineType = this.state.patientVal.type_vaccine;
        professionVal = this.state.patientVal.category;
      } else {
        vaccineType = form.programList[form.programVal].program_name;
        if (form.programList[form.programVal].max_age !== null) {
          if (age > form.programList[form.programVal].max_age)
            return Swal.fire(
              `Maximal usia pendaftar vaksin adalah ${
                form.programList[form.programVal].max_age
              } tahun`
            );
        }
        if (
          Number(form.programList[form.programVal].is_category) === 1 &&
          form.professionVal == ""
        )
          return Swal.fire("Kategori wajib diisi");
        if (form.programList[form.programVal].min_age !== null) {
          if (age < form.programList[form.programVal].min_age)
            return Swal.fire(
              `Minimal usia pendaftar vaksin adalah ${
                form.programList[form.programVal].min_age
              } tahun`
            );
        }
      }
    } else {
      hospitalName = this.state.patientVal.hospital_name;
      vaccineType = this.state.patientVal.type_vaccine;
      if (age > this.state.form.passcodeMaxAge)
        return Swal.fire(
          `Maximal usia pendaftar vaksin adalah ${this.state.form.passcodeMaxAge} tahun`
        );
      if (age < this.state.form.passcodeMinAge)
        return Swal.fire(
          `Minimal usia pendaftar vaksin adalah ${this.state.form.passcodeMinAge} tahun`
        );
    }
    if (form.vaccinationState === "KEDUA") {
      if (form.firstVaccinationDate === "")
        return Swal.fire("Tanggal Vaksinasi Pertama wajib diisi");
      if (form.firstVaccinationLocationVal === "")
        return Swal.fire("Lokasi Vaksinasi Pertama wajib dipilih");
      if (
        form.certImg == null &&
        this.state.patientVal.photo_certificate == null
      )
        return Swal.fire(
          "Foto Kartu Sertifikat Vaksinasi pertama wajib diunggah"
        );
    }
    this.setState({ isLoading: true });
    let formData = new FormData();
    formData.append("userId", this.state.patientVal.userId);
    formData.append("user_email", this.state.patientVal.user_email);
    formData.append("vaccine_location", vaccineLocation);
    formData.append("hospital_name", hospitalName);
    formData.append("type_vaccine", vaccineType);
    formData.append("status_vaccine", form.vaccinationState);
    formData.append(
      "brand_vaccine",
      form.vaccineLocation === "RUMAH SAKIT"
        ? this.getVaccinationBrandList()[form.vaccinationBrand].brand
        : form.vaccinationBrand
    );
    formData.append("citizenship", form.nationality);
    formData.append("fullname", form.fullName);
    formData.append("category", professionVal);
    formData.append("birthdate", moment(form.birthDate).format("DD-MM-YYYY"));
    formData.append("gender", form.genderVal);
    formData.append("phone_number", form.phoneNo);
    formData.append("email", form.email);
    formData.append("card_id_number", form.nik);
    formData.append("address", form.address);
    formData.append("is_same_address", form.isDomicileSame ? "1" : "0");
    formData.append("address_domicile", form.address2);
    if (form.ktpImg != null) formData.append("ktpPhotoPath", form.ktpImg);
    if (form.vaccinationState === "KEDUA") {
      formData.append(
        "first_vaccine_date",
        moment(form.firstVaccinationDate).format("DD-MM-YYYY")
      );
      formData.append(
        "first_vaccine_location",
        form.firstVaccinationLocationList[form.firstVaccinationLocationVal]
          .hospital_name
      );
      if (form.certImg != null)
        formData.append("photo_certificate", form.certImg);
    }
    let imgIndex = 0;
    for (let i = 0; i < this.state.form.identityImg.length; i++) {
      if (this.state.form.identityImg[i] == null) continue;
      formData.append(
        "photoPath" + (imgIndex === 0 ? "" : imgIndex),
        this.state.form.identityImg[i]
      );
      imgIndex++;
    }

    if (form.vaccinationState === "KETIGA") {
      formData.append(
        "second_vaccine_location",
        form.secondVaccinationLocationList[form.secondVaccinationLocationVal]
          .hospital_name
      );

      if (form.certImg !== undefined || form.certImg !== "") {
        formData.append("second_certificate", form.certImg);
      }

      if (form.ticketImg !== undefined || form.ticketImg !== "") {
        formData.append("ticket_vaccine", form.ticketImg);
      }

      if (
        form.second_brand_vaccine !== undefined ||
        form.second_brand_vaccine !== ""
      ) {
        formData.append("second_brand_vaccine", form.second_brand_vaccine);
      }

      if (
        form.secondVaccinationDate !== undefined ||
        form.secondVaccinationDate !== ""
      ) {
        formData.append(
          "second_vaccine_date",
          moment(form.secondVaccinationDate).format("DD-MM-YYYY")
        );
      }
    }

    try {
      let response = await axios.put(
        `${Config.API_URL}/v4/register_form/${patient.id}`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        for (let i = 0; i < this.state.patientList.length; i++) {
          let item = this.state.patientList[i];
          if (item.id === patient.id) {
            this.setState({ patientVal: item });
            break;
          }
        }
        this.resetState("PATIENT DETAIL PAGE");
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  async submitScreening() {
    let form = this.state.form;
    let patient = this.state.patientVal;
    let patientType = this.getPatientType(patient);
    let screeningList = this.getScreeningPatient();
    let status = "ACCEPTED";
    let formData = new FormData();
    let FORMDATAS = [];
    for (let i = 0; i < screeningList.length; i++) {
      let item = screeningList[i];
      let data = {
        screening: item,
        key:
          item === "SCREENING ALERGIC PAGE"
            ? "is_alergic"
            : item === "SCREENING ALERGIC AFTER PAGE"
            ? "is_alergic"
            : item === "SCREENING PREGNANT PAGE"
            ? "is_pregnant"
            : item === "SCREENING AUTOIMMUNE PAGE"
            ? "is_autoimun"
            : item === "SCREENING BLOOD PAGE"
            ? "is_blood_disorders"
            : item === "SCREENING CHEMO PAGE"
            ? "is_immunosupressant"
            : item === "SCREENING HEART PAGE"
            ? "is_have_disease"
            : item === "SCREENING STAIRS PAGE"
            ? "is_hard_climb_stair"
            : item === "SCREENING FATIQUE PAGE"
            ? "is_fatigue"
            : item === "SCREENING ILLNESS PAGE"
            ? "is_many_diseases"
            : item === "SCREENING WALKING PAGE"
            ? "is_walk"
            : item === "SCREENING WEIGHT PAGE"
            ? "is_drop_weight"
            : item === "SCREENING KID LAST MONTH PAGE"
            ? "is_kid_have_other_vaccine"
            : item === "SCREENING KID INFECTED PAGE"
            ? "is_covid"
            : item === "SCREENING KID CONTACTED PAGE"
            ? "is_kid_contact_patient_covid"
            : item === "SCREENING KID FEVER PAGE"
            ? "is_kid_have_fever"
            : item === "SCREENING KID FLU PAGE"
            ? "is_kid_have_medical_emergency"
            : item === "SCREENING KID IMMUNE PAGE"
            ? "is_kid_have_immune_disorders"
            : item === "SCREENING KID MEDICINE PAGE"
            ? "is_kid_have_imunosupresan"
            : item === "SCREENING KID ALERGIC PAGE"
            ? "is_kid_have_alerrgies"
            : item === "SCREENING KID BLOOD PAGE"
            ? "is_kid_have_hemofilia"
            : item === "SCREENING CHILD LAST 2 WEEKS PAGE"
            ? "is_kid_have_other_vaccine"
            : item === "SCREENING CHILD FEVER PAGE"
            ? "is_kid_have_fever"
            : item === "SCREENING CHILD FLU PAGE"
            ? "is_kid_have_medical_emergency"
            : item === "SCREENING PREGNANT DURATION PAGE"
            ? "gestational_age"
            : item === "SCREENING PREGNANT PRECLAMP PAGE"
            ? "is_preeklampsia"
            : item === "SCREENING PREGNANT ALERGIC PAGE"
            ? "is_alergic"
            : item === "SCREENING PREGNANT ALERGIC AFTER PAGE"
            ? "is_alergic"
            : item === "SCREENING PREGNANT SICKNESS PAGE"
            ? "is_comorbidities"
            : item === "SCREENING PREGNANT AUTOIMMUNE PAGE"
            ? "is_autoimun"
            : item === "SCREENING PREGNANT BLOOD PAGE"
            ? "is_blood_disorders"
            : item === "SCREENING PREGNANT CHEMO PAGE"
            ? "is_immunosupressant"
            : item === "SCREENING PREGNANT POSITIVE PAGE"
            ? "is_covid"
            : "",
        value:
          item === "SCREENING ALERGIC PAGE"
            ? form.alergic
            : item === "SCREENING ALERGIC AFTER PAGE"
            ? form.alergicAfter
            : item === "SCREENING PREGNANT PAGE"
            ? form.pregnant
            : item === "SCREENING AUTOIMMUNE PAGE"
            ? form.autoimmune
            : item === "SCREENING BLOOD PAGE"
            ? form.blood
            : item === "SCREENING CHEMO PAGE"
            ? form.chemo
            : item === "SCREENING HEART PAGE"
            ? form.heart
            : item === "SCREENING STAIRS PAGE"
            ? form.stairs
            : item === "SCREENING FATIQUE PAGE"
            ? form.fatique
            : item === "SCREENING ILLNESS PAGE"
            ? form.illness
            : item === "SCREENING WALKING PAGE"
            ? form.walking
            : item === "SCREENING WEIGHT PAGE"
            ? form.weight
            : item === "SCREENING KID LAST MONTH PAGE"
            ? form.kidLastMonth
            : item === "SCREENING KID INFECTED PAGE"
            ? form.kidInfected
            : item === "SCREENING KID CONTACTED PAGE"
            ? form.kidContacted
            : item === "SCREENING KID FEVER PAGE"
            ? form.kidFever
            : item === "SCREENING KID FLU PAGE"
            ? form.kidFlu
            : item === "SCREENING KID IMMUNE PAGE"
            ? form.kidImmune
            : item === "SCREENING KID MEDICINE PAGE"
            ? form.kidMedicine
            : item === "SCREENING KID ALERGIC PAGE"
            ? form.kidAlergic
            : item === "SCREENING KID BLOOD PAGE"
            ? form.kidBlood
            : item === "SCREENING CHILD LAST 2 WEEKS PAGE"
            ? form.childLast2Weeks
            : item === "SCREENING CHILD FEVER PAGE"
            ? form.childFever
            : item === "SCREENING CHILD FLU PAGE"
            ? form.kidFlu
            : item === "SCREENING PREGNANT DURATION PAGE"
            ? form.pregnantDuration
            : item === "SCREENING PREGNANT PRECLAMP PAGE"
            ? form.pregnantPreclamp
            : item === "SCREENING PREGNANT ALERGIC PAGE"
            ? form.pregnantAlergic
            : item === "SCREENING PREGNANT ALERGIC AFTER PAGE"
            ? form.pregnantAlergicAfter
            : item === "SCREENING PREGNANT SICKNESS PAGE"
            ? form.pregnantSickness
            : item === "SCREENING PREGNANT AUTOIMMUNE PAGE"
            ? form.pregnantAutoimmune
            : item === "SCREENING PREGNANT BLOOD PAGE"
            ? form.pregnantBlood
            : item === "SCREENING PREGNANT CHEMO PAGE"
            ? form.pregnantChemo
            : item === "SCREENING PREGNANT POSITIVE PAGE"
            ? form.pregnantPositive
            : "",
      };
      FORMDATAS.push(data);
    }

    let find_pregnant_duration = FORMDATAS.find(
      (x) => x.value === "< 13 Minggu"
    );

    FORMDATAS.filter((someobject) => someobject.value == "Ya").forEach(
      (someobject) => (someobject.value = 1)
    );
    FORMDATAS.filter((someobject) => someobject.value == "Tidak").forEach(
      (someobject) => (someobject.value = 0)
    );

    let isAgree = "Tidak";
    if (find_pregnant_duration !== undefined) {
      let confirm = await Swal.fire({
        position: "bottom",
        title:
          "Saya memiliki surat persetujuan dari dokter spesialis untuk vaksin ?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Ya`,
        denyButtonText: `Tidak`,
      });
      if (confirm.isConfirmed === true) {
        status = "ACCEPTED";
        isAgree = "Ya";
      } else if (confirm.isDenied === true) status = "REJECTED";
      else return;
    } else {
      let obj = FORMDATAS.find((o, i) => {
        if (o.value === 1) {
          return true; // stop searching
        }
      });
      if (obj === undefined) {
        status = "ACCEPTED";
      } else {
        let confirm = await Swal.fire({
          position: "bottom",
          title:
            "Saya memiliki surat persetujuan dari dokter spesialis untuk vaksin ?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: `Ya`,
          denyButtonText: `Tidak`,
        });
        if (confirm.isConfirmed === true) {
          status = "ACCEPTED";
          isAgree = "Ya";
        } else if (confirm.isDenied === true) status = "REJECTED";
        else return;
      }
    }

    // masukkan seluruh form data
    for (let x = 0; x < FORMDATAS.length; x++) {
      formData.append(FORMDATAS[x].key, FORMDATAS[x].value);
    }
    formData.append("status", status);
    formData.append("is_agree", isAgree);

    // jalankan loading
    this.setState({ isLoading: true });

    // tembak API
    try {
      let url;
      if (patientType === "ELDERLY")
        url = `${Config.API_URL}/v4/elderly/edit_register_vaccine_update/${patient.id}`;
      if (patientType === "ADULT")
        url = `${Config.API_URL}/v4/adult/edit_register_vaccine_update/${patient.id}`;
      if (patientType === "PREGNANT")
        url = `${Config.API_URL}/v4/pregnant/edit_register_vaccine_update/${patient.id}`;
      if (patientType === "KID")
        url = `${Config.API_URL}/v4/kid/edit_register_vaccine_update/${patient.id}`;
      if (patientType === "CHILD")
        url = `${Config.API_URL}/v4/kid/edit_register_vaccine_update/${patient.id}`;
      let response = await axios.put(url, formData, this.state.header);
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        for (let i = 0; i < this.state.patientList.length; i++) {
          let item = this.state.patientList[i];
          if (item.id === patient.id) {
            this.setState({ patientVal: item });
            break;
          }
        }
        if (status === "ACCEPTED") this.goPage("SCREENING SUCCESS PAGE");
        if (status === "REJECTED") this.goPage("SCREENING FAILED PAGE");
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  getVaccineSchedule(vaccine, vaccineNo) {
    for (let i = 0; i < vaccine.schedule_all.length; i++) {
      let item = vaccine.schedule_all[i];
      if (item.status_vaccine === vaccineNo) return item;
    }
    return null;
  }

  getVaccineLatestSchedule(vaccine) {
    if (this.getVaccineSchedule(vaccine, "KETIGA") != null)
      return this.getVaccineSchedule(vaccine, "KETIGA");
    if (this.getVaccineSchedule(vaccine, "KEDUA") != null)
      return this.getVaccineSchedule(vaccine, "KEDUA");
    if (this.getVaccineSchedule(vaccine, "PERTAMA") != null)
      return this.getVaccineSchedule(vaccine, "PERTAMA");
    return null;
  }

  isSchedulePassed(schedule) {
    // disable 2nd schedule hopefully
    return false;
    // return true;
    // if(schedule.status_vaccine == 'PERTAMA') return true;
    let vaccineDate = moment(
      schedule.vaccine_date + " " + schedule.timeslot_start_time,
      "DD/MM/YYYY HH.mm"
    );
    let today = moment();
    if (today.isSameOrAfter(vaccineDate)) return true;
    else return false;
  }

  async submitSchedule(date = null) {
    if (this.state.isLoading) return;
    let form = this.state.form;
    let patientID = this.state.patientVal.id;
    let vaccineNo =
      this.state.patientVal.activeSchedule == null
        ? this.state.patientVal.status_vaccine
        : this.state.patientVal.activeSchedule;
    if (!moment.isMoment(date)) date = form.schedule;
    this.setState({ isLoading: true });
    let formData = {};
    formData.register_vaccine_new_id = patientID;
    formData.userId = this.state.patientVal.userId;
    formData.status_vaccine = vaccineNo;
    formData.timeslot_id = form.hourVal.timeslot_id;
    formData.is_confirmed = 0;
    formData.date = moment(date).format("YYYY-MM-DD");
    try {
      let response;
      if (this.getVaccineSchedule(this.state.patientVal, vaccineNo) === null)
        response = await axios.post(
          `${Config.API_URL}/create_schedule_vaccine_new`,
          formData,
          this.state.header
        );
      else
        response = await axios.post(
          `${Config.API_URL}/edit_schedule_vaccine_new/${
            this.getVaccineSchedule(this.state.patientVal, vaccineNo)
              .schedule_vaccine_id
          }`,
          formData,
          this.state.header
        );
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            calendar: data.data,
          },
        }));
        for (let i = 0; i < this.state.patientList.length; i++) {
          let item = this.state.patientList[i];
          if (item.id === patientID) {
            this.setState({ patientVal: item });
            break;
          }
        }
        // this.goPage('PATIENT DETAIL PAGE');
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            askAddCalendar: true,
          },
        }));
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  async cancelSchedule() {
    if (this.state.isLoading) return;
    let confirm = await Swal.fire({
      title: "Apakah Anda yakin ingin membatalkan pendaftaran ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C7B5",
      cancelButtonColor: "#61C7B5",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (!confirm.value) return;
    this.setState({ isLoading: true });
    try {
      let response = await axios.post(
        `${Config.API_URL}/delete_schedule_vaccine/${
          this.getVaccineLatestSchedule(this.state.patientVal)
            .schedule_vaccine_id
        }`,
        {},
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        for (let i = 0; i < this.state.patientList.length; i++) {
          let item = this.state.patientList[i];
          if (item.id === this.state.patientVal.id) {
            this.setState({ patientVal: item });
            break;
          }
        }
        this.goPage("SCHEDULE CANCEL PAGE");
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  async submitCalendar(calendar) {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    try {
      let formData = {};
      formData.location = this.state.form.calendar.hospital_name
        ? this.state.form.calendar.hospital_name
        : this.state.patientVal.hospital_name;
      formData.date = moment(this.state.form.calendar.date).format(
        "YYYY-MM-DD"
      );
      formData.start_time = this.state.form.calendar.timeslot_start_time;
      formData.end_time = this.state.form.calendar.timeslot_end_time;
      let response = await axios.post(
        `${Config.API_URL}/add_calendar_${calendar}`,
        formData,
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        this.resetState("PATIENT DETAIL PAGE");
        window.open(data.data, "_blank");
        if (calendar === "google") window.location.href = data.ics;
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  async confirmPatient() {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    try {
      let response = await axios.post(
        `${Config.API_URL}/confirm_schedule_vaccine/${
          this.getVaccineLatestSchedule(this.state.patientVal)
            .schedule_vaccine_id
        }`,
        {},
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        for (let i = 0; i < this.state.patientList.length; i++) {
          let item = this.state.patientList[i];
          if (item.id === this.state.patientVal.id) {
            this.setState({ patientVal: item });
            break;
          }
        }
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  setBirthdate(date) {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        birthDate: moment(date).toDate(),
      },
    }));
  }

  handleFormChange(event, callback = null) {
    const target = event.target;

    let value =
      target.type === "number"
        ? target.value.replace(/\D/, "").replace("d", "")
        : target.type === "checkbox"
        ? target.checked
        : target.value;
    let name = target.name;
    if (name === "nik") value = value.substr(0, 16);
    if (callback == null)
      this.setState((prevState) => ({
        form: { ...prevState.form, [name]: value },
      }));
    else
      this.setState(
        (prevState) => ({ form: { ...prevState.form, [name]: value } }),
        callback
      );
  }

  async handleFileChange(event, index) {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    let context = this;
    let file = event.target.files[0];
    if (file != null) {
      file = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      this.state.form.identityImg[index] = file;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          context.state.form.identityImgPreview[index] = reader.result;
          if (
            context.state.form.identityImg[
              context.state.form.identityImg.length - 1
            ] != null &&
            context.state.form.identityImg.length < 5
          ) {
            context.state.form.identityImg.push(null);
            context.state.form.identityImgPreview.push(null);
          }
          context.setState({ form: context.state.form });
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      this.state.form.identityImg[index] = null;
      this.state.form.identityImgPreview[index] = null;
    }
    this.setState({ isLoading: false, form: this.state.form });
  }

  async handleKTPFileChange(event) {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    let context = this;
    let file = event.target.files[0];
    if (file != null) {
      file = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      this.state.form.ktpImg = file;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          context.state.form.ktpImgPreview = reader.result;
          context.setState({ form: context.state.form });
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      this.state.form.ktpImg = null;
      this.state.form.ktpImgPreview = null;
    }
    this.setState({ isLoading: false, form: this.state.form });
  }

  async handleCertFileChange(event) {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    let context = this;
    let file = event.target.files[0];
    if (file != null) {
      file = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      this.state.form.certImg = file;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          context.state.form.certImgPreview = reader.result;
          context.setState({ form: context.state.form });
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      this.state.form.certImg = null;
      this.state.form.certImgPreview = null;
    }
    this.setState({ isLoading: false, form: this.state.form });
  }

  async handleTicketFileChange(event) {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    let context = this;
    let file = event.target.files[0];
    if (file != null) {
      file = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      this.state.form.ticketImg = file;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          context.state.form.ticketImgPreview = reader.result;
          context.setState({ form: context.state.form });
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      this.state.form.ticketImg = null;
      this.state.form.ticketImgPreview = null;
    }
    this.setState({ isLoading: false, form: this.state.form });
  }

  clearIdentityImg(index) {
    let form = { ...this.state.form };
    form.identityImg[index] = null;
    form.identityImgPreview[index] = null;
    if (index !== 0) {
      form.identityImg.splice(index, 1);
      form.identityImgPreview.splice(index, 1);
    }
    this.setState({ form: form });
  }

  async deleteIdentityImg(img) {
    let confirm = await Swal.fire({
      title: "Hapus unggahan sebelumnya?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    });
    if (!confirm.value) return;
    this.setState({ isLoading: true });
    try {
      let response = await axios.post(
        `${Config.API_URL}/delete_photo_user/${img.user_photo_id}}`,
        {},
        this.state.header
      );
      let data = response.data;
      if (data.statusCode === 200) {
        await this.fetchPatientList();
        for (let i = 0; i < this.state.patientList.length; i++) {
          let item = this.state.patientList[i];
          if (item.id === this.state.patientVal.id) {
            this.setState({ patientVal: item });
            break;
          }
        }
      } else {
        await Swal.fire("Gagal", data.statusMessage, "warning");
      }
    } catch (error) {
      await Swal.fire(
        "Gagal",
        "Terjadi kesalahan pada koneksi anda. Silahkan coba beberapa saat lagi dan pastikan koneksi internet bekerja dengan baik. ",
        "error"
      );
    }
    this.setState({ isLoading: false });
  }

  clearKTPImg() {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        ktpImg: null,
      },
    }));
  }

  clearCertImg() {
    this.setState((prevState) => ({
      form: { ...prevState.form, certImg: null },
    }));
  }

  clearTicketImg() {
    this.setState((prevState) => ({
      form: { ...prevState.form, ticketImg: null },
    }));
  }

  goPage(page) {
    if (page === "SCHEDULE SELECT PAGE") {
      this.fetchLocationVaccineCalendar();
    } else if (page === "PATIENT DETAIL PAGE") {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          schedule:
            this.state.patientVal.vaccine_date !== null
              ? moment(this.state.patientVal.vaccine_date)
              : moment(),
        },
      }));
    } else if (page === "PATIENT DATA FORM PAGE") {
      this.fetchHospitalProgram();
    } else if (page === "PATIENT EDIT FORM PAGE") {
      if (this.state.patientVal.vaccine_location === "PASSCODE") {
        this.setState((prevState) => ({
          form: { ...prevState.form, vaccineLocation: "PASSCODE" },
        }));
        this.fetchPasscodeLocation(this.state.patientVal.passcode).then(() => {
          if (this.state.patientVal.status_vaccine === "KEDUA") {
            for (
              let i = 0;
              i < this.state.form.firstVaccinationLocationList.length;
              i++
            ) {
              let item = this.state.form.firstVaccinationLocationList[i];
              if (
                item.hospital_name ===
                this.state.patientVal.first_vaccine_location
              ) {
                this.setState((prevState) => ({
                  form: {
                    ...prevState.form,
                    firstVaccinationLocationVal: i,
                    firstVaccinationDate: moment(
                      this.state.patientVal.first_vaccine_date,
                      "DD/MM/YYYY"
                    ).toDate(),
                  },
                }));
              }
            }
          }

          if (this.state.patientVal.status_vaccine === "KETIGA") {
            for (
              let i = 0;
              i < this.state.form.secondVaccinationLocationList.length;
              i++
            ) {
              let item = this.state.form.secondVaccinationLocationList[i];
              if (
                item.hospital_name ===
                this.state.patientVal.second_vaccine_location
              ) {
                this.setState((prevState) => ({
                  form: {
                    ...prevState.form,
                    secondVaccinationLocationVal: i,
                    secondVaccinationDate: moment(
                      this.state.patientVal.second_vaccine_date,
                      "DD/MM/YYYY"
                    ).toDate(),
                  },
                }));
              }
            }
          }

          this.setState((prevState) => ({
            form: {
              ...prevState.form,
              vaccinationState: this.state.patientVal.status_vaccine,
              vaccinationBrand: this.state.patientVal.brand_vaccine,
              vaccineLocation: this.state.patientVal.vaccine_location,
              nationality: this.state.patientVal.citizenship,
              nik: this.state.patientVal.card_id_number,
              fullName: this.state.patientVal.full_name,
              genderVal: this.state.patientVal.gender,
              birthDate: moment(this.state.patientVal.birthdate).toDate(),
              phoneNo: this.state.patientVal.phone,
              email: this.state.patientVal.email,
              address: this.state.patientVal.address,
              address2: this.state.patientVal.address_domicile,
            },
          }));
        });
        this.fetchMerekVaksinasiKeduaSaatEditPasienPerusahaan();
      } else {
        this.fetchHospitalList().then(() => {
          for (let i = 0; i < this.state.form.hospitalList.length; i++) {
            let item = this.state.form.hospitalList[i];
            if (
              item.location_vaccine_id ===
              this.state.patientVal.location_vaccine_id
            ) {
              this.setState((prevState) => ({
                form: { ...prevState.form, hospitalVal: i },
              }));
            }
          }
          this.fetchHospitalProgram().then(() => {
            let index;
            let maxAge = 0;
            let minAge = 0;
            let program;
            for (let i = 0; i < this.state.form.programList.length; i++) {
              let item = this.state.form.programList[i];
              if (item.program_name === this.state.patientVal.type_vaccine) {
                index = i;
                maxAge = item.max_age;
                minAge = item.min_age;
                program = item;
              }
            }

            if (this.state.patientVal.status_vaccine === "KEDUA") {
              for (
                let i = 0;
                i < this.state.form.firstVaccinationLocationList.length;
                i++
              ) {
                let item = this.state.form.firstVaccinationLocationList[i];
                if (
                  item.hospital_name ===
                  this.state.patientVal.first_vaccine_location
                ) {
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      firstVaccinationLocationVal: i,
                      firstVaccinationDate: moment(
                        this.state.patientVal.first_vaccine_date,
                        "DD/MM/YYYY"
                      ).toDate(),
                    },
                  }));
                }
              }
            }

            if (this.state.patientVal.status_vaccine === "KETIGA") {
              for (
                let i = 0;
                i < this.state.form.secondVaccinationLocationList.length;
                i++
              ) {
                let item = this.state.form.secondVaccinationLocationList[i];
                if (
                  item.hospital_name ===
                  this.state.patientVal.second_vaccine_location
                ) {
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      secondVaccinationLocationVal: i,
                      secondVaccinationDate: moment(
                        this.state.patientVal.second_vaccine_date,
                        "DD/MM/YYYY"
                      ).toDate(),
                    },
                  }));
                }
              }
            }

            if (index != null) {
              this.setState(
                (prevState) => ({
                  form: {
                    ...prevState.form,
                    programVal: index,
                    passcodeMaxAge: maxAge,
                    passcodeMinAge: minAge,
                  },
                }),
                () =>
                  this.fetchHospitalProfession().then(() => {
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        professionVal: this.state.patientVal.category,
                      },
                    }));
                  })
              );
              // refill brand
              for (
                let i = 0;
                i <
                program.vaksinasi_ke[
                  this.state.patientVal.status_vaccine.toLowerCase()
                ].list_brand_vaccine_and_nationality.length;
                i++
              ) {
                let brand =
                  program.vaksinasi_ke[
                    this.state.patientVal.status_vaccine.toLowerCase()
                  ].list_brand_vaccine_and_nationality[i];
                if (
                  brand.brand.trim() ===
                  this.state.patientVal.brand_vaccine.trim()
                ) {
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      vaccinationBrand: i,
                    },
                  }));
                }
              }
            } else {
              this.setState((prevState) => ({
                form: {
                  ...prevState.form,
                  programVal: "",
                },
              }));
            }
          });
        });
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            vaccinationState: this.state.patientVal.status_vaccine,
            vaccineLocation: this.state.patientVal.vaccine_location,
            nationality: this.state.patientVal.citizenship,
            nik: this.state.patientVal.card_id_number,
            fullName: this.state.patientVal.full_name,
            genderVal: this.state.patientVal.gender,
            birthDate: moment(this.state.patientVal.birthdate).toDate(),
            phoneNo: this.state.patientVal.phone,
            email: this.state.patientVal.email,
            address: this.state.patientVal.address,
            address2: this.state.patientVal.address_domicile,
          },
        }));

        this.fetchMerekVaksinasiKeduaSaatEditPasien();
      }
    } else if (page === "PATIENT EDIT FORM PAGE 2") {
      let context = this;
      this.fetchHospitalProgram().then(() => {
        if (this.state.patientVal.status_vaccine === "KEDUA") {
          for (
            let i = 0;
            i < this.state.form.firstVaccinationLocationList.length;
            i++
          ) {
            let item = this.state.form.firstVaccinationLocationList[i];
            if (
              item.hospital_name ===
              this.state.patientVal.first_vaccine_location
            ) {
              this.setState((prevState) => ({
                form: {
                  ...prevState.form,
                  firstVaccinationLocationVal: i,
                  firstVaccinationDate: moment(
                    this.state.patientVal.first_vaccine_date,
                    "DD/MM/YYYY"
                  ).toDate(),
                },
              }));
            }
          }
        }

        if (this.state.patientVal.status_vaccine === "KETIGA") {
          for (
            let i = 0;
            i < this.state.form.secondVaccinationLocationList.length;
            i++
          ) {
            let item = this.state.form.secondVaccinationLocationList[i];
            if (
              item.hospital_name ===
              this.state.patientVal.second_vaccine_location
            ) {
              this.setState((prevState) => ({
                form: {
                  ...prevState.form,
                  secondVaccinationLocationVal: i,
                  secondVaccinationDate: moment(
                    this.state.patientVal.second_vaccine_date,
                    "DD/MM/YYYY"
                  ).toDate(),
                },
              }));
            }
          }
        }
        let index;
        let maxAge = 0;
        let minAge = 0;
        let program;
        for (let i = 0; i < context.state.form.programList.length; i++) {
          let item = context.state.form.programList[i];
          if (item.program_name === context.state.patientVal.type_vaccine) {
            index = i;
            maxAge = item.max_age;
            minAge = item.min_age;
            program = item;
          }
        }
        if (index != null) {
          context.setState(
            (prevState) => ({
              form: {
                ...prevState.form,
                programVal: index,
                passcodeMaxAge: maxAge,
                passcodeMinAge: minAge,
              },
            }),
            () =>
              context.fetchHospitalProfession().then(() => {
                context.setState((prevState) => ({
                  form: {
                    ...prevState.form,
                    professionVal: context.state.patientVal.category,
                  },
                }));
              })
          );
          // refill brand
          for (
            let i = 0;
            i <
            program.vaksinasi_ke[
              context.state.patientVal.status_vaccine.toLowerCase()
            ].list_brand_vaccine_and_nationality.length;
            i++
          ) {
            let brand =
              program.vaksinasi_ke[
                context.state.patientVal.status_vaccine.toLowerCase()
              ].list_brand_vaccine_and_nationality[i];
            if (
              brand.brand.trim() ===
              context.state.patientVal.brand_vaccine.trim()
            ) {
              context.setState((prevState) => ({
                form: {
                  ...prevState.form,
                  vaccinationBrand: i,
                },
              }));
            }
          }
        }
      });

      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          vaccinationState: this.state.patientVal.status_vaccine,
          vaccineLocation: this.state.patientVal.vaccine_location,
          nationality: this.state.patientVal.citizenship,
          nik: this.state.patientVal.card_id_number,
          fullName: this.state.patientVal.full_name,
          genderVal: this.state.patientVal.gender,
          birthDate: moment(this.state.patientVal.birthdate).toDate(),
          phoneNo: this.state.patientVal.phone,
          email: this.state.patientVal.email,
          address: this.state.patientVal.address,
          address2: this.state.patientVal.address_domicile,
        },
      }));
      if (this.state.patientVal.status_vaccine === "KETIGA") {
        console.log("MUNCUL");
        this.fetchMerekVaksinasiKeduaSaatEditPasien();
      }
    } else if (page === "HOSPITAL SELECTION PAGE") {
      this.fetchHospitalList();
    } else if (page === "HOSPITAL SELECTION EDIT PAGE") {
      this.fetchHospitalList().then(() => {
        let index;
        for (let i = 0; i < this.state.form.hospitalList.length; i++) {
          let hospital = this.state.form.hospitalList[i];
          if (
            hospital.location_vaccine_name ===
            this.state.patientVal.hospital_name
          ) {
            index = i;
            break;
          }
        }
        if (index == null) index = "";
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            hospitalVal: index,
          },
        }));
      });
    } else if (page === "SCREENING VACCINE NO PAGE") {
      let context = this;
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          allowedVaccineNo: [],
          vaccineNo: "",
        },
      }));
      this.fetchHospitalVaccineNo(this.state.patientVal);
    }
    this.setState({ page: page });
  }

  goToDevice() {
    const deviceType = getMobileOperatingSystem();
    if (deviceType === "ANDROID") {
      ga.event({
        action: "Klik Banner",
        params: {
          search_term: "Download Mobile Apps Android",
          event_category: "Homepage",
        },
      });
      window.location.href = `${Config.BASE_URL}/vaccine-close`;
    } else if (deviceType === "IOS") {
      window.location.href = `${Config.BASE_URL}/vaccine-close`;
    } else {
      ga.event({
        action: "Klik Back",
        params: {
          search_term: "Back from Vaccine Website",
          event_category: "Website",
        },
      });
      window.location.href = `${Config.BASE_URL}/?vaccine-close=1`;
    }
  }

  mainPage() {
    return (
      <div className="main-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div onClick={() => this.goToDevice()} className="arrow clickable">
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} alt="img" />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container">
          <p className="blue-text">Daftar Pasien Vaksinasi COVID-19</p>
          <div
            id="main-carousel"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <div className="overflow">
              <ul className="carousel-indicators">
                <li
                  data-target="#main-carousel"
                  data-slide-to={0}
                  className={`${
                    this.state.patientList.length >= 0 ? `active` : ``
                  }`}
                ></li>
                {this.state.patientList.map((item, index) => (
                  <li
                    key={index + 1}
                    data-target="#main-carousel"
                    data-slide-to={index + 1}
                  ></li>
                ))}
              </ul>
            </div>
            <div className="carousel-inner">
              <div
                className={`carousel-item ${
                  this.state.patientList.length >= 0 ? `active` : ``
                }`}
              >
                <div className="add-new-patient clickable">
                  <div className="d-flex justify-content-center">
                    <div className="">
                      <img
                        src={`${Config.BASE_URL}/img/main-page-vaccine.png`}
                      />
                    </div>
                  </div>
                  <div
                    className="text align-self-center"
                    style={{ color: "#2C528B", fontSize: 12, marginTop: 12 }}
                  >
                    Daftar Vaksinasi COVID-19 <br /> dengan aman dan nyaman di
                    AlteaCare
                  </div>
                  <div
                    className="text align-self-center button-primary"
                    onClick={() => this.goPage("VACCINE LOCATION SELECT PAGE")}
                  >
                    Yuk Daftar Vaksin
                  </div>
                </div>
              </div>

              {this.state.patientList.map((item, index) => (
                <div key={index + 1} className={`carousel-item`}>
                  <div className="patient-card">
                    <div className="program-name">{item.program_name}</div>
                    <div className="hospital-name">{item.hospital_name}</div>
                    <div style={{ minHeight: "4px" }}></div>
                    <div className="fullname">{item.full_name}</div>
                    <div className="nik">KTP {item.card_id_number}</div>
                    <div className="birthdate">
                      {moment(item.birthdate).format("DD MMMM YYYY")} (
                      {moment().diff(
                        moment(item.birthdate).format("YYYY-MM-DD"),
                        "years"
                      )}{" "}
                      Tahun)
                    </div>
                    <div className="gender">{item.gender}</div>
                    <div className="phone">{item.phone}</div>
                    <div className="email">{item.email}</div>
                    <div style={{ minHeight: "8px" }}></div>
                    {this.getVaccineLatestSchedule(item) != null &&
                      this.getVaccineLatestSchedule(item).status_schedule ==
                        "CANCELED" && (
                        <div className="red-warning-notice">
                          Pendaftaran Anda telah dibatalkan
                        </div>
                      )}
                    {(this.getVaccineLatestSchedule(item) == null ||
                      this.getVaccineLatestSchedule(item).status_schedule !=
                        "CANCELED") && (
                      <div>
                        <div className="text">Kuisioner Skrining Vaksin</div>
                        <div style={{ minHeight: "8px" }}></div>
                        {item.status === "PENDING" && (
                          <div
                            onClick={() => {
                              this.setState(
                                {
                                  patientVal: item,
                                },
                                () => this.goPage("SCREENING WELCOME PAGE")
                              );
                            }}
                            className="white-button clickable"
                          >
                            <div className="left">Isi Kuisioner Skrining</div>
                            <div className="right">
                              <img
                                src={`${Config.BASE_URL}/img/arrow-right.png`}
                              />
                            </div>
                          </div>
                        )}
                        {item.status === "ACCEPTED" && (
                          <div className="green-notice">Lolos Skrining</div>
                        )}
                        {item.status === "UPDATED" && (
                          <div className="green-notice">Isi Ulang Skrining</div>
                        )}
                        {item.status === "REJECTED" && (
                          <div className="red-warning-notice">
                            Tidak Lolos Skrining
                          </div>
                        )}
                        <div style={{ minHeight: "8px" }}></div>
                        <div className="vaccine-no">
                          {this.getVaccineSchedule(item, "KEDUA") != null
                            ? "Vaksin Kedua"
                            : this.getVaccineSchedule(item, "KETIGA") != null
                            ? "Vaksin Ketiga"
                            : this.getVaccineSchedule(item, "PERTAMA") != null
                            ? "Vaksin Pertama"
                            : item.vaccine_no == "KEDUA"
                            ? "Vaksin Kedua"
                            : item.vaccine_no == "KETIGA"
                            ? "Vaksin Ketiga"
                            : "Vaksin Pertama"}
                        </div>
                        <div style={{ minHeight: "8px" }}></div>
                        {this.getVaccineLatestSchedule(item) != null &&
                          this.getVaccineLatestSchedule(item).status_schedule !=
                            "CANCELED" && (
                            <>
                              <div className="schedule-text">Jadwal</div>
                              <div style={{ minHeight: "8px" }}></div>
                              <div className="d-flex">
                                <div className="img">
                                  <img
                                    src={`${Config.BASE_URL}/img/calendar-black-icon.png`}
                                  />
                                </div>
                                <div style={{ minWidth: "4px" }}></div>
                                <div className="vaccine-date">
                                  {moment(
                                    this.getVaccineLatestSchedule(item)
                                      .vaccine_date,
                                    "DD/MM/YYYY"
                                  ).format("DD MMMM YYYY")}
                                </div>
                              </div>
                            </>
                          )}
                      </div>
                    )}
                    <div
                      onClick={() => {
                        this.setState(
                          {
                            patientVal: item,
                          },
                          () => this.goPage("PATIENT DETAIL PAGE")
                        );
                      }}
                      className="view-detail clickable"
                    >
                      Lihat detail
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  vaccineLocationSelectPage() {
    return (
      <div className="vaccine-location-select-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.resetState("MAIN PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container flex-grow-1 d-flex flex-column">
          <div className="choose-text">Pilih Jalur Vaksinasi :</div>
          <div style={{ minHeight: "20px" }}></div>
          <div className="company-vaccine">
            <div className="blue-text">Vaksinasi Perusahaan</div>
            <div style={{ minHeight: "8px" }}></div>
            <p>Apakah kamu memiliki Passcode atau terdaftar di perusahaan ?</p>
            <div style={{ minHeight: "12px" }}></div>
            <p className="blue-subtext">
              Jika iya, Masukkan Passcode atau No. KTP
            </p>
            <div style={{ minHeight: "4px" }}></div>
            <div className="form-group">
              <input
                value={this.state.form.passcode}
                onChange={this.handleFormChange}
                name="passcode"
                type="text"
                className="custom-blue-input"
                placeholder="Masukkan Passcode atau No. KTP"
              />
            </div>
            <div style={{ minHeight: "12px" }}></div>
            <div className="form-group">
              <button
                onClick={async () => {
                  if (this.state.form.passcode.trim() === "")
                    return Swal.fire("Passcode atau No. KTP wajib diisi");
                  this.setState(
                    (prevState) => ({
                      form: { ...prevState.form, vaccineLocation: "PASSCODE" },
                    }),
                    async () => {
                      await this.fetchPasscodeLocation();
                      if (this.state.form.passcodeLocation === "") return;
                      this.goPage("PATIENT DATA FORM PAGE 2");
                    }
                  );
                }}
                className="color-button w-100"
              >
                Cek Lokasi
              </button>
            </div>
            <div style={{ minHeight: "8px" }}></div>
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <p className="blue-text text-center">atau</p>
          <div style={{ minHeight: "8px" }}></div>
          <div className="general-vaccine">
            <div className="blue-text">Vaksinasi Umum</div>
            <div style={{ minHeight: "16px" }}></div>
            <div className="d-flex">
              <div className="img align-self-center">
                <img src={`${Config.BASE_URL}/img/hospital-icon.png`} alt="" />
              </div>
              <div style={{ minWidth: "16px" }}></div>
              <div className="text">
                Program vaksinasi lansia dan program vaksinasi pemerintah
                lainnya (umum).
              </div>
            </div>
            <div style={{ minHeight: "16px" }}></div>
            <div className="action">
              <button
                onClick={() => {
                  this.setState((prevState) => ({
                    form: { ...prevState.form, vaccineLocation: "RUMAH SAKIT" },
                  }));
                  this.goPage("HOSPITAL SELECTION PAGE");
                }}
                className="border-button"
              >
                Pilih Lokasi
              </button>
            </div>
          </div>
        </div>
        <div style={{ minHeight: "28px" }}></div>
      </div>
    );
  }

  handleFormCustomByFajar = (e) => {
    let data = JSON.parse(e.target.value);

    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        hospitalVal: data.index,
        location_vaccine_list_id: data.value,
      },
    }));
  };

  hospitalSelectionPage() {
    return (
      <div className="hospital-selection-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => {
              this.setState((prevState) => ({
                form: { ...prevState.form, hospitalVal: "", programList: [] },
              }));
              this.goPage("VACCINE LOCATION SELECT PAGE");
            }}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="select-hospital">
          <div className="container">
            <p>
              Pilih Rumah Sakit untuk melihat Program Vaksinasi COVID-19 dan
              jadwal yang tersedia
            </p>
            <div className="form-group">
              <label>Rumah Sakit</label>
              <select
                name="hospitalVal"
                // value={this.state.form.hospitalVal}
                value={`{"index":${this.state.form.hospitalVal},"value":${this.state.form.location_vaccine_list_id}}`}
                onChange={(e) => this.handleFormCustomByFajar(e)}
                className="input-field"
              >
                <option value="">Pilih Rumah Sakit</option>
                {this.state.form.hospitalList.map((item, index) => (
                  <option
                    key={index}
                    value={`{"index":${index},"value":${item.location_vaccine_id}}`}
                    // value={(index, item.location_vaccine_id)}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {this.state.form.hospitalList.length > 0 && (
          <div
            dangerouslySetInnerHTML={{
              __html:
                this.state.form.hospitalVal === ""
                  ? ""
                  : this.state.form.hospitalList[
                      this.state.form.hospitalVal
                    ] === null
                  ? ""
                  : this.state.form.hospitalList[this.state.form.hospitalVal]
                      .description,
            }}
            className="container flex-grow-1 d-flex flex-column justify-content-start overflow"
          ></div>
        )}
        <div className="form-group action">
          <button
            onClick={() => {
              if (this.state.form.hospitalVal === "")
                return Swal.fire("Rumah Sakit Wajib dipilih");
              this.goPage("PATIENT DATA FORM PAGE");
            }}
            className={
              this.state.form.hospitalVal === "" ||
              this.state.form.hospitalList[this.state.form.hospitalVal]
                .is_full === 0
                ? "color-button"
                : "red-button"
            }
            disabled={
              this.state.form.hospitalVal !== "" &&
              this.state.form.hospitalList[this.state.form.hospitalVal]
                .is_full === 1
            }
          >
            {this.state.form.hospitalVal !== "" &&
            this.state.form.hospitalList[this.state.form.hospitalVal]
              .is_full === 1
              ? "Slot Sudah Penuh"
              : "Pilih"}
          </button>
        </div>
      </div>
    );
  }

  hospitalSelectionEditPage() {
    return (
      <div className="hospital-selection-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.resetState("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="select-hospital">
          <div className="container">
            <p>
              Pilih Rumah Sakit untuk melihat Program Vaksinasi COVID-19 dan
              jadwal yang tersedia
            </p>
            <div className="form-group">
              <label>Rumah Sakit</label>
              <select
                name="hospitalVal"
                value={this.state.form.hospitalVal}
                onChange={(e) => {
                  this.handleFormChange(e, () => {
                    this.fetchHospitalProgram();
                    this.fetchHospitalProfession();
                  });
                }}
                className="input-field"
              >
                {this.state.form.hospitalList.length > 0 &&
                  this.state.form.hospitalList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {this.state.form.hospitalList.length > 0 &&
          this.state.form.hospitalVal != null && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  this.state.form.hospitalVal === ""
                    ? ""
                    : this.state.form.hospitalList[this.state.form.hospitalVal]
                        .description,
              }}
              className="container flex-grow-1 d-flex flex-column justify-content-start overflow"
            ></div>
          )}
        <div className="form-group action">
          <button
            onClick={() => this.goPage("PATIENT EDIT FORM PAGE 2")}
            className={
              this.state.form.hospitalVal === "" ||
              (this.state.form.hospitalList[this.state.form.hospitalVal] !=
                null &&
                this.state.form.hospitalList[this.state.form.hospitalVal]
                  .is_full === 0)
                ? "color-button"
                : "red-button"
            }
            disabled={
              this.state.form.hospitalVal !== "" &&
              this.state.form.hospitalList[this.state.form.hospitalVal] !=
                null &&
              this.state.form.hospitalList[this.state.form.hospitalVal]
                .is_full === 1
            }
          >
            {this.state.form.hospitalVal !== "" &&
            this.state.form.hospitalList[this.state.form.hospitalVal] != null &&
            this.state.form.hospitalList[this.state.form.hospitalVal]
              .is_full === 1
              ? "Slot Sudah Penuh"
              : "Pilih"}
          </button>
        </div>
      </div>
    );
  }

  patientDataFormPage() {
    return (
      <div className="patient-data-form-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => {
              this.setState((prevState) => ({
                form: {
                  ...prevState.form,
                  programVal: "",
                  vaccinationState: "",
                  nationality: "",
                  firstVaccinationDate: "",
                  firstVaccinationLocationVal: "",
                  secondVaccinationDate: "",
                  secondVaccinationLocationVal: "",
                  vaccinationState: "",
                  vaccinationBrand: "",
                  second_brand_vaccine: "",
                  nik: "",
                  fullName: "",
                  birthDate: "",
                  genderVal: "",
                  phoneNo: "",
                  email: "",
                  address: "",
                  isDomicileSame: false,
                  address2: "",
                  identityImg: [null],
                  identityImgPreview: [null],
                  certImg: null,
                  certImgPreview: null,
                  ticketImg: null,
                  ticketImgPreview: null,
                  ktpImg: null,
                  ktpImgPreview: null,
                },
              }));
              this.goPage("HOSPITAL SELECTION PAGE");
            }}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="d-flex flex-column h-100 overflow flex-grow-1">
          <div className="select-hospital">
            <div className="container">
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi <span className="text-danger">*</span>
                </label>
                <select
                  name="hospitalVal"
                  value={this.state.form.hospitalVal}
                  onChange={(e) => {
                    this.handleFormChange(e, () => {
                      this.fetchHospitalProgram();
                    });
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        programVal: "",
                        professionList: [],
                        professionVal: "",
                        firstVaccinationDate: "",
                        firstVaccinationLocationVal: "",
                        vaccinationState: "",
                        vaccinationBrand: "",
                        nationality: "",
                        nik: "",
                        fullName: "",
                        birthDate: "",
                        genderVal: "",
                        phoneNo: "",
                        email: "",
                        address: "",
                        isDomicileSame: false,
                        address2: "",
                        ktpImg: null,
                        ktpImgPreview: null,
                        certImg: null,
                        certImgPreview: null,
                        identityImg: [null],
                        identityImgPreview: [null],
                      },
                    }));
                  }}
                  className="input-field"
                >
                  {this.state.form.hospitalList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>
                  Pilih Program Vaksinasi <span className="text-danger">*</span>
                </label>
                <select
                  name="programVal"
                  value={this.state.form.programVal}
                  onChange={(e) => {
                    this.handleFormChange(e, () => {
                      this.fetchHospitalProfession();
                    });
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        firstVaccinationDate: "",
                        firstVaccinationLocationVal: "",
                        vaccinationState: "",
                        vaccinationBrand: "",
                        nationality: "",
                        nik: "",
                        fullName: "",
                        birthDate: "",
                        genderVal: "",
                        phoneNo: "",
                        email: "",
                        address: "",
                        isDomicileSame: false,
                        address2: "",
                        ktpImg: null,
                        ktpImgPreview: null,
                        certImg: null,
                        certImgPreview: null,
                        identityImg: [null],
                        identityImgPreview: [null],
                      },
                    }));
                  }}
                  className="input-field"
                >
                  <option value="">Pilih Program Vaksinasi</option>
                  {this.state.form.programList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.program_name}
                    </option>
                  ))}
                </select>
              </div>
              {this.state.form.programVal !== "" &&
                Number(
                  this.state.form.programList[this.state.form.programVal]
                    .is_category
                ) === 1 && (
                  <div className="form-group">
                    <label>
                      Kategori <span className="text-danger">*</span>
                    </label>
                    <select
                      name="professionVal"
                      value={this.state.form.professionVal}
                      onChange={this.handleFormChange}
                      className="input-field"
                    >
                      <option value="">Pilih Kategori</option>
                      {this.state.form.professionList.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
            </div>
          </div>
          <div className="container flex-grow-1 d-flex flex-column justify-content-start">
            <div className="form-group">
              <label>Isi Data Pasien Vaksin</label>
            </div>
            <div className="form-group">
              <label>
                Vaksinasi ke <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowFirstVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "PERTAMA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowFirstVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "PERTAMA"
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Pertama</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowSecondVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KEDUA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowSecondVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KEDUA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Kedua</div>
                </div>
                {/* // Fajar Pilihan Vaksin ke */}
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowThirdVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KETIGA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowThirdVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KETIGA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Ketiga</div>
                </div>
              </div>
            </div>

            {/* Fajar tambah merek vaksinasi ketiga */}

            {this.state.form.vaccinationState === "KETIGA" ? (
              <>
                <div className="form-group">
                  <label>
                    Merek Vaksinasi Ketiga{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    name="vaccinationBrand"
                    value={this.state.form.vaccinationBrand}
                    disabled={this.getVaccinationBrandList().length === 0}
                    onChange={(e) => {
                      this.handleFormChange(e, () => {
                        this.setState((prevState) => ({
                          form: {
                            ...prevState.form,
                            nationality: "",
                            second_brand_vaccine: "",
                          },
                        }));
                        this.fetchMerekVaksinasiKedua();
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">Pilih Merek Vaksinasi</option>
                    {this.getVaccinationBrandList().map((item, index) => (
                      <option key={index} value={index}>
                        {item.brand}
                      </option>
                    ))}
                  </select>
                  {this.state.form.vaccinationBrand !== "" && (
                    <div className="program-note text-danger">
                      <small>
                        <em>
                          {
                            this.getVaccinationBrandList()[
                              this.state.form.vaccinationBrand
                            ].noted
                          }
                        </em>
                      </small>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>
                    Merek Vaksinasi <span className="text-danger">*</span>
                  </label>
                  <select
                    name="vaccinationBrand"
                    value={this.state.form.vaccinationBrand}
                    disabled={this.getVaccinationBrandList().length === 0}
                    onChange={(e) => {
                      this.handleFormChange(e, () => {
                        this.setState((prevState) => ({
                          form: { ...prevState.form, nationality: "" },
                        }));
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">Pilih Merek Vaksinasi</option>
                    {this.getVaccinationBrandList().map((item, index) => (
                      <option key={index} value={index}>
                        {item.brand}
                      </option>
                    ))}
                  </select>
                  {this.state.form.vaccinationBrand !== "" && (
                    <div className="program-note text-danger">
                      <small>
                        <em>
                          {
                            this.getVaccinationBrandList()[
                              this.state.form.vaccinationBrand
                            ].noted
                          }
                        </em>
                      </small>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label>
                Kewarganegaraan <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowWNI()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNI" },
                    }));
                  }}
                  className={`selection ${this.allowWNI() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNI" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNI</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowWNA()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNA" },
                    }));
                  }}
                  className={`selection ${this.allowWNA() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNA</div>
                </div>
              </div>
            </div>

            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Pertama"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.firstVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        firstVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}
            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="firstVaccinationLocationVal"
                  value={this.state.form.firstVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Pertama</option>
                  {this.state.form.firstVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            {/* Fajar Tambah Tanggal Vaksin kedua  */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Kedua"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.secondVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        secondVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}

            {/* Fajar Tambah Merek Vaksin kedua */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Merek Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="second_brand_vaccine"
                  value={this.state.form.second_brand_vaccine}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillFormVaksinasiKedua()}
                  className="input-field"
                >
                  <option value="">Pilih Merek Vaksin</option>
                  {this.state.form.list_vaccine_allowed.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Fajar Tambah Lokasi Vaksin kedua */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="secondVaccinationLocationVal"
                  value={this.state.form.secondVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Kedua</option>
                  {this.state.form.secondVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            <div className="form-group">
              <label>
                Nomor Induk Kependudukan <span className="text-danger">*</span>
              </label>
              <input
                name="nik"
                value={this.state.form.nik}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="number"
                placeholder="Masukkan Nomor Kartu Identitas"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Nama Lengkap <span className="text-danger">*</span>
              </label>
              <input
                name="fullName"
                value={this.state.form.fullName}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="text"
                placeholder="Tulis Nama Lengkap"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Tanggal Lahir <span className="text-danger">*</span>
              </label>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                placeholderText="Pilih tanggal lahir"
                disabledKeyboardNavigation
                withPortal
                onFocus={(e) => (e.target.readOnly = true)}
                selected={this.state.form.birthDate}
                onChangeRaw={(e) => e.preventDefault()}
                onChange={(date) => this.setBirthdate(date)}
                showYearDropdown={true}
                dropdownMode={"select"}
                maxDate={moment().toDate()}
                disabled={this.disableFillForm()}
              />
            </div>
            <div className="form-group">
              <label>
                Jenis Kelamin <span className="text-danger">*</span>
              </label>
              <select
                name="genderVal"
                value={this.state.form.genderVal}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                className="input-field"
              >
                <option value="">Pilih Jenis Kelamin</option>
                {this.state.form.genderList
                  .filter(this.filterGenderByTypeVaccine)
                  .map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                Nomor Handphone / WA <span className="text-danger">*</span>
              </label>
              <input
                name="phoneNo"
                value={this.state.form.phoneNo}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="text"
                placeholder="contoh: 081234567890"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                name="email"
                value={this.state.form.email}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="email"
                placeholder="Tulis E-mail"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Alamat Kartu Identitas (KTP / KK){" "}
                <span className="text-danger">*</span>
              </label>
              <textarea
                name="address"
                value={this.state.form.address}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat lengkap disini"
              ></textarea>
            </div>
            <div className="form-group">
              <div
                onClick={() => {
                  if (this.disableFillForm()) return;
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      isDomicileSame: !this.state.form.isDomicileSame,
                      address2: !this.state.form.isDomicileSame
                        ? ""
                        : this.state.form.address2,
                    },
                  }));
                }}
                className={`option-checkbox ${
                  this.state.form.isDomicileSame ? "active" : ""
                }`}
              >
                <div className="checkbox">✓</div>
                <div className="checkbox-text">
                  Alamat Domisili sesuai KTP / KK
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Alamat Domisili</label>
              <textarea
                name="address2"
                disabled={
                  this.state.form.isDomicileSame || this.disableFillForm()
                }
                value={this.state.form.address2}
                onChange={this.handleFormChange}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat domisili disini"
              ></textarea>
            </div>
            <div className="form-group">
              {this.state.form.ktpImg === null && (
                <div className="d-flex justify-content-between">
                  <div className="align-self-center">
                    <label>
                      Foto Kartu Identitas{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div style={{ minWidth: "20px" }}></div>
                  <div>
                    <input
                      id="identity-file-input"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      disabled={this.state.isLoading}
                      onChange={this.handleKTPFileChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("identity-file-input").click()
                      }
                      disabled={this.disableFillForm()}
                      className="color-button"
                    >
                      Unggah
                    </button>
                  </div>
                </div>
              )}
              {this.state.form.ktpImg != null && (
                <div className="d-flex">
                  <div className="filename flex-grow-1 align-self-center">
                    {this.state.form.ktpImg.name}
                  </div>
                  <div className="filesize align-self-center">
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(this.state.form.ktpImg.size / 1000)}
                    KB
                  </div>
                  <div style={{ minWidth: "12px" }}></div>
                  <div
                    className="fileview align-self-center"
                    data-toggle="modal"
                    data-target="#ktp-view-modal"
                  >
                    Lihat
                  </div>
                  <div className="modal fade" id="ktp-view-modal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          {this.state.form.ktpImgPreview != null && (
                            <img
                              id="identity-preview-img"
                              className="identity-preview-img"
                              src={this.state.form.ktpImgPreview}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: "15px" }}></div>
                  <div
                    onClick={this.clearKTPImg}
                    className="filedelete align-self-center"
                  >
                    Hapus
                  </div>
                  <div style={{ minWidth: "14px" }}></div>
                </div>
              )}
            </div>
            {/* Fajar Tambah Kartu Vaksin Kedua */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <>
                <div className="form-group">
                  {this.state.form.certImg === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Kartu Vaksinasi Kedua{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id="cert-file-input"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={this.handleCertFileChange}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("cert-file-input").click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.certImg != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.certImg.name}
                      </div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(this.state.form.certImg.size / 1024)}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target="#cert-view-modal"
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id="cert-view-modal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.certImgPreview != null && (
                                <img
                                  id="cert-preview-img"
                                  className="cert-preview-img"
                                  src={this.state.form.certImgPreview}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={this.clearCertImg}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Tiket Vaksin ketiga */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <>
                <div className="form-group">
                  {this.state.form.ticketImg === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Tiket Vaksinasi Ketiga{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id="cert-file-input"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={this.handleTicketFileChange}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("cert-file-input").click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.ticketImg != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.ticketImg.name}
                      </div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(this.state.form.ticketImg.size / 1024)}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target="#cert-view-modal"
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id="cert-view-modal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.ticketImgPreview != null && (
                                <img
                                  id="cert-preview-img"
                                  className="cert-preview-img"
                                  src={this.state.form.ticketImgPreview}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={this.clearTicketImg}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              </>
            )}

            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                {this.state.form.certImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Kartu Vaksinasi Pertama{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleCertFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        disabled={this.disableFillForm()}
                        className="color-button"
                      >
                        Unggah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.certImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.certImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.certImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.certImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.certImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearCertImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}
            <div className="form-group">
              {this.state.form.identityImg.map((item, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  {this.state.form.identityImg[index] === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Surat Rekomendasi Dokter <br /> atau Surat Lainnya
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id={`identity-file-input-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={(e) => this.handleFileChange(e, index)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("identity-file-input-" + index)
                              .click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.identityImg[index] != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.identityImg[index].name}
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(
                          this.state.form.identityImg[index].size / 1000
                        )}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#identity-view-modal-${index}`}
                      >
                        Lihat
                      </div>
                      <div
                        className="modal fade"
                        id={`identity-view-modal-${index}`}
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.identityImgPreview[index] !=
                                null && (
                                <img
                                  id={`identity-preview-img-${index}`}
                                  className="identity-preview-img"
                                  src={
                                    this.state.form.identityImgPreview[index]
                                  }
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={() => this.clearIdentityImg(index)}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <button
                onClick={this.submitNewPatient}
                className="color-button w-100"
              >
                Simpan, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  patientDataFormPage2() {
    return (
      <div className="patient-data-form-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => {
              this.setState((prevState) => ({
                form: {
                  ...prevState.form,
                  passcode: "",
                  passcodeLocation: "",
                  vaccinationState: "",
                  vaccinationBrand: "",
                  nationality: "",
                  firstVaccinationDate: "",
                  firstVaccinationLocationVal: "",
                  secondVaccinationDate: "",
                  secondVaccinationLocationVal: "",
                  second_brand_vaccine: "",

                  nik: "",
                  fullName: "",
                  birthDate: "",
                  genderVal: "",
                  phoneNo: "",
                  email: "",
                  address: "",
                  isDomicileSame: false,
                  address2: "",
                  identityImg: [null],
                  identityImgPreview: [null],
                  ktpImg: null,
                  ktpImgPreview: null,
                  ticketImg: null,
                  ticketImgPreview: null,
                  certImg: null,
                  certImgPreview: null,
                },
              }));
              this.goPage("VACCINE LOCATION SELECT PAGE");
            }}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="d-flex flex-column h-100 overflow flex-grow-1">
          <div className="select-hospital">
            <div className="container">
              <div className="form-group">
                <label>Perusahaan</label>
                <input
                  type="text"
                  value={this.state.form.passcodeLocation.company_name}
                  className="input-field"
                  readOnly={true}
                />
              </div>
              <div className="form-group">
                <label>Lokasi Vaksinasi</label>
                <input
                  type="text"
                  value={
                    this.state.form.passcodeLocation.location_vaccine_company
                  }
                  className="input-field"
                  readOnly={true}
                />
              </div>
              <div className="note">
                <strong>Catatan:</strong>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: this.state.form.passcodeLocation.note,
                  }}
                />
              </div>
              <div style={{ minHeight: "8px" }}></div>
            </div>
          </div>
          <div className="container flex-grow-1 d-flex flex-column justify-content-start">
            <div className="form-group">
              <label>Isi Data Pasien Vaksin</label>
            </div>

            <div className="form-group">
              <label>
                Vaksinasi ke <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowFirstVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "PERTAMA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowFirstVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "PERTAMA"
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Pertama</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowSecondVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KEDUA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowSecondVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KEDUA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Kedua</div>
                </div>
                {/* Fajar Tambah vaksinasi ke 3 pilih perusahaan */}
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowThirdVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KETIGA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowThirdVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KETIGA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Ketiga</div>
                </div>
              </div>
            </div>
            {this.state.form.vaccinationState === "KETIGA" ? (
              <>
                <div className="form-group">
                  <label>
                    Merek Vaksinasi Ketiga
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    name="vaccinationBrand"
                    value={this.state.form.vaccinationBrand}
                    onChange={(e) => {
                      this.handleFormChange(e, () => {
                        this.setState((prevState) => ({
                          form: {
                            ...prevState.form,
                            nationality: "",
                            second_brand_vaccine: "",
                          },
                        }));
                        this.fetchMerekVaksinasiKeduaPilihPerusahaan();
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">Pilih Merek Vaksinasi</option>
                    {this.state.form.passcodeLocation.brand_vaccine.map(
                      (item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>
                    Merek Vaksinasi <span className="text-danger">*</span>
                  </label>
                  <select
                    name="vaccinationBrand"
                    value={this.state.form.vaccinationBrand}
                    onChange={this.handleFormChange}
                    className="input-field"
                  >
                    <option value="">Pilih Merek Vaksinasi</option>
                    {this.state.form.passcodeLocation.brand_vaccine.map(
                      (item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label>
                Kewarganegaraan <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowWNI()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNI" },
                    }));
                  }}
                  className={`selection ${this.allowWNI() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNI" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNI</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowWNA()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNA" },
                    }));
                  }}
                  className={`selection ${this.allowWNA() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNA</div>
                </div>
              </div>
            </div>

            {/* Fajar Tambah Pilih Perusahaan */}

            {/* Fajar Tambah Tanggal Vaksin kedua Pilih Perusahaan */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Kedua"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.secondVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        secondVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}

            {/* Fajar Tambah Merek Vaksin kedua  Pilih Perusahaan */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Merek Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="second_brand_vaccine"
                  value={this.state.form.second_brand_vaccine}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillFormVaksinasiKedua()}
                  className="input-field"
                >
                  <option value="">Pilih Merek Vaksin</option>
                  {this.state.form.list_vaccine_allowed.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Fajar Tambah Lokasi Vaksin kedua */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="secondVaccinationLocationVal"
                  value={this.state.form.secondVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Kedua</option>
                  {this.state.form.secondVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Pertama"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.firstVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        firstVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}
            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="firstVaccinationLocationVal"
                  value={this.state.form.firstVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Pertama</option>
                  {this.state.form.firstVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            <div className="form-group">
              <label>
                Nomor Induk Kependudukan <span className="text-danger">*</span>
              </label>
              <input
                name="nik"
                value={this.state.form.nik}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="number"
                placeholder="Masukkan Nomor Kartu Identitas"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Nama Lengkap <span className="text-danger">*</span>
              </label>
              <input
                name="fullName"
                value={this.state.form.fullName}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="text"
                placeholder="Tulis Nama Lengkap"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Tanggal Lahir <span className="text-danger">*</span>
              </label>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                placeholderText="Pilih tanggal lahir"
                disabledKeyboardNavigation
                withPortal
                onFocus={(e) => (e.target.readOnly = true)}
                selected={this.state.form.birthDate}
                onChangeRaw={(e) => e.preventDefault()}
                onChange={(date) => this.setBirthdate(date)}
                showYearDropdown={true}
                dropdownMode={"select"}
                maxDate={moment().toDate()}
                disabled={this.disableFillForm()}
              />
            </div>
            <div className="form-group">
              <label>
                Jenis Kelamin <span className="text-danger">*</span>
              </label>
              <select
                name="genderVal"
                value={this.state.form.genderVal}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                className="input-field"
              >
                <option value="">Pilih Jenis Kelamin</option>
                {this.state.form.genderList.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                Nomor Handphone / WA <span className="text-danger">*</span>
              </label>
              <input
                name="phoneNo"
                value={this.state.form.phoneNo}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="text"
                placeholder="contoh: 081234567890"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                name="email"
                value={this.state.form.email}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="email"
                placeholder="Tulis E-mail"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Alamat Kartu Identitas (KTP / KK){" "}
                <span className="text-danger">*</span>
              </label>
              <textarea
                name="address"
                value={this.state.form.address}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat lengkap disini"
              ></textarea>
            </div>
            <div className="form-group">
              <div
                onClick={() => {
                  if (this.disableFillForm()) return;
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      isDomicileSame: !this.state.form.isDomicileSame,
                      address2: !this.state.form.isDomicileSame
                        ? ""
                        : this.state.form.address2,
                    },
                  }));
                }}
                className={`option-checkbox ${
                  this.state.form.isDomicileSame ? "active" : ""
                }`}
              >
                <div className="checkbox">✓</div>
                <div className="checkbox-text">
                  Alamat Domisili sesuai KTP / KK
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Alamat Domisili</label>
              <textarea
                name="address2"
                disabled={
                  this.state.form.isDomicileSame || this.disableFillForm()
                }
                value={this.state.form.address2}
                onChange={this.handleFormChange}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat domisili disini"
              ></textarea>
            </div>

            <div className="form-group">
              {this.state.form.ktpImg === null && (
                <div className="d-flex justify-content-between">
                  <div className="align-self-center">
                    <label>
                      Unggah Foto Kartu Identitas{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div style={{ minWidth: "20px" }}></div>
                  <div>
                    <input
                      id="identity-file-input"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      disabled={this.state.isLoading}
                      onChange={this.handleKTPFileChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("identity-file-input").click()
                      }
                      disabled={this.disableFillForm()}
                      className="color-button"
                    >
                      Unggah
                    </button>
                  </div>
                </div>
              )}
              {this.state.form.ktpImg != null && (
                <div className="d-flex">
                  <div className="filename flex-grow-1 align-self-center">
                    {this.state.form.ktpImg.name}
                  </div>
                  <div className="filesize align-self-center">
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(this.state.form.ktpImg.size / 1000)}
                    KB
                  </div>
                  <div style={{ minWidth: "12px" }}></div>
                  <div
                    className="fileview align-self-center"
                    data-toggle="modal"
                    data-target="#ktp-view-modal"
                  >
                    Lihat
                  </div>
                  <div className="modal fade" id="ktp-view-modal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          {this.state.form.ktpImgPreview != null && (
                            <img
                              id="identity-preview-img"
                              className="identity-preview-img"
                              src={this.state.form.ktpImgPreview}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: "15px" }}></div>
                  <div
                    onClick={this.clearKTPImg}
                    className="filedelete align-self-center"
                  >
                    Hapus
                  </div>
                  <div style={{ minWidth: "14px" }}></div>
                </div>
              )}
            </div>

            {this.state.form.vaccinationState === "KETIGA" && (
              <>
                <div className="form-group">
                  {this.state.form.certImg === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Kartu Vaksinasi Kedua{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id="cert-file-input"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={this.handleCertFileChange}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("cert-file-input").click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.certImg != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.certImg.name}
                      </div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(this.state.form.certImg.size / 1024)}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target="#cert-view-modal"
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id="cert-view-modal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.certImgPreview != null && (
                                <img
                                  id="cert-preview-img"
                                  className="cert-preview-img"
                                  src={this.state.form.certImgPreview}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={this.clearCertImg}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Tiket Vaksin ketiga */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <>
                <div className="form-group">
                  {this.state.form.ticketImg === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Tiket Vaksinasi Ketiga{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id="cert-file-input"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={this.handleTicketFileChange}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("cert-file-input").click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.ticketImg != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.ticketImg.name}
                      </div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(this.state.form.ticketImg.size / 1024)}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target="#cert-view-modal"
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id="cert-view-modal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.ticketImgPreview != null && (
                                <img
                                  id="cert-preview-img"
                                  className="cert-preview-img"
                                  src={this.state.form.ticketImgPreview}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={this.clearTicketImg}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              </>
            )}

            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                {this.state.form.certImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Kartu Vaksinasi Pertama{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleCertFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        disabled={this.disableFillForm()}
                        className="color-button"
                      >
                        Unggah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.certImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.certImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.certImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.certImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.certImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearCertImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}
            <div className="form-group">
              {this.state.form.identityImg.map((item, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  {this.state.form.identityImg[index] === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Surat Rekomendasi Dokter atau Surat Lainnya
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id={`identity-file-input-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={(e) => this.handleFileChange(e, index)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("identity-file-input-" + index)
                              .click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.identityImg[index] != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.identityImg[index].name}
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(
                          this.state.form.identityImg[index].size / 1000
                        )}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#identity-view-modal-${index}`}
                      >
                        Lihat
                      </div>
                      <div
                        className="modal fade"
                        id={`identity-view-modal-${index}`}
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.identityImgPreview[index] !=
                                null && (
                                <img
                                  id={`identity-preview-img-${index}`}
                                  className="identity-preview-img"
                                  src={
                                    this.state.form.identityImgPreview[index]
                                  }
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={() => this.clearIdentityImg(index)}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <button
                onClick={this.submitNewPatient}
                className="color-button w-100"
              >
                Simpan, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  patientEditFormPage() {
    return (
      <div className="patient-edit-form-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.resetState("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Edit Data Pasien</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="d-flex flex-column h-100 overflow flex-grow-1">
          <div className="container flex-grow-1 d-flex flex-column justify-content-start">
            <div className="form-group">
              <label>Isi Data Pasien Vaksin</label>
            </div>

            <div className="form-group">
              <label>
                Vaksinasi ke <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowFirstVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "PERTAMA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowFirstVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "PERTAMA"
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Pertama</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowSecondVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KEDUA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowSecondVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KEDUA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Kedua</div>
                </div>

                {/* Fajar Edit Patient Tambah vaksinasi ke 3 */}
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowThirdVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KETIGA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowThirdVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KETIGA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Ketiga</div>
                </div>
              </div>
            </div>
            {this.state.form.vaccineLocation === "RUMAH SAKIT" && (
              <>
                {this.state.form.vaccinationState === "KETIGA" ? (
                  <>
                    <div className="form-group">
                      <label>
                        Merek Vaksinasi Ketiga
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        name="vaccinationBrand"
                        value={this.state.form.vaccinationBrand}
                        disabled={this.getVaccinationBrandList().length === 0}
                        onChange={(e) => {
                          this.handleFormChange(e, () => {
                            this.setState((prevState) => ({
                              form: { ...prevState.form, nationality: "" },
                            }));
                          });
                          this.fetchMerekVaksinasiKeduaSaatEditPasienOnChange(
                            e
                          );
                        }}
                        className="input-field"
                      >
                        <option value="">Pilih Merek Vaksinasi</option>
                        {this.getVaccinationBrandList().map((item, index) => (
                          <option key={index} value={index}>
                            {item.brand}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>
                        Merek Vaksinasi <span className="text-danger">*</span>
                      </label>
                      <select
                        name="vaccinationBrand"
                        value={this.state.form.vaccinationBrand}
                        disabled={this.getVaccinationBrandList().length === 0}
                        onChange={(e) => {
                          this.handleFormChange(e, () => {
                            this.setState((prevState) => ({
                              form: { ...prevState.form, nationality: "" },
                            }));
                          });
                        }}
                        className="input-field"
                      >
                        <option value="">Pilih Merek Vaksinasi</option>
                        {this.getVaccinationBrandList().map((item, index) => (
                          <option key={index} value={index}>
                            {item.brand}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </>
            )}
            {this.state.form.vaccineLocation === "PASSCODE" && (
              <div className="form-group">
                <label>
                  Merek Vaksinasi{" "}
                  {this.state.patientVal.status_vaccine === "KETIGA"
                    ? "Ketiga"
                    : ""}{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="vaccinationBrand"
                  value={this.state.form.vaccinationBrand}
                  // onChange={this.handleFormChange}
                  onChange={(e) => {
                    // this.handleFormChange(e, () => {
                    //   this.setState((prevState) => ({
                    //     form: { ...prevState.form, nationality: "" },
                    //   }));
                    // });
                    this.fetchMerekVaksinasiKeduaSaatEditPasienPerusahaanOnChange(
                      e
                    );
                  }}
                  className="input-field"
                >
                  <option value="">Pilih Merek Vaksinasi</option>
                  {this.state.form.passcodeLocation != "" &&
                    this.state.form.passcodeLocation.brand_vaccine.map(
                      (item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                </select>
              </div>
            )}
            <div className="form-group">
              <label>
                Kewarganegaraan <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowWNI()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNI" },
                    }));
                  }}
                  className={`selection ${this.allowWNI() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNI" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNI</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowWNA()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNA" },
                    }));
                  }}
                  className={`selection ${this.allowWNA() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNA</div>
                </div>
              </div>
            </div>

            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Kedua"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.secondVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        secondVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}

            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Merek Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="second_brand_vaccine"
                  value={this.state.form.second_brand_vaccine}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillFormVaksinasiKedua()}
                  className="input-field"
                >
                  <option value="">Pilih Merek Vaksin</option>
                  {this.state.form.list_vaccine_allowed.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="secondVaccinationLocationVal"
                  value={this.state.form.secondVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  // disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Kedua</option>
                  {this.state.form.secondVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Pertama"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.firstVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        firstVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                />
              </div>
            )}
            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="firstVaccinationLocationVal"
                  value={this.state.form.firstVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Pertama</option>
                  {this.state.form.firstVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            <div className="form-group">
              <label>
                Nomor Induk Kependudukan <span className="text-danger">*</span>
              </label>
              <input
                name="nik"
                value={this.state.form.nik}
                onChange={this.handleFormChange}
                type="number"
                placeholder="Masukkan Nomor Kartu Identitas"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Nama Lengkap <span className="text-danger">*</span>
              </label>
              <input
                name="fullName"
                value={this.state.form.fullName}
                onChange={this.handleFormChange}
                type="text"
                placeholder="Tulis Nama Lengkap"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Tanggal Lahir <span className="text-danger">*</span>
              </label>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                placeholderText="Pilih tanggal lahir"
                disabledKeyboardNavigation
                onFocus={(e) => (e.target.readOnly = true)}
                popperPlacement="top-start"
                selected={this.state.form.birthDate}
                onChangeRaw={(e) => e.preventDefault()}
                onChange={(date) => this.setBirthdate(date)}
                showYearDropdown={true}
                dropdownMode={"select"}
                maxDate={moment().toDate()}
                withPortal
              />
            </div>
            <div className="form-group">
              <label>
                Jenis Kelamin <span className="text-danger">*</span>
              </label>
              <select
                name="genderVal"
                value={this.state.form.genderVal}
                onChange={this.handleFormChange}
                className="input-field"
              >
                <option value="">Pilih Jenis Kelamin</option>
                {this.state.form.genderList
                  .filter(this.filterGenderByTypeVaccine)
                  .map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                Nomor Handphone / WA <span className="text-danger">*</span>
              </label>
              <input
                name="phoneNo"
                value={this.state.form.phoneNo}
                onChange={this.handleFormChange}
                type="text"
                placeholder="contoh: 081234567890"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                name="email"
                value={this.state.form.email}
                onChange={this.handleFormChange}
                type="email"
                placeholder="Tulis E-mail"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Alamat Kartu Identitas (KTP / KK){" "}
                <span className="text-danger">*</span>
              </label>
              <textarea
                name="address"
                value={this.state.form.address}
                onChange={this.handleFormChange}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat lengkap disini"
              ></textarea>
            </div>
            <div className="form-group">
              <div
                onClick={() => {
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      isDomicileSame: !this.state.form.isDomicileSame,
                      address2: !this.state.form.isDomicileSame
                        ? ""
                        : this.state.form.address2,
                    },
                  }));
                }}
                className={`option-checkbox ${
                  this.state.form.isDomicileSame ? "active" : ""
                }`}
              >
                <div className="checkbox">✓</div>
                <div className="checkbox-text">
                  Alamat Domisili sesuai KTP / KK
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Alamat Domisili</label>
              <textarea
                name="address2"
                disabled={this.state.form.isDomicileSame}
                value={this.state.form.address2}
                onChange={this.handleFormChange}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat domisili disini"
              ></textarea>
            </div>
            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                {this.state.patientVal.photo_certificate !== null && (
                  <div style={{ marginBottom: "8px" }}>
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        Unggahan Foto Sertifikat
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center"></div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#cert-exist-view-modal`}
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id={`cert-exist-view-modal`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                className="identity-preview-img"
                                src={this.state.patientVal.photo_certificate}
                                alt=""
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  </div>
                )}

                {this.state.form.certImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Kartu Vaksinasi Pertama{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleCertFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        className="color-button"
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.certImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.certImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.certImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.certImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.certImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearCertImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <div style={{ marginBottom: "8px" }}>
                <div className="d-flex">
                  <div className="filename flex-grow-1 align-self-center">
                    Unggahan Foto KTP
                  </div>
                  <div style={{ minWidth: "8px" }}></div>
                  <div className="filesize align-self-center"></div>
                  <div style={{ minWidth: "12px" }}></div>
                  <div
                    className="fileview align-self-center"
                    data-toggle="modal"
                    data-target={`#ktp-exist-view-modal`}
                  >
                    Lihat
                  </div>
                  <div className="modal fade" id={`ktp-exist-view-modal`}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          <img
                            className="identity-preview-img"
                            src={this.state.patientVal.ktpImg}
                            alt=""
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: "14px" }}></div>
                </div>
              </div>
              {this.state.form.ktpImg === null && (
                <div className="d-flex justify-content-between">
                  <div className="align-self-center">
                    <label>Ubah Foto Kartu Identitas</label>
                  </div>
                  <div style={{ minWidth: "20px" }}></div>
                  <div>
                    <input
                      id="identity-file-input"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      disabled={this.state.isLoading}
                      onChange={this.handleKTPFileChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("identity-file-input").click()
                      }
                      className="color-button"
                    >
                      Ubah
                    </button>
                  </div>
                </div>
              )}
              {this.state.form.ktpImg != null && (
                <div className="d-flex">
                  <div className="filename flex-grow-1 align-self-center">
                    {this.state.form.ktpImg.name}
                  </div>
                  <div className="filesize align-self-center">
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(this.state.form.ktpImg.size / 1000)}
                    KB
                  </div>
                  <div style={{ minWidth: "12px" }}></div>
                  <div
                    className="fileview align-self-center"
                    data-toggle="modal"
                    data-target="#ktp-view-modal"
                  >
                    Lihat
                  </div>
                  <div className="modal fade" id="ktp-view-modal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          {this.state.form.ktpImgPreview != null && (
                            <img
                              id="identity-preview-img"
                              className="identity-preview-img"
                              src={this.state.form.ktpImgPreview}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: "15px" }}></div>
                  <div
                    onClick={this.clearKTPImg}
                    className="filedelete align-self-center"
                  >
                    Hapus
                  </div>
                  <div style={{ minWidth: "14px" }}></div>
                </div>
              )}
            </div>

            {/* // BARU */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                {this.state.patientVal.second_certificate !== null && (
                  <div style={{ marginBottom: "8px" }}>
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        Kartu Vaksinasi Kedua
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center"></div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#cert-exist-view-modal`}
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id={`cert-exist-view-modal`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                className="identity-preview-img"
                                src={this.state.patientVal.second_certificate}
                                alt=""
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  </div>
                )}
                {this.state.form.certImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Kartu Vaksinasi Kedua{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleCertFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        className="color-button"
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.certImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.certImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.certImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.certImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.certImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearCertImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}

            {/* BARU TICKET */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                {this.state.patientVal.second_certificate !== null && (
                  <div style={{ marginBottom: "8px" }}>
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        Tiket Vaksinasi Ketiga
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center"></div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#cert-exist-view-modal`}
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id={`cert-exist-view-modal`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                className="identity-preview-img"
                                src={this.state.patientVal.ticket_vaccine}
                                alt=""
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  </div>
                )}
                {this.state.form.ticketImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Tiket Vaksinasi Ketiga{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleTicketFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        disabled={this.disableFillForm()}
                        className="color-button"
                      >
                        Unggah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.ticketImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.ticketImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.ticketImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.ticketImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.ticketImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearTicketImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              {this.state.patientVal.img.map((item, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      Unggahan {index + 1}
                    </div>
                    <div style={{ minWidth: "8px" }}></div>
                    <div className="filesize align-self-center"></div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target={`#identity-exist-view-modal-${index}`}
                    >
                      Lihat
                    </div>
                    <div
                      className="modal fade"
                      id={`identity-exist-view-modal-${index}`}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <img
                              className="identity-preview-img"
                              src={item.photoPath}
                              alt=""
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={() => this.deleteIdentityImg(item)}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                </div>
              ))}
              {this.state.form.identityImg.map((item, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  {this.state.form.identityImg[index] === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Surat Rekomendasi Dokter atau Surat Lainnya
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id={`identity-file-input-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={(e) => this.handleFileChange(e, index)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("identity-file-input-" + index)
                              .click()
                          }
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.identityImg[index] != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.identityImg[index].name}
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(
                          this.state.form.identityImg[index].size / 1000
                        )}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#identity-view-modal-${index}`}
                      >
                        Lihat
                      </div>
                      <div
                        className="modal fade"
                        id={`identity-view-modal-${index}`}
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.identityImgPreview[index] !=
                                null && (
                                <img
                                  id={`identity-preview-img-${index}`}
                                  className="identity-preview-img"
                                  src={
                                    this.state.form.identityImgPreview[index]
                                  }
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={() => this.clearIdentityImg(index)}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <button onClick={this.editPatient} className="color-button w-100">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  patientEditFormPage2() {
    return (
      <div className="patient-edit-form-page-2">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("HOSPITAL SELECTION EDIT PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Edit Data Pasien</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="d-flex flex-column h-100 overflow flex-grow-1">
          <div className="select-hospital">
            <div className="container">
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi <span className="text-danger">*</span>
                </label>
                <select
                  name="hospitalVal"
                  value={this.state.form.hospitalVal}
                  onChange={(e) => {
                    this.handleFormChange(e, () => {
                      this.fetchHospitalProgram();
                    });
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        programVal: "",
                        professionList: [],
                        professionVal: "",
                        firstVaccinationDate: "",
                        firstVaccinationLocationVal: "",
                        vaccinationState: "",
                        vaccinationBrand: "",
                        nationality: "",
                        nik: "",
                        fullName: "",
                        birthDate: "",
                        genderVal: "",
                        phoneNo: "",
                        email: "",
                        address: "",
                        isDomicileSame: false,
                        address2: "",
                        ktpImg: null,
                        ktpImgPreview: null,
                        certImg: null,
                        certImgPreview: null,
                        identityImg: [null],
                        identityImgPreview: [null],
                      },
                    }));
                  }}
                  className="input-field"
                >
                  {this.state.form.hospitalList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>
                  Pilih Program Vaksinasi <span className="text-danger">*</span>
                </label>
                <select
                  name="programVal"
                  value={this.state.form.programVal}
                  onChange={(e) => {
                    this.handleFormChange(e, () => {
                      this.fetchHospitalProfession();
                      this.setState((prevState) => ({
                        form: {
                          ...prevState.form,
                          firstVaccinationDate: "",
                          firstVaccinationLocationVal: "",
                          vaccinationState: "",
                          vaccinationBrand: "",
                          nationality: "",
                          nik: "",
                          fullName: "",
                          birthDate: "",
                          genderVal: "",
                          phoneNo: "",
                          email: "",
                          address: "",
                          isDomicileSame: false,
                          address2: "",
                          ktpImg: null,
                          ktpImgPreview: null,
                          certImg: null,
                          certImgPreview: null,
                          identityImg: [null],
                          identityImgPreview: [null],
                        },
                      }));
                    });
                  }}
                  className="input-field"
                >
                  <option value="">Pilih Program Vaksinasi</option>
                  {this.state.form.programList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.program_name}
                    </option>
                  ))}
                </select>
              </div>
              {this.state.form.programVal !== "" &&
                Number(
                  this.state.form.programList[this.state.form.programVal]
                    .is_category
                ) === 1 && (
                  <div className="form-group">
                    <label>
                      Kategori <span className="text-danger">*</span>
                    </label>
                    <select
                      name="professionVal"
                      value={this.state.form.professionVal}
                      onChange={this.handleFormChange}
                      className="input-field"
                    >
                      <option value="">Pilih Kategori</option>
                      {this.state.form.professionList.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
            </div>
          </div>
          <div className="container flex-grow-1 d-flex flex-column justify-content-start">
            <div className="form-group">
              <label>Isi Data Pasien Vaksin</label>
            </div>

            <div className="form-group">
              <label>
                Vaksinasi ke <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowFirstVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "PERTAMA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowFirstVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "PERTAMA"
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Pertama</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowSecondVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KEDUA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowSecondVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KEDUA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Kedua</div>
                </div>

                {/* Fajar Edit Patient Tambah vaksinasi ke 3 */}
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowThirdVaccine()) return;
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        vaccinationState: "KETIGA",
                        vaccinationBrand: "",
                        nationality: "",
                      },
                    }));
                  }}
                  className={`selection ${
                    !this.allowThirdVaccine() ? "disabled" : ""
                  } ${
                    this.state.form.vaccinationState == "KETIGA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">Ketiga</div>
                </div>
              </div>
            </div>

            {this.state.form.vaccinationState === "KETIGA" ? (
              <>
                <div className="form-group">
                  <label>
                    Merek Vaksinasi Ketiga
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    name="vaccinationBrand"
                    value={this.state.form.vaccinationBrand}
                    disabled={this.getVaccinationBrandList().length === 0}
                    onChange={(e) => {
                      this.handleFormChange(e, () => {
                        this.setState((prevState) => ({
                          form: { ...prevState.form, nationality: "" },
                        }));
                      });
                      this.fetchMerekVaksinasiKeduaSaatEditPasienOnChange(e);
                    }}
                    className="input-field"
                  >
                    <option value="">Pilih Merek Vaksinasi</option>
                    {this.getVaccinationBrandList().map((item, index) => (
                      <option key={index} value={index}>
                        {item.brand}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>
                    Merek Vaksinasi
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    name="vaccinationBrand"
                    value={this.state.form.vaccinationBrand}
                    disabled={this.getVaccinationBrandList().length === 0}
                    onChange={(e) => {
                      this.handleFormChange(e, () => {
                        this.setState((prevState) => ({
                          form: { ...prevState.form, nationality: "" },
                        }));
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">Pilih Merek Vaksinasi</option>
                    {this.getVaccinationBrandList().map((item, index) => (
                      <option key={index} value={index}>
                        {item.brand}
                      </option>
                    ))}
                  </select>
                  {this.state.form.vaccinationBrand !== "" && (
                    <div className="program-note text-danger">
                      <small>
                        <em>
                          {
                            this.getVaccinationBrandList()[
                              this.state.form.vaccinationBrand
                            ].noted
                          }
                        </em>
                      </small>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label>
                Kewarganegaraan <span className="text-danger">*</span>
              </label>
              <div className="select-radio">
                <div
                  onClick={() => {
                    if (!this.allowWNI()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNI" },
                    }));
                  }}
                  className={`selection ${this.allowWNI() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNI" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNI</div>
                </div>
                <div style={{ minWidth: "16px" }}></div>
                <div
                  onClick={() => {
                    if (!this.allowWNA()) return;
                    this.setState((prevState) => ({
                      form: { ...prevState.form, nationality: "WNA" },
                    }));
                  }}
                  className={`selection ${this.allowWNA() ? "" : "disabled"} ${
                    this.state.form.nationality == "WNA" ? "active" : ""
                  }`}
                >
                  <div className="option-icon">
                    <div className="option-round"></div>
                  </div>
                  <div className="option-text">WNA</div>
                </div>
              </div>
            </div>
            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Pertama"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.firstVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        firstVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}
            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Pertama{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="firstVaccinationLocationVal"
                  value={this.state.form.firstVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Pertama</option>
                  {this.state.form.firstVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Tanggal Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tanggal Vaksinasi Kedua"
                  disabledKeyboardNavigation
                  withPortal
                  onFocus={(e) => (e.target.readOnly = true)}
                  selected={this.state.form.secondVaccinationDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      form: {
                        ...prevState.form,
                        secondVaccinationDate: moment(date).toDate(),
                      },
                    }))
                  }
                  showYearDropdown={true}
                  dropdownMode={"select"}
                  maxDate={moment().toDate()}
                  disabled={this.disableFillForm()}
                />
              </div>
            )}

            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Merek Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="second_brand_vaccine"
                  value={this.state.form.second_brand_vaccine}
                  onChange={this.handleFormChange}
                  disabled={this.disableFillFormVaksinasiKedua()}
                  className="input-field"
                >
                  <option value="">Pilih Merek Vaksin</option>
                  {this.state.form.list_vaccine_allowed.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                <label>
                  Lokasi Vaksinasi Kedua <span className="text-danger">*</span>
                </label>
                <select
                  name="secondVaccinationLocationVal"
                  value={this.state.form.secondVaccinationLocationVal}
                  onChange={this.handleFormChange}
                  // disabled={this.disableFillForm()}
                  className="input-field"
                >
                  <option value="">Lokasi Vaksinasi Kedua</option>
                  {this.state.form.secondVaccinationLocationList.map(
                    (item, index) => (
                      <option key={index} value={index}>
                        {item.hospital_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            <div className="form-group">
              <label>
                Nomor Induk Kependudukan <span className="text-danger">*</span>
              </label>
              <input
                name="nik"
                value={this.state.form.nik}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="number"
                placeholder="Masukkan Nomor Kartu Identitas"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Nama Lengkap <span className="text-danger">*</span>
              </label>
              <input
                name="fullName"
                value={this.state.form.fullName}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="text"
                placeholder="Tulis Nama Lengkap"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Tanggal Lahir <span className="text-danger">*</span>
              </label>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                placeholderText="Pilih tanggal lahir"
                disabledKeyboardNavigation
                withPortal
                onFocus={(e) => (e.target.readOnly = true)}
                popperPlacement="top-start"
                selected={this.state.form.birthDate}
                onChangeRaw={(e) => e.preventDefault()}
                onChange={(date) => this.setBirthdate(date)}
                showYearDropdown={true}
                dropdownMode={"select"}
                maxDate={moment().toDate()}
                disabled={this.disableFillForm()}
              />
            </div>
            <div className="form-group">
              <label>
                Jenis Kelamin <span className="text-danger">*</span>
              </label>
              <select
                name="genderVal"
                value={this.state.form.genderVal}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                className="input-field"
              >
                <option value="">Pilih Jenis Kelamin</option>
                {this.state.form.genderList
                  .filter(this.filterGenderByTypeVaccine)
                  .map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                Nomor Handphone / WA <span className="text-danger">*</span>
              </label>
              <input
                name="phoneNo"
                value={this.state.form.phoneNo}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="text"
                placeholder="contoh: 081234567890"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                name="email"
                value={this.state.form.email}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                type="email"
                placeholder="Tulis E-mail"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>
                Alamat Kartu Identitas (KTP / KK){" "}
                <span className="text-danger">*</span>
              </label>
              <textarea
                name="address"
                value={this.state.form.address}
                onChange={this.handleFormChange}
                disabled={this.disableFillForm()}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat lengkap disini"
              ></textarea>
            </div>
            <div className="form-group">
              <div
                onClick={() => {
                  if (this.disableFillForm()) return;
                  this.setState((prevState) => ({
                    form: {
                      ...prevState.form,
                      isDomicileSame: !this.state.form.isDomicileSame,
                      address2: !this.state.form.isDomicileSame
                        ? ""
                        : this.state.form.address2,
                    },
                  }));
                }}
                className={`option-checkbox ${
                  this.state.form.isDomicileSame ? "active" : ""
                }`}
              >
                <div className="checkbox">✓</div>
                <div className="checkbox-text">
                  Alamat Domisili sesuai KTP / KK
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Alamat Domisili</label>
              <textarea
                name="address2"
                disabled={
                  this.state.form.isDomicileSame || this.disableFillForm()
                }
                value={this.state.form.address2}
                onChange={this.handleFormChange}
                rows="3"
                className="input-field"
                placeholder="Ketik alamat domisili disini"
              ></textarea>
            </div>
            <div className="form-group">
              <div style={{ marginBottom: "8px" }}>
                <div className="d-flex">
                  <div className="filename flex-grow-1 align-self-center">
                    Unggahan Foto KTP
                  </div>
                  <div style={{ minWidth: "8px" }}></div>
                  <div className="filesize align-self-center"></div>
                  <div style={{ minWidth: "12px" }}></div>
                  <div
                    className="fileview align-self-center"
                    data-toggle="modal"
                    data-target={`#ktp-exist-view-modal`}
                  >
                    Lihat
                  </div>
                  <div className="modal fade" id={`ktp-exist-view-modal`}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          <img
                            className="identity-preview-img"
                            src={this.state.patientVal.ktpImg}
                            alt=""
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: "14px" }}></div>
                </div>
              </div>
              {this.state.form.ktpImg === null && (
                <div className="d-flex justify-content-between">
                  <div className="align-self-center">
                    <label>Ubah Foto Kartu Identitas</label>
                  </div>
                  <div style={{ minWidth: "20px" }}></div>
                  <div>
                    <input
                      id="identity-file-input"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      disabled={this.state.isLoading}
                      onChange={this.handleKTPFileChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("identity-file-input").click()
                      }
                      disabled={this.disableFillForm()}
                      className="color-button"
                    >
                      Ubah
                    </button>
                  </div>
                </div>
              )}
              {this.state.form.ktpImg != null && (
                <div className="d-flex">
                  <div className="filename flex-grow-1 align-self-center">
                    {this.state.form.ktpImg.name}
                  </div>
                  <div className="filesize align-self-center">
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(this.state.form.ktpImg.size / 1000)}
                    KB
                  </div>
                  <div style={{ minWidth: "12px" }}></div>
                  <div
                    className="fileview align-self-center"
                    data-toggle="modal"
                    data-target="#ktp-view-modal"
                  >
                    Lihat
                  </div>
                  <div className="modal fade" id="ktp-view-modal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          {this.state.form.ktpImgPreview != null && (
                            <img
                              id="identity-preview-img"
                              className="identity-preview-img"
                              src={this.state.form.ktpImgPreview}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: "15px" }}></div>
                  <div
                    onClick={this.clearKTPImg}
                    className="filedelete align-self-center"
                  >
                    Hapus
                  </div>
                  <div style={{ minWidth: "14px" }}></div>
                </div>
              )}
            </div>

            {/* // BARU */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                {this.state.patientVal.second_certificate !== null && (
                  <div style={{ marginBottom: "8px" }}>
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        Kartu Vaksinasi Kedua
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center"></div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#cert-exist-view-modal`}
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id={`cert-exist-view-modal`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                className="identity-preview-img"
                                src={this.state.patientVal.second_certificate}
                                alt=""
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  </div>
                )}
                {this.state.form.certImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Kartu Vaksinasi Kedua{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleCertFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        className="color-button"
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.certImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.certImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.certImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.certImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.certImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearCertImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}

            {/* BARU TICKET */}
            {this.state.form.vaccinationState === "KETIGA" && (
              <div className="form-group">
                {this.state.patientVal.second_certificate !== null && (
                  <div style={{ marginBottom: "8px" }}>
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        Tiket Vaksinasi Ketiga
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center"></div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#cert-exist-view-modal`}
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id={`cert-exist-view-modal`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                className="identity-preview-img"
                                src={this.state.patientVal.ticket_vaccine}
                                alt=""
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  </div>
                )}
                {this.state.form.ticketImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Tiket Vaksinasi Ketiga{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleTicketFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        disabled={this.disableFillForm()}
                        className="color-button"
                      >
                        Unggah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.ticketImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.ticketImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.ticketImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.ticketImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.ticketImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearTicketImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}

            {this.state.form.vaccinationState === "KEDUA" && (
              <div className="form-group">
                {this.state.patientVal.photo_certificate !== null && (
                  <div style={{ marginBottom: "8px" }}>
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        Unggahan Foto Sertifikat
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center"></div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#cert-exist-view-modal`}
                      >
                        Lihat
                      </div>
                      <div className="modal fade" id={`cert-exist-view-modal`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                className="identity-preview-img"
                                src={this.state.patientVal.photo_certificate}
                                alt=""
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  </div>
                )}
                {this.state.form.certImg === null && (
                  <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                      <label>
                        Kartu Vaksinasi Pertama{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div style={{ minWidth: "20px" }}></div>
                    <div>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        disabled={this.state.isLoading}
                        onChange={this.handleCertFileChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("cert-file-input").click()
                        }
                        disabled={this.disableFillForm()}
                        className="color-button"
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                )}
                {this.state.form.certImg != null && (
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      {this.state.form.certImg.name}
                    </div>
                    <div className="filesize align-self-center">
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(this.state.form.certImg.size / 1024)}
                      KB
                    </div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target="#cert-view-modal"
                    >
                      Lihat
                    </div>
                    <div className="modal fade" id="cert-view-modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            {this.state.form.certImgPreview != null && (
                              <img
                                id="cert-preview-img"
                                className="cert-preview-img"
                                src={this.state.form.certImgPreview}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={this.clearCertImg}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                )}
              </div>
            )}
            <div className="form-group">
              {this.state.patientVal.img.map((item, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  <div className="d-flex">
                    <div className="filename flex-grow-1 align-self-center">
                      Unggahan {index + 1}
                    </div>
                    <div style={{ minWidth: "8px" }}></div>
                    <div className="filesize align-self-center"></div>
                    <div style={{ minWidth: "12px" }}></div>
                    <div
                      className="fileview align-self-center"
                      data-toggle="modal"
                      data-target={`#identity-exist-view-modal-${index}`}
                    >
                      Lihat
                    </div>
                    <div
                      className="modal fade"
                      id={`identity-exist-view-modal-${index}`}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <img
                              className="identity-preview-img"
                              src={item.photoPath}
                              alt=""
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "15px" }}></div>
                    <div
                      onClick={() => this.deleteIdentityImg(item)}
                      className="filedelete align-self-center"
                    >
                      Hapus
                    </div>
                    <div style={{ minWidth: "14px" }}></div>
                  </div>
                </div>
              ))}
              {this.state.form.identityImg.map((item, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  {this.state.form.identityImg[index] === null && (
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <label>
                          Surat Rekomendasi Dokter atau Surat Lainnya
                        </label>
                      </div>
                      <div style={{ minWidth: "20px" }}></div>
                      <div>
                        <input
                          id={`identity-file-input-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          disabled={this.state.isLoading}
                          onChange={(e) => this.handleFileChange(e, index)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("identity-file-input-" + index)
                              .click()
                          }
                          disabled={this.disableFillForm()}
                          className="color-button"
                        >
                          Unggah
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.form.identityImg[index] != null && (
                    <div className="d-flex">
                      <div className="filename flex-grow-1 align-self-center">
                        {this.state.form.identityImg[index].name}
                      </div>
                      <div style={{ minWidth: "8px" }}></div>
                      <div className="filesize align-self-center">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(
                          this.state.form.identityImg[index].size / 1000
                        )}
                        KB
                      </div>
                      <div style={{ minWidth: "12px" }}></div>
                      <div
                        className="fileview align-self-center"
                        data-toggle="modal"
                        data-target={`#identity-view-modal-${index}`}
                      >
                        Lihat
                      </div>
                      <div
                        className="modal fade"
                        id={`identity-view-modal-${index}`}
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              {this.state.form.identityImgPreview[index] !=
                                null && (
                                <img
                                  id={`identity-preview-img-${index}`}
                                  className="identity-preview-img"
                                  src={
                                    this.state.form.identityImgPreview[index]
                                  }
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ minWidth: "15px" }}></div>
                      <div
                        onClick={() => this.clearIdentityImg(index)}
                        className="filedelete align-self-center"
                      >
                        Hapus
                      </div>
                      <div style={{ minWidth: "14px" }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <button
                onClick={() => this.editPatient({ vaccineType: true })}
                className="color-button w-100"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  patientDetailPage() {
    return (
      <div className="patient-detail-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() =>
              this.setState(
                { patientVal: "", page: "MAIN PAGE" },
                this.resetState
              )
            }
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container overflow">
          <div style={{ minHeight: "8px" }}></div>
          <p>Detail Pasien Vaksinasi COVID-19</p>
          <div style={{ minHeight: "20px" }}></div>

          <div className="d-flex">
            <div className="left">
              <img
                src={`${Config.BASE_URL}/img/hospital-location-icon.png`}
                alt=""
              />
            </div>
            <div style={{ minWidth: "4px" }}></div>
            <div className="middle align-self-center flex-grow-1">
              <div className="hospital-name">
                {this.state.patientVal.hospital_name
                  ? this.state.patientVal.hospital_name
                  : ""}
              </div>
              <div className="program-vaccine">Program Vaksin</div>
              <div className="program-name">
                {this.state.patientVal.program_name}
              </div>
            </div>
            {this.state.patientVal.vaccine_location === "RUMAH SAKIT" && (
              <div
                onClick={() => {
                  let selectedHospital;
                  for (
                    let i = 0;
                    i < this.state.form.hospitalList.length;
                    i++
                  ) {
                    let hospital = this.state.form.hospitalList[i];
                    if (
                      hospital.location_vaccine_id ===
                      Number(this.state.patientVal.hospital_id)
                    ) {
                      selectedHospital = i;
                      break;
                    }
                  }
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        hospitalVal: selectedHospital,
                      },
                    }),
                    () => this.goPage("HOSPITAL SELECTION EDIT PAGE")
                  );
                }}
                className="right clickable"
                style={{ paddingRight: "10px" }}
              >
                <img src={`${Config.BASE_URL}/img/edit-icon.png`} alt="" />
              </div>
            )}
          </div>

          <div style={{ minHeight: "16px" }}></div>

          <div className="d-flex">
            <div className="left">
              <img src={`${Config.BASE_URL}/img/patient-icon.png`} alt="" />
            </div>
            <div style={{ minWidth: "4px" }}></div>
            <div className="middle align-self-center flex-grow-1">
              <div className="fullname">{this.state.patientVal.full_name}</div>
              <div className="nik">
                KTP {this.state.patientVal.card_id_number}
              </div>
              <div className="birthdate">
                {moment(this.state.patientVal.birthdate).format("DD MMMM YYYY")}{" "}
                (
                {moment().diff(
                  moment(this.state.patientVal.birthdate).format("YYYY-MM-DD"),
                  "years"
                )}{" "}
                Tahun)
              </div>
              <div className="gender">{this.state.patientVal.gender}</div>
              <div className="phone">{this.state.patientVal.phone}</div>
              <div className="email">{this.state.patientVal.email}</div>
              <div className="address">{this.state.patientVal.address}</div>
              <div style={{ minHeight: "12px" }}></div>
              <div className="text">Kuisioner Skrining Vaksin</div>
              <div style={{ minHeight: "8px" }}></div>
              {this.state.patientVal.status === "PENDING" && (
                <div
                  onClick={() => this.goPage("SCREENING WELCOME PAGE")}
                  className="white-button clickable"
                >
                  <div className="left">Isi Kuisioner Skrining</div>
                  <div className="right">
                    <img src={`${Config.BASE_URL}/img/arrow-right.png`} />
                  </div>
                </div>
              )}
              {this.state.patientVal.status === "UPDATED" && (
                <div
                  onClick={() => this.goPage("SCREENING WELCOME PAGE")}
                  className="white-button clickable"
                >
                  <div className="left">Isi Ulang Kuisioner Skrining</div>
                  <div className="right">
                    <img src={`${Config.BASE_URL}/img/arrow-right.png`} />
                  </div>
                </div>
              )}
              {this.state.patientVal.status === "ACCEPTED" && (
                <div className="green-notice">Lolos Skrining</div>
              )}
              {this.state.patientVal.status === "REJECTED" && (
                <div className="red-notice">Tidak Lolos Skrining</div>
              )}
              <div style={{ minHeight: "8px" }}></div>
            </div>
            <div
              onClick={() => this.goPage("PATIENT EDIT FORM PAGE")}
              className="right clickable"
              style={{ paddingRight: "10px" }}
            >
              <img src={`${Config.BASE_URL}/img/edit-icon.png`} alt="" />
            </div>
          </div>

          <div style={{ minHeight: "16px" }}></div>

          {this.state.patientVal.status === "ACCEPTED" && (
            <div>
              <div className="d-flex">
                <div className="left">
                  <img
                    src={`${Config.BASE_URL}/img/calendar-icon.png`}
                    alt=""
                  />
                </div>
                <div style={{ minWidth: "4px" }}></div>
                <div className="right align-self-center flex-grow-1">
                  {this.getVaccineSchedule(this.state.patientVal, "PERTAMA") ===
                    null &&
                    this.state.patientVal.vaccine_no === "PERTAMA" && (
                      <>
                        <div className="text">Daftar Vaksin Pertama</div>
                        <div
                          onClick={() => {
                            this.setState((prevState) => ({
                              patientVal: {
                                ...prevState.patientVal,
                                activeSchedule: "PERTAMA",
                              },
                            }));
                            this.goPage("SCHEDULE SELECT PAGE");
                          }}
                          className="white-button clickable"
                        >
                          <div className="left">Pilih Jadwal</div>
                          <div className="right">
                            <img
                              src={`${Config.BASE_URL}/img/arrow-right.png`}
                            />
                          </div>
                        </div>
                      </>
                    )}

                  {this.getVaccineSchedule(this.state.patientVal, "PERTAMA") !=
                    null && (
                    <div
                      className={`${
                        this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          )
                        )
                          ? "schedule-passed"
                          : ""
                      }`}
                    >
                      <div className="vaccine-no">Vaksin Pertama</div>
                      <div className="schedule-name">Jadwal</div>
                      <div style={{ minHeight: "4px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div className="schedule-date">
                          {this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          ).vaccine_date == null
                            ? "-"
                            : moment(
                                this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).vaccine_date,
                                "DD/MM/YYYY"
                              ).format("DD MMMM YYYY")}
                        </div>
                        {!this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          )
                        ) &&
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          ).status_schedule !== "CANCELED" && (
                            <div
                              onClick={() => {
                                this.setState((prevState) => ({
                                  patientVal: {
                                    ...prevState.patientVal,
                                    activeSchedule: "PERTAMA",
                                  },
                                }));
                                this.goPage("SCHEDULE SELECT PAGE");
                              }}
                              className="edit-text"
                            >
                              Ubah Tanggal
                            </div>
                          )}
                      </div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div className="schedule-date">
                          {
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "PERTAMA"
                            ).hour_start
                          }
                          -
                          {
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "PERTAMA"
                            ).hour_end
                          }
                        </div>
                        {!this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          )
                        ) &&
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          ).status_schedule !== "CANCELED" && (
                            <div
                              onClick={() => {
                                this.setState((prevState) => ({
                                  patientVal: {
                                    ...prevState.patientVal,
                                    activeSchedule: "PERTAMA",
                                  },
                                }));
                                this.fetchLocationVaccineHour(
                                  moment(
                                    this.getVaccineSchedule(
                                      this.state.patientVal,
                                      "PERTAMA"
                                    ).vaccine_date,
                                    "DD-MM-YYYY"
                                  )
                                );
                              }}
                              className="edit-text"
                              data-toggle="modal"
                              data-backdrop="static"
                              data-keyboard="false"
                              data-target="#first-schedule-hour-select-modal"
                            >
                              Ubah Jam
                            </div>
                          )}
                      </div>
                      <div
                        className="modal"
                        id="first-schedule-hour-select-modal"
                      >
                        <div className="modal-dialog modal-dialog-bottom">
                          <div className="modal-content">
                            <div className="modal-body">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                              {!this.state.form.askAddCalendar &&
                                !this.state.form.askChooseCalendar && (
                                  <div>
                                    <div className="caption">
                                      Pilih Jam Vaksinasi
                                    </div>
                                    <div style={{ minHeight: "10px" }}></div>

                                    {this.state.form.hourList.length > 0 && (
                                      <div>
                                        <div className="date-selected">
                                          {moment(
                                            this.getVaccineSchedule(
                                              this.state.patientVal,
                                              "PERTAMA"
                                            ).vaccine_date,
                                            "DD-MM-YYYY"
                                          ).format("DD MMMM YYYY")}
                                        </div>
                                        <div
                                          style={{ minHeight: "20px" }}
                                        ></div>
                                        <div className="hour-list">
                                          {this.state.form.hourList.map(
                                            (item, index) => (
                                              <div
                                                key={index}
                                                onClick={() =>
                                                  this.setState(
                                                    (prevState) => ({
                                                      form: {
                                                        ...prevState.form,
                                                        hourVal: item,
                                                      },
                                                    })
                                                  )
                                                }
                                                className={`hour ${
                                                  this.state.form.hourVal ===
                                                  item
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {item.hour_start} -{" "}
                                                {item.hour_end}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div
                                          style={{ minHeight: "20px" }}
                                        ></div>
                                        <button
                                          onClick={() =>
                                            this.submitSchedule(
                                              moment(
                                                this.getVaccineSchedule(
                                                  this.state.patientVal,
                                                  "PERTAMA"
                                                ).vaccine_date,
                                                "DD-MM-YYYY"
                                              )
                                            )
                                          }
                                          className={`color-button ${
                                            this.state.form.hourVal !== ""
                                              ? "active"
                                              : ""
                                          }`}
                                          disabled={
                                            this.state.form.hourVal === ""
                                          }
                                        >
                                          Pilih
                                        </button>
                                        <div
                                          style={{ minHeight: "12px" }}
                                        ></div>
                                        <button
                                          className="red-outline-color-button"
                                          data-dismiss="modal"
                                        >
                                          Tutup
                                        </button>
                                      </div>
                                    )}
                                    {this.state.form.hourList.length === 0 && (
                                      <div>
                                        <div
                                          style={{ minHeight: "16px" }}
                                        ></div>
                                        <div className="img text-center">
                                          <img
                                            src={`${Config.BASE_URL}/img/empty-calendar-icon.png`}
                                          />
                                        </div>
                                        <div
                                          style={{ minHeight: "16px" }}
                                        ></div>
                                        <div className="note">
                                          Slot Waktu Habis
                                        </div>
                                        <div
                                          style={{ minHeight: "32px" }}
                                        ></div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              {this.state.form.askAddCalendar && (
                                <div>
                                  <div className="date-selected">
                                    Vaksinasi COVID-19
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="date-selected">
                                    {moment(this.state.form.schedule).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <div style={{ minHeight: "4px" }}></div>
                                  <div className="hour-selected">
                                    {this.state.form.hourVal.hour_start} -{" "}
                                    {this.state.form.hourVal.hour_end}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="calendar-ask">
                                    Apakah Anda ingin memasukkan ke <br />{" "}
                                    Jadwal Anda?
                                  </div>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() => {
                                      this.setState((prevState) => ({
                                        form: {
                                          ...prevState.form,
                                          askAddCalendar: false,
                                          askChooseCalendar: true,
                                        },
                                      }));
                                    }}
                                    className="color-button active"
                                  >
                                    Iya
                                  </button>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.resetState("PATIENT DETAIL PAGE")
                                    }
                                    className="red-outline-color-button"
                                    data-dismiss="modal"
                                  >
                                    Tidak
                                  </button>
                                </div>
                              )}
                              {this.state.form.askChooseCalendar && (
                                <div>
                                  <div className="date-selected">
                                    Vaksinasi COVID-19
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="date-selected">
                                    {moment(this.state.form.schedule).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <div style={{ minHeight: "4px" }}></div>
                                  <div className="hour-selected">
                                    {this.state.form.hourVal.hour_start} -{" "}
                                    {this.state.form.hourVal.hour_end}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="calendar-ask">
                                    Apakah Anda ingin memasukkan ke <br />{" "}
                                    Jadwal Anda?
                                  </div>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.submitCalendar("google")
                                    }
                                    className="color-button active"
                                    data-dismiss="modal"
                                  >
                                    Google Calendar
                                  </button>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.submitCalendar("outlook")
                                    }
                                    className="color-button active"
                                    data-dismiss="modal"
                                  >
                                    Outlook Calendar
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ minHeight: "12px" }}></div>

                      {this.getVaccineSchedule(this.state.patientVal, "PERTAMA")
                        .status_schedule === "CANCELED" && (
                        <div className="red-warning-notice">
                          Pendaftaran Anda telah dibatalkan
                        </div>
                      )}

                      {this.getVaccineLatestSchedule(this.state.patientVal) ==
                        this.getVaccineSchedule(
                          this.state.patientVal,
                          "PERTAMA"
                        ) &&
                        !this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          )
                        ) &&
                        this.getVaccineSchedule(
                          this.state.patientVal,
                          "PERTAMA"
                        ).status_schedule != "CANCELED" && (
                          <div>
                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "PERTAMA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term1: !this.state.form.term1,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term1 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term1 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Saya menyetujui Syarat dan Ketentuan yang
                                berlaku
                              </div>
                            </div>

                            <div style={{ minHeight: "8px" }}></div>

                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "PERTAMA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term2: !this.state.form.term2,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term2 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term2 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Data pribadi dan skrining yang saya masukkan
                                adalah data yang benar sesuai kondisi saya
                                sebenarnya
                              </div>
                            </div>

                            <div style={{ minHeight: "8px" }}></div>

                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "PERTAMA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term3: !this.state.form.term3,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term3 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "PERTAMA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term3 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Pihak vaksinator / rumah sakit memiliki hak
                                untuk menolak vaksinasi saya bila kondisi
                                kesehatan saya tidak memungkinkan untuk
                                vaksinasi COVID-19 atau data yang saya masukkan
                                tidak sesuai dengan kondisi sebenarnya.
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                  {this.getVaccineSchedule(this.state.patientVal, "PERTAMA") !=
                    null && <br />}

                  {/* show when vaccine selected is "kedua" or when first vaccine schedule is passed */}
                  {((this.getVaccineSchedule(this.state.patientVal, "KEDUA") ===
                    null &&
                    this.state.patientVal.vaccine_no === "KEDUA") ||
                    (this.getVaccineSchedule(this.state.patientVal, "KEDUA") ===
                      null &&
                      this.state.patientVal.vaccine_no === "PERTAMA" &&
                      this.getVaccineSchedule(
                        this.state.patientVal,
                        "PERTAMA"
                      ) != null &&
                      this.isSchedulePassed(
                        this.getVaccineSchedule(
                          this.state.patientVal,
                          "PERTAMA"
                        )
                      ))) && (
                    <>
                      <div className="text">Daftar Vaksin Kedua</div>
                      <div
                        onClick={() => {
                          this.setState((prevState) => ({
                            patientVal: {
                              ...prevState.patientVal,
                              activeSchedule: "KEDUA",
                            },
                          }));
                          this.goPage("SCHEDULE SELECT PAGE");
                        }}
                        className="white-button clickable"
                      >
                        <div className="left">Pilih Jadwal</div>
                        <div className="right">
                          <img src={`${Config.BASE_URL}/img/arrow-right.png`} />
                        </div>
                      </div>
                    </>
                  )}

                  {this.getVaccineSchedule(this.state.patientVal, "KEDUA") !=
                    null && (
                    <div
                      className={`${
                        this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          )
                        )
                          ? "schedule-passed"
                          : ""
                      }`}
                    >
                      <div className="vaccine-no">Vaksin Kedua</div>
                      <div className="schedule-name">Jadwal</div>
                      <div style={{ minHeight: "4px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div className="schedule-date">
                          {this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          ).vaccine_date == null
                            ? "-"
                            : moment(
                                this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).vaccine_date,
                                "DD/MM/YYYY"
                              ).format("DD MMMM YYYY")}
                        </div>
                        {!this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          )
                        ) &&
                          (this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          ) == null ||
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "PERTAMA"
                            ).status_schedule !== "CANCELED") && (
                            <div
                              onClick={() => {
                                this.setState((prevState) => ({
                                  patientVal: {
                                    ...prevState.patientVal,
                                    activeSchedule: "KEDUA",
                                  },
                                }));
                                this.goPage("SCHEDULE SELECT PAGE");
                              }}
                              className="edit-text"
                            >
                              Ubah Tanggal
                            </div>
                          )}
                      </div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div className="schedule-date">
                          {
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "KEDUA"
                            ).hour_start
                          }
                          -
                          {
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "KEDUA"
                            ).hour_end
                          }
                        </div>
                        {!this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          )
                        ) &&
                          (this.getVaccineSchedule(
                            this.state.patientVal,
                            "PERTAMA"
                          ) == null ||
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "PERTAMA"
                            ).status_schedule !== "CANCELED") && (
                            <div
                              onClick={() => {
                                this.setState((prevState) => ({
                                  patientVal: {
                                    ...prevState.patientVal,
                                    activeSchedule: "KEDUA",
                                  },
                                }));
                                this.fetchLocationVaccineHour(
                                  moment(
                                    this.getVaccineSchedule(
                                      this.state.patientVal,
                                      "KEDUA"
                                    ).vaccine_date,
                                    "DD-MM-YYYY"
                                  )
                                );
                              }}
                              className="edit-text"
                              data-toggle="modal"
                              data-backdrop="static"
                              data-keyboard="false"
                              data-target="#second-schedule-hour-select-modal"
                            >
                              Ubah Jam
                            </div>
                          )}
                      </div>
                      <div
                        className="modal"
                        id="second-schedule-hour-select-modal"
                      >
                        <div className="modal-dialog modal-dialog-bottom">
                          <div className="modal-content">
                            <div className="modal-body">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                              {!this.state.form.askAddCalendar &&
                                !this.state.form.askChooseCalendar && (
                                  <div>
                                    <div className="caption">
                                      Pilih Jam Vaksinasi
                                    </div>
                                    <div style={{ minHeight: "10px" }}></div>
                                    {this.state.form.hourList.length > 0 && (
                                      <div>
                                        <div className="date-selected">
                                          {moment(
                                            this.getVaccineSchedule(
                                              this.state.patientVal,
                                              "KEDUA"
                                            ).vaccine_date,
                                            "DD-MM-YYYY"
                                          ).format("DD MMMM YYYY")}
                                        </div>
                                        <div
                                          style={{ minHeight: "20px" }}
                                        ></div>
                                        <div className="hour-list">
                                          {this.state.form.hourList.map(
                                            (item, index) => (
                                              <div
                                                key={index}
                                                onClick={() =>
                                                  this.setState(
                                                    (prevState) => ({
                                                      form: {
                                                        ...prevState.form,
                                                        hourVal: item,
                                                      },
                                                    })
                                                  )
                                                }
                                                className={`hour ${
                                                  this.state.form.hourVal ===
                                                  item
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {item.hour_start} -{" "}
                                                {item.hour_end}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div
                                          style={{ minHeight: "20px" }}
                                        ></div>
                                        <button
                                          onClick={() =>
                                            this.submitSchedule(
                                              moment(
                                                this.getVaccineSchedule(
                                                  this.state.patientVal,
                                                  "KEDUA"
                                                ).vaccine_date,
                                                "DD-MM-YYYY"
                                              )
                                            )
                                          }
                                          className={`color-button ${
                                            this.state.form.hourVal !== ""
                                              ? "active"
                                              : ""
                                          }`}
                                          disabled={
                                            this.state.form.hourVal === ""
                                          }
                                        >
                                          Pilih
                                        </button>
                                      </div>
                                    )}
                                    {this.state.form.hourList.length === 0 && (
                                      <div>
                                        <div
                                          style={{ minHeight: "16px" }}
                                        ></div>
                                        <div className="img text-center">
                                          <img
                                            src={`${Config.BASE_URL}/img/empty-calendar-icon.png`}
                                          />
                                        </div>
                                        <div
                                          style={{ minHeight: "16px" }}
                                        ></div>
                                        <div className="note">
                                          Slot Waktu Habis
                                        </div>
                                        <div
                                          style={{ minHeight: "32px" }}
                                        ></div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              {this.state.form.askAddCalendar && (
                                <div>
                                  <div className="date-selected">
                                    Vaksinasi COVID-19
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="date-selected">
                                    {moment(this.state.form.schedule).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <div style={{ minHeight: "4px" }}></div>
                                  <div className="hour-selected">
                                    {this.state.form.hourVal.hour_start} -{" "}
                                    {this.state.form.hourVal.hour_end}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="calendar-ask">
                                    Apakah Anda ingin memasukkan ke <br />{" "}
                                    Jadwal Anda?
                                  </div>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() => {
                                      this.setState((prevState) => ({
                                        form: {
                                          ...prevState.form,
                                          askAddCalendar: false,
                                          askChooseCalendar: true,
                                        },
                                      }));
                                    }}
                                    className="color-button active"
                                  >
                                    Iya
                                  </button>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.resetState("PATIENT DETAIL PAGE")
                                    }
                                    className="red-outline-color-button"
                                    data-dismiss="modal"
                                  >
                                    Tidak
                                  </button>
                                </div>
                              )}
                              {this.state.form.askChooseCalendar && (
                                <div>
                                  <div className="date-selected">
                                    Vaksinasi COVID-19
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="date-selected">
                                    {moment(this.state.form.schedule).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <div style={{ minHeight: "4px" }}></div>
                                  <div className="hour-selected">
                                    {this.state.form.hourVal.hour_start} -{" "}
                                    {this.state.form.hourVal.hour_end}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="calendar-ask">
                                    Apakah Anda ingin memasukkan ke <br />{" "}
                                    Jadwal Anda?
                                  </div>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.submitCalendar("google")
                                    }
                                    className="color-button active"
                                    data-dismiss="modal"
                                  >
                                    Google Calendar
                                  </button>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.submitCalendar("outlook")
                                    }
                                    className="color-button active"
                                    data-dismiss="modal"
                                  >
                                    Outlook Calendar
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ minHeight: "12px" }}></div>

                      {this.getVaccineSchedule(this.state.patientVal, "KEDUA")
                        .status_schedule === "CANCELED" && (
                        <div className="red-warning-notice">
                          Pendaftaran Anda telah dibatalkan
                        </div>
                      )}
                      {this.getVaccineLatestSchedule(this.state.patientVal) ==
                        this.getVaccineSchedule(
                          this.state.patientVal,
                          "KEDUA"
                        ) &&
                        !this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          )
                        ) &&
                        this.getVaccineSchedule(this.state.patientVal, "KEDUA")
                          .status_schedule != "CANCELED" && (
                          <div>
                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "KEDUA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term1: !this.state.form.term1,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term1 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term1 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Saya menyetujui Syarat dan Ketentuan yang
                                berlaku
                              </div>
                            </div>

                            <div style={{ minHeight: "8px" }}></div>

                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "KEDUA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term2: !this.state.form.term2,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term2 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term2 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Data pribadi dan skrining yang saya masukkan
                                adalah data yang benar sesuai kondisi saya
                                sebenarnya
                              </div>
                            </div>

                            <div style={{ minHeight: "8px" }}></div>

                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "KEDUA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term3: !this.state.form.term3,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term3 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KEDUA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term3 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Pihak vaksinator / rumah sakit memiliki hak
                                untuk menolak vaksinasi saya bila kondisi
                                kesehatan saya tidak memungkinkan untuk
                                vaksinasi COVID-19 atau data yang saya masukkan
                                tidak sesuai dengan kondisi sebenarnya.
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                  {/* show when vaccine selected is "ketiga" or when two vaccine schedule is passed */}

                  {((this.getVaccineSchedule(
                    this.state.patientVal,
                    "KETIGA"
                  ) === null &&
                    this.state.patientVal.vaccine_no === "KETIGA") ||
                    (this.getVaccineSchedule(
                      this.state.patientVal,
                      "KETIGA"
                    ) === null &&
                      this.state.patientVal.vaccine_no === "KEDUA" &&
                      this.getVaccineSchedule(this.state.patientVal, "KEDUA") !=
                        null &&
                      this.isSchedulePassed(
                        this.getVaccineSchedule(this.state.patientVal, "KEDUA")
                      ))) && (
                    <>
                      <div className="text">Daftar Vaksin Ketiga</div>
                      <div
                        onClick={() => {
                          this.setState((prevState) => ({
                            patientVal: {
                              ...prevState.patientVal,
                              activeSchedule: "KETIGA",
                            },
                          }));
                          this.goPage("SCHEDULE SELECT PAGE");
                        }}
                        className="white-button clickable"
                      >
                        <div className="left">Pilih Jadwal</div>
                        <div className="right">
                          <img src={`${Config.BASE_URL}/img/arrow-right.png`} />
                        </div>
                      </div>
                    </>
                  )}

                  {this.getVaccineSchedule(this.state.patientVal, "KETIGA") !=
                    null && (
                    <div
                      className={`${
                        this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KETIGA"
                          )
                        )
                          ? "schedule-passed"
                          : ""
                      }`}
                    >
                      <div className="vaccine-no">Vaksin Ketiga</div>
                      <div className="schedule-name">Jadwal</div>
                      <div style={{ minHeight: "4px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div className="schedule-date">
                          {this.getVaccineSchedule(
                            this.state.patientVal,
                            "KETIGA"
                          ).vaccine_date == null
                            ? "-"
                            : moment(
                                this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).vaccine_date,
                                "DD/MM/YYYY"
                              ).format("DD MMMM YYYY")}
                        </div>
                        {!this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KETIGA"
                          )
                        ) &&
                          (this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          ) == null ||
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "KEDUA"
                            ).status_schedule !== "CANCELED") && (
                            <div
                              onClick={() => {
                                this.setState((prevState) => ({
                                  patientVal: {
                                    ...prevState.patientVal,
                                    activeSchedule: "KETIGA",
                                  },
                                }));
                                this.goPage("SCHEDULE SELECT PAGE");
                              }}
                              className="edit-text"
                            >
                              Ubah Tanggal
                            </div>
                          )}
                      </div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div className="schedule-date">
                          {
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "KETIGA"
                            ).hour_start
                          }
                          -
                          {
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "KETIGA"
                            ).hour_end
                          }
                        </div>
                        {!this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KETIGA"
                          )
                        ) &&
                          (this.getVaccineSchedule(
                            this.state.patientVal,
                            "KEDUA"
                          ) == null ||
                            this.getVaccineSchedule(
                              this.state.patientVal,
                              "KEDUA"
                            ).status_schedule !== "CANCELED") && (
                            <div
                              onClick={() => {
                                this.setState((prevState) => ({
                                  patientVal: {
                                    ...prevState.patientVal,
                                    activeSchedule: "KETIGA",
                                  },
                                }));
                                this.fetchLocationVaccineHour(
                                  moment(
                                    this.getVaccineSchedule(
                                      this.state.patientVal,
                                      "KETIGA"
                                    ).vaccine_date,
                                    "DD-MM-YYYY"
                                  )
                                );
                              }}
                              className="edit-text"
                              data-toggle="modal"
                              data-backdrop="static"
                              data-keyboard="false"
                              data-target="#second-schedule-hour-select-modal"
                            >
                              Ubah Jam
                            </div>
                          )}
                      </div>
                      <div
                        className="modal"
                        id="second-schedule-hour-select-modal"
                      >
                        <div className="modal-dialog modal-dialog-bottom">
                          <div className="modal-content">
                            <div className="modal-body">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                              {!this.state.form.askAddCalendar &&
                                !this.state.form.askChooseCalendar && (
                                  <div>
                                    <div className="caption">
                                      Pilih Jam Vaksinasi
                                    </div>
                                    <div style={{ minHeight: "10px" }}></div>
                                    {this.state.form.hourList.length > 0 && (
                                      <div>
                                        <div className="date-selected">
                                          {moment(
                                            this.getVaccineSchedule(
                                              this.state.patientVal,
                                              "KETIGA"
                                            ).vaccine_date,
                                            "DD-MM-YYYY"
                                          ).format("DD MMMM YYYY")}
                                        </div>
                                        <div
                                          style={{ minHeight: "20px" }}
                                        ></div>
                                        <div className="hour-list">
                                          {this.state.form.hourList.map(
                                            (item, index) => (
                                              <div
                                                key={index}
                                                onClick={() =>
                                                  this.setState(
                                                    (prevState) => ({
                                                      form: {
                                                        ...prevState.form,
                                                        hourVal: item,
                                                      },
                                                    })
                                                  )
                                                }
                                                className={`hour ${
                                                  this.state.form.hourVal ===
                                                  item
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {item.hour_start} -{" "}
                                                {item.hour_end}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div
                                          style={{ minHeight: "20px" }}
                                        ></div>
                                        <button
                                          onClick={() =>
                                            this.submitSchedule(
                                              moment(
                                                this.getVaccineSchedule(
                                                  this.state.patientVal,
                                                  "KETIGA"
                                                ).vaccine_date,
                                                "DD-MM-YYYY"
                                              )
                                            )
                                          }
                                          className={`color-button ${
                                            this.state.form.hourVal !== ""
                                              ? "active"
                                              : ""
                                          }`}
                                          disabled={
                                            this.state.form.hourVal === ""
                                          }
                                        >
                                          Pilih
                                        </button>
                                      </div>
                                    )}
                                    {this.state.form.hourList.length === 0 && (
                                      <div>
                                        <div
                                          style={{ minHeight: "16px" }}
                                        ></div>
                                        <div className="img text-center">
                                          <img
                                            src={`${Config.BASE_URL}/img/empty-calendar-icon.png`}
                                          />
                                        </div>
                                        <div
                                          style={{ minHeight: "16px" }}
                                        ></div>
                                        <div className="note">
                                          Slot Waktu Habis
                                        </div>
                                        <div
                                          style={{ minHeight: "32px" }}
                                        ></div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              {this.state.form.askAddCalendar && (
                                <div>
                                  <div className="date-selected">
                                    Vaksinasi COVID-19
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="date-selected">
                                    {moment(this.state.form.schedule).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <div style={{ minHeight: "4px" }}></div>
                                  <div className="hour-selected">
                                    {this.state.form.hourVal.hour_start} -{" "}
                                    {this.state.form.hourVal.hour_end}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="calendar-ask">
                                    Apakah Anda ingin memasukkan ke <br />{" "}
                                    Jadwal Anda?
                                  </div>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() => {
                                      this.setState((prevState) => ({
                                        form: {
                                          ...prevState.form,
                                          askAddCalendar: false,
                                          askChooseCalendar: true,
                                        },
                                      }));
                                    }}
                                    className="color-button active"
                                  >
                                    Iya
                                  </button>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.resetState("PATIENT DETAIL PAGE")
                                    }
                                    className="red-outline-color-button"
                                    data-dismiss="modal"
                                  >
                                    Tidak
                                  </button>
                                </div>
                              )}
                              {this.state.form.askChooseCalendar && (
                                <div>
                                  <div className="date-selected">
                                    Vaksinasi COVID-19
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="date-selected">
                                    {moment(this.state.form.schedule).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <div style={{ minHeight: "4px" }}></div>
                                  <div className="hour-selected">
                                    {this.state.form.hourVal.hour_start} -{" "}
                                    {this.state.form.hourVal.hour_end}
                                  </div>
                                  <div style={{ minHeight: "8px" }}></div>
                                  <div className="calendar-ask">
                                    Apakah Anda ingin memasukkan ke <br />{" "}
                                    Jadwal Anda?
                                  </div>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.submitCalendar("google")
                                    }
                                    className="color-button active"
                                    data-dismiss="modal"
                                  >
                                    Google Calendar
                                  </button>
                                  <div style={{ minHeight: "12px" }}></div>
                                  <button
                                    onClick={() =>
                                      this.submitCalendar("outlook")
                                    }
                                    className="color-button active"
                                    data-dismiss="modal"
                                  >
                                    Outlook Calendar
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ minHeight: "12px" }}></div>

                      {this.getVaccineSchedule(this.state.patientVal, "KETIGA")
                        .status_schedule === "CANCELED" && (
                        <div className="red-warning-notice">
                          Pendaftaran Anda telah dibatalkan
                        </div>
                      )}
                      {this.getVaccineLatestSchedule(this.state.patientVal) ==
                        this.getVaccineSchedule(
                          this.state.patientVal,
                          "KETIGA"
                        ) &&
                        !this.isSchedulePassed(
                          this.getVaccineSchedule(
                            this.state.patientVal,
                            "KETIGA"
                          )
                        ) &&
                        this.getVaccineSchedule(this.state.patientVal, "KETIGA")
                          .status_schedule != "CANCELED" && (
                          <div>
                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "KETIGA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term1: !this.state.form.term1,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term1 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term1 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Saya menyetujui Syarat dan Ketentuan yang
                                berlaku
                              </div>
                            </div>

                            <div style={{ minHeight: "8px" }}></div>

                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "KETIGA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term2: !this.state.form.term2,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term2 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term2 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Data pribadi dan skrining yang saya masukkan
                                adalah data yang benar sesuai kondisi saya
                                sebenarnya
                              </div>
                            </div>

                            <div style={{ minHeight: "8px" }}></div>

                            <div
                              onClick={() => {
                                if (
                                  this.getVaccineSchedule(
                                    this.state.patientVal,
                                    "KETIGA"
                                  ).is_confirmed === "1"
                                )
                                  return;
                                this.setState((prevState) => ({
                                  form: {
                                    ...prevState.form,
                                    term3: !this.state.form.term3,
                                  },
                                }));
                              }}
                              className="d-flex clickable"
                            >
                              <div className="left">
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "1" && (
                                  <div className="radio-disabled">✓</div>
                                )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "0" &&
                                  this.state.form.term3 && (
                                    <div className="radio-check">✓</div>
                                  )}
                                {this.getVaccineSchedule(
                                  this.state.patientVal,
                                  "KETIGA"
                                ).is_confirmed === "0" &&
                                  !this.state.form.term3 && (
                                    <div className="radio-uncheck"></div>
                                  )}
                              </div>
                              <div style={{ minWidth: "8px" }}></div>
                              <div className="right align-self-center flex-grow-1 term">
                                Pihak vaksinator / rumah sakit memiliki hak
                                untuk menolak vaksinasi saya bila kondisi
                                kesehatan saya tidak memungkinkan untuk
                                vaksinasi COVID-19 atau data yang saya masukkan
                                tidak sesuai dengan kondisi sebenarnya.
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ minHeight: "8px" }}></div>
            </div>
          )}
        </div>

        {this.getVaccineLatestSchedule(this.state.patientVal) != null &&
          this.getVaccineLatestSchedule(this.state.patientVal)
            .status_schedule != "CANCELED" && (
            <div className="action">
              {this.getVaccineLatestSchedule(this.state.patientVal)
                .is_confirmed === "0" &&
                this.state.form.term1 &&
                this.state.form.term2 &&
                this.state.form.term3 && (
                  <button
                    onClick={() => {
                      this.confirmPatient();
                      this.goPage("CONFIRMATION DETAIL PAGE");
                    }}
                    className="color-button active"
                  >
                    Konfirmasi
                  </button>
                )}
              {this.getVaccineLatestSchedule(this.state.patientVal)
                .is_confirmed === "0" &&
                (!this.state.form.term1 ||
                  !this.state.form.term2 ||
                  !this.state.form.term3) && (
                  <button className="color-button">Konfirmasi</button>
                )}
              {this.getVaccineLatestSchedule(this.state.patientVal)
                .is_confirmed === "1" && (
                <button
                  onClick={() => this.goPage("CONFIRMATION DETAIL PAGE")}
                  className="border-button"
                >
                  Lihat Status Pendaftaran
                </button>
              )}
            </div>
          )}
      </div>
    );
  }

  confirmationDetailPage() {
    return (
      <div className="confirmation-detail-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text"></div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container flex-grow-1 d-flex flex-column overflow">
          <div className="img">
            <img
              src={`${Config.BASE_URL}/img/vaccine-certificate.png`}
              alt=""
            />
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <div className="title">
            Jadwal Vaksinasi Covid-19 telah Terdaftar.
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <div className="label bold">Detail Pendaftaran</div>
          <div className="grey-text">
            No.Pendaftaran : {this.state.patientVal.id}
          </div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Nama</div>
          <div className="label">{this.state.patientVal.full_name}</div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Tanggal</div>
          <div className="label">
            {moment(
              this.getVaccineLatestSchedule(this.state.patientVal).vaccine_date,
              "DD/MM/YYYY"
            ).format("dddd, DD MMMM YYYY")}
            , {this.getVaccineLatestSchedule(this.state.patientVal).hour_start}{" "}
            - {this.getVaccineLatestSchedule(this.state.patientVal).hour_end}
          </div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Rumah Sakit</div>
          <div className="label">{this.state.patientVal.hospital_name}</div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Tipe Pendaftaran</div>
          <div className="label">{this.state.patientVal.type_vaccine}</div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Vaksin ke</div>
          <div className="label">
            {this.getVaccineSchedule(this.state.patientVal, "KEDUA") != null
              ? "Vaksin Kedua"
              : this.getVaccineSchedule(this.state.patientVal, "KETIGA") != null
              ? "Vaksin Ketiga"
              : "Vaksin Pertama"}

            {/* {this.getVaccineSchedule(this.state.patientVal, "KEDUA") == null
              ? "Vaksin Pertama"
              : "Vaksin Kedua"} */}
          </div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Merek Vaksinasi</div>
          <div className="label">
            {this.state.patientVal.brand_vaccine ?? ""}
          </div>
          <div style={{ minHeight: "5px" }}></div>
          <div className="grey-text">Note</div>
          <div className="label">
            {this.state.patientVal.location_vaccine_note ?? ""}
          </div>
          <div style={{ minHeight: "32px" }}></div>
          <div className="deal">Petunjuk perjanjian vaksinasi</div>
          <div style={{ minHeight: "16px" }}></div>
          <div className="deal-text">
            Penting untuk diperhatikan sebelum datang ke lokasi Vaksin:
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <div className="deal-text">
            <div className="d-flex">
              <div className="icon">
                <img src={`${Config.BASE_URL}/img/bullet-list.png`} alt="" />
              </div>
              <div style={{ minWidth: "8px" }}></div>
              <div className="text">
                Membawa Kartu Tanda Penduduk (KTP Asli)
              </div>
            </div>
            <div style={{ minHeight: "8px" }}></div>
            <div className="d-flex">
              <div className="icon">
                <img src={`${Config.BASE_URL}/img/bullet-list.png`} alt="" />
              </div>
              <div style={{ minWidth: "8px" }}></div>
              <div className="text">
                Menggunakan pakaian lengan pendek atau yang mudah dilipat pada
                bagian lengan.
              </div>
            </div>
            <div style={{ minHeight: "8px" }}></div>
            <div className="d-flex">
              <div className="icon">
                <img src={`${Config.BASE_URL}/img/bullet-list.png`} alt="" />
              </div>
              <div style={{ minWidth: "8px" }}></div>
              <div className="text">
                Pihak vaksinator / rumah sakit memiliki hak untuk menolak
                vaksinasi peserta vaksin bila kondisi kesehatan peserta tidak
                memungkinkan untuk vaksinasi COVID-19 atau data yang peserta
                masukkan tidak sesuai dengan kondisi sebenarnya.
              </div>
            </div>
            <div style={{ minHeight: "8px" }}></div>
            <div className="d-flex">
              <div className="icon">
                <img src={`${Config.BASE_URL}/img/bullet-list.png`} alt="" />
              </div>
              <div style={{ minWidth: "8px" }}></div>
              <div className="text">
                Bila peserta memiliki riwayat penyakit tertentu, peserta wajib
                membawa surat dari dokter spesialis yang terkait dengan penyakit
                tersebut
              </div>
            </div>
          </div>
          <div style={{ minHeight: "40px" }}></div>
          <div className="note">
            Silahkan datang ke rumah sakit sesuai jadwal dan datang 15 menit
            lebih awal untuk konfirmasi
          </div>
          <div style={{ minHeight: "40px" }}></div>
          <div className="action">
            <button
              onClick={() => this.resetState("MAIN PAGE")}
              className="color-button"
            >
              Kembali ke halaman utama
            </button>
          </div>
          <div style={{ minHeight: "12px" }}></div>
          <div className="action">
            <button
              onClick={this.cancelSchedule}
              className="white-delete-button"
            >
              Batalkan Pendaftaran
            </button>
          </div>
          <div style={{ minHeight: "20px" }}></div>
        </div>
      </div>
    );
  }

  getScreeningPatient() {
    let screeningList = [];
    let patient = this.state.patientVal;
    let patientType = this.getPatientType(patient);
    switch (patientType) {
      case "ELDERLY":
        if (patient.status_vaccine === "PERTAMA") {
          screeningList = [
            "SCREENING ALERGIC PAGE",
            "SCREENING AUTOIMMUNE PAGE",
            "SCREENING BLOOD PAGE",
            "SCREENING CHEMO PAGE",
            "SCREENING HEART PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
            "SCREENING STAIRS PAGE",
            "SCREENING FATIQUE PAGE",
            "SCREENING ILLNESS PAGE",
            "SCREENING WALKING PAGE",
            "SCREENING WEIGHT PAGE",
          ];
        }
        if (patient.status_vaccine === "KEDUA") {
          screeningList = [
            "SCREENING ALERGIC PAGE",
            "SCREENING AUTOIMMUNE PAGE",
            "SCREENING BLOOD PAGE",
            "SCREENING CHEMO PAGE",
            "SCREENING HEART PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
            "SCREENING STAIRS PAGE",
            "SCREENING FATIQUE PAGE",
            "SCREENING ILLNESS PAGE",
            "SCREENING WALKING PAGE",
            "SCREENING WEIGHT PAGE",
          ];
        }
        if (patient.status_vaccine === "KETIGA") {
          screeningList = [
            "SCREENING ALERGIC AFTER PAGE",
            "SCREENING AUTOIMMUNE PAGE",
            "SCREENING BLOOD PAGE",
            "SCREENING CHEMO PAGE",
            "SCREENING HEART PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
            "SCREENING STAIRS PAGE",
            "SCREENING FATIQUE PAGE",
            "SCREENING ILLNESS PAGE",
            "SCREENING WEIGHT PAGE",
          ];
        }
        break;
      case "ADULT":
        if (patient.status_vaccine === "PERTAMA") {
          screeningList = [
            "SCREENING ALERGIC PAGE",
            "SCREENING AUTOIMMUNE PAGE",
            "SCREENING BLOOD PAGE",
            "SCREENING CHEMO PAGE",
            "SCREENING HEART PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
          ];
        }
        if (patient.status_vaccine === "KEDUA") {
          screeningList = [
            "SCREENING ALERGIC AFTER PAGE",
            "SCREENING AUTOIMMUNE PAGE",
            "SCREENING BLOOD PAGE",
            "SCREENING CHEMO PAGE",
            "SCREENING HEART PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
          ];
        }
        if (patient.status_vaccine === "KETIGA") {
          screeningList = [
            "SCREENING ALERGIC AFTER PAGE",
            "SCREENING AUTOIMMUNE PAGE",
            "SCREENING BLOOD PAGE",
            "SCREENING CHEMO PAGE",
            "SCREENING HEART PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
          ];
        }
        break;
      case "KID":
        screeningList = [
          "SCREENING KID LAST MONTH PAGE",
          "SCREENING KID INFECTED PAGE",
          "SCREENING KID CONTACTED PAGE",
          "SCREENING KID FEVER PAGE",
          "SCREENING KID FLU PAGE",
          "SCREENING KID IMMUNE PAGE",
          "SCREENING KID MEDICINE PAGE",
          "SCREENING KID ALERGIC PAGE",
          "SCREENING KID BLOOD PAGE",
        ];
        break;
      case "CHILD":
        screeningList = [
          "SCREENING CHILD LAST 2 WEEKS PAGE",
          "SCREENING KID INFECTED PAGE",
          "SCREENING KID CONTACTED PAGE",
          "SCREENING CHILD FEVER PAGE",
          "SCREENING CHILD FLU PAGE",
          "SCREENING KID IMMUNE PAGE",
          "SCREENING KID MEDICINE PAGE",
          "SCREENING KID ALERGIC PAGE",
          "SCREENING KID BLOOD PAGE",
        ];
        break;
      case "PREGNANT":
        if (patient.status_vaccine === "PERTAMA") {
          screeningList = [
            "SCREENING PREGNANT DURATION PAGE",
            "SCREENING PREGNANT PRECLAMP PAGE",
            "SCREENING PREGNANT ALERGIC PAGE",
            "SCREENING PREGNANT SICKNESS PAGE",
            "SCREENING PREGNANT AUTOIMMUNE PAGE",
            "SCREENING PREGNANT BLOOD PAGE",
            "SCREENING PREGNANT CHEMO PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
          ];
        }
        if (patient.status_vaccine === "KEDUA") {
          screeningList = [
            "SCREENING PREGNANT ALERGIC AFTER PAGE",
            "SCREENING PREGNANT DURATION PAGE",
            "SCREENING PREGNANT PRECLAMP PAGE",
            "SCREENING PREGNANT SICKNESS PAGE",
            "SCREENING PREGNANT AUTOIMMUNE PAGE",
            "SCREENING PREGNANT BLOOD PAGE",
            "SCREENING PREGNANT CHEMO PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
          ];
        }
        if (patient.status_vaccine === "KETIGA") {
          screeningList = [
            "SCREENING PREGNANT ALERGIC AFTER PAGE",
            "SCREENING PREGNANT DURATION PAGE",
            "SCREENING PREGNANT PRECLAMP PAGE",
            "SCREENING PREGNANT SICKNESS PAGE",
            "SCREENING PREGNANT AUTOIMMUNE PAGE",
            "SCREENING PREGNANT BLOOD PAGE",
            "SCREENING PREGNANT CHEMO PAGE",
            "SCREENING PREGNANT POSITIVE PAGE",
          ];
        }
        break;
    }
    return screeningList;
  }

  screeningWelcomePage() {
    let screeningList = this.getScreeningPatient();
    return (
      <div className="screening-welcome-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container flex-grow-1 d-flex flex-column">
          <div className="top-img">
            <img src={`${Config.BASE_URL}/img/join-logo.png`} alt="" />
          </div>
          <div className="middle-img">
            <img src={`${Config.BASE_URL}/img/screening-img.png`} alt="" />
          </div>
          <p className="blue-text">
            Bantu kami memahami kondisi kesehatan Anda agar kami dapat
            merekomendasikan pemberian vaksin COVID-19 kepada Anda
          </p>
          <div style={{ minHeight: "16px" }}></div>
          <p className="blue-sub-text">
            mohon mengisi kuisioner ini dengan jujur dan sesuai dengan kondisi
            Anda
          </p>
          <div style={{ minHeight: "40px" }}></div>
          <div
            onClick={() => this.goPage(screeningList[0])}
            className="form-group"
          >
            <button className="color-button w-100">Isi Kuisioner</button>
          </div>
        </div>
      </div>
    );
  }

  screeningAlergicPage() {
    let currentScreening = "SCREENING ALERGIC PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/vaccine-alergic.png`} />
            </div>
            <div className="question">
              Apakah Anda memiliki riwayat alergi berat seperti sesak napas,
              bengkak dan urtikaria seluruh badan atau reaksi berat lainnya
              karena vaksin?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        alergic: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        alergic: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningAlergicAfterPage() {
    let currentScreening = "SCREENING ALERGIC AFTER PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/vaccine-alergic.png`} />
            </div>
            <div className="question">
              Apakah Anda memiliki riwayat alergi berat setelah divaksinasi
              COVID-19 sebelumnya?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        alergicAfter: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        alergicAfter: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantPage() {
    let currentScreening = "SCREENING PREGNANT PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-pregnant.png`} />
            </div>
            <div className="question">Apakah Anda sedang hamil?</div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnant: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnant: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningAutoimmunePage() {
    let currentScreening = "SCREENING AUTOIMMUNE PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-autoimmune.png`} />
            </div>
            <div className="question">
              {/* {this.state.patientVal.status_vaccine === "KETIGA"
                ? "Apakah Anda mengidap penyakit autoimun seperti lupus?"
                : "Apakah Anda mengidap penyakit autoimun seperti asma, lupus?"} */}
              Apakah Anda mengidap penyakit autoimun seperti lupus?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        autoimmune: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        autoimmune: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningBloodPage() {
    let currentScreening = "SCREENING BLOOD PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-blood.png`} />
            </div>
            <div className="question">
              Apakah Anda sedang mendapat pengobatan untuk gangguan pembekuan
              darah, kelainan darah, defisiensi imun dan penerima produk
              darah/transfusi?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        blood: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        blood: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningChemoPage() {
    let currentScreening = "SCREENING CHEMO PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-chemo.png`} />
            </div>
            <div className="question">
              Apakah Anda sedang mendapat pengobatan immunosupressant seperti
              kortikosteroid dan kemoterapi?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        chemo: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        chemo: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningHeartPage() {
    let currentScreening = "SCREENING HEART PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-heart.png`} />
            </div>
            <div className="question">
              {/* {this.state.patientVal.status_vaccine === "KETIGA"
                ? "Apakah Anda memiliki penyakit jantung berat atau asma dalam keadaan sesak?"
                : "Apakah Anda memiliki penyakit jantung berat dalam keadaan sesak?"} */}
              Apakah Anda memiliki penyakit jantung berat atau asma dalam
              keadaan sesak?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        heart: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        heart: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningStairsPage() {
    let currentScreening = "SCREENING STAIRS PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(11, 7)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-stairs.png`} />
            </div>
            <div className="question">
              Apakah Anda mengalami kesulitan untuk naik 10 anak tangga?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        stairs: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        stairs: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningFatiquePage() {
    let currentScreening = "SCREENING FATIQUE PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-fatique.png`} />
            </div>
            <div className="question">Apakah Anda sering merasa kelelahan?</div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        fatique: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        fatique: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningIllnessPage() {
    let currentScreening = "SCREENING ILLNESS PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-illness.png`} />
            </div>
            <div className="question">
              Apakah Anda memiliki paling sedikit 5 dari 11 penyakit
              (Hipertensi, diabetes, kanker, penyakit paru kronis, serangan
              jantung, gagal jantung kongestif, nyeri dada, asma, nyeri sendi,
              stroke dan penyakit ginjal)?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        illness: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        illness: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningWalkingPage() {
    let currentScreening = "SCREENING WALKING PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-walking.png`} />
            </div>
            <div className="question">
              Apakah Anda mengalami kesulitan berjalan kira-kira 100 sampai 200
              meter?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        walking: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        walking: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningWeightPage() {
    let currentScreening = "SCREENING WEIGHT PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-weight.png`} />
            </div>
            <div className="question">
              Apakah Anda mengalami penurunan berat badan yang bermakna dalam
              setahun terakhir?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        weight: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        weight: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidLastMonthPage() {
    let currentScreening = "SCREENING KID LAST MONTH PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/vaccine-no-img.png`} />
            </div>
            <div className="question">
              Apakah anak mendapat vaksin lain kurang dari 1 bulan sebelumnya?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidLastMonth: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidLastMonth: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidInfectedPage() {
    let currentScreening = "SCREENING KID INFECTED PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-infected.png`} />
            </div>
            <div className="question">Apakah anak pernah sakit COVID-19?</div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidInfected: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidInfected: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidContactedPage() {
    let currentScreening = "SCREENING KID CONTACTED PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-contacted.png`} />
            </div>
            <div className="question">
              Apakah dalam keluarga terdapat kontak dengan pasien COVID-19?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidContacted: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidContacted: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidFeverPage() {
    let currentScreening = "SCREENING KID FEVER PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-fever.png`} />
            </div>
            <div className="question">
              Apakah dalam 7 hari terakhir anak menderita demam atau batuk pilek
              atau nyeri menelan atau muntah atau diare?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidFever: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidFever: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidFluPage() {
    let currentScreening = "SCREENING KID FLU PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-flu.png`} />
            </div>
            <div className="question">
              Apakah dalam 7 hari terakhir anak pernah mendapat perawatan di
              Rumah Sakit atau menderita kedaruratan medis seperti sesak napas,
              kejang, tidak sadar, berdebar-debar, perdarahan, hipertensi atau
              tremor hebat?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidFlu: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidFlu: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningChildFluPage() {
    let currentScreening = "SCREENING CHILD FLU PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-flu.png`} />
            </div>
            <div className="question">
              Apakah dalam 7 hari terakhir anak pernah mendapat perawatan di
              Rumah Sakit atau menderita kedaruratan medis seperti sesak
              napas,kejang, tidak sadar, berdebar-debar, perdarahan, hipertensi,
              tremor hebat?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidFlu: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidFlu: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidImmunePage() {
    let currentScreening = "SCREENING KID IMMUNE PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-immune.png`} />
            </div>
            <div className="question">
              Apakah anak sedang menderita gangguan imunitas (Hiperimun: auto
              imun, alergi berat dan defisiensi imun: gizi buruk, HIV berat atau
              keganasan)?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidImmune: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidImmune: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidMedicinePage() {
    let currentScreening = "SCREENING KID MEDICINE PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-medicine.png`} />
            </div>
            <div className="question">
              Apakah saat ini anak sedang menjalani pengobatan imunosupresan
              jangka panjang (Steroid lebih dari 2 Minggu, Sitostatika)?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidMedicine: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidMedicine: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidAlergicPage() {
    let currentScreening = "SCREENING KID ALERGIC PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-alergic.png`} />
            </div>
            <div className="question">
              Apakah anak mempunyai riwayat alergi berat seperti sesak napas,
              bengkak, urtikaria di seluruh tubuh atau gejala syok anafilaksis
              (tidak sadar) setelah vaksinasi sebelumnya?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidAlergic: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidAlergic: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningKidBloodPage() {
    let currentScreening = "SCREENING KID BLOOD PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-blood.png`} />
            </div>
            <div className="question">
              Apakah anak penyandang penyakit hemofilia atau kelainan pembekuan
              darah?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidBlood: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        kidBlood: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningChildLast2WeeksPage() {
    let currentScreening = "SCREENING CHILD LAST 2 WEEKS PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/vaccine-no-img.png`} />
            </div>
            <div className="question">
              Apakah anak mendapat vaksin lain (Vaksin Rutin) kurang dari 2
              Minggu sebelumnya?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        childLast2Weeks: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        childLast2Weeks: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningChildFeverPage() {
    let currentScreening = "SCREENING CHILD FEVER PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-kid-fever.png`} />
            </div>
            <div className="question">
              Apakah saat ini anak menderita demam atau batuk pilek atau nyeri
              menelan atau muntah atau diare?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        childFever: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        childFever: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantDurationPage() {
    let currentScreening = "SCREENING PREGNANT DURATION PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-pregnant.png`} />
            </div>
            <div className="question">Berapa usia kehamilan Anda?</div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer d-flex flex-column">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantDuration: "< 13 Minggu",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                &lt; 13 Minggu
              </button>
              <div style={{ minHeight: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantDuration: "13-28 Minggu",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                13-28 Minggu
              </button>
              <div style={{ minHeight: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantDuration: "29-40 Minggu",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                29-40 Minggu
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantPreclampPage() {
    let currentScreening = "SCREENING PREGNANT PRECLAMP PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-preclamp.png`} />
            </div>
            <div className="question" style={{ textAlign: "left" }}>
              Apakah ibu memiliki keluhan dan tanda preeklampsia :
              <br />
              a. Kaki bengkak
              <br />
              b. Sakit kepala
              <br />
              c. Nyeri ulu hati
              <br />
              d. Pandangan kabur
              <br />
              e. Tekanan darah &lt;140/90 mmHg
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantPreclamp: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantPreclamp: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantAlergicPage() {
    let currentScreening = "SCREENING PREGNANT ALERGIC PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/vaccine-alergic.png`} />
            </div>
            <div className="question">
              Apakah Anda memiliki riwayat alergi berat seperti sesak napas,
              bengkak dan urtikaria seluruh badan atau reaksi berat lainnya
              karena vaksin?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantAlergic: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantAlergic: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantAlergicAfterPage() {
    let currentScreening = "SCREENING PREGNANT ALERGIC AFTER PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/vaccine-alergic.png`} />
            </div>
            <div className="question">
              Apakah Anda memiliki riwayat alergi berat setelah divaksinasi
              COVID-19 sebelumnya?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantAlergicAfter: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantAlergicAfter: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantSicknessPage() {
    let currentScreening = "SCREENING PREGNANT SICKNESS PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-heart.png`} />
            </div>
            <div className="question" style={{ textAlign: "left" }}>
              Apakah Anda mempunyai penyakit penyerta, seperti :
              <br />
              a. Jantung
              <br />
              b. DM
              <br />
              c. Asma
              <br />
              d. Penyakit paru
              <br />
              e. HIV
              <br />
              f. Hipertiroid/Hipotiroid
              <br />
              g. Penyakit ginjal kronik
              <br />
              h. Penyakit hati
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantSickness: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantSickness: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantAutoimmunePage() {
    let currentScreening = "SCREENING PREGNANT AUTOIMMUNE PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-autoimmune.png`} />
            </div>
            <div className="question">
              Apakah Anda mengidap penyakit autoimun seperti lupus?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantAutoimmune: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantAutoimmune: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantBloodPage() {
    let currentScreening = "SCREENING PREGNANT BLOOD PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-blood.png`} />
            </div>
            <div className="question">
              Apakah Anda sedang mendapat pengobatan untuk gangguan pembekuan
              darah, kelainan darah, defisiensi imun dan penerima produk
              darah/transfusi?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantBlood: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantBlood: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantChemoPage() {
    let currentScreening = "SCREENING PREGNANT CHEMO PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-chemo.png`} />
            </div>
            <div className="question">
              Apakah Anda sedang mendapat pengobatan immunosupressant seperti
              kortikosteroid dan kemoterapi?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantChemo: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantChemo: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningPregnantPositivePage() {
    let currentScreening = "SCREENING PREGNANT POSITIVE PAGE";
    let screeningList = this.getScreeningPatient();
    let currentPage = screeningList.indexOf(currentScreening) + 1;
    const next = () => {
      if (screeningList.length === currentPage) this.submitScreening();
      else this.setState({ page: screeningList[currentPage] });
    };
    return (
      <div className="screening-alergic-page">
        <div className="wrapper flex-grow-1 d-flex flex-column">
          <div className="topbar">
            <div style={{ minWidth: "16px" }}></div>
            <div
              onClick={() =>
                this.goPage(
                  currentPage === 1
                    ? "PATIENT DETAIL PAGE"
                    : screeningList[currentPage - 2]
                )
              }
              className="arrow clickable"
            >
              <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
            </div>
            <div className="text">Skrining Vaksin</div>
            <div style={{ minWidth: "40px" }}></div>
          </div>
          {this.generateStepBar(screeningList.length, currentPage)}
          <div className="container flex-grow-1 d-flex flex-column justify-content-end">
            <div className="img">
              <img src={`${Config.BASE_URL}/img/screening-positive.png`} />
            </div>
            <div className="question">
              Apakah Anda pernah terkonfirmasi menderita COVID-19?
            </div>
            <div style={{ minHeight: "32px" }}></div>
            <div className="answer">
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantPositive: "Ya",
                      },
                    }),
                    next
                  );
                }}
                className="yes"
              >
                Ya
              </button>
              <div style={{ minWidth: "16px" }}></div>
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      form: {
                        ...prevState.form,
                        pregnantPositive: "Tidak",
                      },
                    }),
                    next
                  );
                }}
                className="no"
              >
                Tidak
              </button>
            </div>
            <div style={{ minHeight: "32px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  screeningSuccessPage() {
    return (
      <div className="screening-success-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container flex-grow-1 d-flex flex-column justify-content-center">
          <div className="img">
            <img src={`${Config.BASE_URL}/img/vaccine-accept.png`} alt="" />
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <div className="notice">
            Anda telah memenuhi syarat <br /> untuk mendapatkan vaksin <br />{" "}
            COVID-19
          </div>
          <div style={{ minHeight: "20px" }}></div>
          <p className="notice">
            selanjutnya silahkan memilih <br /> jadwal vaksinasi
          </p>
          <div style={{ minHeight: "8px" }}></div>
          <div
            onClick={() => this.goPage("SCHEDULE SELECT PAGE")}
            className="form-group text-center"
          >
            <button className="color-button">Lanjutkan, Pilih Jadwal</button>
          </div>
          <div style={{ minHeight: "28px" }}></div>
        </div>
      </div>
    );
  }

  screeningFailedPage() {
    return (
      <div className="screening-failed-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container flex-grow-1 d-flex flex-column justify-content-center">
          <div className="img">
            <img src={`${Config.BASE_URL}/img/vaccine-rejected.png`} alt="" />
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <div className="notice">
            Maaf, Anda tidak dapat melanjutkan
            <br />
            proses Skrining Vaksinasi.
          </div>
          <div style={{ minHeight: "20px" }}></div>
          <p className="text">
            Untuk mendapatkan surat persetujuan <br />
            layak vaksin, Anda dapat menghubungi <br />
            dokter.
          </p>
          <div style={{ minHeight: "8px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="form-group text-center"
          >
            <button className="color-button">Oke, Mengerti</button>
          </div>
          <div style={{ minHeight: "28px" }}></div>
        </div>
      </div>
    );
  }

  scheduleSelectPage() {
    return (
      <div className="schedule-select-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Lokasi</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div
          className="flex-grow-1 d-flex flex-column overflow"
          style={{ maxHeight: "550px" }}
        >
          <div className="top flex-grow-1">
            <div className="container">
              <div className="text">
                Silahkan Pilih jadwal vaksinasi yang tersedia
              </div>
            </div>
          </div>
          <div className="bottom">{this.generateCalendar()}</div>
        </div>
      </div>
    );
  }

  scheduleCancelPage() {
    return (
      <div className="screening-failed-page">
        <div className="topbar">
          <div style={{ minWidth: "16px" }}></div>
          <div
            onClick={() => this.goPage("PATIENT DETAIL PAGE")}
            className="arrow clickable"
          >
            <img src={`${Config.BASE_URL}/img/back-arrow-icon.png`} />
          </div>
          <div className="text">Skrining Vaksin</div>
          <div style={{ minWidth: "40px" }}></div>
        </div>
        <div className="container flex-grow-1 d-flex flex-column justify-content-center">
          <div className="img">
            <img src={`${Config.BASE_URL}/img/vaccine-rejected.png`} alt="" />
          </div>
          <div style={{ minHeight: "8px" }}></div>
          <div className="notice">Pendaftaran Anda telah dibatalkan</div>
          <div style={{ minHeight: "20px" }}></div>
          <div
            onClick={() => this.goPage("MAIN PAGE")}
            className="form-group text-center"
          >
            <button className="color-button">Kembali ke beranda</button>
          </div>
          <div style={{ minHeight: "28px" }}></div>
        </div>
      </div>
    );
  }

  generateCalendar() {
    let schedule = this.state.form.schedule;
    let dateRow = [];
    let row = [];
    for (let i = 1; i <= schedule.daysInMonth(); i++) {
      let day = moment(schedule).set("date", i);
      let weekday = moment(day).day();
      // start from monday, not sunday
      if (weekday === 0) weekday = 6;
      else if (weekday === 1) weekday = 0;
      else if (weekday === 2) weekday = 1;
      else if (weekday === 3) weekday = 2;
      else if (weekday === 4) weekday = 3;
      else if (weekday === 5) weekday = 4;
      else if (weekday === 6) weekday = 5;

      row[weekday] = day;
      if (weekday == 6) {
        dateRow.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      dateRow.push(row);
    }

    return (
      <div className="calendar">
        <div className="container">
          <div className="month">
            <div
              onClick={() =>
                this.setState((prevState) => ({
                  form: {
                    ...prevState.form,
                    schedule: moment(schedule).add(-1, "month"),
                  },
                }))
              }
              className="left clickable"
            >
              <img src={`${Config.BASE_URL}/img/calendar-arrow-left.png`} />
            </div>
            <div style={{ minWidth: "4px" }}></div>
            <div className="middle align-self-center">
              {moment(schedule).format("MMMM YYYY")}
            </div>
            <div style={{ minWidth: "4px" }}></div>
            <div
              onClick={() =>
                this.setState((prevState) => ({
                  form: {
                    ...prevState.form,
                    schedule: moment(schedule).add(1, "month"),
                  },
                }))
              }
              className="right clickable"
            >
              <img src={`${Config.BASE_URL}/img/calendar-arrow-right.png`} />
            </div>
          </div>
          <div style={{ minHeight: "12px" }}></div>
          <div className="weekday">
            <div className="day">Sen</div>
            <div className="day">Sel</div>
            <div className="day">Rab</div>
            <div className="day">Kam</div>
            <div className="day">Jum</div>
            <div className="day">Sab</div>
            <div className="day">Ming</div>
          </div>
          <div style={{ minHeight: "12px" }}></div>
          <div className="date-list">
            {dateRow.map((item, index) => (
              <div key={index} className="date">
                {[...Array(7)].map((_, subindex) => (
                  <div
                    key={subindex}
                    onClick={() => {
                      if (!this.isCalendarAllowed(item[subindex])) return;
                      this.setState(
                        (prevState) => ({
                          form: {
                            ...prevState.form,
                            schedule: item[subindex],
                          },
                        }),
                        () => this.fetchLocationVaccineHour2(item[subindex])
                      );
                    }}
                    className={`item ${
                      item[subindex] != null
                        ? this.isCalendarBlocked(item[subindex])
                          ? "block"
                          : this.isCalendarAllowed(item[subindex])
                          ? "active"
                          : "inactive"
                        : ""
                    }`}
                    data-toggle="modal"
                    data-backdrop="static"
                    data-keyboard="false"
                    data-target={`${
                      this.isCalendarAllowed(item[subindex])
                        ? "#hour-select-modal"
                        : ""
                    }`}
                  >
                    {moment(item[subindex]).format("DD")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="modal" id="hour-select-modal">
            <div className="modal-dialog modal-dialog-bottom">
              <div className="modal-content">
                <div className="modal-body">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  {!this.state.form.askAddCalendar &&
                    !this.state.form.askChooseCalendar && (
                      <div>
                        <div className="caption">Pilih Jam Vaksinasi</div>
                        <div style={{ minHeight: "10px" }}></div>
                        {this.state.form.hourList.length > 0 && (
                          <div>
                            <div className="date-selected">
                              {moment(this.state.form.schedule).format(
                                "DD MMMM YYYY"
                              )}
                            </div>
                            <div style={{ minHeight: "20px" }}></div>
                            <div className="hour-list">
                              {this.state.form.hourList.map((item, index) => (
                                <div
                                  key={index}
                                  onClick={() =>
                                    this.setState((prevState) => ({
                                      form: {
                                        ...prevState.form,
                                        hourVal: item,
                                      },
                                    }))
                                  }
                                  className={`hour ${
                                    this.state.form.hourVal === item
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  {item.hour_start} - {item.hour_end}
                                </div>
                              ))}
                            </div>
                            <div style={{ minHeight: "20px" }}></div>
                            <button
                              onClick={this.submitSchedule}
                              className={`color-button ${
                                this.state.form.hourVal !== "" ? "active" : ""
                              }`}
                              disabled={this.state.form.hourVal === ""}
                            >
                              Pilih
                            </button>
                            <div style={{ minHeight: "12px" }}></div>
                            <button
                              className="red-outline-color-button"
                              data-dismiss="modal"
                            >
                              Tutup
                            </button>
                          </div>
                        )}
                        {this.state.form.hourList.length === 0 && (
                          <div>
                            <div style={{ minHeight: "16px" }}></div>
                            <div className="img text-center">
                              <img
                                src={`${Config.BASE_URL}/img/empty-calendar-icon.png`}
                              />
                            </div>
                            <div style={{ minHeight: "16px" }}></div>
                            <div className="note">Slot Waktu Habis</div>
                            <div style={{ minHeight: "32px" }}></div>
                          </div>
                        )}
                      </div>
                    )}
                  {this.state.form.askAddCalendar && (
                    <div>
                      <div className="date-selected">Vaksinasi COVID-19</div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="date-selected">
                        {moment(this.state.form.schedule).format(
                          "DD MMMM YYYY"
                        )}
                      </div>
                      <div style={{ minHeight: "4px" }}></div>
                      <div className="hour-selected">
                        {this.state.form.hourVal.hour_start} -{" "}
                        {this.state.form.hourVal.hour_end}
                      </div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="calendar-ask">
                        Apakah Anda ingin memasukkan ke <br /> Jadwal Anda?
                      </div>
                      <div style={{ minHeight: "12px" }}></div>
                      <button
                        onClick={() => {
                          this.setState((prevState) => ({
                            form: {
                              ...prevState.form,
                              askAddCalendar: false,
                              askChooseCalendar: true,
                            },
                          }));
                        }}
                        className="color-button active"
                      >
                        Iya
                      </button>
                      <div style={{ minHeight: "12px" }}></div>
                      <button
                        onClick={() => this.resetState("PATIENT DETAIL PAGE")}
                        className="red-outline-color-button"
                        data-dismiss="modal"
                      >
                        Tidak
                      </button>
                    </div>
                  )}
                  {this.state.form.askChooseCalendar && (
                    <div>
                      <div className="date-selected">Vaksinasi COVID-19</div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="date-selected">
                        {moment(this.state.form.schedule).format(
                          "DD MMMM YYYY"
                        )}
                      </div>
                      <div style={{ minHeight: "4px" }}></div>
                      <div className="hour-selected">
                        {this.state.form.hourVal.hour_start} -{" "}
                        {this.state.form.hourVal.hour_end}
                      </div>
                      <div style={{ minHeight: "8px" }}></div>
                      <div className="calendar-ask">
                        Apakah Anda ingin memasukkan ke <br /> Jadwal Anda?
                      </div>
                      <div style={{ minHeight: "12px" }}></div>
                      <button
                        onClick={() => this.submitCalendar("google")}
                        className="color-button active"
                        data-dismiss="modal"
                      >
                        Google Calendar
                      </button>
                      <div style={{ minHeight: "12px" }}></div>
                      <button
                        onClick={() => this.submitCalendar("outlook")}
                        className="color-button active"
                        data-dismiss="modal"
                      >
                        Outlook Calendar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isCalendarAllowed(date) {
    for (let i = 0; i < this.state.form.allowedDateList.length; i++) {
      let item = this.state.form.allowedDateList[i];
      if (item.date === moment(date).format("YYYY-MM-DD")) return true;
    }
    return false;
  }

  isCalendarBlocked(date) {
    for (let i = 0; i < this.state.form.allowedDateList.length; i++) {
      let item = this.state.form.allowedDateList[i];
      if (item.date === moment(date).format("YYYY-MM-DD")) {
        if (Number(item.is_full) === 1) return true;
      }
    }
    return false;
  }

  generateStepBar(total, active) {
    return (
      <div className="stepbar">
        {[...Array(total)].map((e, i) => (
          <div key={i} className={`step ${i < active ? "active" : ""}`}></div>
        ))}
      </div>
    );
  }

  getPatientType(patient) {
    let age = moment().diff(
      moment(patient.birthdate).format("YYYY-MM-DD"),
      "years"
    );
    if (
      patient.type_vaccine != null &&
      (patient.type_vaccine.toLowerCase().includes("hamil") ||
        patient.category.toLowerCase().includes("hamil"))
    )
      return "PREGNANT";
    if (age <= 11) return "CHILD";
    if (age >= 12 && age <= 17) return "KID";
    if (age >= 18 && age <= 59) return "ADULT";
    if (age >= 60) return "ELDERLY";
    return "ADULT";
  }

  async fetchMe() {
    const accessTokenFromMobile = new URLSearchParams(
      window.location.search
    ).get("at");
    const emailFromMobile = new URLSearchParams(window.location.search).get(
      "email"
    );

    try {
      //access token
      let access_token =
        this.state.access_user === null
          ? await this.getQueryVariable("at")
          : this.state.access_user.access_token;
      let responseMe = await axios.get(
        `${Config.API_URL_AUTH}/user/profile/me`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + access_token, //the token is a variable which holds the token
          },
        }
      );
      let dataMe = responseMe.data;
      let access_user = {
        access_token: access_token,
        username: emailFromMobile,
        username_type: "EMAIL",
      };
      if (responseMe.status) {
        reactLocalStorage.setObject("user", dataMe.data);
        reactLocalStorage.setObject("access_user", access_user);
        const access_users = dataMe.data;
        this.setState({
          access_user: access_users,
        });

        const email = await this.getQueryVariable("email");
        if (email == "undefined") {
          reactLocalStorage.clear();
          window.location.href = `${Config.BASE_URL}/vaksin`;
        } else {
          this.setState((prevState) => ({
            form: {
              ...prevState.form,
              user_email: email,
            },
          }));
        }
        if (this.state.user !== null && this.state.user.email !== email)
          window.location.href = `${Config.BASE_URL}/vaccine?email=${this.state.user.email}`;
        this.resetState();
        await this.fetchPatientList();
        const userId = await this.fetchUserId();
      } else {
        console.log("response status responseMe", error);
        reactLocalStorage.clear();
        this.props.history.push("/vaksin");
      }
    } catch (error) {
      if (error.response.status === 401) {
        this.refresh_token();
      } else {
        reactLocalStorage.clear();
        this.props.history.push("/vaksin");
      }
    }
  }

  refresh_token = async () => {
    console.log("refresh_token :");
    let refresh = reactLocalStorage.getObject("refresh_token");
    const emailFromMobile = new URLSearchParams(window.location.search).get(
      "email"
    );
    console.log("refresh_token :", refresh);
    setTimeout(console.log("timeout"), 3000);
    try {
      let refreshToken = await axios.post(
        `${Config.API_URL_AUTH}/user/auth/refresh-token`,
        {
          refresh_token: refresh,
        }
      );
      if (refreshToken.status === 200) {
        let access_user = {
          access_token: refreshToken.data.data.access_token,
          username: emailFromMobile,
          username_type: "EMAIL",
        };

        reactLocalStorage.setObject(
          "refresh_token",
          refreshToken.data.data.refresh_token
        );
        reactLocalStorage.setObject("access_user", access_user);

        setTimeout(console.log("timeout 3000"), 3000);
        setTimeout(window.location.reload(), 3000);
      } else {
        // console.log("ELSE");
        reactLocalStorage.clear();
        this.props.history.push("/vaksin");
      }
    } catch (error) {
      reactLocalStorage.clear();
      this.props.history.push("/vaksin");
    }
  };

  render() {
    console.log("STATE:", this.state);
    return (
      <div className="main">
        <Header></Header>
        <main>
          <div className="vaccine-2">
            {this.state.page === "MAIN PAGE" && this.mainPage()}
            {this.state.page === "PATIENT DATA FORM PAGE 2" &&
              this.patientDataFormPage2()}
            {this.state.page === "VACCINE LOCATION SELECT PAGE" &&
              this.vaccineLocationSelectPage()}
            {this.state.page === "HOSPITAL SELECTION PAGE" &&
              this.hospitalSelectionPage()}
            {this.state.page === "HOSPITAL SELECTION EDIT PAGE" &&
              this.hospitalSelectionEditPage()}
            {this.state.page === "PATIENT DATA FORM PAGE" &&
              this.patientDataFormPage()}
            {this.state.page === "PATIENT EDIT FORM PAGE" &&
              this.patientEditFormPage()}
            {this.state.page === "PATIENT EDIT FORM PAGE 2" &&
              this.patientEditFormPage2()}
            {this.state.page === "PATIENT DETAIL PAGE" &&
              this.patientDetailPage()}
            {this.state.page === "SCREENING WELCOME PAGE" &&
              this.screeningWelcomePage()}
            {this.state.page === "SCREENING ALERGIC PAGE" &&
              this.screeningAlergicPage()}
            {this.state.page === "SCREENING ALERGIC AFTER PAGE" &&
              this.screeningAlergicAfterPage()}
            {this.state.page === "SCREENING PREGNANT PAGE" &&
              this.screeningPregnantPage()}
            {this.state.page === "SCREENING AUTOIMMUNE PAGE" &&
              this.screeningAutoimmunePage()}
            {this.state.page === "SCREENING BLOOD PAGE" &&
              this.screeningBloodPage()}
            {this.state.page === "SCREENING CHEMO PAGE" &&
              this.screeningChemoPage()}
            {this.state.page === "SCREENING HEART PAGE" &&
              this.screeningHeartPage()}
            {this.state.page === "SCREENING STAIRS PAGE" &&
              this.screeningStairsPage()}
            {this.state.page === "SCREENING FATIQUE PAGE" &&
              this.screeningFatiquePage()}
            {this.state.page === "SCREENING ILLNESS PAGE" &&
              this.screeningIllnessPage()}
            {this.state.page === "SCREENING WALKING PAGE" &&
              this.screeningWalkingPage()}
            {this.state.page === "SCREENING WEIGHT PAGE" &&
              this.screeningWeightPage()}
            {this.state.page === "SCREENING KID LAST MONTH PAGE" &&
              this.screeningKidLastMonthPage()}
            {this.state.page === "SCREENING KID INFECTED PAGE" &&
              this.screeningKidInfectedPage()}
            {this.state.page === "SCREENING KID CONTACTED PAGE" &&
              this.screeningKidContactedPage()}
            {this.state.page === "SCREENING KID FEVER PAGE" &&
              this.screeningKidFeverPage()}
            {this.state.page === "SCREENING KID FLU PAGE" &&
              this.screeningKidFluPage()}
            {this.state.page === "SCREENING CHILD FLU PAGE" &&
              this.screeningChildFluPage()}
            {this.state.page === "SCREENING KID IMMUNE PAGE" &&
              this.screeningKidImmunePage()}
            {this.state.page === "SCREENING KID MEDICINE PAGE" &&
              this.screeningKidMedicinePage()}
            {this.state.page === "SCREENING KID ALERGIC PAGE" &&
              this.screeningKidAlergicPage()}
            {this.state.page === "SCREENING KID BLOOD PAGE" &&
              this.screeningKidBloodPage()}
            {this.state.page === "SCREENING CHILD LAST 2 WEEKS PAGE" &&
              this.screeningChildLast2WeeksPage()}
            {this.state.page === "SCREENING CHILD FEVER PAGE" &&
              this.screeningChildFeverPage()}
            {this.state.page === "SCREENING PREGNANT DURATION PAGE" &&
              this.screeningPregnantDurationPage()}
            {this.state.page === "SCREENING PREGNANT PRECLAMP PAGE" &&
              this.screeningPregnantPreclampPage()}
            {this.state.page === "SCREENING PREGNANT ALERGIC PAGE" &&
              this.screeningPregnantAlergicPage()}
            {this.state.page === "SCREENING PREGNANT ALERGIC AFTER PAGE" &&
              this.screeningPregnantAlergicAfterPage()}
            {this.state.page === "SCREENING PREGNANT SICKNESS PAGE" &&
              this.screeningPregnantSicknessPage()}
            {this.state.page === "SCREENING PREGNANT AUTOIMMUNE PAGE" &&
              this.screeningPregnantAutoimmunePage()}
            {this.state.page === "SCREENING PREGNANT BLOOD PAGE" &&
              this.screeningPregnantBloodPage()}
            {this.state.page === "SCREENING PREGNANT CHEMO PAGE" &&
              this.screeningPregnantChemoPage()}
            {this.state.page === "SCREENING PREGNANT POSITIVE PAGE" &&
              this.screeningPregnantPositivePage()}

            {this.state.page === "SCREENING SUCCESS PAGE" &&
              this.screeningSuccessPage()}
            {this.state.page === "SCREENING FAILED PAGE" &&
              this.screeningFailedPage()}
            {this.state.page === "SCHEDULE SELECT PAGE" &&
              this.scheduleSelectPage()}
            {this.state.page === "SCHEDULE CANCEL PAGE" &&
              this.scheduleCancelPage()}
            {this.state.page === "CONFIRMATION DETAIL PAGE" &&
              this.confirmationDetailPage()}

            {this.state.isLoading && (
              <div className="loading">
                <div className="spinner-border text-primary"></div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default VaccineV3;
