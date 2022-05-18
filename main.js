let notaAprobacion = 0;
let total = 0;
let cantidad = 0;
let cursoDictado = "";
let profesorCurso = "";
let usuarioPanel = "";

let Alumnos = [];

const formLogin = `
<div class="d-flex justify-content-center">
    <form id="ingresoSesion" class=" my-3 ">
        <h4 class="text-center">Inicio de sesión</h6>
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-person"></i></span>
            <input type="text" class="form-control" placeholder="Usuario" required>
        </div>
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-key-fill"></i></span>
            <input type="text" class="form-control" placeholder="Contraseña" required>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
</div>`;

const formLoginError = `
<div class="d-flex justify-content-center">
    <form id="ingresoSesion" class=" my-3 ">
        <h4 class="text-center">Inicio de sesión</h6>
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-person"></i></span>
            <input type="text" class="form-control" placeholder="Usuario" required>
        </div>
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-key-fill"></i></span>
            <input type="text" class="form-control" placeholder="Contraseña" required>
        </div>
        <div class="alert alert-danger" role="alert">
            Usuario o clave incorrecto
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
</div>`;

const mensajeErrorBusquedaAlumnos = `
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <i class="bi bi-exclamation-triangle-fill mx-1 link-warning"></i>
            <strong class="me-auto">Error de búsqueda</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Usted realizo una búsqueda no compatible o vacía.</br>
            Si quiere realizar la búsqueda por el alumno ingrese ej. Juan Perez.</br>
        </div>
    </div>
</div>`;

const mensajeErrorRegistros = `
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <i class="bi bi-exclamation-triangle-fill mx-1 link-warning"></i>
            <strong class="me-auto">Error de búsqueda</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Usted realizo una búsqueda no compatible o vacía.</br>
            Si quiere realizar la búsqueda de su hash ej. 1652231502018.</br>
            Si quiere realizar la búsqueda por el profesor ingrese ej. Juan Perez.</br>
        </div>
    </div>
</div>`;

const mensajeErrorBusquedaProfesor = `
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <i class="bi bi-exclamation-triangle-fill mx-1 link-warning"></i>
            <strong class="me-auto">Error de búsqueda</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Usted realizo una búsqueda no compatible o vacía.</br>
            Si quiere realizar la búsqueda por nota ingrese la nota ej. 8.</br>
            Si quiere buscar por nombre y apellido ingreselo ej. Juan Perez.</br>
        </div>
    </div>
</div>`;

const barraDeBusqueda = `
<div class="d-flex justify-content-end float-end pt-2">
    <form class="d-flex mx-2" id="busqueda">
        <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
    </form>
</div>`;

const formAlta = `
<div class="d-flex justify-content-center" >
    <form id="formPrincipal" style="width:600px;">
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-clipboard-fill"></i></span>
            <input type="text" class="form-control" placeholder="Curso" required>
            <div class="invalid-feedback">
              Ingrese un curso ej. Javascript
            </div>
        </div>
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-person"></i></span>
            <input type="text" class="form-control" placeholder="Profesor" required>
            <div class="invalid-feedback">
              Ingrese un nombre valido ej. Juan Perez
            </div>
        </div>
        <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-award"></i></span>
            <input type="number" class="form-control" placeholder="Nota de aprobación" min=1 required>
            <div class="invalid-feedback">
              Ingrese la nota de aprobación
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="button" class="btn btn-success" id="btnRegistros">Registros</button>
    </form>
</div>`

const tablaAlumnos = `
<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Nota</th>
            <th scope="col">Aprobado</th>
        </tr>
    </thead>
    <tbody id="alumnos">
    </tbody>
</table>`;

const tablaRegistros =`
<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Cantidad Alumnos</th>
            <th scope="col">Nota Aprobación</th>
            <th scope="col">Promedio General</th>
            <th scope="col">Curso</th>
            <th scope="col">Profesor</th>
            <th scope="col">Hash</th>
        </tr>
    </thead>
    <tbody id="alumnos"></tbody>
</table>`;

function tiggerToast(){
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
      return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show()) 
}

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

function actualizarCursoDictado(curso) {
    cursoDictado = curso;
    console.log("Curso ingresado: " + cursoDictado);
}

function actualizarProfesor(profesor) {
    profesorCurso = profesor;
    console.log("Profesor que dicta el curso: " + profesorCurso);
}

function limiparPantalla(){
    padre.innerHTML = '';
    DivFormulario = document.createElement("div");
    padre.appendChild(DivFormulario);
}

let suma = operacion("+");
let promediar = operacion("/");

function cerrarSesion() {
    const credenciales = [];
    sessionStorage.setItem("usuario", JSON.stringify(credenciales));
    usuarioPanel = "";
    login();
}

function chequeoOnline() {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (usuario === null) {
        return false;
    } else if (usuario === []){
        return false;
    } else if (usuario[0] === undefined) {
        return false;
    } else {
        usuarioPanel = usuario[0];
        return true;
    }
}

function chequeoDatos(usuario,clave){
    if (usuario === "admin" || clave === "admin") {
        const credenciales = [usuario,clave];
        sessionStorage.setItem("usuario", JSON.stringify(credenciales));
        usuarioPanel = usuario;
        init();
        return true;
    } else {
        return false;
    }
}

function login() {
    limiparPantalla();
    DivFormulario.innerHTML = formLogin
    let formLoginWeb = document.getElementById("ingresoSesion");

    formLoginWeb.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.target.children[2].children[1].value)
        if (chequeoDatos(e.target.children[1].children[1].value,e.target.children[2].children[1].value) === false){
            DivFormulario.innerHTML = formLoginError
        }
        
    });
}

function init() {
    if (chequeoOnline() === false){
        login();
    }
    Alumnos = [];
    total = 0;
    DivFormulario.innerHTML = `
    <div class="d-flex justify-content-end float-end pt-2">
        <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${usuarioPanel}
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
            </ul>
        </div>
    </div>
    <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Inicio</li>
        </ol>
    </nav>
    <h5 class="py-3" >Ingrese los datos para dar de alta un nuevo registro<h5>
    ${formAlta}`;

    let formularioPrincipal = document.getElementById("formPrincipal");

    formularioPrincipal.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.target.children[1].children[1].value)
        if (/^([a-zA-Z]+ [a-zA-Z]+)$/.test(e.target.children[1].children[1].value)){
            actualizarNotaAprobacion(parseInt(e.target.children[2].children[1].value));
            actualizarCursoDictado(e.target.children[0].children[1].value);
            actualizarProfesor(e.target.children[1].children[1].value);
            datosAlumnos(0);
        } else {
            e.target.children[1].children[1].value = "";
            formularioPrincipal.classList.add('was-validated')
        }
    });

    let btnRegistros = document.getElementById("btnRegistros");
    btnRegistros.addEventListener("click", (e) => {
        DivFormulario.innerHTML = ``;
        obtenerRegistros();
    });

    let btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", (e) => {
        DivFormulario.innerHTML = ``;
        cerrarSesion();
    });

}

