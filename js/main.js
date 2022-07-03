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



let calcular = prompt('¿Qué te gustaría calcular?\n\n(1) Mi déficit calórico\n(2) Mi superávit calórico');

const deficitCalorico = (calorias)=> calorias - 500; 
const superavitCalorico = (calorias)=> calorias + 500; 

if (calcular == 1){
    const totalCalorias = deficitCalorico(calorias);
    console.log(`Déficit calórico = ${totalCalorias}`);
    alert(`${nombre}, para hacer déficit calórico tenés que consumir aproximadamente ${totalCalorias} calorías al día.`);
} else if (calcular == 2){
    const totalCalorias = superavitCalorico(calorias);
    console.log(`Superávit calórico = ${totalCalorias}`);
    alert(`${nombre}, para hacer superávit calórico tenés que consumir aproximadamente ${totalCalorias} calorías al día. `);
} else{
    alert('Ingrese 1 para saber su déficit calórico o ingrese 2 para saber su superávit calórico, por favor');
}

