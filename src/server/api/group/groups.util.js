
/* contains endpoints that are not accessible via public API */





export const handleError = (res, err) => {
  console.log('handleError --> ', err);
  return res.status(500).send(err);
}