function anadirAlumno(alumnoNro,datos){
    cantidad = alumnoNro +1;

    datos.innerHTML = `<h5 class="float-start">Nota de aprobación: ${notaAprobacion}</h5><h5 class="float-end">Cantidad de alumnos: ${cantidad}</h5></br></br>`;
    datos.innerHTML += `<h5 class="float-start">Curso: ${cursoDictado}</h5><h5 class="float-end">Profesor: ${profesorCurso}</h5></br>`;

    let padreDiv = document.getElementById("Alumnos");

    let div = document.createElement("div");
    console.log("Impresión formulario alumno:" + cantidad);
    div.innerHTML = `
    <h6 class="py-1" >Datos Alumno N°${cantidad}</h6>
    <div class="row g-2">
        <div class="col">
            <div class="input-group my-1">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-person"></i></span>
                <input type="text" class="form-control" placeholder="Nombre" required>
                <div class="invalid-feedback">
                  Ingrese el nombre ej. Juan
                </div>
            </div>
        </div>
        <div class="col">
            <div class="input-group my-1">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-person"></i></span>
                <input type="text" class="form-control" placeholder="Apellido" required>
                <div class="invalid-feedback">
                  Ingrese un apellido ej. Perez
                </div>
            </div>
        </div>
        <div class="col">
            <div class="input-group my-1">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-award"></i></span>
                <input type="number" class="form-control" placeholder="Nota " min=1 required>
                <div class="invalid-feedback">
                  Ingrese la nota
                </div>
            </div>
        </div>
    </div>`;
    padreDiv.appendChild(div);
}

function datosAlumnos(usuariosIngresados){
    if (chequeoOnline() === false){
        login();
    }
    cantidad = 0;
    DivFormulario.innerHTML = `
    <div class="d-flex justify-content-end float-end pt-2">
        <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${usuarioPanel}
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
            </ul>
        </div>
    </div>
    <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
            <li class="breadcrumb-item active" aria-current="page">Ingesta de datos</li>
        </ol>
    </nav>
    <form id="formAlumno" class="my-3 was-validated"></form>`;

    let padreAlumnos = document.getElementById("formAlumno");

    let p = document.createElement("p");
    p.innerHTML = `<h5 class="float-start">Nota de aprobación: ${notaAprobacion}</h5><h5 class="float-end">Cantidad de alumnos: ${usuariosIngresados}</h5></br></br>`;
    p.innerHTML += `<h5 class="float-start">Curso: ${cursoDictado}</h5><h5 class="float-end">Profesor: ${profesorCurso}</h5></br>`;
    padreAlumnos.appendChild(p);

    let divForm = document.createElement("div");
    divForm.innerHTML = `<div id=Alumnos></div>`;
    padreAlumnos.appendChild(divForm);

    let div = document.createElement("div");
    div.innerHTML = `<button type="button" class="btn btn-secondary my-3" id="btnAniadirAlumno">Añadir Alumno</button>
    <button type="submit" class="btn btn-primary my-3">Enviar</button>
    <button type="button" class="btn btn-danger my-3" id="atrasAlumno">Atras</button>`
    padreAlumnos.appendChild(div);

    let formularioAlumno = document.getElementById("formAlumno");

    formularioAlumno.addEventListener("submit", (e) => {
        e.preventDefault();
        for (i=0; i <= (cantidad-1); i++){
            console.log(e.target.children[1].children[0].children[i].children[1].children[1].children[0].children[1].value);
            let nombreAlumno = e.target.children[1].children[0].children[i].children[1].children[0].children[0].children[1].value;
            let apellidoAlumno = e.target.children[1].children[0].children[i].children[1].children[1].children[0].children[1].value;
            let notaAlumno = e.target.children[1].children[0].children[i].children[1].children[2].children[0].children[1].value;
            console.log(`Generando alumno ${(i+1)}:\n   - Nombre: ${nombreAlumno} \n   - Apellido: ${apellidoAlumno}\n   - Nota: ${notaAlumno}`);
            Alumnos.push(new Alumno(i,(i+1),nombreAlumno,apellidoAlumno,notaAlumno));
        }
        limiparPantalla();
        tablaResultados();
    });

    let btnAtras = document.getElementById("atrasAlumno");
    btnAtras.addEventListener("click", (e) => {
        limiparPantalla();
        init();
    });

    let btnAniadirAlumno = document.getElementById("btnAniadirAlumno");
    btnAniadirAlumno.addEventListener("click", (e) => {
        anadirAlumno(cantidad,p);
    });
    
    let vovlerInicio = document.getElementById("vovlerInicio");
    vovlerInicio.addEventListener("click", (e) => {
        limiparPantalla();
        init();
    });

    let btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", (e) => {
        DivFormulario.innerHTML = ``;
        cerrarSesion();
    });
}

