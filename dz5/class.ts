class CarClass {
    weight;
    volume;
    power;
    expense;
    max_speed;

    constructor(config) {
        Object.assign(this, config);

        this.expense = this.power / this.weight; //на л на 100 км
        this.max_speed = this.power / (this.weight / 400);
    }

    //distance в км
    race(distance : number) {
        let max_race = this.expense * this.volume;

        if (distance > max_race) return 'не доедет';
        let time = distance / this.max_speed;
        let h = Math.floor(time);
        let m = (time - h) * 60;
        let s = ( m - Math.floor(m)) * 60;
        let ms = ( s - Math.floor(s)) * 1000;

        return `${h}:${Math.floor(m)}:${ Math.floor(s)}.${Math.floor(ms)}`

    }
}
let params = {
    weight : 2300,
    volume : 100,
    power : 950,
};
let car1 = new CarClass(params);
console.log(car1.race(30));
