function documentation(){
    alert ("Uso:\nCalculadora con respuesta en consola\n\n  - Entradas soportadas numeros o escribir \"salir\" para detener el script");
}

documentation();

let ingress = prompt("Ingrese argumento");

while (ingress != "salir") {
    let number = parseInt(ingress);
    if ( isNaN(number) ){
        alert("Error code: 1\nUsted no ingreso un argumento valido")
        documentation();
    } else {
        alert("Generando cuentas en la consola")
        for ( let i = 1; i <=10; i++ ){
            let multiply = number * i
            console.log ("Realizando Multiplicación\n" + number + " x " + i + ", Resultado " + multiply)
        }
    }
    ingress = prompt("Ingrese argumento");
}

console.log("Interrupción recibida")