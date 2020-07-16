//Variables
const listaTweets = document.getElementById("lista-tweets");

eventListeners();

function eventListeners() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  //Eliminar tweet
  listaTweets.addEventListener("click", EliminarTweet);

  //Contenido Cargado
  document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones

/**FUNCION PRINCIPAL PARA AGREGAR LA TAREA */
        function agregarTweet(e) {
        e.preventDefault();
        const tweet = document.getElementById("tweet").value;
        console.log(tweet);

        //Crear boton para eliminar
        const boton = document.createElement("a");
        boton.classList = "botonEliminar";
        boton.innerText = "X";

        //Agregar el tweet a una lista
        const li = document.createElement("li");
        li.innerText = tweet;

        li.appendChild(boton);

        listaTweets.appendChild(li);

        agregarTweetLocalStorage(tweet);
        }

//Eliminar tweet
function EliminarTweet(e) {
  e.preventDefault();
  if (e.target.className === "botonEliminar") {
    e.target.parentElement.remove();
    eliminarLocalStorage(e.target.parentElement.innerText);
    console.log(e.target);
  }
}

//Agregar al local storage

function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerLocalStorage();
    tweets.push(tweet);
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function obtenerLocalStorage() {
  let tweets;
  if(localStorage.getItem('tweets') === null){
      tweets = [];
  }else{
      tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function localStorageListo(){
    let tweets;
    tweets = obtenerLocalStorage();

    tweets.forEach(function(tweet){
        //Crear boton para eliminar
        const boton = document.createElement("a");
        boton.classList = "botonEliminar";
        boton.innerText = "X";

        //Agregar el tweet a una lista
        const li = document.createElement("li");
        li.innerText = tweet;

        li.appendChild(boton);

        listaTweets.appendChild(li);
    })
}


//Eliminar tweets de LS
function eliminarLocalStorage(tweet){
    let tweets, tweetBorrar;
    tweets = obtenerLocalStorage();
    tweetBorrar = tweet.substring(0,tweet.length - 1);

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1)
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}