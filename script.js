// GANTI dengan nomor WhatsApp admin MYSS Studio.
// Format Indonesia: 628xxxxxxxxxx
const nomorAdmin = "6282318204751";

// Tahun otomatis di footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Menu navigasi untuk HP
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  const menuTerbuka = navLinks.classList.contains("open");

  menuToggle.textContent = menuTerbuka ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", menuTerbuka);
});

// Tutup menu setelah link dipilih
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Tombol layanan mengisi jenis layanan pada formulir
document.querySelectorAll(".service-link").forEach(function (button) {
  button.addEventListener("click", function () {
    const layananDipilih = button.dataset.service;

    document.getElementById("layanan").value = layananDipilih;

    document.getElementById("pesan").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Formulir pesanan WhatsApp
document.getElementById("orderForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value;
    const layanan = document.getElementById("layanan").value;
    const mapel = document.getElementById("mapel").value.trim();
    const detail = document.getElementById("detail").value.trim();
    const pesanStatus = document.getElementById("formMessage");

    if (!nama || !kelas || !layanan || !detail) {
      pesanStatus.textContent =
        "Mohon isi semua bagian yang wajib diisi.";
      return;
    }

    // Pastikan nomor admin sudah diganti
    if (nomorAdmin === "6282318204751") {
      pesanStatus.textContent =
        "Nomor admin masih contoh. Ganti nomorAdmin di script.js terlebih dahulu.";
      return;
    }

    const pesan =
`Halo MYSS Studio! Saya ingin memesan jasa.

Nama: ${nama}
Kelas: ${kelas}
Layanan: ${layanan}
Mata pelajaran: ${mapel || "-"}

Detail tugas:
${detail}

Mohon informasi harga dan estimasi pengerjaannya. Terima kasih!`;

    const urlWhatsApp =
      "https://wa.me/" +
      nomorAdmin +
      "?text=" +
      encodeURIComponent(pesan);

    window.open(urlWhatsApp, "_blank");
  }
);
