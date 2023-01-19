
function setup() {
  noCanvas(); // remove the default canvas space added
  const video = createCapture(VIDEO);
  video.size(320, 240);
  let latitude, longitude;
  const button = document.getElementById('submit');
  button.addEventListener('click', async () => {
    const value = document.getElementById('input').value;
    video.loadPixels(); // alert p5.js to take that video element, load the pixels onto the canvas, so it can then be converted to base64.
    const image64 = video.canvas.toDataURL(); // base64 encoding of image
    const options = {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude, value, image64 }),
    };
    const response = await fetch('/api', options);
    const data = await response.json();
    console.log('server response: ', data);
  });

  if ('geolocation' in navigator) {
    console.log('geolocation');
    navigator.geolocation.getCurrentPosition(async (position) => {
      latitude = position.coords.latitude.toFixed(2);
      longitude = position.coords.longitude.toFixed(2);
      document.getElementById('latitude').textContent = latitude;
      document.getElementById('longitude').textContent = longitude;
    });
  } else {
    console.log('no geolocation');
  }
}
