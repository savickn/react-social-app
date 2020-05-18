
// creates a 'header' that contains the user's ip address
export function ipTracker(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //console.log('ip --> ', ip);
  res.setHeader('ip', ip);
  next();
}

