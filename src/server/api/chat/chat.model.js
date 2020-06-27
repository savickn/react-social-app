
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  key: {
    type: String,
    required: true, 
  },
  users: [{
    type: String
  }],
});

export default mongoose.model('Chat', ChatSchema);
