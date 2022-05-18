let usuariosIngresados = 0;
let notaAprobacion = 0;
let total = 0;
let cursoDictado = "";
let profesorCurso = "";
let usuarioPanel = "";

let Alumnos = [];

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

function actualizarUsuariosIngresados(cantidad) {
    usuariosIngresados = cantidad;
    console.log("Cantidad de alumnos ingresados: " + usuariosIngresados);
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
    DivFormulario.innerHTML = `
    <form id="ingresoSesion" class="my-3">
        <div class="form-floating my-3">
            <input type="text" class="form-control" id="floatNota" placeholder="Nombre de usuario" required>
            <label for="floatNota">Nombre de usuario</label>
        </div>

        <div class="form-floating my-3">
            <input type="password" class="form-control" id="floatUsuario" placeholder="Contraseña" required>
            <label for="floatUsuario">Contraseña</label>
        </div>
    
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
    `
    let formLogin = document.getElementById("ingresoSesion");

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        if (chequeoDatos(e.target.children[0].children[0].value,e.target.children[1].children[0].value) === false){
            DivFormulario.innerHTML = `
            <form id="ingresoSesion" class="my-3">
                <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatNota" placeholder="Nombre de usuario" required>
                    <label for="floatNota">Nombre de usuario</label>
                </div>

                <div class="form-floating my-3">
                    <input type="password" class="form-control" id="floatUsuario" placeholder="Contraseña" required>
                    <label for="floatUsuario">Contraseña</label>
                </div>

                <div class="alert alert-danger" role="alert">
                    Usuario o clave incorrecto
                </div>
            
                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
            </form>
            `
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
    <form id="formPrincipal" class="my-3">
        <div class="form-floating my-3">
            <input type="number" class="form-control" id="floatNota" placeholder="Nota de aprobación" min=1 required>
            <label for="floatNota">Nota de aprobación</label>
        </div>

        <div class="form-floating my-3">
            <input type="number" class="form-control" id="floatUsuario" placeholder="Canitdad de alumnos" min=1 required>
            <label for="floatUsuario">Cantidad de alumnos</label>
        </div>

        <div class="form-floating my-3">
            <input type="text" class="form-control" id="floatUsuario" placeholder="Curso" required>
            <label for="floatUsuario">Curso</label>
        </div>

        <div class="form-floating my-3">
            <input type="text" class="form-control" id="floatUsuario" placeholder="Profesor" required>
            <label for="floatUsuario">Profesor</label>
        </div>
    
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="button" class="btn btn-success" id="btnRegistros">Registros</button>
    </form>`;

    let formularioPrincipal = document.getElementById("formPrincipal");

    formularioPrincipal.addEventListener("submit", (e) => {
        e.preventDefault();
        actualizarNotaAprobacion(parseFloat(e.target.children[0].children[0].value));
        actualizarUsuariosIngresados(parseFloat(e.target.children[1].children[0].value));
        actualizarCursoDictado(e.target.children[2].children[0].value);
        actualizarProfesor(e.target.children[3].children[0].value);
        datosAlumnos(parseFloat(e.target.children[1].children[0].value));
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

function datosAlumnos(cantidad){
    if (chequeoOnline() === false){
        login();
    }
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
    <form id="formAlumno" class="my-3"></form>`;

    let padreAlumnos = document.getElementById("formAlumno");

    let p = document.createElement("p");
    p.innerHTML = `<h5 class="float-start">Nota de aprobación: ${notaAprobacion}</h5><h5 class="float-end">Cantidad de alumnos: ${usuariosIngresados}</h5></br></br>`;
    p.innerHTML += `<h5 class="float-start">Curso: ${cursoDictado}</h5><h5 class="float-end">Profesor: ${profesorCurso}</h5></br>`;
    padreAlumnos.appendChild(p);

    for (i=1; i <= cantidad; i++){
        let div = document.createElement("div");
        console.log("Impresión formulario alumno:" + i);
        div.innerHTML = `
        <h5 class="py-1" >Datos Alumno N°${i}</h5>
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
    div.innerHTML = `<button type="submit" class="btn btn-primary">Enviar</button>
    <button type="button" class="btn btn-danger" id="atrasAlumno">Atras</button>`
    padreAlumnos.appendChild(div);

    let formularioAlumno = document.getElementById("formAlumno");

    formularioAlumno.addEventListener("submit", (e) => {
        e.preventDefault();
        for (i=1; i <= cantidad; i++){
            let nombreAlumno = e.target.children[i].children[1].children[0].value;
            let apellidoAlumno = e.target.children[i].children[2].children[0].value;
            let notaAlumno = e.target.children[i].children[3].children[0].value;
            console.log(`Generando alumno ${i}:\n   - Nombre: ${nombreAlumno} \n   - Apellido: ${apellidoAlumno}\n   - Nota: ${notaAlumno}`);
            Alumnos.push(new Alumno((i-1),i,nombreAlumno,apellidoAlumno,notaAlumno));
        }
        limiparPantalla();
        tablaResultados();
    });

    let btnAtras = document.getElementById("atrasAlumno");
    btnAtras.addEventListener("click", (e) => {
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
    tabla.innerHTML = `
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

    let promedio = promediar(total,usuariosIngresados).toFixed(2);;

    let promedioFinal = document.createElement('div');
    promedioFinal.innerHTML = `
    <h5 class="float-start my-3">Promedio general: ${promedio}<h5>
    <button type="button" class="btn btn-success float-end my-3" id="Inicio">Inicio</button>
    </br>`;
    padre.appendChild(promedioFinal);

    let hash = document.createElement('div');
    hash.innerHTML = `
    </br>
    <h5 style="font-weight: 300;">Hash:<a href="${window.location.origin}${window.location.pathname}?main&hash=${fechaEpoch}">${fechaEpoch}</a>, guarde esta información para luego realizar la consulta en los reportes</h5>`;
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
        <h5 class="float-start py-3" >Listado de registros<h5></br>`;
        padre.appendChild(mensaje);

        let tabla = document.createElement('div');
        tabla.innerHTML = `
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

    }
    
}

function imprimirRegistro(registro){
    console.log(chequeoOnline());
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
        <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
        <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
        <h5 class="float-start " >Curso: ${informacion[0].curso}<h5>
        <h5 class="float-end ">Profesor: ${informacion[0].profesor}</h5></br></br>`;
        padre.appendChild(aprobacion);

        let tabla = document.createElement('div');
        tabla.innerHTML = `
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
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (informacion[0].data.length - 1); i++) {
            console.log("imprimiendo el Id:" + informacion[0].data[i].id + ", Nombre:"+ informacion[0].data[i].nombre + " " + informacion[0].data[i].apellido + ", Nota: "+ informacion[0].data[i].nota + ", Estado: " + informacion[0].data[i].aprobado);
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
        compartir.innerHTML = `<h5 class="my-3" style="font-weight: 300;">Hash: <a href="${window.location.origin}${window.location.pathname}?main&hash=${registro}">${registro}</a>, link para compartir.<h5>`;
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
        <nav aria-label="breadcrumb" class="pt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">Inicio</li>
                <li class="breadcrumb-item">Registros</li>
                <li class="breadcrumb-item active" aria-current="page">${registro}</li>
            </ol>
        </nav>
        <h5 class="float-start pt-3" >Nota de aprobación: ${informacion[0].notaAprobacion}<h5>
        <h5 class="float-end pt-3">Generado el dia ${fechaImpresion}</h5></br></br>
        <h5 class="float-start" >Curso: ${informacion[0].curso}<h5>
        <h5 class="float-end">Profesor: ${informacion[0].profesor}</h5></br></br>`;
        padre.appendChild(aprobacion);

        let tabla = document.createElement('div');
        tabla.innerHTML = `
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
        padre.appendChild(tabla);

        let tablaPadre = document.getElementById("alumnos");

        for (i=0;i <= (informacion[0].data.length - 1); i++) {
            console.log("imprimiendo el Id:" + informacion[0].data[i].id + ", Nombre:"+ informacion[0].data[i].nombre + " " + informacion[0].data[i].apellido + ", Nota: "+ informacion[0].data[i].nota + ", Estado: " + informacion[0].data[i].aprobado);
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