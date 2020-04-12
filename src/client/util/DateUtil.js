
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
  '1': ''
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
