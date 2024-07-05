document.getElementById('searchButton').addEventListener('click', () => {
  const artistName = document.getElementById('artistName').value;
  const songName = document.getElementById('songName').value;
  const youtubeLink = document.getElementById('youtubeLink').value;

  if (youtubeLink) {
    fetchVideoTitle(youtubeLink);
  } else if (artistName && songName) {
    fetchLyrics(artistName, songName);
  } else {
    document.getElementById('lyrics').innerText = 'Por favor, introduce el nombre del artista y la canción, o un enlace de YouTube';
  }
});

function fetchLyrics(artistName, songName) {
  fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(songName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.lyrics) {
        document.getElementById('lyrics').innerText = data.lyrics;
      } else {
        document.getElementById('lyrics').innerText = 'Letra no encontrada';
      }
    })
    .catch(error => {
      document.getElementById('lyrics').innerText = 'Error al buscar la letra';
      console.error('Error:', error);
    });
}

function fetchVideoTitle(youtubeLink) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = `https://www.youtube.com/oembed?url=${youtubeLink}&format=json`;

  fetch(proxyUrl + url)
    .then(response => response.json())
    .then(data => {
      const title = data.title;
      const [artistName, songName] = title.split(' - ');
      if (artistName && songName) {
        fetchLyrics(artistName, songName);
      } else {
        document.getElementById('lyrics').innerText = 'No se pudo extraer el nombre del artista y la canción del título del video';
      }
    })
    .catch(error => {
      document.getElementById('lyrics').innerText = 'Error al buscar el video';
      console.error('Error:', error);
    });
}
