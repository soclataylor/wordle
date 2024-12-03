/*
        WORDLE BY TAYLOR
        SIMULACRO3 EXAMEN UF1
        Mariona Batalla Taylor
*/
var palabrasDe5Letras=["fresa", "farsa", "fanta", "pizza", "sueño", "carne", "tacon", "abeja", "cabra", "barco", "perro", "leche", "oasis", "pelon", "igual", "bomba", "ayuda", "libro"];

//cogeremos una palabra aleatoriamente del array palabrasDe5Letras, que será la palabra a adivinar:
var elRandom=Math.floor(Math.random()*palabrasDe5Letras.length);
//console.log("Tenemos "+palabrasDe5Letras.length+" palabras posibles de 5 letras");
//console.log("El numero random es:S "+elRandom);

var palabraString=palabrasDe5Letras[elRandom];
palabraString=palabraString.toUpperCase();

//pasamos el String a un array:
var palabra=palabraString.split('');
console.log("La palabra elegida es: "+palabraString);

var intento=1; //el primer intento

//seleccionar una aleatoria y usarla
//var palabra= ['F','R','E','S','A']; //de momento haremos un array de letras para constituir una palabra

var palabraUsuario = [];

//ahora construiremos una estructura para almacenar las letras y las veces que aparecen en la palabra:
let cuantasVeces =
[
    {
        //LETRA1:
        letra: "",
        veces: "",
    },
    {
        //LETRA2:
        letra: "",
        veces: "",
    },
    {
        //LETRA3:
        letra: "",
        veces: "",
    },
    
    {
        //LETRA4:
        letra: "",
        veces: "",
    },

    {
        //LETRA5:
        letra: "",
        veces: "",
    },
];

//RELLENAMOS AUTOMÁTICAMENTE LA ESTRUCTURA ANTERIOR SEGÚN LA PALABRA SOLUCIÓN: -OK
//recorremos el array palabra y contamos cada letra con el string y la función 
for(var i=0;i<palabra.length;i++)
{
    //primero comprobamos si ya existe esta letra, con la función some de JavaScript
    if(!cuantasVeces.some(obj=> obj.letra===palabra[i]))
    {
        //console.log("NO EXISTE LA LETRA "+palabra[i]);
        //si no existe, entonces cargamos una nueva letra:
        cuantasVeces[i].letra=palabra[i];
        //y contamos las veces que se repite en la palabra
        cuantasVeces[i].veces=cuantasVecesLetra(palabra[i]);
        //console.log("La letra "+palabra[i]+" se repite "+cuantasVecesLetra(palabra[i]));
        //si la letra ya consta en el array, obviamos
    }
    //else console.log("SI EXISTE LA LETRA "+palabra[i]);
}

//AL CLICAR CHECK: SE GUARDA LA PALABRA PROPUESTA POR EL USUARIO Y SE COMPRUEBA -OK
//cuando clicamos el botón de check, almacena las letras del usuario y comprueba el resultado
document.getElementById("check").addEventListener('click',function()
{
    //console.log("VAMOS A COMPROBAR!");
    almacenarLetrasUsuario();
    console.log("El array de palabra del usuario es: "+palabraUsuario);
    comprobar();
}
);

//ALMACENAMOS LAS LETRAS QUE HA ENTRADO EL USUARIO A PALABRAUSUARIO-OK
function almacenarLetrasUsuario()
{
    //hacemos una función para asignar las letras en el array con la palabra del usuario
    //se llama cuando el usuario clica a comprobar, así evitamos que si modifica una letra, sólo se guarde la primera:

    for (var i=0;i<5;i++)
    {
        var objeto=document.getElementById("fila1letra"+(i+1));

        if (objeto.textContent.length > 1) 
        {
            almacenarLetra(objeto,i);
        }
    }
}

