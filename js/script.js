/*
Consegna:
1.Dai tre array contenenti:
 - una lista ordinata di 5 immagini,
 - una lista ordinata dei relativi 5 luoghi e
 - una lista di 5 news,
 creare un array di oggetti (manualmente)
2. aggiornare il codice con i nuovi valori
3. aggiungere allo slider una timing function per far partire lo slider in automatico (con un bottone per fermarlo)
4. refactoring
*/

// CREO ARRAY DI OGGETTI

const items = [
  {
    immagine: "img/01.jpg",
    title: "Svezia",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.",
  },
  {
    immagine: "img/02.jpg",
    title: "Svizzera",
    text: "Lorem ipsum",
  },
  {
    immagine: "img/03.jpg",
    title: "Gran Bretagna",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
  {
    immagine: "img/04.jpg",
    title: "Germania",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,",
  },
  {
    immagine: "img/05.jpg",
    title: "Paradise",
    text: "Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,",
  },
];

//variabile per raccogliere tutto l'html che va in items-container
let itemTemplate = "";

//variabile per raccogliere tutto l'html che va in thumbs-container
let thumbTemplate = "";

// preparo una varibile con l'indice dell'elemento attivo e la pongo inizialmente a 0 ovvero il primo elemento dell'array
let currentIndexActive = 0;

//eseguo il ciclo for sull'array delle immagini (items) e popolo l'html delle due varibaili da stampare nei due contenitori (immagini e thumbnails)
for (let i = 0; i < items.length; i++) {
  let classActive = "";
  if (i === currentIndexActive) {
    classActive = "active";
  }
  itemTemplate += `
  <div class="item ${classActive}">
    <img src="${items[i].immagine}" />
      <div class="title">
        <h2>${items[i].title}</h2>
        <p>${items[i].text}</p>
      </div>
  </div>`;
  thumbTemplate += `
  <div class="thumb ${classActive}">
    <img src="${items[i].immagine}" alt="" />
  </div>`;
}
//console.log(thumbTemplate);
// metto in due variabili rispettivamente i contenitori che si trovano nell'html
const itemsContainer = document.querySelector(".items-container");
const thumbsContainer = document.querySelector(".thumbs-container");
//console.log(itemContainer);

//stampo l'html corrispondente nei due contenitori
itemsContainer.innerHTML = itemTemplate;
thumbsContainer.innerHTML += thumbTemplate;
//document.querySelector(".item").classList.add("active");

//PULSANTI PER SCORRERE MANUALMENTE LO SLIDE
//.next .fa-circle-chevron-down
//.prev .fa-circle-chevron-up
//metto nelle variabili next e prev i due pulsanti
const next = document.querySelector(" .fa-circle-chevron-down");
const prev = document.querySelector(" .fa-circle-chevron-up");
//console.log(next, prev);

// FRECCIA IN GIU'
function slideDown() {
  //prendere immagine con currentIndexActive e togliere classe active
  const imgs = document.getElementsByClassName("item");
  imgs[currentIndexActive].classList.remove("active");
  const thumbs = document.getElementsByClassName("thumb");
  thumbs[currentIndexActive].classList.remove("active");
  //console.log(imgs);
  if (currentIndexActive === 4) {
    currentIndexActive = 0;
  } else {
    currentIndexActive++;
  }
  //console.log(currentIndexActive);
  imgs[currentIndexActive].classList.add("active");
  //console.log(currentIndexActive);
  thumbs[currentIndexActive].classList.add("active");
}

// FRECCIA IN SU
function slideUp() {
  const imgs = document.getElementsByClassName("item");
  // imgs[currentIndexActive].addEventListener("click", stopTimer);
  imgs[currentIndexActive].classList.remove("active");
  // console.log(imgs[currentIndexActive], "aooo");
  // imgs[currentIndexActive].addEventListener("click", stopTimer);
  const thumbs = document.getElementsByClassName("thumb");
  thumbs[currentIndexActive].classList.remove("active");
  //console.log(imgs);
  if (currentIndexActive === 0) {
    currentIndexActive = items.length - 1;
  } else {
    currentIndexActive--;
  }
  //console.log(currentIndexActive);
  imgs[currentIndexActive].classList.add("active");
  //console.log(currentIndexActive);
  thumbs[currentIndexActive].classList.add("active");
}

// FUNZIONE CHE MI PERMETTE DI SELEZIONARE L'IMMAGINE PRINCIPALE DIRETTAMETNE DALLA SUA MINIATURA.
const thumbs = document.getElementsByClassName("thumb");
const imgs = document.getElementsByClassName("item");

for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].classList.add("pointer");
  thumbs[i].addEventListener("click", changeOnClick);
}

function changeOnClick() {
  for (let i = 0; i < thumbs.length; i++) {
    if (this === thumbs[i]) {
      imgs[currentIndexActive].classList.remove("active");
      thumbs[currentIndexActive].classList.remove("active");
      currentIndexActive = i;
      imgs[currentIndexActive].classList.add("active");
      thumbs[currentIndexActive].classList.add("active");
    }
  }
}

next.addEventListener("click", slideDown);
prev.addEventListener("click", slideUp);

// FUNZIONE CHE IMPOSTA LO SCORRIMENTO AUTOMATICO DELLO SLIDER
let sliderTimer = setInterval(slideUp, 3000);


//FUNZIONI CHE AL CLICK DEL BOTTONE STOPPANO LA RIPRODUZIONE AUTOMATICA/LA FANNO RIPARTIRE
const timerButton = document.getElementById("button");
timerButton.classList.add("bg-red");
timerButton.addEventListener("click", stopTimer);

function stopTimer() {
  console.log("Stopped");
  clearInterval(sliderTimer[0]);
  timerButton.removeEventListener("click", stopTimer);
  clearInterval(sliderTimer);
  timerButton.addEventListener("click", startTimer);
  timerButton.innerText = "S T A R T";
  timerButton.classList.add("bg-green");
}

function startTimer() {
  sliderTimer = setInterval(slideUp, 3000);
  console.log("Started");
  timerButton.removeEventListener("click", startTimer);
  timerButton.addEventListener("click", stopTimer);
  timerButton.innerText = "S T O P";
  timerButton.classList.remove("bg-green");
  timerButton.classList.add("bg-red");
  // console.log(sliderTimer);
}
