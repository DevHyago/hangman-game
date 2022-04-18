let difficulty;
let displaySelectLevel = document.querySelector('#select-level');
let displayGame = document.querySelector('#game');
let divTip = document.querySelector('#tip');
let tip;
let selectedPhrase;
let displayPhrase = document.querySelector('.phrase');
let correctPlayCount = 0;
let wrongMove = 0;
let buttons = document.querySelectorAll('.button');
let hangman = document.querySelector('#hangman');
let divModal = document.querySelector('#end-game');


document.querySelector("#difficulty").addEventListener('click', () => {
   let select = document.querySelector("#level");
   difficulty = select.options[select.selectedIndex].value;
   onDisplayGame();
   selectedPhrase = sortPhase();
   displayLetters(selectedPhrase);
   divTip.innerHTML = `DICA: ${tip}`;
   console.log(selectedPhrase);
});


buttons.forEach((element) => {
   element.addEventListener('click', (e) => {
      e.preventDefault();
      let buttonClick = element.innerHTML;
      element.style.cursor = 'not-allowed';
      element.disabled = true;
      element.style.background = '#8a0f07';
   
      if(selectedPhrase.includes(buttonClick)){
   
         for(let i = 0; i < selectedPhrase.length; i++){
            if(selectedPhrase[i] == buttonClick){
               document.querySelectorAll('.letter')[i].innerHTML = buttonClick;
               correctPlayCount+=1;
               console.log(correctPlayCount);
               if(correctPlayCount == selectedPhrase.length){
                  createDisplayWinner();
               }
            } 
         }
   
      }else{
         wrongMove+=1;
         if(wrongMove <= 6){
            hangman.setAttribute('src', `images/${wrongMove}.png`);
         }
         if(wrongMove == 6){
            createDisplayLoser();
         }
      }
   });
});   


function createDisplayWinner(){
   setTimeout(() => {
      divModal.style.background = 'rgba(9, 181, 69, 0.5)';
      divModal.querySelector('h1').innerHTML = 'Parabéns! Você venceu!';
      divModal.querySelector('h3').innerHTML = `A palavra é ${selectedPhrase}`;
      divModal.style.display = 'flex';
   }, 300);
   divModal.querySelector('input[type="button"]').addEventListener('click', newGame);
}

function createDisplayLoser(){
   setTimeout(() => {
      divModal.style.background = 'rgba(153, 11, 25, 0.5)';
      divModal.querySelector('h1').innerHTML = 'Infelizmente você perdeu!';
      divModal.querySelector('h3').innerHTML = `A palavra era ${selectedPhrase}`;
      divModal.style.display = 'flex';
   }, 300);
   divModal.querySelector('input[type="button"]').addEventListener('click', newGame);
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
      case 3:
         tip = "SERIE"
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

function newGame(){
   correctPlayCount = 0;
   wrongMove = 0;
   displayPhrase.innerHTML = '';
   buttons.forEach((element) => {
      element.style.cursor = 'pointer';
      element.disabled = false;
      element.style.background = '';
   });
   hangman.setAttribute('src', `images/0.png`);
   divModal.style.display = 'none';
   exitDisplayGame();
   
}