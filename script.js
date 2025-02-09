$(document).ready(function () {
  const profileList = $('#profile-list');
  const profileCard = $('#profile-card');
  const closeBtn = $('#close-btn');

  // Elemen detail
  const profileName = $('#profile-name');
  const profileImage = $('#profile-image');
  const profileBio = $('#profile-bio');
  const profileRate = $('#profile-rate');
  const profileSkills = $('#profile-skills');

  // Ambil data dari URL menggunakan getJSON
  $.getJSON('https://t.if.co.id/json/Nuraliaa.json', function (profiles) {
    // Tampilkan daftar nama
    profiles.forEach(profile => {
      let li = $('<li>');
      let a = $('<a>').attr('href', '#').text(profile.name).attr('data-id', profile.id);
      li.append(a);
      profileList.append(li);
    });

    // Event listener untuk klik nama
    profileList.on('click', 'a', function (e) {
      e.preventDefault();
      const profileId = parseInt($(this).data('id'));
      const selectedProfile = profiles.find(p => p.id === profileId);

      // Masukkan data ke dalam kartu profil
      profileName.text(selectedProfile.name);
      profileImage.attr('src', selectedProfile.image);
      profileBio.text(selectedProfile.bio);
      profileRate.html(`<strong>Tarif:</strong> ${selectedProfile.rate}`);

      // Bersihkan skill dan tambahkan yang baru
      profileSkills.empty();
      selectedProfile.skills.forEach(skill => {
        let li = $('<li>').text(`${skill.name} (${skill.level})`);
        profileSkills.append(li);
      });

      // Tampilkan kartu
      profileCard.removeClass('hidden');
    });

    // Tutup kartu profil
    closeBtn.on('click', function () {
      profileCard.addClass('hidden');
    });

  }).fail(function () {
    console.error("Gagal mengambil data dari URL");
  });
});
