import DB from "./DB.js";

class Word {
    constructor(_data){
        this.words = _data.words;
    }

    static async findAll(){
        let db = new DB();
        let wordData = await db.getDataFromJSON("./data/words.json");
        console.log(wordData.words)
        let words = wordData.map((word) => new Word(word));

        return words;
    }   
}

export default Word;