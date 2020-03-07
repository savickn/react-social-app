
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
  status: {
    type: String,
    enum: ['Pending', 'Complete'],
    default: 'Pending'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

export default mongoose.model('Todo', TodoSchema);


