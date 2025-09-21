// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];
let amigosSorteados = [];
let sorteoActivo = false;
let parejasGeneradas = []; 

function agregarAmigo() {
    if (sorteoActivo) {
        const titulo = document.getElementById("tituloSeccion");
        titulo.textContent = "¡Alto ahí! El club de amigos está completo por ahora. Espera a que todos tengan su secreto antes de invitar a más cómplices.";
        return;
    }

    let inputAmigo = document.getElementById("amigo");
    let amigo = inputAmigo.value;

    if (amigo === "") {
        alert("Por favor, ingresa el nombre de un amigo.");
        return;
    }

    const soloLetrasYEspacios = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;

    if (!soloLetrasYEspacios.test(amigo)) {
        alert("El nombre solo puede contener letras y espacios entre palabras. Nada de números ni símbolos.");
        return;
    }

    if (amigos.includes(amigo)) {
        alert("Ese nombre ya fue agregado.");
        return;
    }

    amigos.push(amigo);
    inputAmigo.value = "";

    mostrarListaAmigos();
    actualizarContador();
    document.getElementById("resultado").innerHTML = "";

    if (amigos.length === 1) {
        const titulo = document.getElementById("tituloSeccion");
        titulo.textContent = "¡Primer recluta confirmado! Ahora junta al resto del escuadrón secreto.";
    }
}

function actualizarContador() {
    const contador = document.getElementById("contador");
    contador.textContent = `Total de amigos: ${amigos.length}`;
}

function mostrarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    for (let i = 0; i < amigos.length; i++) {
        const item = document.createElement("li");
        item.textContent = amigos[i];
        lista.appendChild(item);
    }
}


function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay nombres en la lista para sortear.");
        return;
    }

    if (amigos.length === 1) {
        const titulo = document.getElementById("tituloSeccion");
        titulo.textContent = "¡Se necesita al menos dos amigos para sortear!";
        return;
    }

    if (!sorteoActivo) {
        sorteoActivo = true;
        document.getElementById("tituloSeccion").textContent = "¡El sorteo ha comenzado! Muchas felicidades a los amigos secretos.";
    }

    if (amigosSorteados.length === amigos.length) {
        document.getElementById("tituloSeccion").textContent = "¡Ya todos tienen su amigo secreto!";
        document.getElementById("btnAgregar").disabled = true;

        const btnSortear = document.getElementById("btnSortear");
        btnSortear.textContent = "Reiniciar";
        btnSortear.onclick = reiniciarJuego;
        return;
    }

    generarPareja();
}

function generarPareja() {
    let amigoDisponible;

    do {
        let indice = Math.floor(Math.random() * amigos.length);
        amigoDisponible = amigos[indice];
    } while (amigosSorteados.includes(amigoDisponible));

    let posibles = amigos.filter(nombre =>
        nombre !== amigoDisponible &&
        !parejasGeneradas.some(p => p.para === nombre)
    );

    if (posibles.length === 0) {
        alert("No se pudo generar una pareja válida. Reiniciando sorteo...");
        reiniciarJuego(); 
        return;
    }
    

    let indiceAsignado = Math.floor(Math.random() * posibles.length);
    let amigoSecreto = posibles[indiceAsignado];

    parejasGeneradas.push({ de: amigoDisponible, para: amigoSecreto });
    amigosSorteados.push(amigoDisponible); 

    const resultado = document.getElementById("resultado");
resultado.innerHTML = `<li><strong>${amigoDisponible}</strong> → <strong>${amigoSecreto}</strong></li>`;
}


function asignarParejas() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos dos amigos para asignar parejas.");
        return;
    }

  
    let disponibles = [...amigos];
    let parejas = [];

    for (let i = 0; i < amigos.length; i++) {
        let amigo = amigos[i];

     
        let posibles = disponibles.filter(nombre => nombre !== amigo);

        if (posibles.length === 0) {
            
            return asignarParejas(); 
        }

        let indice = Math.floor(Math.random() * posibles.length);
        let asignado = posibles[indice];

        parejas.push({ de: amigo, para: asignado });


        disponibles = disponibles.filter(nombre => nombre !== asignado);
    }

    mostrarParejas(parejas);
}


function mostrarParejas(parejas) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<strong>Lista de parejas:</strong><ul>";

    for (let i = 0; i < parejas.length; i++) {
        const par = parejas[i];
        resultado.innerHTML += `<li>${par.de} → ${par.para}</li>`;
    }

    resultado.innerHTML += "</ul>";
}

    
function reiniciarJuego() {
    
    amigos = [];
    amigosSorteados = [];
    parejasGeneradas = [];
    sorteoActivo = false;

    document.getElementById("listaAmigos").innerHTML = "";

    document.getElementById("resultado").innerHTML = "";

    document.getElementById("contador").textContent = "Total de amigos: 0";
    document.getElementById("amigo").value = "";

    
    document.getElementById("tituloSeccion").textContent = "Digite el nombre de sus amigos";

    const btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.disabled = false;

    const btnSortear = document.getElementById("btnSortear");
    btnSortear.onclick = sortearAmigo;

    
    btnSortear.innerHTML = `
        <img src="assets/play_circle_outline.png" alt="Ícono para sortear">
        Sortear amigo`;
    }
