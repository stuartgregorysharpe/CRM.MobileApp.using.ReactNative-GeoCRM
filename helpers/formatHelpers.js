import Moment from 'moment';

export function formatDate(
  dateString,
  formatString = 'YYYY-MM-DD',
  fromFromString = 'YYYY-MM-DD',
) {
  if (!dateString) {
    return '/';
  }
  const momentObj = Moment(dateString, fromFromString);
  const momentString = momentObj.format(formatString);
  if (momentString == 'Invalid date') return '/';
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

export function validateEmail (text){  
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  try{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {    
      return false;
    }
    else {
      return true;
    }
  }catch(e){
    console.log("error",e)
    return false;
  }
  
}

