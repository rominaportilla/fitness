// Calculadora Nutricional -----------------------------------------------------

const saludar = ()=> {
    alert('¡Bienvenido/a! :D Soy Roma, Nutrióloga y Entrenadora Personal.');
    nombre = prompt('¿Cómo te llamás?');
    alert(`¡Un placer, ${nombre}! <3 Vamos a armar un plan de entrenamiento y alimentación de acuerdo a tus objetivos.`);
    alert('Primero, vamos a calcular tu Tasa Metabólica Basal (TMB). Para esto, necesito los siguientes datos...');
}
saludar();


const pedirDatos = ()=> {
    genero = parseInt(prompt('Género al nacer:\n(1) Femenino\n(2) Masculino'));
    peso = parseInt(prompt('Peso en kilos:'));
    altura = parseInt(prompt('Altura en centímetros:'));
    edad = parseInt(prompt('Edad en años:'));
}
pedirDatos(); 


const calcularTMB = ()=> {
    let calculoPeso = 10 * peso;
    let calculoAltura = 6.25 * altura;
    let calculoEdad = 5 * edad;

    if (genero == 1){
        TMB = calculoPeso + calculoAltura - calculoEdad - 161;
        return TMB
    } else if(genero == 2){
        TMB = calculoPeso + calculoAltura - calculoEdad + 5;
        return TMB
    } else{
        alert('No se ingresaron correctamente los datos. Complete nuevamente los datos, por favor');
        pedirDatos();
    }
}
calcularTMB()
console.log(`TMB = ${TMB}`)


let actividadFisica;
do{
    actividadFisica = parseInt(prompt('¿Con qué frecuencia hacés actividad física?\n\n (1) No hago ejercicio\n (2) Hago poco, de 1 a 3 veces por semana\n (3) Hago moderado, de 3 a 5 días\n (4) Hago deporte intenso, 6 o 7 veces por semana\n (5) Soy un atleta profesional con dos entrenamientos diarios'));

    switch(actividadFisica){
        case 1: 
            calorias = TMB * 1.2;
            break;
        case 2: 
            calorias = TMB * 1.375;
            break;
        case 3:
            calorias = TMB * 1.55;
            break;
        case 4:
            calorias = TMB * 1.75;
            break;
        case 5:
            calorias = TMB * 1.9;
            break;
        default:
            alert("Necesito saber con cuánta frecuencia hace ejercicio, por favor");
    }
} while(actividadFisica > 5)
console.log(`Calorías de mantenimiento = ${calorias}`);



let calcular = prompt('¿Qué te gustaría calcular?\n\n(1) Mi déficit calórico\n(2) Mi superávit calórico\n(3) Mi mantenimiento');

const deficitCalorico = (calorias)=> calorias - 500; 
const superavitCalorico = (calorias)=> calorias + 500; 
const mantenimiento = calorias;

let totalCalorias;

if (calcular == 1){
    totalCalorias = deficitCalorico(calorias);
    console.log(`Déficit calórico = ${totalCalorias}`);
    alert(`${nombre}, para hacer déficit calórico tenés que consumir aproximadamente ${totalCalorias} calorías al día.`);
} else if (calcular == 2){
    totalCalorias = superavitCalorico(calorias);
    console.log(`Superávit calórico = ${totalCalorias}`);
    alert(`${nombre}, para hacer superávit calórico tenés que consumir aproximadamente ${totalCalorias} calorías al día. `);
} else if (calcular == 3){
    totalCalorias = calorias;
    console.log(`Mantenimiento = ${totalCalorias}`);
    alert(`${nombre}, para mantenerte tenés que consumir aproximadamente ${totalCalorias} calorías al día.`)
}else{
    alert('Ingrese 1 para saber su déficit calórico, ingrese 2 para saber su superávit calórico, o ingrese 3 pasar saber su mantenimiento, por favor');
}

//Planes de Alimentación -----------------------------------------------------

let objetivoPlan;

if (calcular == 1){
    objetivoPlan = 'Pérdida de grasa corporal';
} else if (calcular == 2){
    objetivoPlan = 'Aumento de masa muscular';
} else{
    objetivoPlan = 'Recomposición corporal';
}

