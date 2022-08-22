// Saludo ----------------------------------------------------------------------------------------------
let nombreForm = document.getElementById('nombreForm');
let nombreInput = document.getElementById('nombreInput');
let nombre = document.getElementById('nombre');

let modalSaludo = () =>{
    let modalSaludoBoton = document.getElementById('modalSaludoBoton');
    modalSaludoBoton.click();
}
nombreForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let nombre2 = `${nombreInput.value}, `; 
    let letras = nombre2.length + 4;
    nombreInput != '' && (nombre.innerHTML = `
    ${nombre2} <span class="maquinaLetras">&#160;</span>

    <style>
    .maquinaLetras{
        position: absolute;
        right: 0;
        width: 0;
        background-color: #eeeeee;
        border-left: 2px solid black;
        animation: maquina 4s infinite alternate steps(${letras});
    }
    </style>`
    );
})

// Calculadora Nutricional ------------------------------------------------------------------------------
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

//Funciones carrito ------------------------------------------------------------------------------------------
let carritoPlanesLocalStorage = localStorage.getItem('carritoPlanes');
let carritoProductosLocalStorage = localStorage.getItem('carritoProductos');
let carritoPlanes;
let carritoProductos;
let divCarritoPlanes = document.getElementById('div-carritoPlanes');
let divCarritoProductos = document.getElementById('div-carritoProductos');

if (!carritoPlanesLocalStorage) {
    carritoPlanes = [];
} else {
    carritoPlanes = JSON.parse(carritoPlanesLocalStorage);
    pintarCarritoPlanes();
}

if (!carritoProductosLocalStorage) {
    carritoProductos = [];
} else {
    carritoProductos = JSON.parse(carritoProductosLocalStorage);
    pintarCarritoProductos();
}

function pintarCarritoPlanes() {
    let plan = '';
    for (let i = 0; i < carritoPlanes.length; i++) {
        plan += `
        <div class="carritoItem">
        <h6>${carritoPlanes[i].nombrePlan}</h6>
        <p>${carritoPlanes[i].objetivoPlan}</p>
        <p>${carritoPlanes[i].tipoPlan}</p>
        <p class="precioCarritoProducto">${carritoPlanes[i].precioPlan}</p>
        <input class="cantidadCarritoProducto" onchange="cantidadChanged(event)" type="number" value="1">
        <button onclick="eliminarCarritoPlanes(${i})" style="cursor:pointer" class="btn btn-danger" type="button">X</button>
        </div>
        `
    }
    divCarritoPlanes.innerHTML = plan;
}

function eliminarCarritoPlanes(item) {
    carritoPlanes.splice(item, 1);
    localStorage.setItem('carritoPlanes', JSON.stringify(carritoPlanes));
    pintarCarritoPlanes();
    calcularTotal()
}

function agregarCarritoProductos(objetoProducto) {
    let inputCantidad = divCarritoProductos.getElementsByClassName('cantidadCarritoProducto');
    for (let i = 0; i < carritoProductos.length; i++) {
        if (carritoProductos[i].producto === objetoProducto.producto) {
            //carritoProductos[i].cantidad++;
            let valorInputCantidad = inputCantidad[i];
            valorInputCantidad.value++;
            agregado();
            calcularTotal();
            return
        }
    }
    carritoProductos.push(objetoProducto);
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    pintarCarritoProductos();
    agregado();
    //let carritoItem = document.querySelector('.carritoItem');
    //carritoItem.querySelector('.cantidadCarritoProducto').addEventListener('change', cantidadChanged);
    calcularTotal()
}

function cantidadChanged(event) {
    const input = event.target;
    if (input.value <= 0) {
        input.value = 1;
    }
    calcularTotal();
}

function pintarCarritoProductos() {
    let producto = "";
    for (let i = 0; i < carritoProductos.length; i++) {
        producto += `
                <div class="carritoItem">
                <h5>${carritoProductos[i].producto}</h5>
                <p>${carritoProductos[i].categoria}</p>
                <p class="precioCarritoProducto" >${carritoProductos[i].precio}</p>
                <input class="cantidadCarritoProducto" onchange="cantidadChanged(event)" type="number" value="1">
                <button onclick="eliminarCarritoProductos(${i})" style="cursor:pointer" class="btn btn-danger" type="button">X</button>
                </div>
                `;
    }
    divCarritoProductos.innerHTML = producto;
}

function eliminarCarritoProductos(item) {
    carritoProductos.splice(item, 1);
    //subtotales.splice(item, 1);
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    pintarCarritoProductos();
    calcularTotal()
    //actualizarTotal()
}
// Totales -------------------------------------------------------------------------------------------------
let total;
let subtotalProducto;
let subtotalPlan;
let subtotales = [];
let totalCarrito = document.querySelector('#totalCarrito');

function calcularTotal() {
    total = 0;
    let carritoCantidad;
    let cantidad = 0;
    let carritoItem = document.querySelectorAll('.carritoItem');
    carritoItem.forEach((item) => {
        let precioCarritoProducto = item.querySelector('.precioCarritoProducto');
        let valorPrecioCarritoProducto = Number(precioCarritoProducto.textContent);

        let cantidadCarritoProducto = item.querySelector('.cantidadCarritoProducto');
        let valorCantidadCarritoProducto = Number(cantidadCarritoProducto.value);
        
        cantidad = cantidad + valorCantidadCarritoProducto;
        total = total + valorPrecioCarritoProducto * valorCantidadCarritoProducto;
    });
    totalCarrito.innerHTML = `${total}$USD`
    carritoCantidad = `${cantidad}`
}

