async function getAllData() {
  const res = await fetch('/all');
  const data = await res.json();
  for (let info of data) {
    renderData(info);
  }
}

function renderData(data) {
  let root = document.createElement('p');
  let coordinates = document.createElement('div');
  let date = document.createElement('div');
  let value = document.createElement('div');
  let image = document.createElement("img");

  console.log(data);

  coordinates.textContent = `${data.latitude}, ${data.longitude}`;
  let dateVal = new Date(data.timestamp);
  date.textContent = dateVal.toLocaleString();
  value.textContent = data.value;
  image.src = `../images/${data.image_file}`;

  root.append(coordinates, date, value, image);
  document.body.append(root);
}
getAllData();