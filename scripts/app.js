import DB from "./classes/DB.js"
// import Word from "./classes/Words.js"
// let words = await Word.findAll()

let db = new DB();
let wordData = await db.getDataFromJSON("./data/words.json");
let words = wordData.words
let wordIndex = Math.floor(Math.random() * words.length)

let letters = 5;
let guesses = 6;
let currentGuess = 1;
let currentLetter = 0
let guessString = []
let guess = document.getElementById("guess"+currentGuess)

let board = document.querySelector("#board")
let keyboard = document.querySelector("#keyboard")

start()


function start(){
    makeBoard()
    getWord()
}

function getWord(){
    let wordIndex = Math.floor(Math.random() * words.length)
}

function makeBoard(){
    if(document.getElementById("#board")){
        document.getElementById("#board").remove()
    }

    for(let i = 1; i <= guesses; i++){
        let boxRow = document.createElement("ul");
        boxRow.setAttribute("class", "box-letters");
        boxRow.id = "guess" + (i);

        for(let j = 1; j <= letters; j++){
            let box = document.createElement('li')
            box.setAttribute("class", "box")
            // box.id = "letter" + j

            boxRow.append(box)
        }

        board.append(boxRow)
    }
}


function guessWord(){
    if(currentGuess <= guesses){
            if(currentLetter == letters){
                let word = words[wordIndex]
                word = word.split("")
                for(let i = 0; i < letters; i++){
                    let correct = false
                    let present = false
                    if(word.indexOf(guessString[i]) == i){
                        correct = true
                        word[i] = ""
                        document.getElementById(guessString[i]).className += " correct"
                    } else if (word.indexOf(guessString[i]) != -1){
                        present = true
                        word[word.indexOf(guessString[i])] = ""
                        document.getElementById(guessString[i]).className += " present"
                    }else{
                        document.getElementById(guessString[i]).className += " absent"
                    }
                    
                    if(correct){
                        guess.children[i].className += " correct"
                    }else if(present){
                        guess.children[i].className += " present"
                    }else{
                        guess.children[i].className += " absent"
                    }
                }

                currentGuess++
                currentLetter = 0
                guessString = []
                // console.log("Guessed!")

                if(currentGuess > guesses){
                    console.log("All guesses used")
                    console.log(words[wordIndex])
                }
            } else {
                console.log("not enough letters")
            }
        } else {
            console.log("no more guesses")
        }
}


// allows for enter and backspace using the keyboard
addEventListener("keyup", function(e){ 
    if(e.key == "Enter"){
        guessWord()
    }

    if(e.key == "Backspace"){
        if(currentLetter > 0){
            guessString.pop();
            guess.children[currentLetter-1].innerHTML = "";
            currentLetter--;
        } 

    }
})

// listen for a button press on the keyboard onscreen
keyboard.addEventListener("click", function(event){
    let selectedKey = event.target.closest(".button")
    
    if(selectedKey.id == "enter"){
        guessWord()
        return;
    }

    if(selectedKey.id == "reset"){
        start();
        return;
    }

    if(selectedKey.id == "back"){
        if(currentLetter > 0){
            guessString.pop();
            guess.children[currentLetter-1].innerHTML = "";
            currentLetter--;
        } 
        return
    }

    if(currentLetter < letters){
        guess = document.getElementById("guess"+currentGuess)
        guessString.push(selectedKey.id)
        
        guess.children[currentLetter].innerHTML = selectedKey.id
        currentLetter++ 
    }
})

// typing into board
addEventListener("keypress", function(e){
    if(e.key != "Enter"){
        if(currentLetter < letters){
            guess = document.getElementById("guess"+currentGuess)
            guessString.push(e.key)
            
            guess.children[currentLetter].innerHTML = e.key
            currentLetter++ 
        }
    }
    
})

// each guess row has a different id to identify what row to type to