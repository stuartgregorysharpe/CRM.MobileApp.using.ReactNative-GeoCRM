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

export function formatCurrency(currency) {
  if (!currency) return '-';
  const nCurrency = Number(currency).toFixed(2);
  return `R${nCurrency}`;
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

export const formattedNumber = num => {
  try {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  } catch (e) {
    return num;
  }
};

export const formattedPriceWithSpace = num => {
  try {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  } catch (e) {
    return num;
  }
};

export const formattedPrice = num => {
  try {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } catch (e) {
    return num;
  }
};
export const formattedSpacingPrice = num => {
  try {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  } catch (e) {
    return num;
  }
};

export const getConvertedDateTime = dateTime => {
  var currentTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format(
    'DD MMMM YYYY HH:mm',
  );
  return currentTime;
};

export const getConvertedDate = dateTime => {
  var currentTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format(
    'DD MMMM YYYY',
  );
  return currentTime;
};

export const getTimeStamp = () => {
  var currentTime = moment().format('YYYYMMDDHHmmss');
  return currentTime;
};

export const getTime = () => {
  var currentTime = moment().format('HH:mm');
  return currentTime;
};

export const getBasketDateTime = () => {
  var currentTime = moment().format('DD MMM YYYY HH:mm');
  return currentTime;
};

export const getCurrentDate = () => {
  var currentTime = moment().format('YYYY-MM-DD');
  return currentTime;
};

export const getDateTime = () => {
  var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
  return currentTime;
};

export const getDateTimeFromBasketTime = dateTime => {
  var currentTime = moment(dateTime, 'DD MMMM YYYY HH:mm').format(
    'YYYY-MM-DD HH:mm:ss',
  );
  return currentTime;
};

export const parseDateFromString = dtString => {
  return dtString.match(/\d{4}([.\-/ ])\d{2}\1\d{2}/);
};

export const getRandomNumber = length => {
  var max = 1;
  for (let i = 0; i < length; i++) {
    max = max * 10;
  }
  var RandomNumber = Math.floor(Math.random() * max) + 1;
  return RandomNumber;
};


export function afterDecimal(num) {

  if(num.toString() == ''){
    return 0;
  }

  if (Number.isInteger(num)) {
    return 0;
  }
  return  num.toString().split('.')[1] != undefined ? num.toString().split('.')[1].length : 0;
}
