class DB {
    constructor(){
        this.data = [];
    }

    async getDataFromJSON(url) {
        let res = await fetch(url);
        let data = await res.json();

        return data;
    }
}

export default DB;