function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// reggex
const reggexPrenom = /[a-zA-Z]{2,}/;
const reggexNom = /[a-zA-Z]{2,}/;
const reggexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const reggexNumber = /[0-9]/;

// message d'erreure

const twoCharMsg =
  "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const mailMsg = "Veuillez entrer une adresse e-mail valide.";
const birthMSg = "Vous devez entrer votre date de naissance.";
const quantityMsg ="Vous devez nous dire a combien de tournois GameOn vous avez participé.";
const locationMsg = "Vous devez choisir une option.";
const conditionsMsg = "veuillez accepter les conditions d'utilisations";

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");

//les inputs

var prenom = document.getElementById("first");
var nom = document.getElementById("last");
var mail = document.getElementById("email");
var birthdate = document.getElementById("birthdate");
var quantity = document.getElementById("quantity");
const conditions = document.getElementById("checkbox1");

//les balises d'erreures
var prenomErr = document.querySelector(".prenom");
var nomErr = document.querySelector(".nom");
var mailErr = document.querySelector(".mail");
var birthdateErr = document.querySelector(".naissance");
var quantityErr = document.querySelector(".quantite");
var lieuErr = document.querySelector(".lieu");
var conditionsErr = document.querySelector(".conditions");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", () => {
  closeModal();
  // display none les balises d'erreures en cas de fermeture de la modale
  let errors = document.querySelectorAll(".err");
  errors.forEach((e) => (e.style.display = "none"));
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  clearForm()

}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// checker la validité d'un champ
function checkValidity(id, reggex, err, msg) {
  const test = id.value;
  console.log("valeur de " ,id.name,": ", test);
  if (!reggex.test(test)) {
    console.log("le champ n'est pas valide");
    console.log("");

    err.textContent = msg;
    isValidated = 1;
  } else {
    err.textContent = "";
  }
}

// checker la validité du champ lcoation
function checkLocation(err) {
  var location = document.getElementsByName("location");
  let i = 0;
  location.forEach((e) => {
    if (e.checked) {
      i = i + 1;
      console.log(e.value);
    }
  });
  if (i === 0) {
    isValidated = 1;

    err.textContent = locationMsg;
  } else {
    err.textContent = "";
  }
}

// checker la validité du champ conditions d'utilisation
function checkCondtions(err) {
  if (!conditions.checked) {
    isValidated = 1;
    err.textContent = conditionsMsg;
  } else {
    err.textContent = "";
  }
}

// mise en place de la mdoale de confirmation => display none sur la 1ere modale + injection de la nouvelle de manière dynamique
function replaceModal() {
  document.querySelector(".form").style.display="none";
  const modal = document.querySelector(".modal-body");
  const newModal= document.createElement('div')
  newModal.classList.add("container-second-modal")
  newModal.innerHTML=`<p class="text-confirmation"> Merci pour votre inscription </p> <button value="Fermer" onClick="closeModal()" class="btnclose">Fermer</button>`
  modal.appendChild(newModal)
}
// function clear form lors de la reouverture et supprimer l'element de confirmation pour pouvoir réouvrir le formulaire
function clearForm(){
  const form = document.querySelector('.form')
  
  if(document.querySelector('.container-second-modal')){
    const secondModal = document.querySelector('.container-second-modal')
    secondModal.remove()
  }
  form.reset()
  form.style.display='block'
  
}
// init submit => remove default event => check form => link to the second modal if the form is validated
let isValidated = 0;

submitBtn.addEventListener("click", (e) => {
  isValidated = 0;
  e.preventDefault();
  console.log("-------------- input ---------------------");

  checkValidity(prenom, reggexPrenom, prenomErr, twoCharMsg);
  checkValidity(nom, reggexNom, nomErr, twoCharMsg);
  checkValidity(mail, reggexMail, mailErr, mailMsg);
  checkValidity(birthdate, reggexNumber, birthdateErr, birthMSg);
  checkValidity(quantity, reggexNumber, quantityErr, quantityMsg);
  checkLocation(lieuErr);
  checkCondtions(conditionsErr);

  if (isValidated === 0) {
    console.log("modale suivante");
    replaceModal();
  } else {
    console.log("on reste sur cette modale => il y'a tjr des err ");
  }
});
