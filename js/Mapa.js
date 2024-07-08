var map = L.map('map').setView([40.44133, -3.69730], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([40.44133, -3.69731]).bindTooltip('<a>GameStore</a>').openTooltip().addTo(map);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    L.Routing.control({
      waypoints: [
        L.latLng(latitude, longitude),
        L.latLng(40.44133, -3.69731)
      ],
      language: 'es',
      show: true
    }).addTo(map);
  });
} else {
  console.error('Geolocalização não suportada no seu navegador.');
}
