

export function validateEmail(text) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log('error', e);
      return false;
    }
}



export const validateMsisdn = barcode => {
    console.log(barcode);
    if (!/(^\d{11}$)/.test(barcode)) {
      console.log('validate barcode false');
      return false;
    }
    console.log('validate barcode true');
    return true;
};

export const validateNumber = num => {
    if(num === ''){
        return false;
    }
    if( isNaN(num)){
        return false;
    }
    return true;
};



export const validateDecimal = (value) => {
  
  var validNumber = new RegExp(/^\d*\.?\d*$/); // for dot
  //var validNumber = new RegExp(/^\d*\,?\d*$/); // for comma
  if (validNumber.test(value)) {
    return true;
  } else {
    return false;
  }

}
