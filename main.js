console.log("Promedio de alumnos");

let total = 0;
let promedio = 0;

const Alumnos = [];
const padre = document.getElementById("main");

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
    constructor(Id,Nombre,Apellido,Nota) {
        this.id = Id;
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

function dibujado(){

    let aprobacion = document.createElement("p");
    aprobacion.innerHTML = `<h3>Nota de aprobación: ${promedioAprobacion}<h3>`;
    padre.appendChild(aprobacion);

    let tabla = document.createElement('div');
    tabla.innerHTML = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">Nota</th><th scope="col">Aprobado</th></tr></thead><tbody id="alumnos"></tbody></table>';
    padre.appendChild(tabla);

}

function operacion(signo){
    switch (signo) {
        case "+":
            return (a, b) => a + b;
        case "-":
            return (a, b) => a - b;
        case "*":
            return (a, b) => a * b;
        case "/":
            return (a, b) => a / b;
        default:
            return false;
    }
}

let suma = operacion("+");
let promediar = operacion("/");


function datosAlumno(i){
    let id = i;
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
    Alumnos.push(new Alumno(id,nombreAlumno,apellidoAlumno,notaAlumno));
}

function obtenerPromedio(total,alumnos){
    alumnos = alumnos + 1;
    let obtenerPromedio = promediar(parseFloat(total),parseInt(alumnos));
    console.log("Obtener promedio: "+ obtenerPromedio);
    return obtenerPromedio
}

while (true){

    let alumnosIngresados = prompt("Cuandos alumnos son en la clase?");

    if (alumnosIngresados == null || alumnosIngresados == "") {
        let error = document.createElement("p");
        error.innerHTML = `<h1>📢 Recargue el explorador 📢</h1>`;
        padre.appendChild(error);
        break;
    }

    while (isNaN(parseInt(alumnosIngresados))){
        alert("Ingrese un numero");
        alumnosIngresados = parseInt(prompt("Cuandos alumnos son en la clase?"));
    }

    alumnosIngresados = alumnosIngresados - 1;

    dibujado();

    for (i=0; i <= alumnosIngresados; i++){
        datosAlumno(i);
    }

    let tablaPadre = document.getElementById("alumnos");

    for (const alumno of Alumnos) {
        alumno.aprobacion();
        console.log("Revisando el Id:" + alumno.id + ", Nombre:"+ alumno.nombre + " " + alumno.apellido + ", Nota: "+ alumno.nota + ", Estado: " + alumno.aprobado);
        total = suma(parseFloat(alumno.nota),total);
        let tr = document.createElement("tr");
        if (alumno.aprobado) {
            tr.innerHTML = `<th scope="row">${alumno.id}</th>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.nota}</td>
            <td>✅</td>`;
        } else {
            tr.innerHTML = `<th scope="row">${alumno.id}</th>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.nota}</td>
            <td>❌</td>`;
        }
        tablaPadre.appendChild(tr);
    }
    
    let promedioFinal = obtenerPromedio(total,alumnosIngresados);

    let impPromedio = document.createElement("p");
    impPromedio.innerHTML = `<h3>Promedio Final de la clase: ${promedioFinal}</h3>`;
    padre.appendChild(impPromedio);

    break;
}
console.log("Fin del script");