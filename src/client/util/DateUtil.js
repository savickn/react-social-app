
const months = [
  'January', 
  'February', 
  'March', 
  'April', 
  'May', 
  'June', 
  'July', 
  'August', 
  'September', 
  'October', 
  'November', 
  'December', 
];

const dayMap = {
  '0': 'Monday',
  '1': 'Tuesday',
  '2': 'Wednesday', 
  
}

export const getMonthName = (monthNumber) => {
  const abbr = months[monthNumber - 1];
  //console.log('getMonthName --> ', monthNumber, abbr);
  return abbr;
}

// used to calculate 'starttime', 'endtime', and 'date' from 'evt' object
export const formatDate = (start, end) => {
  let state = {};

  const startDate = new Date(start);
  const endDate = new Date(end);
  const monthName = getMonthName(startDate.getMonth());
  const abbr = monthName.substring(0, 3);

  state['starttime'] = `${startDate.getHours()}:${startDate.getMinutes()}`;
  state['endtime'] = `${endDate.getHours()}:${endDate.getMinutes()}`;
  state['day'] = `${startDate.getDate()}`;
  state['month'] = `${monthName}`;
  state['monthAbbr'] = abbr;
  state['year'] = `${startDate.getFullYear()}`;
  state['date'] = `${monthName} ${startDate.getDate()}, ${startDate.getFullYear()}`; // e.g. March 10th, 2010
  //console.log(state);
  return state;
}




export default class DateUtil {

  static getMonthName = (monthNumber) => {
    return months[monthNumber - 1];
  }

  // returns Date as String in format 'Monday, April 20, 7:00PM'
  static getDateTime = (date) => {
    const d = new Date(date);

    return `, ,`;

  }
  

}
