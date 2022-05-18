console.log("Promedio de alumnos");

let total = 0;
let promedio = 0;

function calculo(a,signo,b){
    switch (signo) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return false;
    }
}

function chequeoNota(i){
    let nota = prompt("Ingrese la nota del " + i + " Alumno");
    while (isNaN(parseInt(nota))) {
        alert("Usted ingreso un nota invalida, se esperaba un numero");
        if (nota == null || nota == "" ){
            let confirmacion = prompt("Ingreso una nota vacia, se computara como 0, desea continuar? (si/no)");
            if (confirmacion === "si"){
                total = calculo(parseInt(total),"+",0);
                break;
            } else {
                nota = prompt("Ingrese la nota del " + i + " Alumno");
            }
        }
    }
    if ( nota >= promedioAprobacion ){
        console.log("Alumno "+ i +": Aprobado, nota: "+ nota);
    } else {
        console.log("Alumno "+ i +": Desaprobado, nota: "+ nota);
    }
    total = calculo(parseInt(total),"+",parseInt(nota));
}

function obtenerPromedio(total,alumnos){
    let obtenerPromedio = calculo(parseInt(total),"/",parseInt(alumnos));
    console.log("ObtenerPrimedio = "+ obtenerPromedio);
    return obtenerPromedio
}

let promedioAprobacion = prompt("Ingrese un promedio de aprobación");

if (promedioAprobacion == null || promedioAprobacion == ""){
    alert("Se recibio una entrada invalida, se procede a setear con 7");
    promedioAprobacion = 7;
} else if (isNaN(promedioAprobacion)){
    alert("Se recibio una entrada invalida, se procede a setear con 7");
    promedioAprobacion = 7;
}

console.log("Promedio de aprobación: "+ promedioAprobacion);

while (true){
    let alumnosIngresados = prompt("Cuandos alumnos son en la clase?");

    if (alumnosIngresados == null || alumnosIngresados == "") {
        alert("Ingreso un valor invalido, recargue el explorador");
        break;
    }

    while (isNaN(parseInt(alumnosIngresados))){
        alert("Ingrese un numero");
        alumnosIngresados = parseInt(prompt("Cuandos alumnos son en la clase?"));
    }

    for (i=1; i <= alumnosIngresados; i++){
        chequeoNota(i);
    }

    let promedioFinal = obtenerPromedio(total,alumnosIngresados);

    if ( promedioFinal >= promedioAprobacion ){
        alert("El promedio final es "+ promedioFinal + ", Felicidades el promedio es de aprobación");
        break;
    } else {
        alert("El promedio final es "+ promedioFinal + ", Demonios el promedio es de desaprobación");
        break;
    }

}

console.log("Fin del script");