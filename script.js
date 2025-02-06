fetch('profile.json')
.then(response => response.json())
.then(data => {
  document.getElementById('profile-name').textContent = data.name;
  document.getElementById('profile-age').textContent = 'Usia: ' + data.age;
  document.getElementById('profile-location').textContent = 'Lokasi: ' + data.location;
  document.getElementById('profile-bio').textContent = data.bio;
  document.getElementById('profile-image').src = data.image;
})
.catch(error => console.error('Error fetching the data:', error));