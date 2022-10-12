const date = require('date-and-time');

/*
0: 'domingo',
1: 'lunes',
2: 'martes',
3: 'miércoles',
4: 'jueves',
5: 'viernes',
6: 'sábado' */

const obtenerPosiblesDias = () => {
    const hoy = new Date();
    let days = [];
    for (let i = 1; i <= 14; i++) {
        let tempDay = date.addDays(hoy, i);
        days.push(date.format(tempDay, 'MM-DD-YYYY'));
    };
    
    days = days.filter(day => {
        if (new Date(day).getDay() !== 0 && new Date(day).getDay() !== 6) {
            return day;
        }
    });
    return days;
}

module.exports = obtenerPosiblesDias;