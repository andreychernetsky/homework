let CarProto = function (config) {
    Object.assign(this, config);
    this.expense = this.power / this.weight; //на л на 100 км
    this.max_speed = this.power / (this.weight / 400);
};

CarProto.prototype.race = function (distance) {
    let max_race = this.expense * this.volume;

    if (distance > max_race) return 'не доедет';
    let time = distance / this.max_speed;
    let h = Math.floor(time);
    let m = (time - h) * 60;
    let s = ( m - Math.floor(m)) * 60;
    let ms = ( s - Math.floor(s)) * 1000;

    return `${h}:${Math.floor(m)}:${ Math.floor(s)}.${Math.floor(ms)}`
};
let p = {
    weight : 2300,
    volume : 100,
    power : 950,
};

let myCar = new CarProto(p);

console.log(myCar.race(30));