/* function actualizarTotal() {
    let valorInicial = 0;
    total = subtotales.reduce((valorAnterior, valorActual)=> valorAnterior + valorActual, valorInicial);
    totalCarrito.innerText = `${total}`
    console.log(total)
} */

// Código de descuento ------------------------------------------------------------------------------
let ingresarCodigo = document.getElementById('ingresarCodigo');
let inputCodigo = document.getElementById('inputCodigo');

ingresarCodigo.addEventListener('click',()=>{
    inputCodigo.innerHTML = `
    <form id="validarCodigo">
    <input id="codigo" placeholder="PROMO CODE">
    <button class="btn btn-dark botonApply">Apply</button>
    </form>
    `
    let validarCodigo = document.getElementById('validarCodigo');
    let codigo = document.getElementById('codigo')
    let valido = document.getElementById('valido');
    validarCodigo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (codigo.value == 'ROMIWEB' || codigo.value == 'romiweb' || codigo.value == 'ALETUTOR' || codigo.value == 'aletutor') {
        codigo.style.border = "3px solid rgb(24, 225, 68)"
        valido.innerHTML = `
        <h6 style= "color: rgb(24, 225, 68); font-family: 'Roboto Mono', monospace;">Discount code applied!</h6>
        `
        let porcentaje = total * 0.7;
        let descuento = total - porcentaje;
        totalCarrito.innerHTML = `
        <del>${total}</del>
        <p style= "color: rgb(24, 225, 68)" >$${descuento}USD</p>
        `;
    } else{
        codigo.style.border = "3px solid red"
        valido.innerHTML = `
        <h6 style= "color:red; font-family: 'Roboto Mono', monospace;">Discount code is not valid!</h6>
        `
    }
})})

function agregado() {
    Toastify({
        text: "Product successfully added to your shopping cart!💗",
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

let vaciarButton = document.querySelector('.vaciarButton');
vaciarButton.addEventListener('click', ()=>{
    divCarritoPlanes.innerHTML = '';
    divCarritoProductos.innerHTML = '';
    carritoPlanes = [];
    carritoProductos = [];
    localStorage.setItem('carritoPlanes', JSON.stringify(carritoPlanes));
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    calcularTotal();
    inputCodigo.innerHTML ='';
    valido.innerHTML =''
});

let comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', ()=>{
    divCarritoPlanes.innerHTML = '';
    divCarritoProductos.innerHTML = '';
    carritoPlanes = [];
    carritoProductos = [];
    localStorage.setItem('carritoPlanes', JSON.stringify(carritoPlanes));
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    calcularTotal();
    inputCodigo.innerHTML =''
    valido.innerHTML =''
});

//Planes de Alimentación y Entrenamiento ------------------------------------------------------------------------
let nuevoPlan;
let detallesPlanAlimenticio = document.getElementById('detallesPlanAlimenticio');
let detallesPlanEntrenamiento = document.getElementById('detallesPlanEntrenamiento');
let objetivoPlan;
let tipoPlan;
let alergico = document.getElementById('alergico');

class Plan{
    constructor(nombrePlan, objetivoPlan, tipoPlan, precioPlan){
        this.nombrePlan = nombrePlan;
        this.objetivoPlan = objetivoPlan;
        this.tipoPlan = tipoPlan;
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

detallesPlanAlimenticio.addEventListener('submit', (event)=>{
    event.preventDefault();
    seleccionarObjetivoPlan();
    seleccionarTipoPlanAlimenticio();
    nuevoPlan = new Plan('NUTRITION PROGRAM', objetivoPlan, tipoPlan, 25)
    if (objetivoPlan !=undefined && tipoPlan !=undefined) {
        carritoPlanes.push(nuevoPlan);
        localStorage.setItem('carritoPlanes', JSON.stringify(carritoPlanes));
        pintarCarritoPlanes();
        calcularTotal();
        filtrarProteinas();
        filtrarLacteos();
        filtrarVerduras();
        filtrarFrutas();
        filtrarGranos();
        agregado();
        detallesPlanAlimenticio.reset();
        console.log(carritoPlanes)
    } else{
        error();
    }
})

detallesPlanEntrenamiento.addEventListener('submit', (e)=>{
    e.preventDefault();
    seleccionarObjetivoPlan();
    seleccionarTipoPlanEntrenamiento();
    nuevoPlan = new Plan('WORKOUT PROGRAM', objetivoPlan, tipoPlan, 23)
    if (objetivoPlan !=undefined && tipoPlan !=undefined) {
        carritoPlanes.push(nuevoPlan);
        localStorage.setItem('carritoPlanes', JSON.stringify(carritoPlanes));
        pintarCarritoPlanes();
        calcularTotal();
        agregado();
        detallesPlanEntrenamiento.reset();
        console.log(carritoPlanes)
    } else{
        error();
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
