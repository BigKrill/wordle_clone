let letters = 5;
let guesses = 6;
let currentGuess = 1;
let currentLetter = 0


let guessString = []


let board = document.querySelector("#board")
let keyboard = document.querySelector("#keyboard")

for(let i = 1; i <= guesses; i++){
    let boxRow = document.createElement("ul");
    boxRow.setAttribute("class", "box-letters");
    boxRow  .id = "guess" + (i);

    for(let j = 1; j <= letters; j++){
        let box = document.createElement('li')
        box.setAttribute("class", "box")


        box.dataset.id = "letter" + j
        boxRow.append(box)
    }

    board.append(boxRow)
}

addEventListener("keyup", function(e){ 
    // console.log(guessString)
    guess = document.getElementById("guess"+currentGuess)
    // console.log(currentLetter)

    // console.log(e)
    if(e.key == "Enter"){
        if(currentGuess <= guesses){
            if(currentLetter == letters){
                let word = "hello"
                word = word.split("")
                for(let i = 0; i < letters; i++){
                    let correct = false
                    let present = false
                    if(word.indexOf(guessString[i]) == i){
                        correct = true
                        word[i] = ""
                    } else if (word.indexOf(guessString[i]) != -1){
                        present = true
                        word[word.indexOf(guessString[i])] = ""
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
                console.log("Guessed!")

                if(currentGuess == guesses){
                    console.log("All guesses used")
                }
            }else{
                console.log("not enough letters")
            }
        } else {
            console.log("no more guesses")
        }
    }

    if(e.key == "Backspace"){
        
        if(currentLetter > 0){
            guessString.pop();
            console.log(currentLetter)
            guess.children[currentLetter-1].innerHTML = "";
            currentLetter--;
        } 

    }
})

keyboard.addEventListener("click", function(event){
    let selectedKey = event.target.closest(".button")
    if(currentLetter < letters){
        guess = document.getElementById("guess"+currentGuess)
        guessString.push(selectedKey.id)
        
        guess.children[currentLetter].innerHTML = selectedKey.id
        currentLetter++ 
    }
})

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