class PlanAlimenticio{
    constructor(objetivoPlan, totalCalorias, precioPlan){
        this.objetivoPlan = objetivoPlan.toUpperCase();
        this.caloriasPlan = totalCalorias;
        this.precioPlan = precioPlan;
    }
    mostrarContenidoPlan(){
        console.log(`Plan Alimenticio enfocado en ${this.objetivoPlan}. Precio: ${this.precioPlan}`)
    }
}

const planDeficit = new PlanAlimenticio (objetivoPlan, totalCalorias, 2500);
const planSuperavit = new PlanAlimenticio (objetivoPlan, totalCalorias, 9500);
const planMantenimiento = new PlanAlimenticio (objetivoPlan, totalCalorias, 800);


const personalizarPlan = () =>{

    alert('¡Vamos a adaptar tu plan nutricional a tu estilo de vida! Responda las siguientes preguntas, por favor.')
    let proteinas = [
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
        {alimento: 'seitan', proteina: 'vegetal', sinTacc: false},
        {alimento: 'pistachos', proteina: 'vegetal', sinTacc: true},
        {alimento: 'garbanzos', proteina: 'vegetal', sinTacc: true},
        {alimento: 'carne magra de cerdo', proteina: 'animal', sinTacc: true},
        {alimento: 'morcilla', proteina: 'animal', sinTacc: false},
        {alimento: 'salmón', proteina: 'animal', sinTacc: true},
        {alimento: 'merluza', proteina: 'animal', sinTacc: true}];
        
    let lacteos = ['leche', 'manteca', 'yogur', 'crema de leche', 'queso', 'dulce de leche'];
    let verduras = ['berenjena', 'zucchini', 'limón', 'zapallo', 'calabaza', 'lechuga', 'cebolla', 'morrón', 'zanahoria', 'pepino', 'acelga', 'espinaca', 'choclo', 'repollo'];
    let frutas = ['banana', 'manzana', 'pera', 'durazno', 'kiwi', 'melón', 'sandía', 'uvas', 'papaya', 'tomate', 'frutilla', 'arándanos', 'palta', 'naranja', 'ciruela', 'higo'];
    let granos = ['pan integral', 'arroz integral', 'cebada', 'avena', 'fideos integrales', 'mijo', 'trigo'];
    
    // APTO VEGANOS
    let vegano = parseInt(prompt('¿Sos vegano/a?\n\n(1) SI\n(2) NO'));
    if (vegano == 1){
    let proteinasVegetales = proteinas.filter((item)=> item.proteina == 'vegetal' );
    let contenidoAlimentosProteicos = proteinasVegetales.map((item) => item.alimento);
    let contenidoAlimentosLacteos = lacteos.toString();
    let contenidoVerduras = verduras.toString();
    let contenidoFrutas = frutas.toString();
    let contenidoGranos = granos.toString();
    console.log(`[Contenido Alimentos Plan Nutricional APTO VEGANOS] PROTEÍNAS: ${contenidoAlimentosProteicos}. LÁCTEOS (versión vegetal): ${contenidoAlimentosLacteos}. VERDURAS: ${contenidoVerduras}. FRUTAS: ${contenidoFrutas}. GRANOS: ${contenidoGranos}.`)
    } else{
        let contenidoAlimentosProteicos = proteinas.map((item) => item.alimento);
        let contenidoAlimentosLacteos = lacteos.toString();
        let contenidoVerduras = verduras.toString();
        let contenidoFrutas = frutas.toString();
        let contenidoGranos = granos.toString();
        console.log(`[Contenido Alimentos Plan Nutricional] PROTEÍNAS: ${contenidoAlimentosProteicos}. LÁCTEOS: ${contenidoAlimentosLacteos}. VERDURAS: ${contenidoVerduras}. FRUTAS: ${contenidoFrutas}. GRANOS: ${contenidoGranos}.`)
    }

    // APTO CELÍACOS
    let celiaco = parseInt(prompt('¿Sos celíaco/a? \n\n(1) SI\n(2) NO'));
    if (celiaco == 1){
    let glutenFree = proteinas.filter((item)=> item.sinTacc == true);
    let contenidoAlimentosGlutenFree = glutenFree.map((item) => item.alimento);
    let contenidoAlimentosLacteos = lacteos.toString();
    let contenidoVerduras = verduras.toString();
    let contenidoFrutas = frutas.toString();
    console.log(`[Contenido Alimentos Plan Nutricional APTO CELÍACOS] PROTEÍNAS: ${contenidoAlimentosGlutenFree}. LÁCTEOS: ${contenidoAlimentosLacteos}. VERDURAS: ${contenidoVerduras}. FRUTAS: ${contenidoFrutas}.`)
    }else{
        let contenidoAlimentosProteicos = proteinas.map((item) => item.alimento);
        let contenidoAlimentosLacteos = lacteos.toString();
        let contenidoVerduras = verduras.toString();
        let contenidoFrutas = frutas.toString();
        let contenidoGranos = granos.toString();
        console.log(`[Contenido Alimentos Plan Nutricional] PROTEÍNAS: ${contenidoAlimentosProteicos}. LÁCTEOS: ${contenidoAlimentosLacteos}. VERDURAS: ${contenidoVerduras}. FRUTAS: ${contenidoFrutas}. GRANOS: ${contenidoGranos}.`)
    }

    //APTO ALÉRGICOS
    let alergico = prompt('¿Sos alérgico/a a algún alimento?');
    let noAlergiaProteinas = proteinas.some((item) => item.alimento == alergico);
    let noAlergiaLacteos = lacteos.some((item) => item == alergico);
    let noAlergiaVerduras = verduras.some((item) => item == alergico);
    let noAlergiaFrutas = frutas.some((item) => item == alergico);
    let noAlergiaGranos = granos.some((item) => item == alergico);
    while (noAlergiaProteinas == false && noAlergiaLacteos == false && noAlergiaVerduras == false && noAlergiaFrutas == false && noAlergiaGranos == false){
    alert('¡Genial!')
    break
    }
    let contenidoProteinaAlergicos = proteinas.filter ((item) => item.alimento !== alergico);
    let contenidoLactosAlergicos = lacteos.filter ((item) => item !== alergico);
    let contenidoVerdurasAlergicos = verduras.filter ((item) => item !== alergico);
    let contenidoFrutasAlergicos = frutas.filter ((item) => item !== alergico);
    let contenidoGranosAlergicos = granos.filter ((item) => item !== alergico);

    console.log(contenidoProteinaAlergicos)
    console.log(contenidoLactosAlergicos)
    console.log(contenidoVerdurasAlergicos)
    console.log(contenidoFrutasAlergicos)
    console.log(contenidoGranosAlergicos)
    alert(`¡Listo ${nombre}! Te enviaremos tu Plan Alimenticio por email. `)
}

