const URL_CATALOGO = "https://japceibal.github.io/japflix_api/movies-data.json"
let lista = [];

let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL_CATALOGO).then(function(resultObj){
        if (resultObj.status === "ok"){
            lista = resultObj.data;
            console.log(lista)

        }
    });

    let buscar = document.getElementById('inputBuscar'); 
    document.getElementById('btnBuscar').addEventListener('click', function(e){
        console.log(buscar.value)
        document.querySelectorAll(".list-group-item").forEach(art =>{
            if (art.textContent.toLowerCase().includes(buscar.value.toLowerCase())){
                art.classList.remove("filtro")
    
            }else{
                art.classList.add("filtro")
            }
    
        })
    })

})



