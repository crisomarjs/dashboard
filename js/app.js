const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '')
    {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //console.log(ciudad);
    //console.log(pais);



    //consultar API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    
    if(!alerta) {
         //Creando alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'bprder-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="bolck">${mensaje}</span>
        `;

        container.appendChild(alerta);

        //se elimina la alerta despues de 5seg
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
   
}

function consultarAPI(ciudad, pais){
    const appId = '999629ae84865cfb2ddc6de5a63ad5c4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Sppiner(); //muestra un sppiner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML();//limpiar la respuesta previa

            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return;
            }

            //imprime la respuesta html
            mostrarClima(datos);
        })


}

function mostrarClima(datos){
    const {name, main:{ temp, temp_max, temp_min }} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML  = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');
    
    const tempMin = document.createElement('p');
    tempMin.innerHTML  = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados =>  parseInt(grados - 273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Sppiner(){

    limpiarHTML();

    const divSppiner = document.createElement('div');
    divSppiner.classList.add('spinner');

    divSppiner.innerHTML = `
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    `;
    resultado.appendChild(divSppiner);
}