function tablaResultados(){
    if (chequeoOnline() != true){
        login();
    }

    let fechaEpoch = Date.now();
    let fechaHumana = new Date(fechaEpoch);
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones)

    let aprobacion = document.createElement("p");
    aprobacion.innerHTML = `
    <div class="d-flex justify-content-end float-end pt-2">
        <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${usuarioPanel}
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
            </ul>
        </div>
    </div>
    <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
            <li class="breadcrumb-item">Ingesta de datos</li>
            <li class="breadcrumb-item active" aria-current="page">Reporte</li>
        </ol>
    </nav>
    <h5 class="float-start pt-3" >Nota de aprobación: ${notaAprobacion}</h5>
    <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>`;
    aprobacion.innerHTML += `<h5 class="float-start">Curso: ${cursoDictado}</h5><h5 class="float-end">Profesor: ${profesorCurso}</h5></br>`
    padre.appendChild(aprobacion);

    let tabla = document.createElement('div');
    tabla.innerHTML = tablaAlumnos;
    padre.appendChild(tabla);

    let tablaPadre = document.getElementById("alumnos");

    for (const alumno of Alumnos) {
        alumno.aprobacion();
        console.log("Revisando el Id:" + alumno.id + ", Nombre:"+ alumno.nombre + " " + alumno.apellido + ", Nota: "+ alumno.nota + ", Aprobado: " + alumno.aprobado);
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

    let promedio = promediar(total,cantidad).toFixed(2);;

    let promedioFinal = document.createElement('div');
    promedioFinal.innerHTML = `
    <h5 class="float-start my-3">Promedio general: ${promedio}<h5>
    <button type="button" class="btn btn-success float-end my-3" id="Inicio">Inicio</button>
    </br>`;
    padre.appendChild(promedioFinal);

    let hash = document.createElement('div');
    hash.innerHTML = `
    </br>
    <h5 style="font-weight: 300;">Hash:<a href="${window.location.origin}${window.location.pathname}?main&hash=${fechaEpoch}">${fechaEpoch}</a>, guarde esta información para luego realizar la consulta en los reportes </br></br> <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}${window.location.pathname}%3Fmain%26hash=${fechaEpoch}"/></h5>`;
    padre.appendChild(hash);

    let btnInicio = document.getElementById("Inicio");
    btnInicio.addEventListener("click", (e) => {
        limiparPantalla();
        init();
    });

    let vovlerInicio = document.getElementById("vovlerInicio");
    vovlerInicio.addEventListener("click", (e) => {
        limiparPantalla();
        init();
    });

    let arrayTemporal = [{id: fechaEpoch, data: Alumnos, notaAprobacion: notaAprobacion, promedioGeneral: promedio, profesor: profesorCurso, curso:cursoDictado}];
    localStorage.setItem(fechaEpoch, JSON.stringify(arrayTemporal));
    console.log(`Guardando información para historial`);
    aniadirRegistro(fechaEpoch);

    let btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", (e) => {
        DivFormulario.innerHTML = ``;
        cerrarSesion();
    });
}

function aniadirRegistro(registro) {
    if (chequeoOnline() === false){
        login();
    }
    let registros = JSON.parse(localStorage.getItem("registros"));
    if (registros === null) {
        registros = [];
    }
    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));
    console.log(`Actualizando registros`);
}

function eliminarRegistro(registro) {
    if (chequeoOnline() === false){
        login();
    }
    let registros = JSON.parse(localStorage.getItem("registros"));
    let index = registros.indexOf(registro);
    console.log(registros.splice((index),1));
    localStorage.setItem("registros", JSON.stringify(registros));
    console.log(`Actualizando registros`);
}

function obtenerRegistros(){
    if (chequeoOnline() === false){
        login();
    }
    let registros = JSON.parse(localStorage.getItem("registros"));
    if (registros === null || registros.length === 0) {

        DivFormulario.innerHTML = `
        <p class="text-center">
            <h3>No se encontraron registros.</h3>
            </br>
            <button type="button" class="btn btn-danger" id="btnAtrasRegitros">Atras</button>
        </p>`;
        let btnAtrasRegitros = document.getElementById("btnAtrasRegitros");

        btnAtrasRegitros.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

    } else {

        let mensaje = document.createElement("p");
        mensaje.innerHTML = `
        <div class="d-flex justify-content-end float-end pt-2">
            <form class="d-flex mx-2" id="busqueda">
                <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <div class="btn-group">
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    ${usuarioPanel}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
        <nav aria-label="breadcrumb" class="pt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
                <li class="breadcrumb-item active" aria-current="page">Registros</li>
            </ol>
        </nav>
        ${mensajeErrorRegistros}
        <h5 class="float-start py-3" >Listado de registros<h5></br>`;
        padre.appendChild(mensaje);

        let tabla = document.createElement('div');
        tabla.innerHTML = tablaRegistros;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");
        for (i=0; i <= (registros.length-1); i++){
            let fechaHumana = new Date(registros[i]);
            const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones);

            let registro = JSON.parse(localStorage.getItem(registros[i]));

            let tr = document.createElement("tr");
            tr.innerHTML = `<th scope="row">${(i+1)}</th>
            <td>${fechaImpresion}</td>
            <td>${registro[0].data.length}</td>
            <td>${registro[0].notaAprobacion}</td>
            <td>${registro[0].promedioGeneral}</td>
            <td>${registro[0].curso}</td>
            <td>${registro[0].profesor}</td>
            <td><a href="${window.location.origin}${window.location.pathname}?main&consulta=${registros[i]}">${registros[i]}</a></td>`;
            tablaPadre.appendChild(tr);
        }

        let div = document.createElement("div");
        div.innerHTML = `<button type="button" class="btn btn-danger" id="btnAtrasRegistro">Atras</button>`
        padre.appendChild(div);

        let btnAtrasRegistro = document.getElementById("btnAtrasRegistro");
        btnAtrasRegistro.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let vovlerInicio = document.getElementById("vovlerInicio");
        vovlerInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnCerrarSesion = document.getElementById("btnCerrarSesion");
        btnCerrarSesion.addEventListener("click", (e) => {
            DivFormulario.innerHTML = ``;
            cerrarSesion();
        });

        let formLogin = document.getElementById("busqueda");

        formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        busquedaHash(e.target.children[0].value)
        });

    }
    
}

