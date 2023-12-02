//-----------------------Casual----------------------------------------------------------------------
const button = document.getElementById("casual")

button.addEventListener("click", () => {

    let intentos = 6;

    fetch('https://random-word-api.herokuapp.com/word?length=7&lang=es')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            iniciarJuego();
            console.log(palabra)
        })

        .catch(error => {
            console.error('Error al obtener el diccionario:', error);
        });

    function iniciarJuego() {

        const button = document.getElementById("Probar");

        button.addEventListener("click", intentar);


        function intentar() {
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            const INTENTO = leerIntento();
            ROW.className = 'row';
            for (let i in palabra) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i] === palabra[i]) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#1abc9c';

                } else if (palabra.includes(INTENTO[i])) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#f1c40f';
                } else {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#34495e';
                }
                ROW.appendChild(SPAN)
            }
            GRID.appendChild(ROW);
            if (INTENTO === palabra) {
                terminar("<h1 style='color: GREEN '>FELICIDADES, HAS GANADO</h1>");
                return
            }
            for (let i in palabra) {
                if (INTENTO[i] === palabra[i]) {
                    (INTENTO[i], "VERDE")
                } else if (palabra.includes(INTENTO[i])) {
                    (INTENTO[i], "AMARILLO")
                } else {
                    (INTENTO[i], "GRIS")
                }
            }
            intentos--
            if (intentos == 0) {
                terminar("<h1 style='color: RED'>LO SIENTO, HAS PERDIDO</h1>");
            }


        }
    }

    function leerIntento() {
        let intento = document.getElementById("Entrada");
        intento = intento.value;
        intento = intento.toUpperCase();
        if (intento.length == 7) {
            return intento
        }
        else {
            alert("ingrese palabra de 7 letras")
        }

    }

    function terminar(mensaje) {

        const INPUT = document.getElementById("Entrada");
        const BOTON = document.getElementById("Probar");
        INPUT.disabled = true;
        BOTON.disabled = true;
        let contenedor = document.getElementById('Contenido');
        contenedor.innerHTML = mensaje;
    }




    window.addEventListener('load', init);
    function init() {
        console.log('Esto se ejecuta solo cuando se carga la pagina web')
    }


    const Button = document.getElementById("Reset");
    Button.addEventListener("click", reiniciar);
    function reiniciar() {
        window.location.reload();
    }
})

//-----------------------Titme Trial-------------------------------------------------------------

const button2 = document.getElementById("TimeTrial")

