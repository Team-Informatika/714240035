import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getHash, onHashChange } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/url.js";

$(document).ready(function () {
  const profileCard = $('#profile-card');

  // Fungsi untuk membuat elemen kartu profil
  function createProfileCard() {
    const cardHTML = `
      <h2 id="profile-name"></h2>
      <img id="profile-image" src="" alt="Profile Image" />
      <p id="profile-bio"></p>
      <p id="profile-rate"></p>
      <h2>Keterampilan:</h2>
      <ul id="profile-skills"></ul>
    `;
    renderHTML(profileCard[0], cardHTML);

    const closeBtn = $('#close-btn');
    closeBtn.on('click', function () {
      profileCard.addClass('hidden');
    });
  }
  

  createProfileCard();

  // Ambil data dari URL menggunakan getJSON
  getJSON('https://t.if.co.id/json/Nuraliaa.json').then(function (profiles) {
    // Ambil profil pertama dari JSON
    const selectedProfile = profiles[0];

    // Masukkan data ke dalam kartu profil
    setInner($('#profile-name')[0], selectedProfile.name);
    $('#profile-image').attr('src', selectedProfile.image);
    setInner($('#profile-bio')[0], selectedProfile.bio);
    setInner($('#profile-rate')[0], `<strong>Tarif:</strong> ${selectedProfile.rate}`);

    // Bersihkan skill dan tambahkan yang baru
    const profileSkills = $('#profile-skills');
    profileSkills.empty();
    selectedProfile.skills.forEach(skill => {
      let li = $('<li>').text(`${skill.name} (${skill.level})`);
      profileSkills.append(li);
    });

  }).catch(function (error) {
    console.error("Gagal mengambil data dari URL:", error);
  });

  // Event listener untuk perubahan hash di URL (contoh penggunaan onHashChange)
  onHashChange(function (newHash) {
    console.log("Hash berubah menjadi:", newHash);
  });

  // Contoh penggunaan getHash
  const currentHash = getHash();
  console.log("Hash saat ini:", currentHash);
});
