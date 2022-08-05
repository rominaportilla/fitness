// Saludo ---------------------------------------------------------
let nombreForm = document.getElementById('nombreForm');
let nombreInput = document.getElementById('nombreInput');
let nombre = document.getElementById('nombre');

let modalSaludo = () =>{
    let modalSaludoBoton = document.getElementById('modalSaludoBoton');
    modalSaludoBoton.click();
}
nombreForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    nombreInput != '' && (nombre.innerText = `${nombreInput.value},`);
})

// Calculadora Nutricional -----------------------------------------------------
let datosCalculadora = document.getElementById('datosCalculadora');
let peso = document.getElementById('peso');
let altura = document.getElementById('altura');
let edad = document.getElementById('edad');
let genero;
let TMB;
let calorias; 
let totalCalorias;
let deficitCalorico;
let superavitCalorico;
let mantenimiento;
let resultado;
let verResultado;

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
    } else if (document.querySelector('[name=veryHeavy]').selected) {
        calorias = TMB * 1.9;
    }
}

function calcular() {
    if (document.getElementById('deficit').checked) {
        deficitCalorico = (calorias)=> calorias - 500; 
        totalCalorias = deficitCalorico(calorias);
        console.log(`Déficit calórico = ${totalCalorias}`);
    } else if (document.getElementById('superavit').checked) {
        superavitCalorico = (calorias)=> calorias + 500;
        totalCalorias = superavitCalorico(calorias);
        console.log(`Superávit calórico = ${totalCalorias}`);
    } else if (document.getElementById('mantenimiento').checked) {
        mantenimiento = calorias;
        totalCalorias = mantenimiento;
        console.log(`Mantenimiento = ${totalCalorias}`);
    }
}

function mostrarResultado() {
    resultado = document.getElementById('totalCalorias')
    verResultado = document.getElementById('verResultado')
    verResultado.innerText = `${totalCalorias}`
    resultado.append(verResultado)
}

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
let carritoLocalStorage = localStorage.getItem('carrito');
let carrito;
let nuevoProducto;
let detallesPlanAlimenticio = document.getElementById('detallesPlanAlimenticio');
let detallesPlanEntrenamiento = document.getElementById('detallesPlanEntrenamiento');
let objetivoPlan;
let tipoPlan;
let alergico = document.getElementById('alergico');
let cantidadPlanAlimenticio = document.getElementById('cantidadPlanAlimenticio');
let cantidadPlanEntrenamiento = document.getElementById('cantidadPlanEntrenamiento');

if (!carritoLocalStorage) { 
    carrito = [];
} else{
    carrito = JSON.parse(carritoLocalStorage);
    agregarCarrito();
}

function agregado() {
    Toastify({
        text: "Product successfully added to your shopping cart!",
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: { background: 'rgb(24, 225, 68)'}
    }).showToast();
}

function error() {
    Toastify({
        text: "Error. Try again!",
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: { background: 'red'}
    }).showToast();
}

class Plan{
    constructor(nombrePlan, objetivoPlan, tipoPlan, cantidadPlan, precioPlan){
        this.nombrePlan = nombrePlan;
        this.objetivoPlan = objetivoPlan;
        this.tipoPlan = tipoPlan;
        this.cantidadPlan = parseInt(cantidadPlan);
        this.precioPlan = precioPlan;
    }
}

function seleccionarObjetivoPlan() {
    if (document.querySelector('[name=perdidaPlanAlimenticio]').selected || document.querySelector('[name=perdidaPlanEntrenamiento]').selected) {
        objetivoPlan = 'CALORIE DEFICIT'
    } else if (document.querySelector('[name=aumentoPlanAlimenticio]').selected || document.querySelector('[name=aumentoPlanEntrenamiento]').selected) {
        objetivoPlan = 'CALORIE SURPLUS'
    } else if (document.querySelector('[name=recomposicionPlanAlimenticio]').selected || document.querySelector('[name=recomposicionPlanEntrenamiento]').selected) {
        objetivoPlan = 'BODY RECOMPOSITION'
    }
}

function seleccionarTipoPlanAlimenticio() {
    if (document.querySelector('[name=todos]').selected) {
        tipoPlan = document.querySelector('[name=todos]').label;
    } else if (document.querySelector('[name=vegano]').selected) {
        tipoPlan = document.querySelector('[name=vegano]').label;
    } else if (document.querySelector('[name=celiaco]').selected) {
        tipoPlan = document.querySelector('[name=celiaco]').label;
    }
}