function imprimirRegistro(registro){
    if (chequeoOnline() === false){
        login();
    }
    limiparPantalla();
    total = 0;
    let informacion = JSON.parse(localStorage.getItem(registro));

    if (informacion === null || informacion.length === 0) {

        DivFormulario.innerHTML = `
        <p class="text-center">
            <h3>Parece que el registro que estas buscando no se encuentra.</h3>
            </br>
            <button type="button" class="btn btn-danger mt-3" id="btnAtrasRegitros">Atras</button>
        </p>`;
        let btnAtrasRegitros = document.getElementById("btnAtrasRegitros");

        btnAtrasRegitros.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

    } else {
        let fechaHumana = new Date(parseInt(registro));
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones)

        let aprobacion = document.createElement("p");
        aprobacion.innerHTML = `
        <div class="d-flex justify-content-end float-end pt-2">
            <form class="d-flex mx-2" id="busqueda">
                <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <div class="btn-group">
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    ${usuarioPanel}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
        <nav aria-label="breadcrumb" class="pt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
                <li class="breadcrumb-item"><a href="#" id="volverRegistros">Registros</a></li>
                <li class="breadcrumb-item active" aria-current="page">${registro}</li>
            </ol>
        </nav>
        ${mensajeErrorBusquedaProfesor}
        <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
        <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
        <h5 class="float-start " >Curso: ${informacion[0].curso}<h5>
        <h5 class="float-end ">Profesor: ${informacion[0].profesor}</h5></br></br>`;
        padre.appendChild(aprobacion);

        let tabla = document.createElement('div');
        tabla.innerHTML = tablaAlumnos;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (informacion[0].data.length - 1); i++) {
            console.log("Imprimiendo el Id:" + informacion[0].data[i].id + ", Nombre:"+ informacion[0].data[i].nombre + " " + informacion[0].data[i].apellido + ", Nota: "+ informacion[0].data[i].nota + ", Estado: " + informacion[0].data[i].aprobado);
            total = suma(parseFloat(informacion[0].data[i].nota),total);
            let tr = document.createElement("tr");
            if (informacion[0].data[i].aprobado) {
                tr.innerHTML = `<th scope="row">${informacion[0].data[i].id}</th>
                <td>${informacion[0].data[i].nombre}</td>
                <td>${informacion[0].data[i].apellido}</td>
                <td>${informacion[0].data[i].nota}</td>
                <td>✅</td>`;
            } else {
                tr.innerHTML = `<th scope="row">${informacion[0].data[i].id}</th>
                <td>${informacion[0].data[i].nombre}</td>
                <td>${informacion[0].data[i].apellido}</td>
                <td>${informacion[0].data[i].nota}</td>
                <td>❌</td>`;
            }
            tablaPadre.appendChild(tr);
        }

        let promedio = promediar(total,informacion[0].data.length).toFixed(2);

        let promedioFinal = document.createElement('div');
        promedioFinal.innerHTML = `<h5 class="float-start my-3">Promedio general: ${promedio}<h5>
        <button type="button" class="btn btn-danger float-end my-3 mx-1" id="btnEliminarReg">Eliminar Registro</button>
        <button type="button" class="btn btn-success float-end my-3 mx-1" id="Inicio">Inicio</button>
        <button type="button" class="btn btn-primary float-end my-3 mx-1" id="btnIrRegistros">Atras</button></br></br>`;
        padre.appendChild(promedioFinal);

        let compartir = document.createElement('div');
        compartir.innerHTML = `<h5 class="my-3" style="font-weight: 300;">Hash: <a href="${window.location.origin}${window.location.pathname}?main&hash=${registro}">${registro}</a>, link para compartir.</br></br> <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}${window.location.pathname}%3Fmain%26hash=${registro}"/><h5>`;
        padre.appendChild(compartir);

        let btnEliminarReg = document.getElementById("btnEliminarReg");
        btnEliminarReg.addEventListener("click", (e) => {
            limiparPantalla();
            let confirmacion = confirm("Desea Eliminar el registro?")
            if (confirmacion) {
                let divEliminacion = document.createElement('div');
                divEliminacion.innerHTML = `<p class="text-center"><h3>Registro hash ${registro}, fue eliminado.</h3></br><button type="button" class="btn btn-danger" id="btnAtrasEliminar">Atras</button></p>`;
                padre.appendChild(divEliminacion);

                localStorage.removeItem(registro);
                eliminarRegistro(registro);

                let btnAtrasEliminar = document.getElementById("btnAtrasEliminar");
                btnAtrasEliminar.addEventListener("click", (e) => {
                    limiparPantalla();
                    obtenerRegistros();
                });
            }
        });

        let btnInicio = document.getElementById("Inicio");
        btnInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnIrRegistros = document.getElementById("btnIrRegistros");
        btnIrRegistros.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

        let vovlerInicio = document.getElementById("vovlerInicio");
        vovlerInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let volverRegistros = document.getElementById("volverRegistros");
        volverRegistros.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

        let btnCerrarSesion = document.getElementById("btnCerrarSesion");
        btnCerrarSesion.addEventListener("click", (e) => {
            cerrarSesion();
        });

        let formLogin = document.getElementById("busqueda");

        formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        busquedaProfesor(e.target.children[0].value,registro);
        });
    }
} 

function compartirRegistro(registro) {
    limiparPantalla();
    total = 0;
    let informacion = JSON.parse(localStorage.getItem(registro));

    if (informacion === null || informacion == []){
        let mensajeError = document.createElement("div");
        mensajeError.innerHTML = `
        <p class="text-center">
            <h3>No se encontro el registro solicitado.</h3>
            </br>
            <button type="button" class="btn btn-success" id="btnSalir">Salir</button>
        </p>`;
        padre.appendChild(mensajeError);

        let btnSalir = document.getElementById("btnSalir");
        btnSalir.addEventListener("click", (e) => {
            window.location.assign(window.location.origin+window.location.pathname)
        });

    } else {
        let fechaHumana = new Date(parseInt(registro));
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones)

        let aprobacion = document.createElement("p");
        aprobacion.innerHTML = `
        ${barraDeBusqueda}
        <nav aria-label="breadcrumb" class="pt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">Inicio</li>
                <li class="breadcrumb-item">Registros</li>
                <li class="breadcrumb-item active" aria-current="page">${registro}</li>
            </ol>
        </nav>
        ${mensajeErrorBusquedaAlumnos}
        <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
        <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
        <h5 class="float-start" >Curso: ${informacion[0].curso}<h5>
        <h5 class="float-end">Profesor: ${informacion[0].profesor}</h5></br></br>`;
        padre.appendChild(aprobacion);

        let tabla = document.createElement('div');
        tabla.innerHTML = tablaAlumnos;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (informacion[0].data.length - 1); i++) {
            console.log("Imprimiendo el Id:" + informacion[0].data[i].id + ", Nombre:"+ informacion[0].data[i].nombre + " " + informacion[0].data[i].apellido + ", Nota: "+ informacion[0].data[i].nota + ", Estado: " + informacion[0].data[i].aprobado);
            total = suma(parseFloat(informacion[0].data[i].nota),total);
            let tr = document.createElement("tr");
            if (informacion[0].data[i].aprobado) {
                tr.innerHTML = `<th scope="row">${informacion[0].data[i].id}</th>
                <td>${informacion[0].data[i].nombre}</td>
                <td>${informacion[0].data[i].apellido}</td>
                <td>${informacion[0].data[i].nota}</td>
                <td>✅</td>`;
            } else {
                tr.innerHTML = `<th scope="row">${informacion[0].data[i].id}</th>
                <td>${informacion[0].data[i].nombre}</td>
                <td>${informacion[0].data[i].apellido}</td>
                <td>${informacion[0].data[i].nota}</td>
                <td>❌</td>`;
            }
            tablaPadre.appendChild(tr);
        }

        let promedio = promediar(total,informacion[0].data.length).toFixed(2);

        let promedioFinal = document.createElement('div');
        promedioFinal.innerHTML = `<h5 class="float-start my-3">Promedio generprial: ${promedio}<h5>
        <button type="button" class="btn btn-success float-end my-3 mx-1" id="btnSalir">Salir</button>`;
        padre.appendChild(promedioFinal);

        let btnSalir = document.getElementById("btnSalir");
        btnSalir.addEventListener("click", (e) => {
            window.location.assign(window.location.origin+window.location.pathname)
        });

        let formLogin = document.getElementById("busqueda");
            formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            busquedaAlumno(e.target.children[0].value,registro);
        });
    }
} 

