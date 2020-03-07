
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

export default class DateUtil {
  constructor() {

  }

  static getMonthName = (monthNumber) => {
    return months[monthNumber - 1];
  }
  

}
