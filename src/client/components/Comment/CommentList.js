
import React from 'react';
import Comment from './Comment';

function CommentList(props) {
  return (
    <React.Fragment>
      {
        props.comments.map((comment) => {
          return (<Comment />)
        })
      }
    </React.Fragment>
  );
}

export default CommentList;