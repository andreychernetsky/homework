sayWord(3, 5, 3, 4, 3, 9, 10, 3, 3, 'Word1 Word2 Word3 Word4 Word5');

function sayWord(...args) {
    if (args.length < 1) {
        throw new Error('array inspected');
    }
    let str = args[args.length - 1];
    if (typeof str !== 'string') {
        throw new Error('last item should be typeof string');
    }
    str = str.split(' ');
    let delay;
    let lastIndex = args.length - 1;
    for (let i = 0; i < str.length; i++) {
        if (i < lastIndex) {
            delay = args[i];
        }
        writeToConsole(`string = ${str[i]}, delay = ${delay}`, toSeconds(delay));
    }
}

function writeToConsole(str, delay) {
    setTimeout(() => {
        console.log(str);
    }, delay);
}

function toSeconds(ms) {
    let tmp = parseInt(ms);
    if(isNaN(tmp)) throw new Error('has already been declared');
    return tmp * 1000;
}