function busquedaProfesor(busqueda,hash) {
    if (/^(\d+)$/.test(busqueda)) {
        console.log('Búsqueda por nota: ' + busqueda + " en el registro: " + hash);
        busquedaNota(busqueda,hash);
    }else if (/^([a-zA-Z]+ [a-zA-Z]+)$/.test(busqueda)) {
        let nombreApellido = busqueda.split(' ');
        console.log('Búsqueda por Nombre: ' + nombreApellido[0] + ' y Apellido: ' + nombreApellido[1] + " en el registro: " + hash);
        busquedaNombreApellido(nombreApellido,hash);
    }else{
        tiggerToast();  
    }
}

function busquedaHash(busqueda){
    if (/^([0-9]{13})$/.test(busqueda)) {
        imprimirListadoBusqueda(busqueda);
    }else if (/^([a-zA-Z]+ [a-zA-Z]+)$/.test(busqueda)) {
        let nombreApellido = busqueda.split(' ');
        console.log('Búsqueda por Nombre: ' + nombreApellido[0] + ' y Apellido: ' + nombreApellido[1]);
        imprimirListadoBusquedaNombreProfesor(busqueda);
    } else {
        tiggerToast(); 
    }
}

function busquedaAlumno(busqueda,hash){
    if (/^([a-zA-Z]+ [a-zA-Z]+)$/.test(busqueda)) {
        let nombreApellido = busqueda.split(' ');
        console.log('Búsqueda por Nombre: ' + nombreApellido[0] + ' y Apellido: ' + nombreApellido[1]);
        compartirRegistroBusqueda(nombreApellido,hash);
    } else {
        tiggerToast();
    }
}

function compartirRegistroBusqueda(busqueda,hash) {
    limiparPantalla();

    let datos = [];
    let informacion = JSON.parse(localStorage.getItem(hash));

    for (i=0;i <= (informacion[0].data.length - 1); i++){
        if ( informacion[0].data[i].nombre === busqueda[0] && informacion[0].data[i].apellido === busqueda[1]){
            console.log(`Coincidencia encontrada en el ID:${informacion[0].data[i].id}`);
            datos.push(informacion[0].data[i])
        }
    }

    let fechaHumana = new Date(parseInt(hash));
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones)

    let aprobacion = document.createElement("p");
    aprobacion.innerHTML = `
    ${barraDeBusqueda}
    <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Inicio</li>
            <li class="breadcrumb-item">Registros</li>
            <li class="breadcrumb-item active" aria-current="page">${hash}</li>
        </ol>
    </nav>
    <div>
        <h6>Filtro búsqueda:
            <button type="button" class="mx-1" style="background-color: white;border-radius: 5px;border-color: gray;" id="btnBorrarFiltro">
            Nombre y apellido: ${busqueda[0]} ${busqueda[1]}
                <span class="badge" style="color: #000;">X</span>
            </button>
        </h6>
    </div>
    ${mensajeErrorBusquedaAlumnos}
    <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
    <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
    <h5 class="float-start " >Curso: ${informacion[0].curso}<h5>
    <h5 class="float-end ">Profesor: ${informacion[0].profesor}</h5></br></br>`;
    padre.appendChild(aprobacion);

    if (datos.length <= 0 ){
        let mensajeError = document.createElement("div");
        mensajeError.innerHTML = `
        <p class="text-center">
            <h3>No se encontro el ID solicitado.</h3>
            </br>
            <button type="button" class="btn btn-success" id="btnVolver">Volver</button>
        </p>`;
        padre.appendChild(mensajeError);

        let btnSalir = document.getElementById("btnVolver");
        btnSalir.addEventListener("click", (e) => {
            limiparPantalla();
            imprimirRegistro(hash);
        });
    }else {
        let tabla = document.createElement('div');
        tabla.innerHTML = tablaAlumnos;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (datos.length - 1); i++) {
            console.log("Imprimiendo el Id:" + datos[i].id + ", Nombre:"+ datos[i].nombre + " " + datos[i].apellido + ", Nota: "+ datos[i].nota + ", Estado: " + datos[i].aprobado);
            total = suma(parseFloat(datos[i].nota),total);
            let tr = document.createElement("tr");
            if (datos[i].aprobado) {
                tr.innerHTML = `<th scope="row">${datos[i].id}</th>
                <td>${datos[i].nombre}</td>
                <td>${datos[i].apellido}</td>
                <td>${datos[i].nota}</td>
                <td>✅</td>`;
            } else {
                tr.innerHTML = `<th scope="row">${datos[i].id}</th>
                <td>${datos[i].nombre}</td>
                <td>${datos[i].apellido}</td>
                <td>${datos[i].nota}</td>
                <td>❌</td>`;
            }
            tablaPadre.appendChild(tr);
        }

        let promedioFinal = document.createElement('div');
        promedioFinal.innerHTML = `
        <button type="button" class="btn btn-success float-end my-3 mx-1" id="btnSalir">Salir</button>`;
        padre.appendChild(promedioFinal);

        let btnBorrarFiltro = document.getElementById("btnBorrarFiltro");
        btnBorrarFiltro.addEventListener("click", (e) => {
            limiparPantalla();
            console.log(`Regresando al registros: ${hash}`)
            compartirRegistro(hash);
        });

        let btnSalir = document.getElementById("btnSalir");
        btnSalir.addEventListener("click", (e) => {
            window.location.assign(window.location.origin+window.location.pathname)
        });

        let formLogin = document.getElementById("busqueda");
            formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            busquedaAlumno(e.target.children[0].value,hash);
        });
    }
}

