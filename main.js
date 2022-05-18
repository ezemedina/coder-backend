console.log("Promedio de alumnos");

let total = 0;
let promedio = 0;

const Alumnos = [];

let promedioAprobacion = prompt("Ingrese un promedio de aprobación");

if (promedioAprobacion == null || promedioAprobacion == ""){
    alert("Se recibio una entrada invalida, se procede a setear con 7");
    promedioAprobacion = 7;
} else if (isNaN(promedioAprobacion)){
    alert("Se recibio una entrada invalida, se procede a setear con 7");
    promedioAprobacion = 7;
}

console.log("Promedio de aprobación: "+ promedioAprobacion);

class Alumno{
    constructor(Nombre, Apellido,Nota) {
        this.nombre = Nombre;
        this.apellido = Apellido;
        this.nota = Nota;
        this.aprobado = false;
    }

    aprobacion(){
        if (this.nota >= promedioAprobacion) {
            this.aprobado = true;
        }
    }

}

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


function datosAlumno(i){
    i = i + 1;
    let nombreAlumno = prompt("Ingrese el nombre del " + i + " Alumno");
    while (nombreAlumno == null || nombreAlumno == ""){
        nombreAlumno = prompt("Ingrese el nombre del " + i + " Alumno");
    }
    let apellidoAlumno = prompt("Ingrese el apellido del " + i + " Alumno");
    while (apellidoAlumno == null || apellidoAlumno == ""){
        apellidoAlumno = prompt("Ingrese el apellido del " + i + " Alumno");
    }
    let nombreCompleto = prompt("Se Ingresaron los siguientes datos\n- Nombre: "+ nombreAlumno +"\n- Apellido: " + apellidoAlumno + "\n\nEs correcto? (si/no)");
    while (nombreCompleto != 'si'){
        nombreAlumno = prompt("Ingrese el nombre del " + i + " Alumno");
        apellidoAlumno = prompt("Ingrese el apellido del " + i + " Alumno");
        nombreCompleto = prompt("Se Ingresaron los siguientes datos\n- Nombre: "+ nombreAlumno +"\n- Apellido: " + apellidoAlumno + "\n\nEs correcto? (si/no)");
    }
    let notaAlumno = parseFloat(prompt("Ingrese la nota de " + nombreAlumno + " " + apellidoAlumno + " Alumno"));
    while (isNaN(notaAlumno)) {
        alert("Usted ingreso un nota invalida, se esperaba un numero");
        if (notaAlumno == null || notaAlumno == "" ){
            let confirmacion = prompt("Ingreso una nota vacia, se computara como 0, desea continuar? (si/no)");
            if (confirmacion === "si"){
                notaAlumno = 0
                break;
            } else {
                notaAlumno = prompt("Ingrese la nota del Alumno " + nombreAlumno + " " + apellidoAlumno );
            }
        }
        notaAlumno = prompt("Ingrese la nota de " + nombreAlumno + " " + apellidoAlumno + " Alumno");
    }
    Alumnos.push(new Alumno(nombreAlumno,apellidoAlumno,notaAlumno));
}

function obtenerPromedio(total,alumnos){
    alumnos = alumnos + 1;
    let obtenerPromedio = calculo(parseFloat(total),"/",parseInt(alumnos));
    console.log("Obtener promedio: "+ obtenerPromedio);
    return obtenerPromedio
}

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

    alumnosIngresados = alumnosIngresados - 1;

    for (i=0; i <= alumnosIngresados; i++){
        datosAlumno(i);
    }

    for (const alumno of Alumnos) {
        alumno.aprobacion();
        console.log("Revisando nota de "+ alumno.nombre + " " + alumno.apellido + ", Nota: "+ alumno.nota + ", Estado: " + alumno.aprobado);
        total = calculo(parseFloat(alumno.nota),"+",total);
    }
    
    let promedioFinal = obtenerPromedio(total,alumnosIngresados);

    alert("Promedio final: "+ promedioFinal );

    break;
}
console.log("Fin del script");