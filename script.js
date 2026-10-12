"use strict";

// Nomor WhatsApp admin MYSS Studio
const nomorAdmin = "6282318204751";

// 1. Tahun otomatis di footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 2. Menu navigasi HP
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const menuTerbuka = navLinks.classList.toggle("open");

    menuToggle.textContent = menuTerbuka ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(menuTerbuka));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 3. Tombol layanan mengisi formulir secara otomatis
const tombolLayanan = document.querySelectorAll(".service-link");

tombolLayanan.forEach(function (button) {
  button.addEventListener("click", function () {
    const layananDipilih = button.dataset.service;
    const pilihanLayanan = document.getElementById("layanan");
    const bagianPesan = document.getElementById("pesan");

    if (pilihanLayanan && layananDipilih) {
      pilihanLayanan.value = layananDipilih;
    }

    if (bagianPesan) {
      bagianPesan.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// 4. Formulir pesanan menuju WhatsApp
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

    // Periksa data wajib
    if (!nama || !kelas || !layanan || !detail) {
      if (formMessage) {
        formMessage.textContent =
          "Mohon isi nama, kelas, layanan, dan detail tugas.";
      }
      return;
    }

    // Susun pesan pesanan
    const pesan = [
      "Halo MYSS Studio! Saya ingin memesan jasa.",
      "",
      "Nama: " + nama,
      "Kelas: " + kelas,
      "Layanan: " + layanan,
      "Mata pelajaran: " + (mapel || "-"),
      "",
      "Detail tugas:",
      detail,
      "",
      "Mohon informasi harga dan estimasi pengerjaannya.",
      "Terima kasih!"
    ].join("\n");

    // Buat tautan WhatsApp
    const urlWhatsApp =
      "https://wa.me/" +
      nomorAdmin +
      "?text=" +
      encodeURIComponent(pesan);

    // Buka WhatsApp
    window.open(urlWhatsApp, "_blank");

    if (formMessage) {
      formMessage.textContent =
        "Pesanan disiapkan. Silakan lanjutkan pengiriman melalui WhatsApp.";
    }
  });
      }