function busquedaNombreApellido(busqueda,hash) {
    if (chequeoOnline() === false){
        login();
    }
    limiparPantalla();

    let datos = [];
    let informacion = JSON.parse(localStorage.getItem(hash));

    for (i=0;i <= (informacion[0].data.length - 1); i++){
        if ( informacion[0].data[i].nombre === busqueda[0] && informacion[0].data[i].apellido === busqueda[1]){
            console.log(`Coincidencia encontrada en el ID:${informacion[0].data[i].id}`);
            datos.push(informacion[0].data[i])
        }
    }

    let fechaHumana = new Date(parseInt(hash));
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones)

    let aprobacion = document.createElement("p");
    aprobacion.innerHTML = `
    <div class="d-flex justify-content-end float-end pt-2">
        <form class="d-flex mx-2" id="busqueda">
            <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                ${usuarioPanel}
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
            </ul>
        </div>
    </div>
    <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
            <li class="breadcrumb-item"><a href="#" id="volverRegistros">Registros</a></li>
            <li class="breadcrumb-item active" aria-current="page">${hash}</li>
        </ol>
    </nav>
    <div>
        <h6>Filtro búsqueda:
            <button type="button" class="mx-1" style="background-color: white;border-radius: 5px;border-color: gray;" id="btnBorrarFiltro">
            Nombre y apellido: ${busqueda[0]} ${busqueda[1]}
                <span class="badge" style="color: #000;">X</span>
            </button>
        </h6>
    </div>

    ${mensajeErrorBusquedaProfesor}
    
    <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
    <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
    <h5 class="float-start " >Curso: ${informacion[0].curso}<h5>
    <h5 class="float-end ">Profesor: ${informacion[0].profesor}</h5></br></br>`;
    padre.appendChild(aprobacion);

    if (datos.length <= 0 ){
        let mensajeError = document.createElement("div");
        mensajeError.innerHTML = `
        <p class="text-center">
            <h3>No se encontro el ID solicitado.</h3>
            </br>
            <button type="button" class="btn btn-success" id="btnVolver">Volver</button>
        </p>`;
        padre.appendChild(mensajeError);

        let btnSalir = document.getElementById("btnVolver");
        btnSalir.addEventListener("click", (e) => {
            limiparPantalla();
            imprimirRegistro(hash);
        });
    }else {
        let tabla = document.createElement('div');
        tabla.innerHTML = tablaAlumnos;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (datos.length - 1); i++) {
            console.log("Imprimiendo el Id:" + datos[i].id + ", Nombre:"+ datos[i].nombre + " " + datos[i].apellido + ", Nota: "+ datos[i].nota + ", Estado: " + datos[i].aprobado);
            total = suma(parseFloat(datos[i].nota),total);
            let tr = document.createElement("tr");
            if (datos[i].aprobado) {
                tr.innerHTML = `<th scope="row">${datos[i].id}</th>
                <td>${datos[i].nombre}</td>
                <td>${datos[i].apellido}</td>
                <td>${datos[i].nota}</td>
                <td>✅</td>`;
            } else {
                tr.innerHTML = `<th scope="row">${datos[i].id}</th>
                <td>${datos[i].nombre}</td>
                <td>${datos[i].apellido}</td>
                <td>${datos[i].nota}</td>
                <td>❌</td>`;
            }
            tablaPadre.appendChild(tr);
        }

        let promedioFinal = document.createElement('div');
        promedioFinal.innerHTML = `
        <button type="button" class="btn btn-danger float-end my-3 mx-1" id="btnEliminarReg">Eliminar Registro</button>
        <button type="button" class="btn btn-success float-end my-3 mx-1" id="Inicio">Inicio</button>
        <button type="button" class="btn btn-primary float-end my-3 mx-1" id="btnIrRegistros">Volver a registros</button></br></br>`;
        padre.appendChild(promedioFinal);

        let compartir = document.createElement('div');
        compartir.innerHTML = `<h5 class="my-3" style="font-weight: 300;">Hash: <a href="${window.location.origin}${window.location.pathname}?main&hash=${hash}">${hash}</a>, link para compartir.</br></br> <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}${window.location.pathname}%3Fmain%26hash=${hash}"/><h5>`;
        padre.appendChild(compartir);

        let btnEliminarReg = document.getElementById("btnEliminarReg");
        btnEliminarReg.addEventListener("click", (e) => {
            limiparPantalla();
            let confirmacion = confirm("Desea Eliminar el registro?")
            if (confirmacion) {
                let divEliminacion = document.createElement('div');
                divEliminacion.innerHTML = `<p class="text-center"><h3>Registro hash ${hash}, fue eliminado.</h3></br><button type="button" class="btn btn-danger" id="btnAtrasEliminar">Atras</button></p>`;
                padre.appendChild(divEliminacion);

                localStorage.removeItem(hash);
                eliminarRegistro(hash);

                let btnAtrasEliminar = document.getElementById("btnAtrasEliminar");
                btnAtrasEliminar.addEventListener("click", (e) => {
                    limiparPantalla();
                    obtenerRegistros();
                });
            }   
        });

        let btnInicio = document.getElementById("Inicio");
        btnInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnIrRegistros = document.getElementById("btnIrRegistros");
        btnIrRegistros.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

        let vovlerInicio = document.getElementById("vovlerInicio");
        vovlerInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnBorrarFiltro = document.getElementById("btnBorrarFiltro");
        btnBorrarFiltro.addEventListener("click", (e) => {
            limiparPantalla();
            console.log(`Regresando al registros: ${hash}`)
            imprimirRegistro(hash);
        });
    }

    let btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", (e) => {
        cerrarSesion();
    });

    let formLogin = document.getElementById("busqueda");
    formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    busquedaProfesor(e.target.children[0].value,hash);
    });

}

