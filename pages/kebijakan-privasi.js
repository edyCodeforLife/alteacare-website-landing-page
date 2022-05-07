import React, { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Breadcrumbs } from "../components/molecules";
import TopBar from "../components/topbar";
import * as Config from "./../config";

class kebijakan extends Component {
  render() {
    return (
      <div className="main">
        <main>
          <Header
            title={"Kebijakan Privasi"}
            metadata={"Kebijakan Privasi AlteaCare"}
            tags={"AlteaCare"}
          />
          <TopBar login={this.props.login}></TopBar>
          <div id="article-detail" className="article-detail">
            <Breadcrumbs
              firstUrl={Config.BASE_URL}
              firstLabel={"Beranda"}
              secondUrl={""}
              secondLabel={"Kebijakan Privasi"}
              thirdUrl={""}
              thirdLabel={""}
            />
            <div className="container" style={{ maxWidth: "700px" }}>
              <div style={{ minHeight: "40px" }}></div>
              <div>
                <h1 className="article-title" style={{ textAlign: "center" }}>
                  Kebijakan Privasi untuk AlteaCare <br />
                  (PT. Sehat Digital Nusantara)
                </h1>
              </div>
              <div style={{ minHeight: "30px" }}></div>

              <div className="content" style={{ textAlign: "justify" }}>
                <p>
                  Di AlteaCare, dapat diakses dari www.alteacare.com, salah satu
                  prioritas utama kami adalah privasi pengunjung kami. Dokumen
                  Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan
                  dan dicatat oleh AlteaCare dan bagaimana kami menggunakannya.
                </p>

                <p>
                  Jika Anda memiliki pertanyaan tambahan atau memerlukan
                  informasi lebih lanjut tentang Kebijakan Privasi kami, jangan
                  ragu untuk menghubungi kami.
                </p>

                <p>
                  Kebijakan Privasi ini hanya berlaku untuk aktivitas online
                  kami dan berlaku untuk pengunjung situs web dan aplikasi kami
                  sehubungan dengan informasi yang mereka bagikan dan/atau
                  kumpulkan di AlteaCare. Kebijakan ini tidak berlaku untuk
                  informasi apa pun yang dikumpulkan secara offline atau melalui
                  saluran selain situs web ini. Kebijakan Privasi kami dibuat
                  dengan bantuan{" "}
                  <a href="https://www.privacypolicygenerator.info">
                    Pembuat Kebijakan Privasi Gratis
                  </a>
                  .
                </p>

                <h2>Persetujuan</h2>

                <p>
                  Dengan menggunakan situs web kami, Anda dengan ini menyetujui
                  Kebijakan Privasi kami dan menyetujui persyaratannya.
                </p>

                <h2>Informasi yang kami kumpulkan</h2>

                <p>
                  Informasi pribadi yang diminta untuk Anda berikan, dan alasan
                  mengapa Anda diminta untuk memberikannya, akan dijelaskan
                  kepada Anda pada saat kami meminta Anda untuk memberikan
                  informasi pribadi Anda.
                </p>
                <p>
                  Jika Anda menghubungi kami secara langsung, kami mungkin
                  menerima informasi tambahan tentang Anda seperti nama, alamat
                  email, nomor telepon, isi pesan dan/atau lampiran yang mungkin
                  Anda kirimkan kepada kami, dan informasi lain yang mungkin
                  Anda pilih untuk diberikan .
                </p>
                <p>
                  Saat Anda mendaftar untuk sebuah Akun, kami mungkin meminta
                  informasi kontak Anda, termasuk item seperti nama, nama
                  perusahaan, alamat, alamat email, dan nomor telepon, tempat
                  tanggal lahir, jenis kelamin, nomor induk kependudukan, dan
                  lain-lain
                </p>

                <h2>Bagaimana kami menggunakan informasi Anda</h2>

                <p>
                  Kami menggunakan informasi yang kami kumpulkan dengan berbagai
                  cara, termasuk untuk:
                </p>

                <ul>
                  <li>
                    Menyediakan, mengoperasikan, dan memelihara situs web dan
                    aplikasi kami
                  </li>
                  <li>
                    Tingkatkan, sesuaikan, dan perluas situs web dan aplikasi
                    kami
                  </li>
                  <li>
                    Pahami dan analisis cara Anda menggunakan situs web dan
                    aplikasi kami
                  </li>
                  <li>Mengembangkan produk, layanan, fitur, dan fungsi baru</li>
                  <li>
                    Berkomunikasi dengan Anda, baik secara langsung atau melalui
                    salah satu mitra kami, termasuk untuk layanan pelanggan,
                    untuk memberi Anda pembaruan dan informasi lain yang
                    berkaitan dengan situs web dan aplikasi, dan untuk tujuan
                    pemasaran dan promosi
                  </li>
                  <li>
                    Menginformasikan kepada pengguna terkait produk, layanan,
                    promosim studi, survei, berita, dan perkembangan terbaru,
                    acara, dan lain-lain melalui situs maupun meida lainnya.
                  </li>
                  <li>Menemukan dan mencegah penipuan</li>
                </ul>

                <h2>Cookies </h2>

                <p>
                  Seperti situs web lainnya, AlteaCare menggunakan &apos;cookies&apos;.
                  Cookie ini digunakan untuk menyimpan informasi termasuk
                  preferensi pengunjung, dan halaman di situs web yang diakses
                  atau dikunjungi pengunjung. Informasi tersebut digunakan untuk
                  mengoptimalkan pengalaman pengguna dengan menyesuaikan konten
                  halaman web kami berdasarkan jenis browser pengunjung dan/atau
                  informasi lainnya.
                </p>

                <h2>Pengungkapan Data Pribadi Pengguna</h2>

                <p>
                  AlteaCare menjamin tidak ada penjualan, pengalihan, distribusi
                  atau meminjamkan data pribadi Anda kepada pihak ketiga lain,
                  tanpa terdapat izin dari Anda.
                </p>

                <h2>Penyimpanan dan Penghapusan Informasi</h2>

                <p>
                  AlteaCare akan menyimpan informasi selama akun Pengguna tetap
                  aktif dan dapat melakukan penghapusan sesuai dengan ketentuan
                  peraturan hukum yang berlaku.
                </p>

                <h2>Pembaharuan Kebijakan Privasi</h2>

                <p>
                  AlteaCare dapat sewaktu-waktu melakukan perubahan atau
                  pembaruan terhadap Kebijakan Privasi ini. AlteaCare
                  menyarankan agar Pengguna membaca secara seksama dan memeriksa
                  halaman Kebijakan Privasi ini dari waktu ke waktu untuk
                  mengetahui perubahan apapun. Dengan tetap mengakses dan
                  menggunakan layanan Situs maupun layanan AlteaCare lainnya,
                  maka Pengguna dianggap menyetujui perubahan-perubahan dalam
                  Kebijakan Privasi.
                </p>
                <div style={{ minHeight: "30px" }}></div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default kebijakan;
