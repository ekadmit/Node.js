const { green, yellow, red } = require("colors/safe");

const isPrime = (number) => {
    // 1 не простое число
    if (number < 2) return false;

    for (let i = 2; i <= number / 2; i++) {
        if (number % i === 0) return false;
    }

    return true;
};

const getColor = (n) => {
    switch (n % 3) {
        case 0:
            return green;
        case 1:
            return yellow;
        case 2:
            return red;
    }
};

const from = process.argv[2];
const to = process.argv[3];

if (!(isFinite(from) && isFinite(to))) {
    console.error(red("Входные параметры должны быть числами!!!"));
    process.exit(1);
}

let count = 0;

for (let i = from; i <= to; i++) {
    if (isPrime(i)) {
        const coloring = getColor(count);
        console.log(coloring(i));
        count++;
    } else if (from > to){
        console.log("Сначала укажите наименьшее число");
    }
}

if (count === 0) {
    console.log(yellow(`Вы не указали простых чисел!`));
}