function busquedaNota(busqueda,hash) {
    if (chequeoOnline() === false){
        login();
    }
    limiparPantalla();

    let datos = [];
    let informacion = JSON.parse(localStorage.getItem(hash));

    for (i=0;i <= (informacion[0].data.length - 1); i++){
        if ( informacion[0].data[i].nota === busqueda ){
            console.log(`Coincidencia encontrada en el ID:${informacion[0].data[i].id}`);
            datos.push(informacion[0].data[i])
        }
    }

    let fechaHumana = new Date(parseInt(hash));
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones)

    let aprobacion = document.createElement("p");
    aprobacion.innerHTML = `
    <div class="d-flex justify-content-end float-end pt-2">
        <form class="d-flex mx-2" id="busqueda">
            <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                ${usuarioPanel}
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
            </ul>
        </div>
    </div>
    <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
            <li class="breadcrumb-item"><a href="#" id="volverRegistros">Registros</a></li>
            <li class="breadcrumb-item active" aria-current="page">${hash}</li>
        </ol>
    </nav>
    <div>
        <h6>Filtro búsqueda:
            <button type="button" class="mx-1" style="background-color: white;border-radius: 5px;border-color: gray;" id="btnBorrarFiltro">
            Nota: ${busqueda[0]} 
                <span class="badge" style="color: #000;">X</span>
            </button>
        </h6>
    </div>
    ${mensajeErrorBusquedaProfesor}    
    <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
    <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
    <h5 class="float-start " >Curso: ${informacion[0].curso}<h5>
    <h5 class="float-end ">Profesor: ${informacion[0].profesor}</h5></br></br>`;
    padre.appendChild(aprobacion);

    if (datos.length <= 0 ){
        let mensajeError = document.createElement("div");
        mensajeError.innerHTML = `
        <p class="text-center">
            <h3>No se encontro el ID solicitado.</h3>
            </br>
            <button type="button" class="btn btn-success" id="btnVolver">Volver</button>
        </p>`;
        padre.appendChild(mensajeError);

        let btnSalir = document.getElementById("btnVolver");
        btnSalir.addEventListener("click", (e) => {
            limiparPantalla();
            imprimirRegistro(hash);
        });
    }else {
        let tabla = document.createElement('div');
        tabla.innerHTML = tablaAlumnos;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (datos.length - 1); i++) {
            console.log("Imprimiendo el Id:" + datos[i].id + ", Nombre:"+ datos[i].nombre + " " + datos[i].apellido + ", Nota: "+ datos[i].nota + ", Estado: " + datos[i].aprobado);
            total = suma(parseFloat(datos[i].nota),total);
            let tr = document.createElement("tr");
            if (datos[i].aprobado) {
                tr.innerHTML = `<th scope="row">${datos[i].id}</th>
                <td>${datos[i].nombre}</td>
                <td>${datos[i].apellido}</td>
                <td>${datos[i].nota}</td>
                <td>✅</td>`;
            } else {
                tr.innerHTML = `<th scope="row">${datos[i].id}</th>
                <td>${datos[i].nombre}</td>
                <td>${datos[i].apellido}</td>
                <td>${datos[i].nota}</td>
                <td>❌</td>`;
            }
            tablaPadre.appendChild(tr);
        }

        let promedioFinal = document.createElement('div');
        promedioFinal.innerHTML = `
        <button type="button" class="btn btn-danger float-end my-3 mx-1" id="btnEliminarReg">Eliminar Registro</button>
        <button type="button" class="btn btn-success float-end my-3 mx-1" id="Inicio">Inicio</button>
        <button type="button" class="btn btn-primary float-end my-3 mx-1" id="btnIrRegistros">Volver a registros</button></br></br>`;
        padre.appendChild(promedioFinal);

        let compartir = document.createElement('div');
        compartir.innerHTML = `<h5 class="my-3" style="font-weight: 300;">Hash: <a href="${window.location.origin}${window.location.pathname}?main&hash=${hash}">${hash}</a>, link para compartir.</br></br> <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}${window.location.pathname}%3Fmain%26hash=${hash}"/><h5>`;
        padre.appendChild(compartir);

        let btnEliminarReg = document.getElementById("btnEliminarReg");
        btnEliminarReg.addEventListener("click", (e) => {
            limiparPantalla();
            let confirmacion = confirm("Desea Eliminar el registro?")
            if (confirmacion) {
                let divEliminacion = document.createElement('div');
                divEliminacion.innerHTML = `<p class="text-center"><h3>Registro hash ${hash}, fue eliminado.</h3></br><button type="button" class="btn btn-danger" id="btnAtrasEliminar">Atras</button></p>`;
                padre.appendChild(divEliminacion);

                localStorage.removeItem(hash);
                eliminarRegistro(hash);

                let btnAtrasEliminar = document.getElementById("btnAtrasEliminar");
                btnAtrasEliminar.addEventListener("click", (e) => {
                    limiparPantalla();
                    obtenerRegistros();
                });
            }   
        });

        let btnInicio = document.getElementById("Inicio");
        btnInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnIrRegistros = document.getElementById("btnIrRegistros");
        btnIrRegistros.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

        let vovlerInicio = document.getElementById("vovlerInicio");
        vovlerInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnBorrarFiltro = document.getElementById("btnBorrarFiltro");
        btnBorrarFiltro.addEventListener("click", (e) => {
            limiparPantalla();
            console.log(`Regresando al registros: ${hash}`)
            imprimirRegistro(hash);
        });
    }

    let btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", (e) => {
        cerrarSesion();
    });

    let formLogin = document.getElementById("busqueda");
    formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    busquedaProfesor(e.target.children[0].value,hash);
    });

}

