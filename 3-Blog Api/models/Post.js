import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  //Relation of models 
  //each post linked with user
}, { timestamps: true });

export default mongoose.model('Post', postSchema);