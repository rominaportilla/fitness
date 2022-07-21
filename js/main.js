let nombre;
let datosCalculadora;
let genero;
let peso;
let altura;
let edad; 

const saludar = ()=> {
    nombre = prompt("Welcome!\n\nI'm Roma, your Personal Fitness Coach <3\nWe will work together to build the body and mindset of your dreams in a sustainable way. No more restrictions, no more fasting, no more food guilt!!!\n\nWhat's your name?");
}
saludar();

if (nombre != null){
    let nombreIngresado = document.getElementById('nombre');
    nombreIngresado.innerText = `${nombre},`;
}

// Calculadora Nutricional -----------------------------------------------------
let TMB;
let calorias; 
let totalCalorias;

function seleccionarGenero() {
    if (document.getElementById('femenino').checked) {
        genero = 'femenino'
    } else if (document.getElementById('masculino').checked) {
        genero = 'masculino'
    }
}

function actividadFisica() {
    if (document.querySelector('[name=little]').selected) {
        calorias = TMB * 1.2;
    } else if (document.querySelector('[name=light]').selected) {
        calorias = TMB * 1.375;
    } else if (document.querySelector('[name=moderate]').selected) {
        calorias = TMB * 1.55;
    } else if(document.querySelector('[name=heavy]').selected){
        calorias = TMB * 1.75;
    } else if (document.querySelector('[name=veyHeavy]').selected) {
        calorias = TMB * 1.9;
    }
}

function calcular() {
    if (document.getElementById('deficit').checked) {
        const deficitCalorico = (calorias)=> calorias - 500; 
        totalCalorias = deficitCalorico(calorias);
        console.log(`Déficit calórico = ${totalCalorias}`);
    } else if (document.getElementById('superavit').checked) {
        const superavitCalorico = (calorias)=> calorias + 500;
        totalCalorias = superavitCalorico(calorias);
        console.log(`Superávit calórico = ${totalCalorias}`);
    } else if (document.getElementById('mantenimiento').checked) {
        const mantenimiento = calorias;
        totalCalorias = mantenimiento;
        console.log(`Mantenimiento = ${totalCalorias}`);
    }
}

function mostrarResultado() {
    let resultado = document.getElementById('totalCalorias')
    let verResultado = document.createElement('p')

    verResultado.innerText = `${totalCalorias}`
    resultado.append(verResultado)
}

function inicializarDatos() {
    datosCalculadora = document.getElementById('datosCalculadora');
    peso = document.getElementById('peso');
    altura = document.getElementById('altura');
    edad = document.getElementById('edad');
}
inicializarDatos()

datosCalculadora.addEventListener('submit', (event) => {
    event.preventDefault();

    let calculoPeso = 10 * peso.value;
    let calculoAltura = 6.25 * altura.value;
    let calculoEdad = 5 * edad.value;
    seleccionarGenero()
    if (genero == 'femenino'){
        TMB = calculoPeso + calculoAltura - calculoEdad - 161;
    } else if(genero == 'masculino'){
        TMB = calculoPeso + calculoAltura - calculoEdad + 5;
    }
    console.log(`TMB = ${TMB}`)

    actividadFisica()
    console.log(`Calorías de mantenimiento = ${calorias}`);
    calcular();
    mostrarResultado();
    datosCalculadora.reset();
})

//Planes de Alimentación y Entrenamiento --------------------------------------------------------------
let carrito = [];
let detallesPlan;
let objetivoPlan;
let tipoPlan;
let alergico;
let cantidadPlan;
let agregado;
let error;

class PlanAlimenticio{
    constructor(objetivoPlan, tipoPlan, cantidadPlan, precioPlan){
        this.objetivoPlan = objetivoPlan;
        this.tipoPlan = tipoPlan;
        this.cantidadPlan = parseInt(cantidadPlan);
        this.precioPlan = precioPlan;
    }
}

function inicializarPlan() {
    detallesPlan = document.getElementById('detallesPlan');
    alergico = document.getElementById('alergico');
    cantidadPlan = document.getElementById('cantidadPlan');
    agregado = document.querySelector('.agregado');
    agregado.style.display = 'none';
    error = document.querySelector(".error")
    error.style.display = 'none';
}
inicializarPlan();

