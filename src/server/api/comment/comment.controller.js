import Comment from './comment.model';
import sanitizeHtml from 'sanitize-html';

/*
** retrieve a collection of Comments (with optional search criteria)
*/
export function searchComments(req, res) {

  // searchByAuthor
  // filterByDate
  // sortByUpvotes

  Comment.find().exec((err, comments) => {
    if (err) return res.status(500).send(err);
    return res.json({ comments });
  });
}

/*
** retrieve a single Comment (is this necessary???)
*/
export function getComment(req, res) {
  Comment.findOne({ _id: req.params.id }).exec((err, comment) => {
    if (err) res.status(500).send(err);
    res.json({ comment });
  });
}


/*
** create a Comment
*/
export function createComment(req, res) {
  const data = req.body;
  if (!data.author || !data.content || !data.parent) {
    return res.status(403).end('Unable to create Comment. Invalid arguments!');
  }

  data.createdOn = new Date();
  
  Comment.create(data, (err, comment) => {
    if (err) return res.status(500).send(err);
    return res.json({ comment });
  });
}


/*
** delete a Comment
*/ 
export function deleteComment(req, res) {
  Comment.findOneAndRemove({ _id: req.params.id }).exec((err, comment) => {
    if(err) return res.status(500).send(err);
    return res.status(200).end();
  });
}
