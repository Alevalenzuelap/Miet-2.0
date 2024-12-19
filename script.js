// Redirigir al mapa al hacer clic en "Inicio del viaje"
document.getElementById('start-journey')?.addEventListener('click', () => {
  window.location.href = 'mapa.html';
});

// Mapa interactivo en la página del mapa
if (window.location.pathname.includes('mapa.html')) {
  const map = L.map('map').setView([-36.826992, -73.049774], 13); // Coordenadas de Concepción

  // Cargar mapa base
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Agregar ubicación actual
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    L.marker([latitude, longitude]).addTo(map).bindPopup('Tu ubicación actual').openPopup();
  });

  // Agregar buses con colores diferentes
  const buses = [
    { coords: [-36.827, -73.05], color: 'red', link: 'https://www.shutterstock.com/image-photo/sao-paulo-sp-brazil-february-600nw-1142322602.jpg' },
    { coords: [-36.828, -73.048], color: 'yellow', link: 'https://media.istockphoto.com/id/170009755/es/foto/personas-en-el-autob%C3%BAs.jpg?b=1&s=612x612&w=0&k=20&c=dn4LquRdtwn6EOXxjtISetHGQk7yw41u3lfdMLBvp78=' },
    { coords: [-36.829, -73.047], color: 'green', link: 'https://youtu.be/cgs7SlZRKlg?t=75' }
  ];

  buses.forEach(bus => {
    const icon = L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${bus.color}; width: 20px; height: 20px; border-radius: 50%;"></div>`
    });

    const marker = L.marker(bus.coords, { icon }).addTo(map);
    marker.on('click', () => {
      window.location.href = bus.link;
    });
  });
}