function imprimirListadoBusqueda(registro){
    if (chequeoOnline() === false){
        login();
    }

    limiparPantalla();

    let datos = [];
    let registros = JSON.parse(localStorage.getItem("registros"));

    for (i=0;i <= (registros.length - 1); i++){
        if ( registros[i] === parseInt(registro) ){
            console.log(`Coincidencia encontrada en el ID:${registros[i]}`);
            datos.push(registros[i])
        }
    }

    if (datos === null || datos.length === 0) {

        DivFormulario.innerHTML = `
        <p class="text-center">
            <h3>No se encontraron coincidencias.</h3>
            </br>
            <button type="button" class="btn btn-danger" id="btnAtrasRegitros">Atras</button>
        </p>`;
        let btnAtrasRegitros = document.getElementById("btnAtrasRegitros");

        btnAtrasRegitros.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

    } else {

        let mensaje = document.createElement("div");
        mensaje.innerHTML = `
        <div class="d-flex justify-content-end float-end pt-2">
            <form class="d-flex mx-2" id="busqueda">
                <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <div class="btn-group">
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    ${usuarioPanel}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
        <nav aria-label="breadcrumb" class="pt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
                <li class="breadcrumb-item active" aria-current="page">Registros</li>
            </ol>
        </nav>
        <div>
        <h6>Filtro búsqueda:
            <button type="button" class="mx-1" style="background-color: white;border-radius: 5px;border-color: gray;" id="btnBorrarFiltro">
            Hash: ${registro}
                <span class="badge" style="color: #000;">X</span>
            </button>
        </h6>
        </div>
        ${mensajeErrorBusquedaProfesor}
        <h5 class="float-start py-3" >Listado de registros<h5></br>`;
        padre.appendChild(mensaje);

        let tabla = document.createElement('div');
        tabla.innerHTML = tablaRegistros;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");
        for (i=0; i <= (datos.length-1); i++){
            let fechaHumana = new Date(datos[i]);
            const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones);

            let registro = JSON.parse(localStorage.getItem(datos[i]));

            let tr = document.createElement("tr");
            tr.innerHTML = `<th scope="row">${(i+1)}</th>
            <td>${fechaImpresion}</td>
            <td>${registro[0].data.length}</td>
            <td>${registro[0].notaAprobacion}</td>
            <td>${registro[0].promedioGeneral}</td>
            <td>${registro[0].curso}</td>
            <td>${registro[0].profesor}</td>
            <td><a href="${window.location.origin}${window.location.pathname}?main&consulta=${registros[i]}">${registros[i]}</a></td>`;
            tablaPadre.appendChild(tr);
        }

        let div = document.createElement("div");
        div.innerHTML = `<button type="button" class="btn btn-danger" id="btnAtrasRegistro">Atras</button>`
        padre.appendChild(div);

        let btnAtrasRegistro = document.getElementById("btnAtrasRegistro");
        btnAtrasRegistro.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let vovlerInicio = document.getElementById("vovlerInicio");
        vovlerInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnCerrarSesion = document.getElementById("btnCerrarSesion");
        btnCerrarSesion.addEventListener("click", (e) => {
            DivFormulario.innerHTML = ``;
            cerrarSesion();
        });

        let formLogin = document.getElementById("busqueda");
        formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        busquedaHash(e.target.children[0].value)
        });

        let btnBorrarFiltro = document.getElementById("btnBorrarFiltro");
        btnBorrarFiltro.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

    }
}

function imprimirListadoBusquedaNombreProfesor(registro){
    if (chequeoOnline() === false){
        login();
    }

    limiparPantalla();

    let datos = [];
    let registros = JSON.parse(localStorage.getItem("registros"));

    for (i=0;i <= (registros.length - 1); i++){
        let entradas = JSON.parse(localStorage.getItem(registros[i]));
        if ( entradas[0].profesor === registro ){
            console.log(`Coincidencia encontrada en el ID: ${registros[i]}`);
            datos.push(registros[i])
        }
    }

    console.log(datos);

    if (datos === null || datos.length === 0) {

        DivFormulario.innerHTML = `
        <p class="text-center">
            <h3>No se encontraron coincidencias.</h3>
            </br>
            <button type="button" class="btn btn-danger" id="btnAtrasRegitros">Atras</button>
        </p>`;
        let btnAtrasRegitros = document.getElementById("btnAtrasRegitros");

        btnAtrasRegitros.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

    } else {

        let mensaje = document.createElement("div");
        mensaje.innerHTML = `
        <div class="d-flex justify-content-end float-end pt-2">
            <form class="d-flex mx-2" id="busqueda">
                <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Buscar">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <div class="btn-group">
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    ${usuarioPanel}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
        <nav aria-label="breadcrumb" class="pt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" id="vovlerInicio">Inicio</a></li>
                <li class="breadcrumb-item active" aria-current="page">Registros</li>
            </ol>
        </nav>
        <div>
        <h6>Filtro búsqueda:
            <button type="button" class="mx-1" style="background-color: white;border-radius: 5px;border-color: gray;" id="btnBorrarFiltro">
            Nombre profesor: ${registro}
                <span class="badge" style="color: #000;">X</span>
            </button>
        </h6>
        </div>
        ${mensajeErrorRegistros}
        <h5 class="float-start py-3" >Listado de registros<h5></br>`;
        padre.appendChild(mensaje);

        let tabla = document.createElement('div');
        tabla.innerHTML = tablaRegistros;
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");
        for (i=0; i <= (datos.length-1); i++){
            let fechaHumana = new Date(datos[i]);
            const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let fechaImpresion = fechaHumana.toLocaleDateString(undefined,opciones);

            let registro = JSON.parse(localStorage.getItem(datos[i]));
            console.log(registro);

            let tr = document.createElement("tr");
            tr.innerHTML = `<th scope="row">${(i+1)}</th>
            <td>${fechaImpresion}</td>
            <td>${registro[0].data.length}</td>
            <td>${registro[0].notaAprobacion}</td>
            <td>${registro[0].promedioGeneral}</td>
            <td>${registro[0].curso}</td>
            <td>${registro[0].profesor}</td>
            <td><a href="${window.location.origin}${window.location.pathname}?main&consulta=${registro[0].id}">${registro[0].id}</a></td>`;
            tablaPadre.appendChild(tr);
        }

        let div = document.createElement("div");
        div.innerHTML = `<button type="button" class="btn btn-danger" id="btnAtrasRegistro">Atras</button>`
        padre.appendChild(div);

        let btnAtrasRegistro = document.getElementById("btnAtrasRegistro");
        btnAtrasRegistro.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let vovlerInicio = document.getElementById("vovlerInicio");
        vovlerInicio.addEventListener("click", (e) => {
            limiparPantalla();
            init();
        });

        let btnCerrarSesion = document.getElementById("btnCerrarSesion");
        btnCerrarSesion.addEventListener("click", (e) => {
            DivFormulario.innerHTML = ``;
            cerrarSesion();
        });

        let formLogin = document.getElementById("busqueda");
        formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        busquedaHash(e.target.children[0].value)
        });

        let btnBorrarFiltro = document.getElementById("btnBorrarFiltro");
        btnBorrarFiltro.addEventListener("click", (e) => {
            limiparPantalla();
            obtenerRegistros();
        });

    }
}

const padre = document.getElementById("main");

limiparPantalla();

const parametros = new URLSearchParams(window.location.href);
const hashUrl = parametros.get('hash');
const consultaHash = parametros.get('consulta');

if (/^([0-9]{13})$/.test(hashUrl)) {
    compartirRegistro(hashUrl);
}else if (/^([0-9]{13})$/.test(consultaHash)) {
    if (chequeoOnline()){
        imprimirRegistro(consultaHash);
    }
}else{
    if (chequeoOnline()){
        init();
    } else {
        login();
    }
}