function seleccionarObjetivoPlan() {
    if (document.querySelector('[name=perdida]').selected) {
        objetivoPlan = document.querySelector('[name=perdida]').label
    } else if (document.querySelector('[name=aumento]').selected) {
        objetivoPlan = document.querySelector('[name=aumento]').label
    } else if (document.querySelector('[name=recomposicion]').selected) {
        objetivoPlan = document.querySelector('[name=recomposicion]').label
    }
}

function seleccionarTipoPlan() {
    if (document.querySelector('[name=todos]').selected) {
        tipoPlan = document.querySelector('[name=todos]').label;
    } else if (document.querySelector('[name=vegano]').selected) {
        tipoPlan = document.querySelector('[name=vegano]').label;
    } else if (document.querySelector('[name=celiaco]').selected) {
        tipoPlan = document.querySelector('[name=celiaco]').label;
    }
}

function agregarCarrito() {
    carrito.forEach(producto =>{
        let carritoDiv = document.querySelector('#carrito')
        let productoDiv = document.createElement('div')
        productoDiv.innerHTML = `
        <h6>Plan de Alimentación</h6>
        <h6>OBJETIVO: ${producto.objetivoPlan}</h6>
        <h6>TIPO DE PLAN: ${producto.tipoPlan}</h6>
        <h6>CANTIDAD: ${producto.cantidadPlan}</h6>
        <h6>PRECIO: $${producto.precioPlan}</h6>
        `
        productoDiv.style.padding = '20px'
        carritoDiv.append(productoDiv)
    })
}

detallesPlan.addEventListener('submit', (event)=>{
    event.preventDefault();
    seleccionarObjetivoPlan();
    seleccionarTipoPlan();
    let nuevoProducto = new PlanAlimenticio(objetivoPlan, tipoPlan, cantidadPlan.value, 2500)
    if (objetivoPlan !="" && tipoPlan !="" && cantidadPlan.value != "") {
        carrito.push(nuevoProducto);
        agregarCarrito()
        error.style.display = 'none';
        agregado.style.display = 'block';
        filtrarProteinas()
        filtrarLacteos()
        filtrarVerduras()
        filtrarFrutas()
        filtrarGranos()
        detallesPlan.reset()
    } else{
        error.style.display = 'block';
    }
})

let proteinas;
function filtrarProteinas() {
    proteinas = [
        {alimento: 'lomo embuchado', proteina : 'animal', sinTacc: true},
        {alimento: 'soja', proteina: 'vegetal', sinTacc: true},
        {alimento: 'queso fresco',proteina: 'vegetal', sinTacc: true},
        {alimento: 'bacalao', proteina: 'animal', sinTacc: true},
        {alimento: 'huevo', proteina: 'animal', sinTacc: true},
        {alimento: 'frijoles', proteina: 'vegetal', sinTacc: true},
        {alimento: 'tofu', proteina: 'vegetal', sinTacc: true},
        {alimento: 'proteína de guisantes', proteina: 'vegetal', sinTacc: true},
        {alimento: 'jamón serrano', proteina: 'animal', sinTacc: true},
        {alimento: 'maní', proteina: 'vegetal', sinTacc: true},
        {alimento: 'proteína de cáñamo', proteina: 'vegetal', sinTacc: true},
        {alimento: 'tempeh', proteina: 'vegetal', sinTacc: true},
        {alimento: 'salchichón, salami', proteina: 'animal', sinTacc: false},
        {alimento: 'atún', proteina: 'animal', sinTacc: true},
        {alimento: 'lentejas', proteina: 'vegetal', sinTacc: true},
        {alimento: 'chorizo, jamón cocido', proteina: 'animal', sinTacc: false},
        {alimento: 'hígado', proteina: 'animal', sinTacc: true},
        {alimento: 'langostinos', proteina: 'animal', sinTacc: true},
        {alimento: 'almendras', proteina: 'vegetal', sinTacc: true},
        {alimento: 'seitán', proteina: 'vegetal', sinTacc: false},
        {alimento: 'pistachos', proteina: 'vegetal', sinTacc: true},
        {alimento: 'garbanzos', proteina: 'vegetal', sinTacc: true},
        {alimento: 'carne magra de cerdo', proteina: 'animal', sinTacc: true},
        {alimento: 'morcilla', proteina: 'animal', sinTacc: false},
        {alimento: 'salmón', proteina: 'animal', sinTacc: true},
        {alimento: 'merluza', proteina: 'animal', sinTacc: true}];

        let contenidoProteinaAlergicos = proteinas.filter ((item) => item.alimento !== alergico.value);
        let noAlergiaProteinas = contenidoProteinaAlergicos.map((item) => item.alimento);

        if (tipoPlan == 'Vegano'){
            noAlergiaProteinas = proteinas.filter((item)=> item.proteina == 'vegetal' );
            let contenidoAlimentosVegetales = noAlergiaProteinas.map((item) => item.alimento);
            console.log(contenidoAlimentosVegetales)
            } else if (tipoPlan == 'Celíaco') {
                noAlergiaProteinas = proteinas.filter((item)=> item.sinTacc == true);
                let contenidoAlimentosGlutenFree = noAlergiaProteinas.map((item) => item.alimento);
                console.log(contenidoAlimentosGlutenFree)
            }else{
                noAlergiaProteinas = proteinas.map((item) => item.alimento);
                console.log(contenidoAlimentosProteicos)
            }
}

