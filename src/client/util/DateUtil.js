
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
  const abbr = months[monthNumber];
  //console.log('getMonthName --> ', monthNumber, abbr);
  return abbr;
}

// used to calculate 'starttime', 'endtime', and 'date' from 'evt' object
export const formatDate = (start, end) => {
  let state = {};

  const startDate = new Date(start);
  const endDate = new Date(end);
  const s_monthName = getMonthName(startDate.getMonth());
  const e_monthName = getMonthName(endDate.getMonth());
  const s_abbr = s_monthName.substring(0, 3);
  const e_abbr = e_monthName.substring(0, 3);

  console.log('start -- ', startDate);
  console.log('end -- ', endDate);
  
  state['starttime'] = `${startDate.getHours()}:${(startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes()}`;
  state['s_day'] = `${startDate.getDate()}`;
  state['s_month'] = `${s_monthName}`;
  state['s_monthAbbr'] = s_abbr;
  state['s_year'] = `${startDate.getFullYear()}`;
  state['s_date'] = `${s_monthName} ${startDate.getDate()}, ${startDate.getFullYear()}`; // e.g. March 10th, 2010
  
  state['sameDay'] = startDate.getFullYear() === endDate.getFullYear() &&  
                    startDate.getMonth() === endDate.getMonth() &&
                    startDate.getDate() === endDate.getDate();
  
  state['endtime'] = `${endDate.getHours()}:${(endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes()}`;
  state['e_day'] = `${endDate.getDate()}`;
  state['e_month'] = `${e_monthName}`;
  state['e_monthAbbr'] = e_abbr;
  state['e_year'] = `${endDate.getFullYear()}`;
  state['e_date'] = `${e_monthName} ${endDate.getDate()}, ${endDate.getFullYear()}`; // e.g. March 10th, 2010

  console.log('date -- ', state);
  return state;
}

// used to verify that endtime is actually after starttime
export const isDateValid = (start, end) => {

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
