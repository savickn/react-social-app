
import sanitizeSqlQuery from 'sanitize-html';
import sanitizeMongoQuery from 'mongo-sanitize';

export const cleanMongo = (req, res, next) => {
  req.body = sanitizeMongoQuery(req.body);
  req.query = sanitizeMongoQuery(req.query);
  next();
}

export const cleanSql = (req, res, next) => {
  req.body = sanitizeSqlQuery(req.body);
  req.query = sanitizeSqlQuery(req.query);
  next();
}