// Realizar compra
let carrito = [];

if (objetivoPlan == 'Pérdida de grasa corporal'){
    planDeficit.mostrarContenidoPlan();
    comprarDeficit = parseInt(prompt('Comprar\nPlan Alimenticio: Pérdida de grasa corporal\n(1) Si\n(2) No'));
    if (comprarDeficit == 1){
        carrito.push({producto: 'Plan Alimenticio Déficit Calórico', precio: '$2500'});
        console.log(carrito)
        personalizarPlan()
    }
} else if (objetivoPlan == 'Aumento de masa muscular'){
    planSuperavit.mostrarContenidoPlan();
    comprarSuperavit = parseInt(prompt('Comprar\nPlan Alimenticio: Aumento de Masa Muscular\n(1) Si\n(2) No'));
    if (comprarSuperavit == 1){
        carrito.push({producto:'Plan Alimenticio Superávit Calórico', precio: '$9500'});
        console.log(carrito)
        personalizarPlan()
    }
} else{
    planMantenimiento.mostrarContenidoPlan()
    comprarMantenimiento = parseInt(prompt('Comprar\nPlan Alimenticio: Recomposición corporal\n(1) Si\n(2) No'));
    if (comprarMantenimiento == 1){
        carrito.push({producto:'Plan Alimenticio Recomposición Corporal', precio:'$800'});
        console.log(carrito)
        personalizarPlan()
    } 
}
