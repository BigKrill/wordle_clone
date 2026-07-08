let letters = 5;
let guesses = 6;
let currentGuess = 0;

let board = document.querySelector("#board")

for(let i = 0; i < guesses; i++){
    let boxRow = document.createElement("ul");
    boxRow.setAttribute("class", "box-rows");
    boxRow.dataset.id = i;

    for(let j = 0; j < letters; j++){
        let box = document.createElement('li')
        box.setAttribute("class", "box")

        box.dataset.id = "row" + j
        boxRow.append(box)
    }

    board.append(boxRow)
}


// each guess row has a different id to identify what row to type to