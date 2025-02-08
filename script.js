import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";

document.addEventListener("DOMContentLoaded", function () {
  getJSON("https://t.if.co.id/json/NurAliaa.json", null, null, responseFunction);
});

function responseFunction(data) {
  // Pastikan data yang diterima memiliki struktur yang benar
  if (data) {
    // Mengupdate elemen dengan data yang diterima
    document.getElementById('profile-name').textContent = data.name || 'Waode Nur Alia';
    document.getElementById('profile-bio').textContent = data.bio || 'Hai gaissuu';
    document.getElementById('profile-rate').innerHTML = `<strong>Tarif:</strong> ${data.rate || '$4'}`;
    //document.getElementById('profile-image').src = data.image || 'default-image.jpg'; // Ganti dengan gambar default jika tidak ada

    // Menampilkan keterampilan
    const skillsContainer = document.getElementById('profile-skills');
    skillsContainer.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan keterampilan
    if (data.skills && data.skills.length > 0) {
      data.skills.forEach(skill => {
        const skillElement = document.createElement('li');
        skillElement.textContent = `${skill.name} - Level: ${skill.level}`;
        skillsContainer.appendChild(skillElement);
      });
    } else {
      skillsContainer.innerHTML = '<li>Keterampilan tidak tersedia</li>';
    }
  } else {
    console.error('Data tidak ditemukan');
  }
}