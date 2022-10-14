const generarCorrelativo = (numero) => {
    let correlativo;
    if(numero < 10){ //9
        correlativo = `00000${numero}`;
    }else if(numero < 100){ //99
        correlativo = `0000${numero}`
    }else if(numero < 1000){  //999
        correlativo = `000${numero}`
    }else if(numero < 10000){ //9999
        correlativo = `00${numero}`
    }else if(numero < 100000){ //99999
        correlativo = `0${numero}`
    }else{
        correlativo = `${numero}`
    }
    return correlativo;
}

module.exports = generarCorrelativo;