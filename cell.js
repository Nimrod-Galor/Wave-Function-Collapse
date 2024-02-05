class Cell {
    constructor(value) {
        this.collapsed = false;
        this.options = [];
        for (let i = 0; i < value; i++) {
            this.options[i] = i;
        }
    }
}