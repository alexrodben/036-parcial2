// Función para actualizar la tabla
function actualizarTabla(data) {
    document.getElementById("id").textContent = data.id;
    document.getElementById("depto_id").textContent = data.depto_id;
    document.getElementById("municipio_id").textContent = data.municipio_id;
    document.getElementById("nombre").textContent = data.nombre;
    document.getElementById("tipo_lugar").textContent = data.tipo_lugar;
    document.getElementById("total_lugares").textContent = data.total_lugares;
    document.getElementById("capital").textContent = data.capital;
    document.getElementById("ext_territorial").textContent = data.ext_territorial;
    document.getElementById("pob_total").textContent = data.pob_total;
    document.getElementById("indice_masculinidad").textContent = data.indice_masculinidad;
    document.getElementById("prom_hijos_mujer").textContent = data.prom_hijos_mujer;
    document.getElementById("edad_promedio").textContent = data.edad_promedio;
    document.getElementById("indice_dependencia").textContent = data.indice_dependencia;
    document.getElementById("anios_prom_estudio").textContent = data.anios_prom_estudio;
    document.getElementById("alfabetismo").textContent = data.alfabetismo;
    document.getElementById("viviendas_part").textContent = data.viviendas_part;
    document.getElementById("total_hogares").textContent = data.total_hogares;
    document.getElementById("prom_personas_hogar").textContent = data.prom_personas_hogar;
    document.getElementById("total_jefas_hogar").textContent = data.total_jefas_hogar;
    document.getElementById("total_sexo_hombre").textContent = data.total_sexo_hombre;
    document.getElementById("porc_sexo_hombre").textContent = data.porc_sexo_hombre;
    document.getElementById("total_sexo_mujeres").textContent = data.total_sexo_mujeres;
    document.getElementById("porc_sexo_mujeres").textContent = data.porc_sexo_mujeres;
    document.getElementById("total_sector_urbano").textContent = data.total_sector_urbano;
    document.getElementById("porc_sector_urbano").textContent = data.porc_sector_urbano;
    document.getElementById("total_sector_rural").textContent = data.total_sector_rural;
    document.getElementById("porc_sector_rural").textContent = data.porc_sector_rural;
}

// URL del endpoint que deseas consumir
const URL = "https://censopoblacion.azurewebsites.net/API/indicadores/2"

// Función para realizar la solicitud GET
function obtenerDatos(indicador) {
    fetch(URL + "/" + indicador)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            // Convertir la respuesta en JSON
            return response.json();
        })
        .then(data => {
            // Mostrar la data recibida en consola
            actualizarTabla(JSON.parse(data));
            crearGraficas(JSON.parse(data));
        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
        });
}

// Constante indicadores
const indicadores = [
    { id: 999, nombre: "Departamento El Progreso" },
    { id: 201, nombre: "Guastatoya" },
    { id: 202, nombre: "Morazán" },
    { id: 203, nombre: "San Agustín Acasaguastlán" },
    { id: 204, nombre: "San Cristóbal Acasaguastlán" },
    { id: 205, nombre: "El Jícaro" },
    { id: 206, nombre: "Sansare" },
    { id: 207, nombre: "Sanarate" },
    { id: 208, nombre: "San Antonio La Paz" },
]

// Función para llenar el combo
function llenarCombo() {
    const combo = document.getElementById("combo");

    // Limpiar el combo antes de llenarlo
    combo.innerHTML = "";

    // Crear opción inicial "Seleccione una opción"
    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.text = "Seleccione una opción";
    opcionInicial.disabled = true;
    opcionInicial.selected = true;
    combo.appendChild(opcionInicial);

    // Llenar el combo con los valores de la constante indicadores
    indicadores.forEach((valor, index) => {
        const opcion = document.createElement("option");
        opcion.value = valor.id;
        opcion.text = `Indicador ${valor.id}: ${valor.nombre}`;
        combo.appendChild(opcion);
    });

    // Agregar evento 'change' al combo para mostrar en consola el valor seleccionado
    combo.addEventListener('change', (event) => {
        obtenerDatos(event.target.value);
    });
}

// Llamar a la función cuando cargue la página
window.onload = llenarCombo;

function crearGraficas(data) {
    // Gráfica de Población por Sexo
    var ctxSexo = document.getElementById("chartSexo").getContext("2d");
    new Chart(ctxSexo, {
        type: "bar",
        data: {
            labels: ["Hombres", "Mujeres"],
            datasets: [
                {
                    label: "Población por Sexo",
                    data: [data.total_sexo_hombre, data.total_sexo_mujeres],
                    backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"]
                }
            ]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfica de Población por Área
    var ctxArea = document.getElementById("chartArea").getContext("2d");
    new Chart(ctxArea, {
        type: "bar",
        data: {
            labels: ["Urbano", "Rural"],
            datasets: [
                {
                    label: "Población por Área",
                    data: [data.total_sector_urbano, data.total_sector_rural],
                    backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 206, 86, 0.5)"]
                }
            ]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfica de Población por Grupos de Edad
    var ctxEdad = document.getElementById("chartEdad").getContext("2d");
    new Chart(ctxEdad, {
        type: "bar",
        data: {
            labels: ["0-14 años", "15-64 años", "65 y más años"],
            datasets: [
                {
                    label: "Población por Edad",
                    data: [data.pob_edad_014, data.pob_edad_1564, data.pob_edad_65],
                    backgroundColor: ["rgba(153, 102, 255, 0.5)", "rgba(255, 159, 64, 0.5)", "rgba(255, 99, 132, 0.5)"]
                }
            ]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfica de Población por Pueblos
    var ctxPueblo = document.getElementById("chartPueblo").getContext("2d");
    new Chart(ctxPueblo, {
        type: "bar",
        data: {
            labels: ["Maya", "Garifuna", "Xinca", "Afrodescendiente", "Ladino", "Extranjero"],
            datasets: [
                {
                    label: "Población por Pueblos",
                    data: [data.pob_pueblo_maya, data.pob_pueblo_garifuna, data.pob_pueblo_xinca, data.pob_pueblo_afrodescendiente, data.pob_pueblo_ladino, data.pob_pueblo_extranjero],
                    backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(255, 206, 86, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(255, 159, 64, 0.5)"]
                }
            ]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Simulación de datos
const mockData = {
    id: 1,
    total_sexo_hombre: 1000,
    total_sexo_mujeres: 1200,
    total_sector_urbano: 1500,
    total_sector_rural: 700,
    pob_edad_014: 400,
    pob_edad_1564: 1500,
    pob_edad_65: 300,
    pob_pueblo_maya: 600,
    pob_pueblo_garifuna: 200,
    pob_pueblo_xinca: 50,
    pob_pueblo_afrodescendiente: 100,
    pob_pueblo_ladino: 800,
    pob_pueblo_extranjero: 50
};
