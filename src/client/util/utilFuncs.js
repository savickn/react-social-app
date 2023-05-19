
import _ from 'lodash';

// adds element to array without duplicates-ish
export const insertByObjectId = (array, newElem) => {
  return [...array.filter(elem => {
    elem._id !== newElem._id;
  }), newElem]
}


// accepts an Array of Mongoose objects (or sometimes an Array of ObjectIds) and an ObjectId 
export const matchByObjectId = (arr, id) => {
  console.log('matchbyid --> ', arr, id);
  for(let x of arr) {
    if(id === x || id === x._id) {
      return true;
    }
  }
  return false;
}

// accepts an Array of Mongoose objects and an updated Mongoose object
export const updateByObjectId = (arr, newElem) => {
  return arr.map((elem) => {
    if(!elem._id || !newElem._id) { console.log('updateByObjectId --> ObjectId missing!') };
    return elem._id === newElem._id ? newElem : elem;
  });
}

// accepts an Array of Mongoose objects and an ObjectId
export const removeByObjectId = (arr, id) => {
  return arr.filter(elem => elem._id !== id);
}

// used to merge two arrays without duplicates, WORKING WELL
export const mergeArrays = (originalArr, newArr) => {
  console.log('original --> ', originalArr);
  console.log('new --> ', newArr);


  let copyArr = [...originalArr];
  let ids = new Set(originalArr.map(o => o._id)); // list of original IDs
  return copyArr.concat(newArr.filter(n => !ids.has(n._id)));
}

// used to only add non-existing values to array
export const pushUnique = () => {

}

// used to return a copy of a spliced array without modifying the original
export const safeSplice = (arr, startIdx, iterate) => {

}

// converts FileReader to Promise in order to use 'async/await'
export function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  })
}


// used to calculate distance between 2 lat/lon coordinates 
export function haversine(lat1, lon1, lat2, lon2) {
  const RM = 3961;
  const RK = 6373;

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2;
  const c = 2 * atan2( sqrt(a), sqrt(1-a) );
  
  const dM = RM * c; 
  const dK = RK * c;
  
  console.log('dm --> ', dM);
  console.log('dk --> ', dK);
}









