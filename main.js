let usuariosIngresados = 0;
let notaAprobacion = 0;
let total = 0;

const Alumnos = [];

class Alumno{
    constructor(arrId, Id,Nombre,Apellido,Nota) {
        this.arrId = arrId;
        this.id = Id;
        this.nombre = Nombre;
        this.apellido = Apellido;
        this.nota = Nota;
        this.aprobado = false;
    }

    aprobacion(){
        console.log(this.nota >= notaAprobacion);
        if (this.nota >= notaAprobacion) {
            this.aprobado = true;
        }
    }

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

function actualizarNotaAprobacion(cantidad) {
    notaAprobacion = cantidad;
    console.log("Nota de aprobación: " + notaAprobacion);
}

function actualizarUsuariosIngresados(cantidad) {
    usuariosIngresados = cantidad;
    console.log("Cantidad de alumnos ingresados: " + usuariosIngresados);
}

let suma = operacion("+");
let promediar = operacion("/");

function init() {

    DivFormulario.innerHTML = `
    <form id="formPrincipal" class="my-3">
        <div class="form-floating my-3">
            <input type="number" class="form-control" id="floatNota" placeholder="Nota de aprobación" min=1 required>
            <label for="floatNota">Nota de aprobación</label>
        </div>

        <div class="form-floating my-3">
            <input type="number" class="form-control" id="floatUsuario" placeholder="Canitdad de alumnos" min=1 required>
            <label for="floatUsuario">Cantidad de alumnos</label>
        </div>
    
        <button type="submit" class="btn btn-primary">Enviar</button>
    </form>`;

    let formularioPrincipal = document.getElementById("formPrincipal");

    formularioPrincipal.addEventListener("submit", (e) => {
        e.preventDefault();
        let confirmacion = confirm("La nota de aprobación es " + e.target.children[0].children[0].value + " y la cantidad de alumnos es de "+ e.target.children[1].children[0].value + "?")
        if (confirmacion){
            actualizarNotaAprobacion(parseFloat(e.target.children[0].children[0].value));
            actualizarUsuariosIngresados(parseFloat(e.target.children[1].children[0].value));
            datosAlumnos(parseFloat(e.target.children[1].children[0].value));
        }
    });

}

function datosAlumnos(cantidad){
    DivFormulario.innerHTML = `<form id="formAlumno" class="my-3"></form>`;

    let padreAlumnos = document.getElementById("formAlumno");

    for (i=1; i <= cantidad; i++){
        let div = document.createElement("div");
        console.log("Impresión formulario alumno:" + i);
        div.innerHTML = `
        <h3>Datos Alumno N°${i}</h3>
        <div class="form-floating my-3">
            <input type="text" class="form-control" id="floatNombre" placeholder="Nombre" required>
            <label for="floatNombre">Nombre</label>
        </div>

        <div class="form-floating my-3">
            <input type="text" class="form-control" id="floatApellido" placeholder="Apellido" required>
            <label for="floatApellido">Apellido</label>
        </div>

        <div class="form-floating my-3">
            <input type="number" class="form-control" id="floatNota" placeholder="Nota" min=1 required>
            <label for="floatUsuario">Nota</label>
        </div>`;
        padreAlumnos.appendChild(div);
    }

    let div = document.createElement("div");
    div.innerHTML = `<button type="submit" class="btn btn-primary">Enviar</button>`
    padreAlumnos.appendChild(div);

    let formularioAlumno = document.getElementById("formAlumno");

    let forArray = cantidad - 1
    formularioAlumno.addEventListener("submit", (e) => {
        e.preventDefault();
        for (i=0; i <= forArray; i++){
            let nombreAlumno = e.target.children[i].children[1].children[0].value;
            let apellidoAlumno = e.target.children[i].children[2].children[0].value;
            let notaAlumno = e.target.children[i].children[3].children[0].value;
            console.log(`Generando alumno ${i}:\n   - Nombre: ${nombreAlumno} \n   - Apellido: ${apellidoAlumno}\n   - Nota: ${notaAlumno}`);
            Alumnos.push(new Alumno(i,(i+1),nombreAlumno,apellidoAlumno,notaAlumno));
        }
        tablaResultados();
    });
}

function tablaResultados(){
    DivFormulario.innerHTML = ``;

    let aprobacion = document.createElement("p");
    aprobacion.innerHTML = `<h3 class="my-3" >Nota de aprobación: ${notaAprobacion}<h3>`;
    padre.appendChild(aprobacion);

    let tabla = document.createElement('div');
    tabla.innerHTML = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">Nota</th><th scope="col">Aprobado</th></tr></thead><tbody id="alumnos"></tbody></table>';
    padre.appendChild(tabla);

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

    promedio = promediar(total,usuariosIngresados);

    let promedioFinal = document.createElement('div');
    promedioFinal.innerHTML = `<h5 class="my-3">Promedio general: ${promedio}<h5>`;
    padre.appendChild(promedioFinal);

}

const padre = document.getElementById("main");

let DivFormulario = document.createElement("div");
padre.appendChild(DivFormulario);

init();