function seleccionarTipoPlanEntrenamiento() {
    if (document.querySelector('[name=principiante]').selected) {
        tipoPlan = document.querySelector('[name=principiante]').label;
    } else if (document.querySelector('[name=intermedio]').selected) {
        tipoPlan = document.querySelector('[name=intermedio]').label;
    } else if (document.querySelector('[name=avanzado]').selected) {
        tipoPlan = document.querySelector('[name=avanzado]').label;
    }
}

function eliminarCarrito(item) {
    carrito.splice(item, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    agregarCarrito();
    console.log(subtotales);
    subtotales.splice(item, 1);
    console.log(subtotales);
    calcularTotal();
}

let carritoDiv = document.querySelector('#carrito');
function agregarCarrito() {
    let producto = '';
    for (let i = 0; i < carrito.length; i++) {
        producto = producto + `
        <div>
        <h6>${carrito[i].nombrePlan}</h6>
        <p>${carrito[i].objetivoPlan}</p>
        <p>${carrito[i].tipoPlan}</p>
        <p>CANTIDAD: ${carrito[i].cantidadPlan}</p>
        <p>PRECIO: $${carrito[i].precioPlan}</p>
        <p onclick="eliminarCarrito(${i})" style="cursor: pointer">remove</p>
        </div>
        `
    }
    document.getElementById('carrito').innerHTML = producto;
}

detallesPlanAlimenticio.addEventListener('submit', (event)=>{
    event.preventDefault();
    seleccionarObjetivoPlan();
    seleccionarTipoPlanAlimenticio();
    nuevoProducto = new Plan('NUTRITION PROGRAM', objetivoPlan, tipoPlan, cantidadPlanAlimenticio.value, 2500)
    if (objetivoPlan !="" && tipoPlan !="" && cantidadPlanAlimenticio.value != "") {
        carrito.push(nuevoProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        agregarCarrito();
        calcularTotal();
        filtrarProteinas();
        filtrarLacteos();
        filtrarVerduras();
        filtrarFrutas();
        filtrarGranos();
        agregado();
        detallesPlanAlimenticio.reset()
    } else{
        error()
    }
})

detallesPlanEntrenamiento.addEventListener('submit', (e)=>{
    e.preventDefault();
    seleccionarObjetivoPlan();
    seleccionarTipoPlanEntrenamiento();
    nuevoProducto = new Plan('WORKOUT PROGRAM', objetivoPlan, tipoPlan, cantidadPlanEntrenamiento.value, 2300)
    if (objetivoPlan !="" && tipoPlan !="" && cantidadPlanEntrenamiento.value != "") {
        carrito.push(nuevoProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        agregarCarrito();
        calcularTotal();
        agregado();
        detallesPlanEntrenamiento.reset()
    } else{
        error()
    }
})

//Personalizar plan 
let proteinas;
let contenidoProteinaAlergicos;
let noAlergiaProteinas;
let contenidoAlimentosVegetales;
let contenidoAlimentosGlutenFree;
let contenidoAlimentosProteicos;

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

        contenidoProteinaAlergicos = proteinas.filter ((item) => item.alimento !== alergico.value);
        noAlergiaProteinas = contenidoProteinaAlergicos.map((item) => item.alimento);

        if (tipoPlan == 'Vegano'){
            noAlergiaProteinas = proteinas.filter((item)=> item.proteina == 'vegetal' );
            contenidoAlimentosVegetales = noAlergiaProteinas.map((item) => item.alimento);
            console.log(contenidoAlimentosVegetales)
            } else if (tipoPlan == 'Celíaco') {
                noAlergiaProteinas = proteinas.filter((item)=> item.sinTacc == true);
                contenidoAlimentosGlutenFree = noAlergiaProteinas.map((item) => item.alimento);
                console.log(contenidoAlimentosGlutenFree)
            }else{
                contenidoAlimentosProteicos = proteinas.map((item) => item.alimento);
                console.log(contenidoAlimentosProteicos)
            }
}

let lacteos;
let contenidoLacteosAlergicos;
function filtrarLacteos() {
    lacteos = ['leche', 'manteca', 'yogur', 'crema de leche', 'queso', 'dulce de leche'];
    contenidoLacteosAlergicos = lacteos.filter ((item) => item !== alergico.value);
    console.log(contenidoLacteosAlergicos)
}

let verduras;
let contenidoVerdurasAlergicos;
function filtrarVerduras() {
    verduras = ['berenjena', 'zucchini', 'limón', 'zapallo', 'calabaza', 'lechuga', 'cebolla', 'morrón', 'zanahoria', 'pepino', 'acelga', 'espinaca', 'choclo', 'repollo'];
    contenidoVerdurasAlergicos = verduras.filter ((item) => item !== alergico.value);
    console.log(contenidoVerdurasAlergicos)
}

let frutas;
let contenidoFrutasAlergicos;
function filtrarFrutas() {
    frutas = ['banana', 'manzana', 'pera', 'durazno', 'kiwi', 'melón', 'sandía', 'uvas', 'papaya', 'tomate', 'frutilla', 'arándanos', 'palta', 'naranja', 'ciruela', 'higo'];
    contenidoFrutasAlergicos = frutas.filter ((item) => item !== alergico.value);
    console.log(contenidoFrutasAlergicos)
}

let granos;
let contenidoGranosAlergicos;
function filtrarGranos() {
    granos = ['pan integral', 'arroz integral', 'cebada', 'avena', 'fideos integrales', 'mijo', 'trigo'];
    contenidoGranosAlergicos = granos.filter ((item) => item !== alergico.value);
    tipoPlan != 'Celíaco' && console.log(contenidoGranosAlergicos)
}

//INAUGURAMOS THE FITROMA SHOP --------------------------------------------------------------
let aux = '';

async function obtenerProductos() {
    const response = await fetch('./productos.json');
    const productosJson = await response.json();

    for (let i = 0; i < productosJson.length; i++) {
        aux += `
        <div class="card col-lg-2 col-md-2 col-sm-2 col-xs-2" style="width: 18rem;">
        <img src="${productosJson[i].img}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${productosJson[i].producto}</h5>
        <p class="card-text">${productosJson[i].categoria}</p>
        <p>${productosJson[i].precio}</p>
        <a onclick="agregarCarritoDos({producto: '${productosJson[i].producto}', nombre: '${productosJson[i].categoria}', precio: '${productosJson[i].precio}'})" href="#" class="btn btn-primary">Add to cart</a>
        </div>
        </div>
        `
    }
    document.getElementById('FitRomaShop').innerHTML = aux;
}
obtenerProductos();

/* function agregarCarritoDos(objetoProducto) {
    carrito.push(objetoProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito)
} */

// Totales -------------------------------------------------
let subtotal;
let subtotales = [];
let total;
let totalCarrito = document.getElementById('totalCarrito');
function calcularTotal(){
    for(let i = 0; i < carrito.length; i++){ 
        subtotal = carrito[i].cantidadPlan * carrito[i].precioPlan;
    }
    subtotales.push(subtotal);
    console.log(`subtotal: ${subtotal}`);

    total = 0;
    for (let i = 0; i < subtotales.length; i++) {
    total += subtotales[i];
    }
    console.log(`total: ${total}`);
    totalCarrito.innerText = `${total}`;
}

// Código de descuento ----------------------------------------
let ingresarCodigo = document.getElementById('ingresarCodigo');
let inputCodigo = document.getElementById('inputCodigo');

ingresarCodigo.addEventListener('click',()=>{
    inputCodigo.innerHTML = `
    <form id="validarCodigo">
    <input id="codigo" placeholder="PROMO CODE">
    <button class="btn btn-dark">APPLY</button>
    </form>
    `
    let validarCodigo = document.getElementById('validarCodigo');
    let codigo = document.getElementById('codigo')
    let valido = document.getElementById('valido');
    validarCodigo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (codigo.value == 'rominaweb' || codigo.value == 'romiweb' || codigo.value == 'ROMINAWEB' || codigo.value == 'ROMIWEB') {
        codigo.style.border = "3px solid rgb(24, 225, 68)"
        valido.innerHTML = `
        <h6 style= "color: rgb(24, 225, 68)">Discount code applied!</h6>
        `
    } else{
        codigo.style.border = "3px solid red"
        valido.innerHTML = `
        <h6 style= "color:red">Discount code is not valid!</h6>
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
    console.log(`NOMBRE: ${nombreContacto.value} EMAIL: ${email.value} MENSAJE: ${mensaje.value}`);
    contacto.reset()
})
