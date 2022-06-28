console.log("Crear un algoritmo con un condicional");

alert("¡Hola! :D Soy Roma, Nutrióloga y Entrenadora Personal.");

let nombre;

nombre = prompt("¿Cómo te llamás?");

alert(
    "¡Un placer, " +
    nombre +
    "! <3 Vamos a armar un plan de entrenamiento y alimentación de acuerdo a tus objetivos. Necesito los siguientes datos..."
);

let genero = prompt("genero al nacer:");

let peso = parseInt(prompt("peso en kilos:"));

let altura = parseInt(prompt("altura en centímetros:"));

let edad = parseInt(prompt("edad en años:"));

let calculoPeso = 10 * peso;
let calculoAltura = 6.25 * altura;
let calculoEdad = 5 * edad; 

let TMB; 

if (genero == "mujer" || genero == "MUJER") {
    TMB = calculoPeso + calculoAltura - calculoEdad - 161;
    console.log("TMB = " + TMB);
} else if (genero == "hombre" || genero == "HOMBRE") {
    TMB = calculoPeso + calculoAltura - calculoEdad + 5;
    console.log("TMB = " + TMB);
}

let actividadFisica = prompt(
    "¿Con qué frecuencia hacés ejercicio? (1)No hago ejercicio (2)Hago poco, de 1 a 3 veces por semana (3)Hago moderado, de 3 a 5 días (4)Hago deporte intenso, 6 o 7 veces por semana (5)Soy un atleta profesional con dos entrenamientos diarios"
);

if (actividadFisica == 1){
    calorias = TMB * 1.2;
} else if (actividadFisica == 2){
    calorias = TMB * 1.375;
} else if (actividadFisica == 3){
    calorias = TMB * 1.55;
} else if (actividadFisica == 4){
    calorias = TMB * 1.75;
}else if (actividadFisica == 5){
    calorias = TMB * 1.9;
} else {
    alert("Necesito saber con cuánta frecuencia hace ejercicio, por favor")
};

let calcular = prompt(
    "¿Qué te gustaría calcular?  (1)Mi déficit calórico (2)Mi superávit calórico"
);

if (calcular == 1){
    let resultadoFinal = calorias - 500;
    alert("Para hacer déficit calórico tenés que consumir aproximadamente " + resultadoFinal + " calorías al día");
} else if (calcular == 2){
    let resultadoFinal = calorias + 500;
    alert("Para hacer superávit calórico tenés que consumir aproximadamente " + resultadoFinal + " calorías al día");
} else{
    alert("Ingrese 1 para saber su déficit calórico o ingrese 2 para saber su superávit calórico, por favor")
}

//-------------------------------------------------------------------

console.log("Crear un algoritmo utilizando un ciclo");

let ejercicio = 0;

while( ejercicio < 10){
    ejercicio++;
    console.log(ejercicio);
}

let numeroIngresado = parseInt(prompt("Tabla de multiplicar. Ingrese un numero:"));

for(let i = 1; i <= 10; i++ ){
    console.log(numeroIngresado + "x" + i + " = " + numeroIngresado * i);
}
