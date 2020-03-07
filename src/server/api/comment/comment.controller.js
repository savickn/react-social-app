import Comment from './comment.model';
import sanitizeHtml from 'sanitize-html';

export function getComments(req, res) {
  Comment.find().exec((err, comments) => {
    if (err) res.status(500).send(err);
    res.json({ comments });
  });
}

export function getComment(req, res) {
  Comment.findOne({ _id: req.params.id }).exec((err, comment) => {
    if (err) res.status(500).send(err);
    res.json({ comment });
  });
}

export function addComment(req, res) {
  if (!req.body.comment.name || !req.body.comment.location) {
    res.status(403).end();
  }
  
  const newComment = new Comment(req.body.comment);
  newComment.name = sanitizeHtml(newComment.name);
  newComment.location = sanitizeHtml(newComment.location);
  newComment.save((err, comment) => {
    if (err) res.status(500).send(err);
    res.json({ comment });
  });
}

export function deleteComment(req, res) {
  Comment.findOneAndRemove({ _id: req.params.id }).exec((err, comment) => {
    if (err) res.status(500).send(err);
    res.status(200).end();
  });
}