//COMPROBAMOS QUÉ COLOR DEBEN DE TENER LAS CASILLAS:
function comprobar()
{
    //console.log("ARRAY INICIAL: "+JSON.stringify(cuantasVeces)); //OK
    //console.log("Comprueba que sea correcta la palabra");
    for(var i=0;i<5;i++)
    {
        if (palabra[i].toUpperCase() === palabraUsuario[i].toUpperCase()) 
        {
            //console.log("LA LETRA "+palabraUsuario[i]+" ES CORRECTA EN SU POSICIÓN");
            esCorrecta(i+1); //marcamos en verde
            //restamos una unidad a las veces que sale esta letra (para en un futuro evitar que marque letras que ya han salido)
            decrementarVeces(palabra[i]);//restamos uno al número de veces de la letra, a modo de controlar

            //console.log("**LA LETRA "+palabraUsuario[i]+" está en posicioón correcta");
        }
        else //si no es igual (misma posición):
        {

            //mirar si la contiene, pero en otra posición, ojo con los duplicados
            //if((contieneLetra(palabraUsuario[i]))&&(vecesMayorQueCero(palabraUsuario[i])))//si la contiene y, el atributo veces es mayor que 0
            //miramos si contiene la letra:
            if(contieneLetra(palabraUsuario[i]))
            {
                console.log("La letra "+palabraUsuario[i]+" se encuentra en la solución"); //pero no tiene la posición correcta

                //sabemos que está, pero no está en esa posición.
                //comprobamos si en la misma posición donde se encuentra esta letra en la palabra solución se encuentra la misma letra en la palabra del usuario
                //buscamos el índice donde se encuentra esta letra en la palabra original:
                var indice=palabraString.indexOf(palabraUsuario[i].toUpperCase()); //ESTO NO LO HACE BIEN!!
                console.log("La letra "+palabraUsuario[i]+" se encuentra en el indice de la palabra original: "+indice);

                //console.log("Esta letra se encuentra en el índice: "+indice);
                //si coinciden y ç
                //if((palabraUsuario[indice]===palabra[indice]) &&(vecesMayorQueCero(palabraUsuario[i])))
                if((palabraUsuario[indice])===palabra[indice])
                {
                   esIncorrecta(i+1); //ya tiene una coincidencia
                }
                else correctaMalPuesta(i+1); //entones es correcta pero está mal puesta:color naranja
                //si es que si: recuperamos el índice, y lo marcamos como correcto - disminuyendo "veces"
                //(esto antes) si veces=0, marcamos como incorrecta
                //si es que no, 
                
                //decrementarVeces(palabra[i]);//restamos uno al número de veces de la letra, a modo de controlar
            } 

            else //no la contiene
            {
                esIncorrecta(i+1);
                //console.log("LA LETRA "+palabraUsuario[i]+" NO SALE!");//entonces es incorrecta
            }
        } 
    }
    intento++;
    activarCasillasIntento(intento);
}

//SI ES CORRECTA: VERDE
function esCorrecta(casilla)
{
    document.getElementById("fila1letra"+casilla).style.backgroundColor="rgb(0, 255, 119)";
}
//SI ES INCORRECTA: ROJO
function esIncorrecta(casilla)
{
    document.getElementById("fila1letra"+casilla).style.backgroundColor="#ed3d57";
}
//SI ES CORRECTA PERO NO EN SU POSICIÓN: NARANJA
function correctaMalPuesta(casilla)
{
    document.getElementById("fila1letra"+casilla).style.backgroundColor="orange";
}

//ALMACENAMOS LA LETRA QUE HA ENTRADO EL USUARIO A PALABRAUSUARIO
function almacenarLetra(objeto,indice)
{
    //ALMACENA LA LETRA QUE HA ENTRADO EL USUARIO EN EL ARRAY PALABRA USUARIO: 
    //nos sucede que el usuario puede entrar más de un carácter
    //he buscado y podemos acotarlo así:
    if (objeto.textContent.length > 1) 
    {
            objeto.textContent = objeto.textContent.slice(0, 1); // Limita el contenido a una sola letra (la última)
            //this.textContent esto contendrá la última letra que ha entrado el usuario
            //la almacenamos como mayúscula, porque la palabra original está en mayúsculas
            palabraUsuario[indice]=objeto.textContent.toUpperCase();
    }
}

//COMPRUEBA SI LA PALABRA SOLUCIÓN CONTIENE UNA LETRA
function contieneLetra(letra)
{
    letraMayus=letra.toUpperCase();
    console.log("Miramos si palabrastring ("+palabraString+") contiene la letra "+letra);
    return ((palabraString.toUpperCase()).includes(letraMayus));
}

//NOS DICE CUANTAS VECES APARE UNA LETRA EN LA PALABRA SOLUCIÓN
function cuantasVecesLetra(letra)
{
    letra=letra.toUpperCase();
    var totalVeces=0;//inicalizamos el número de veces a 0
    //console.log("comprobamos la letra "+letra);
    //console.log("Le hemos pasado la letra: "+letra);
    //console.log("Palabra string es : "+palabraString);

    for (var i=0;i<palabraString.length;i++)
    {
        //console.log("La letra que está en la posición "+i+" es "+palabraString.charAt(i));
        if(palabraString.charAt(i).toUpperCase()===letra)
        {
            totalVeces++;
            //console.log("La letra "+letra+" se repite "+totalVeces);//OK
        }
    }
    return totalVeces;
}

//DECREMENTAMOS EL NÚMERO DE VECES DE UNA LETRA, EN LA ESTRUCTURA COMODÍN:
function decrementarVeces(letra)
{
    let letraADecrementar=cuantasVeces.find(obj=>obj.letra===letra); //recuperamos el objeto que coincide con la letra
    if(letraADecrementar) letraADecrementar.veces--; //para poder modificarle el atributo veces (disminuyéndolo)
    console.log("El array AHORA queda así: "+JSON.stringify(cuantasVeces));
}

//comprueba si el número de veces de la estructura que hemoso creado para almacenar las repecitiones es mayor que 0, dada una letra:
function vecesMayorQueCero(letra) 
{
    let letraComprobar=cuantasVeces.find(obj=>obj.letra===letra); //recuperamos el objeto que coincide con la letra
    return letraComprobar.veces>0; //devolvemos true si es mayor que 0, falso en caso contrario
}

function activarCasillasIntento(num)
{
    console.log("Activamos las casillas del intento "+num);
    for(var j=0;j<5;j++)
    {
        document.getElementById("fila"+num+"letra"+(j+1)).contentEditable=true;
    }
    
}