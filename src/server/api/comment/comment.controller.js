
import Comment from './comment.model';

/*
** retrieve a collection of Comments (with optional search criteria)
*/
export function searchComments(req, res) {
  console.log('searchComments req.query --> ', req.query);

  // searchByAuthor
  // filterByDate
  // sortByUpvotes

  // add pagination

  Comment.find(req.query)
    .populate({
      path: 'author',
      select: '_id name profile',
      populate: {
        path: 'profile',
        populate: {
          path: 'image',
        }
      }
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch(err => handleError(res, err))
}

/*
** retrieve a single Comment (is this necessary???)
*/
export function getComment(req, res) {
  Comment.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: '_id name profile',
        populate: {
          path: 'profile',
          populate: {
            path: 'image',
          }
        }
      }
    })
    .populate({
      path: 'author',
      select: '_id name profile',
      populate: {
        path: 'profile',
        populate: {
          path: 'image',
        }
      }
    })
    .then(comment => res.status(200).json({ comment }))
    .catch(err => handleError(res, err))
}


/*
** create a Comment
*/
export function createComment(req, res) {
  console.log('createComment req.body --> ', req.body);
  const data = req.body;
  if (!data.author || !data.content || !data.parent) {
    return res.status(403).end('Unable to create Comment. Invalid arguments!');
  }
  
  Comment.create(data)
    .then(async (comment) => {
      await comment.populate([
        {
          path: 'author',
          select: '_id name profile',
          populate: {
            path: 'profile',
            populate: {
              path: 'image',
            }
          }
        }
      ]);
      console.log('comment --> ', comment);
      return res.status(201).json({ comment })
    })
    .catch(err => handleError(res, err)) 
}

/*
** toggle upvote
*/
export const toggleUpvote = async (req, res) => {
  try {
    console.log(req.body);
    const c = await Comment.findById(req.params.id);
    c.toggleUpvote(req.body.authorId);
    const comment = await c.save();
    await comment.populate([
      {
        path: 'author',
        select: '_id name profile',
        populate: {
          path: 'profile',
          populate: {
            path: 'image',
          }
        }
      }
    ]);
    return res.status(200).json({ comment });
  } catch(err) {
    return handleError(res, err);
  }
}



/*
** delete a Comment
*/ 
export const deleteComment = (req, res) => {
  Comment.findOneAndRemove({ _id: req.params.id })
    .then(() => res.status(203).end())
    .catch(err => handleError(res, err))
}


function handleError(res, err) {
  console.log('err --> ', err);
  return res.status(500).send(err);
}