import Moment from 'moment';
import moment from 'moment-timezone';

export function calcArgbIntValFromHexRgba(rgbaStr) {
  if (!rgbaStr) return 0;
  const argbWithoutHash = rgbaStr.replace('#', '');
  const r = parseInt(argbWithoutHash.substring(0, 2), 16);
  const g = parseInt(argbWithoutHash.substring(2, 4), 16);
  const b = parseInt(argbWithoutHash.substring(4, 6), 16);
  let aStr = 'FF';
  if (argbWithoutHash.length > 6) {
    aStr = argbWithoutHash.substring(6, 8);
  }
  const a = parseInt(aStr, 16);
  const intVal = (a << 24) + (r << 16) + (g << 8) + (b << 0);
  return intVal;
}
export function convertHexToRgbA(hexVal) {
  var ret;

  // If the hex value is valid.
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexVal)) {
    // Getting the content after '#',
    // eg. 'ffffff' in case of '#ffffff'
    ret = hexVal.slice(1);

    // Splitting each character
    ret = ret.split('');

    // Checking if the length is 3
    // then make that 6
    if (ret.length == 3) {
      var ar = [];
      ar.push(ret[0]);
      ar.push(ret[0]);
      ar.push(ret[1]);
      ar.push(ret[1]);
      ar.push(ret[2]);
      ar.push(ret[2]);
      ret = ar;
    }

    // Starts with '0x'(in hexadecimal)
    ret = '0x' + ret.join('');

    // Converting the first 2 characters
    // from hexadecimal to r value
    var r = (ret >> 16) & 255;

    // Converting the second 2 characters
    // to hexadecimal to g value
    var g = (ret >> 8) & 255;

    // Converting the last 2 characters
    // to hexadecimal to b value
    var b = ret & 255;

    // Appending all of them to make
    // the RGBA value
    return 'rgba(' + [r, g, b].join(',') + ',1)';
  }
}
export function formatDate(
  dateString,
  formatString = 'YYYY-MM-DD',
  fromFromString,
) {
  if (!dateString) {
    return '/';
  }
  let momentObj = Moment(dateString);
  if (fromFromString) {
    momentObj = Moment(dateString, fromFromString);
  }
  const momentString = momentObj.format(formatString);
  if (momentString == 'Invalid date') return dateString;
  return momentString;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function pluralFormat(string = 'days', amount) {
  return amount > 1 ? string : string.substring(0, string.length - 1);
}

export function diffFormat(startDate, endDate, type = 'days') {
  if (!startDate || !endDate) {
    return `0 ${type}`;
  }
  const momentStart = Moment(startDate);
  const momentEnd = Moment(endDate);
  const momentDiff = Moment.duration(
    momentEnd.diff(momentStart, type, false),
  ).asDays();
  if (momentDiff == 'Invalid date') return '/';
  return `${parseInt(momentDiff)} ${capitalizeFirstLetter(
    pluralFormat(type, parseInt(momentDiff)),
  )}`;
}

export function formatCurrency(currency, currencyType) {
  if (!currency) return '/';
  return `£${currency}`;
}

export function formatNumber(count) {
  if (count > 1000) {
    const thousands = Math.floor(count / 1000);
    return thousands + 'k';
  }
  return count;
}

export function formatPeriod(
  startDate,
  endDate,
  formatString = 'YYYY-MM-DD',
  timezone = '',
) {
  return (
    formatDate(startDate, formatString) +
    '~' +
    formatDate(endDate, formatString) +
    ' ' +
    timezone
  );
}

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

export const formattedNumber = num => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export const getBasketDateTime = () => {
  var currentTime = moment().format('DD MMMM YYYY HH:mm');
  return currentTime;
};
export const getDateTime = () => {
  var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
  return currentTime;
};
