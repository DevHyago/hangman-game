let difficulty;
let displaySelectLevel = document.querySelector('#select-level');
let displayGame = document.querySelector('#game');
let divTip = document.querySelector('#tip');
let tip;
let selectedPhrase;
let displayPhrase = document.querySelector('.phrase');
let correctPlayCount = 0;


document.querySelector("#difficulty").addEventListener('click', () => {
   let select = document.querySelector("#level");
   difficulty = select.options[select.selectedIndex].value;
   onDisplayGame();
   selectedPhrase = sortPhase();
   displayLetters(selectedPhrase);
   divTip.innerHTML = `DICA: ${tip}`;
   checkIfLetter(selectedPhrase);
   console.log(selectedPhrase);
});

function checkIfLetter(str){

   let divLetter = document.querySelectorAll('.letter');
   let letters = document.querySelectorAll('.button');

   letters.forEach(element => {
      element.addEventListener('click', () => {
         let lettersSelected = element.innerHTML;

         str.split('').forEach((element, index) => {
            if(lettersSelected == element){
               divLetter[index].innerHTML = element;
               
               
            
            }
         });

      });
   })
}



function displayLetters(str){
   let createDiv = document.createElement('div');
   createDiv.classList.add('letter');
   for(let i = 0; i < str.length; i++){
      let cloneDiv = createDiv.cloneNode(false);
      if(str[i] == " "){
         cloneDiv.style.border = 'none';
         displayPhrase.appendChild(cloneDiv);
         correctPlayCount++;
      }
      displayPhrase.appendChild(cloneDiv);
   }
}

function sortPhase(){
   let positionArr = randomNumber(phrase);
   switch(positionArr){
      case 0:
         tip = "TIME";
         break;
      case 1:
         tip = "FRUTA"
         break;
      case 2:
         tip = "FILME"
         break;
      default:
         tip = "ERROR";
   }
   let sortArrPhrase = phrase[positionArr][difficulty];
   return sortArrPhrase[randomNumber(sortArrPhrase)];
}

function onDisplayGame(){
   displaySelectLevel.style.display = 'none';
   displayGame.style.display = 'flex';
}

function exitDisplayGame(){
   displaySelectLevel.style.display = 'flex';
   displayGame.style.display = 'none';
}

function randomNumber(arr){
   return Math.floor(Math.random() * arr.length)
}