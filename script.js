
"use strict";

// NOMOR WHATSAPP ADMIN MYSS STUDIO
const nomorAdmin = "6282318204751";

// ==============================
// 1. TAHUN FOOTER OTOMATIS
// ==============================
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==============================
// 2. MENU NAVIGASI HP
// ==============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const terbuka = navLinks.classList.toggle("open");

    menuToggle.textContent = terbuka ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(terbuka));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==============================
// 3. TOMBOL PILIH LAYANAN
// ==============================
document.querySelectorAll(".service-link").forEach(function (button) {
  button.addEventListener("click", function () {
    const layanan = document.getElementById("layanan");
    const bagianPesan = document.getElementById("pesan");

    if (layanan) {
      layanan.value = button.dataset.service;
    }

    if (bagianPesan) {
      bagianPesan.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ==============================
// 4. PESANAN LANGSUNG KE WHATSAPP
// ==============================
const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value;
    const layanan = document.getElementById("layanan").value;
    const mapel = document.getElementById("mapel").value.trim();
    const detail = document.getElementById("detail").value.trim();

    const formMessage = document.getElementById("formMessage");

    // Periksa isian wajib
    if (!nama || !kelas || !layanan || !detail) {
      if (formMessage) {
        formMessage.textContent =
          "Lengkapi nama, kelas, layanan, dan detail tugas terlebih dahulu.";
      }
      return;
    }

    // Susun pesan WhatsApp
    const pesan = `Halo MYSS Studio! Saya ingin memesan jasa.

Nama: ${nama}
Kelas: ${kelas}
Layanan: ${layanan}
Mata pelajaran: ${mapel || "-"}

Detail tugas:
${detail}

Mohon informasi harga dan estimasi pengerjaan.
Terima kasih!`;

    // Buat tautan WhatsApp
    const urlWhatsApp =
      "https://wa.me/6282318204751" +
      nomorAdmin +
      "?text=" +
      encodeURIComponent(pesan);

    // LANGSUNG PINDAH KE WHATSAPP
    window.location.assign(urlWhatsApp);
  });
}
