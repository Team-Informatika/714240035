import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getHash, onHashChange } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/url.js";

// Fungsi untuk memuat halaman berdasarkan hash
function loadPage() {
    const page = getHash() || "home";
    renderHTML("content", `${page}.html`);
}

// Jalankan saat pertama kali halaman dimuat
loadPage();

// Jalankan saat hash berubah
onHashChange(loadPage);

// Ambil data dari JSON dan render ke halaman
getJSON("https://t.if.co.id/json/Nuraliaa.json", null, null, responseFunction);

function responseFunction(response) {
    console.log("Data JSON Diterima:", response); // Debugging data JSON

    const data = response.data.card;
    
    // Render avatar
    console.log("Avatar Data:", data.avatar);
    setInner("avatar", `<img src="${data.avatar.src}" alt="${data.avatar.alt}" onclick="openModal('${data.avatar.src}')">`);

    // Render nama
    console.log("Nama:", data.details.name);
    setInner("nama", data.details.name);

    // Render about
    console.log("About Data:", data.details.about);
    const aboutHTML = data.details.about.map((item) => `<p>${item.value}</p>`).join("");
    setInner("about", aboutHTML);

    // Render skills
    console.log("Skills List:", data.details.skills.list);
    const skillsHTML = data.details.skills.list.map((skill) => `<li>${skill}</li>`).join("");
    setInner("skills", skillsHTML);

    // Render hourly rate
    console.log("Harga per Hari:", data.details.rate_day.price);
    setInner("harga", data.details.rate_day.price);
    
    console.log("Rate per Hari:", data.details.rate_day.rate);
    setInner("rate", data.details.rate_day.rate);

    // Render social links
    console.log("Social Links:", data.details.social_links);
    const socialLinksHTML = data.details.social_links.map(
        (link) => `<a href="${link.url}" target="_blank">${link.platform}</a>`
    ).join(" | ");
    setInner("social-links", socialLinksHTML);
}

// Fungsi untuk membuka modal
function openModal(src) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    if (!modal || !modalImage) {
        console.error("Elemen modal atau modalImage tidak ditemukan.");
        return;
    }

    console.log("Membuka Modal dengan Gambar:", src);
    modalImage.src = src;
    modal.classList.add("active");

    // Tutup modal saat pengguna mengklik di luar gambar
    modal.addEventListener("click", () => {
        console.log("Menutup Modal");
        modal.classList.remove("active");
        modalImage.src = "";
    });
}