button2.addEventListener("click", () => {


    const button3 = document.getElementById("iniciar")

    button3.addEventListener("click", iniciarCronometro())

    let intentos = 6
    let encontrados = 0

    var tiempoTranscurrido = 0;
    var tiempoMaximo = 100 * 60 * 1000;
    var intervalo;
    var cronometro = document.getElementById("cronometro");

    function actualizarCronometro() {
        tiempoTranscurrido += 1000;

        if (tiempoTranscurrido >= tiempoMaximo) {
            clearInterval(intervalo);
            terminar("<h1 style= 'color: red'>Se acabo el tiempo<h1>")
        }

        var minutos = Math.floor(tiempoTranscurrido / 60000);
        var segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
        var horas = Math.floor(minutos / 60);
        minutos %= 60;

        cronometro.textContent = pad(horas) + ":" + pad(minutos) + ":" + pad(segundos);
    }

    function iniciarCronometro() {
        intervalo = setInterval(actualizarCronometro, 1000);
    }

    function pad(valor) {
        return valor < 10 ? "0" + valor : valor;
    }


    fetch('https://random-word-api.herokuapp.com/word?length=7&lang=es')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            iniciarJuego();
            console.log(palabra)
        })

        .catch(error => {
            console.error('Error al obtener el diccionario:', error);
        });

    function iniciarJuego() {

        const button = document.getElementById("Probar");

        button.addEventListener("click", intentar);

        function intentar() {
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            const INTENTO = leerIntento();
            ROW.className = 'row';
            for (let i in palabra) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i] === palabra[i]) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#1abc9c';

                } else if (palabra.includes(INTENTO[i])) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#f1c40f';
                }
                else {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#34495e';
                }

                ROW.appendChild(SPAN)
            }
            GRID.appendChild(ROW);
            if (INTENTO === palabra) {
                encontrados++
                let contenedor = document.getElementById("palabras")
                contenedor.innerHTML = "palabras encontradas " + encontrados
                fetch('https://random-word-api.herokuapp.com/word?length=7&lang=es')
                    .then(response => response.json())
                    .then(data => {
                        palabra = data[0].toUpperCase();

                        console.log(palabra)
                    })

                    .catch(error => {
                        console.error('Error al obtener el diccionario:', error);
                    });

            }
            for (let i in palabra) {
                if (INTENTO[i] === palabra[i]) {
                    (INTENTO[i], "VERDE")
                } else if (palabra.includes(INTENTO[i])) {
                    (INTENTO[i], "AMARILLO")
                } else {
                    (INTENTO[i], "GRIS")
                }
            } intentos--
            if (intentos == 0) {
                GRID.innerHTML = "";
                intentos = 6
            }




        }
    }

    function leerIntento() {
        let intento = document.getElementById("Entrada");
        intento = intento.value;
        intento = intento.toUpperCase();
        if (intento.length == 7) {
            return intento
        }
        else {
            alert("ingrese palabra de 7 letras")
        }

    }

    function terminar(mensaje) {

        const INPUT = document.getElementById("Entrada");
        const BOTON = document.getElementById("Probar");
        INPUT.disabled = true;
        BOTON.disabled = true;
        let contenedor = document.getElementById('Contenido');
        contenedor.innerHTML = mensaje;
    }




    window.addEventListener('load', init);
    function init() {
        console.log('Esto se ejecuta solo cuando se carga la pagina web')
    }


    const Button = document.getElementById("Reset");
    Button.addEventListener("click", reiniciar);
    function reiniciar() {
        window.location.reload();
    }

})

//------------------------Ranking---------------------------------------------------------------------

const button3 = document.getElementById("Ranking")

