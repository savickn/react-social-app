import data from './test.model';

export function getData(req, res) {
  console.log('data', data);
  return res.status(200).json({data});
}
