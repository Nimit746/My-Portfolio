import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  projectUrl: String,
  githubLink: String,
  tech: [String],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