button3.addEventListener("click", () => {


    const button4 = document.getElementById("iniciar")

    button4.addEventListener("click", iniciarCronometro())

    let Limpiar = 7
    let intentos = 15
    let encontrados = 0

    var tiempoTranscurrido = 0;
    var tiempoMaximo = 100 * 60 * 1000;
    var intervalo;
    var cronometro = document.getElementById("cronometroR");

    function actualizarCronometro() {
        tiempoTranscurrido += 1000;

        if (tiempoTranscurrido >= tiempoMaximo) {
            clearInterval(intervalo);
            terminar("<h1 style= 'color: red'>Se acabo el tiempo<h1>")
        }

        var minutos = Math.floor(tiempoTranscurrido / 60000);
        var segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
        var horas = Math.floor(minutos / 60);
        minutos %= 60;

        cronometro.textContent = pad(horas) + ":" + pad(minutos) + ":" + pad(segundos);
    }

    function iniciarCronometro() {
        intervalo = setInterval(actualizarCronometro, 1000);
    }

    function pad(valor) {
        return valor < 10 ? "0" + valor : valor;
    }


    fetch('https://random-word-api.herokuapp.com/word?length=7&lang=es')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            iniciarJuego();
            console.log(palabra)
        })

        .catch(error => {
            console.error('Error al obtener el diccionario:', error);
        });

    function iniciarJuego() {

        const button = document.getElementById("Probar");

        button.addEventListener("click", intentar);

        function intentar() {
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            const INTENTO = leerIntento();
            ROW.className = 'row';
            for (let i in palabra) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i] === palabra[i]) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#1abc9c';

                } else if (palabra.includes(INTENTO[i])) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#f1c40f';
                }
                else {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#34495e';
                }

                ROW.appendChild(SPAN)
            }
            GRID.appendChild(ROW);
            if (INTENTO === palabra) {
                encontrados++
                let contenedor = document.getElementById("PalabrasR")
                contenedor.innerHTML = "palabras encontradas " + encontrados
                fetch('https://random-word-api.herokuapp.com/word?length=7&lang=es')
                    .then(response => response.json())
                    .then(data => {
                        palabra = data[0].toUpperCase();

                        console.log(palabra)
                    })

                    .catch(error => {
                        console.error('Error al obtener el diccionario:', error);
                    });
                intentos++
            }
            for (let i in palabra) {
                if (INTENTO[i] === palabra[i]) {
                    (INTENTO[i], "VERDE")
                } else if (palabra.includes(INTENTO[i])) {
                    (INTENTO[i], "AMARILLO")
                } else {
                    (INTENTO[i], "GRIS")
                }
            }
            intentos--
            if (intentos == 0) {
                setTimeout(terminar("Se acabaron los intentos"), 1000)
            }



            Limpiar--
            if (Limpiar == 0) {
                GRID.innerHTML = "";
                Limpiar = 7
            }

            //----------------------------------------Pistas-------------------------------------------------------------------------------------

            const button5 = document.getElementById("Pistas");

            button5.addEventListener("click", intentarPistas);
            let Cantidad = 7

            function intentarPistas() {

                const GRID2 = document.getElementById("grid2");
                const ROW2 = document.createElement('div');
                const INTENTO2 = leerIntentoPistas();
                ROW2.className = 'row2';
                for (let i in palabra) {
                    const SPAN2 = document.createElement('span');
                    SPAN2.className = 'letter2';
                    if (INTENTO2[i] === palabra[i]) {
                        SPAN2.innerHTML = INTENTO2[i];
                        SPAN2.style.backgroundColor = '#1abc9c';

                    } else if (palabra.includes(INTENTO2[i])) {
                        SPAN2.innerHTML = INTENTO2[i];
                        SPAN2.style.backgroundColor = '#f1c40f';
                    }
                    else {
                        SPAN2.innerHTML = INTENTO2[i];
                        SPAN2.style.backgroundColor = '#34495e';
                    }

                    ROW2.appendChild(SPAN2)
                }
                GRID2.appendChild(ROW2);
                if (INTENTO2 === palabra) {
                    let contenedor = document.getElementById("MensajePistas")
                    contenedor.innerHTML = "La entrada coindice con la palabra"

                }

                for (let i in palabra) {
                    if (INTENTO2[i] === palabra[i]) {
                        (INTENTO2[i], "VERDE")
                    } else if (palabra.includes(INTENTO2[i])) {
                        (INTENTO2[i], "AMARILLO")
                    } else {
                        (INTENTO2[i], "GRIS")
                    }
                }
                Cantidad--
                if (Cantidad == 0) {
                    terminarIntentos("Se acabaron las pistas") 
                    GRID2.innerHTML = ""
                }
            
            }


            //-----------------------------------------------------------------------------------------------------------------------------



        }

    }
    function leerIntento() {
        let intento = document.getElementById("Entrada");
        intento = intento.value;
        intento = intento.toUpperCase();
        if (intento.length == 7) {
            return intento
        }
        else {
            alert("ingrese palabra de 7 letras")
        }

    }

    function leerIntentoPistas() {
        let intentoPistas = document.getElementById("EntradaPistas")
        intentoPistas = intentoPistas.value;
        intentoPistas = intentoPistas.toUpperCase();
        if (intentoPistas.length == 7) {
            return intentoPistas
        }
        else {
            alert("ingrese palabra de 7 letras")
        }

    }
    function terminarIntentos(mensaje) {
        const BOTON2 = document.getElementById("Pistas");
        const INPUT2 = document.getElementById("EntradaPistas");
        INPUT2.disabled = true;
        BOTON2.disabled = true;
        let contenedor = document.getElementById('MensajePistas');
        contenedor.innerHTML = mensaje;
    }

    function terminar(mensaje) {

        const INPUT = document.getElementById("Entrada");
        const BOTON = document.getElementById("Probar");
        INPUT.disabled = true;
        BOTON.disabled = true;
        let contenedor = document.getElementById('Contenido');
        contenedor.innerHTML = mensaje;
    }




    window.addEventListener('load', init);
    function init() {
        console.log('Esto se ejecuta solo cuando se carga la pagina web')
    }


    const Button = document.getElementById("Reset");
    Button.addEventListener("click", reiniciar);
    function reiniciar() {
        window.location.reload();
    }

})