let lacteos;
function filtrarLacteos() {
    lacteos = ['leche', 'manteca', 'yogur', 'crema de leche', 'queso', 'dulce de leche'];
    let contenidoLacteosAlergicos = lacteos.filter ((item) => item !== alergico.value);
    console.log(contenidoLacteosAlergicos)
}

let verduras;
function filtrarVerduras() {
    verduras = ['berenjena', 'zucchini', 'limón', 'zapallo', 'calabaza', 'lechuga', 'cebolla', 'morrón', 'zanahoria', 'pepino', 'acelga', 'espinaca', 'choclo', 'repollo'];
    let contenidoVerdurasAlergicos = verduras.filter ((item) => item !== alergico.value);
    console.log(contenidoVerdurasAlergicos)
}

let frutas;
function filtrarFrutas() {
    frutas = ['banana', 'manzana', 'pera', 'durazno', 'kiwi', 'melón', 'sandía', 'uvas', 'papaya', 'tomate', 'frutilla', 'arándanos', 'palta', 'naranja', 'ciruela', 'higo'];
    let contenidoFrutasAlergicos = frutas.filter ((item) => item !== alergico.value);
    console.log(contenidoFrutasAlergicos)
}

let granos;
function filtrarGranos() {
    granos = ['pan integral', 'arroz integral', 'cebada', 'avena', 'fideos integrales', 'mijo', 'trigo'];
    let contenidoGranosAlergicos = granos.filter ((item) => item !== alergico.value);
    if (tipoPlan != 'Celíaco') {
        console.log(contenidoGranosAlergicos)
    }
}

// Código de descuento (dentro del carrito) ----------------------------------------
let ingresarCodigo = document.getElementById('ingresarCodigo');
let inputCodigo = document.getElementById('inputCodigo');

ingresarCodigo.addEventListener('click',()=>{
    inputCodigo.innerHTML = `
    <form id="validarCodigo">
    <input id="codigo" placeholder="Ingrese el código aquí">
    <button class="btn btn-dark">Aplicar</button>
    </form>
    `
    let validarCodigo = document.getElementById('validarCodigo');
    let codigo = document.getElementById('codigo')
    let valido = document.getElementById('valido');
    validarCodigo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (codigo.value == 'rominaweb' || codigo.value == 'romiweb' || codigo.value == '30425' || codigo.value == 'ROMINAWEB' || codigo.value == 'ROMIWEB') {
        codigo.style.border = "3px solid green"
        valido.innerHTML = `
        <h6 style= "color: green">Código de descuento aplicado!!!</h6>
        `
    } else{
        codigo.style.border = "3px solid red"
        valido.innerHTML = `
        <h6 style= "color:red">Código de descuento inválido :(</h6>
        `
    }
})})

// Contacto ----------------------------------------------------------------------------
let contacto = document.querySelector('#contacto');
let nombreContacto = document.getElementById('nombreContacto');
let email = document.getElementById('email')
let mensaje = document.getElementById('mensaje')

contacto.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log(nombreContacto.value , email.value , mensaje.value);
    contacto.reset()
} 
)

