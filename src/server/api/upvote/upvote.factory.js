import { Factory } from 'rosie';

const UpvoteFactory = Factory.define('upvote')
  .sequence('id')
  .attr('date', function() {return Date.now()})
  .attr('userName')
  .attr('userId')

module.exports = UpvoteFactory;
