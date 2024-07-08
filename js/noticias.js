document.addEventListener('DOMContentLoaded', function () {
  fetch('https://newsapi.org/v2/top-headlines?country=pt&apiKey=0d5b7b4da4344f6eb2916ac90e3a9958')
    .then(response => response.json())
    .then(data => {
      const noticiasCarousel = document.querySelector('#noticiasCarousel .carousel-inner');

      data.articles.forEach((article, index) => {
        const noticiaItem = document.createElement('div');
        noticiaItem.classList.add('carousel-item');
        if (index === 0) {
          noticiaItem.classList.add('active');
        }

        noticiaItem.innerHTML = `
          <h2 style="text-align: center;">${article.title}</h2>
          <a href="${article.url}" target="_blank" style="display: block; margin: 0 auto; text-align: center;">Leer más</a>
        `;

        noticiasCarousel.appendChild(noticiaItem);
      });

      // Inicialização do mapa
      if (!L.DomUtil.get('map')) {
        var map = L.map('map').setView([40.44133, -3.69730], 17);

        // Configuração do mapa
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Marcação no mapa
        var marker = L.marker([40.44133, -3.69731]).bindTooltip('<a>GameStore</a>').openTooltip().addTo(map);

        // Adiciona a rota no mapa se a localização estiver disponível
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
          }, function (error) {
            console.error('Erro ao obter a localização:', error.message);
          });
        } else {
          console.error('Geolocalização não suportada no seu navegador.');
        }
      } else {
        console.error('Map container is already initialized.');
      }
    })
    .catch(error => console.error('Erro ao obter notícias:', error));
});
