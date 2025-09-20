import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for tasks
boardSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'board'
});

// Pre-remove middleware to delete associated tasks
boardSchema.pre('remove', async function(next) {
  await this.model('Task').deleteMany({ board: this._id });
  next();
});

const Board = mongoose.model('Board', boardSchema);

export default Board;