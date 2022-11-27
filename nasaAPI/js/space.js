let dataArray = [];
let Site_URL = 'https://images-api.nasa.gov/search?q=';
let indice;
let getJSONData = function (url) {
  let result = {};
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      return result;
    });
}

function showList() {

  let htmlcontentToAppend = "";
  for (i = 0; i < dataArray.length; i++) {
    let data = dataArray[i];
    if (data.links != undefined) {
      indice = i;
      htmlcontentToAppend += ` <div class="card" style="width: 18rem; height: 18rem;">
      
      <img onclick="redireccionar('${i}')" src="${data.links[0].href}" class="card-img-top" alt="img">
      <div class="card-body overflow-auto">
        <h5 class="card-title">${data.data[0].title}</h5>
        <p class="card-text">${data.data[0].description}
        ${data.data[0].date_created}</p>
      </div>
    </div>  
      `
  console.log(i)    

    }

  }
  document.getElementById("contenedor").innerHTML = htmlcontentToAppend;
}

function redireccionar(x) {
  let data = JSON.stringify(dataArray[x]);
  console.log(data);

  localStorage.setItem("planet_info", data);

  window.location = 'planet_info.html';

};



document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("btnBuscar").addEventListener("click", function () {
    let search_url = Site_URL + document.getElementById("inputBuscar").value;

    getJSONData(search_url).then(function (resultObj) {
      if (resultObj.status === "ok") {
        dataArray = resultObj.data.collection.items
        console.log(dataArray);
        showList();
      }
    });

  });


});