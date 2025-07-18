import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './db.js';
import Admin from './models/Admin.js';
import Project from './models/Project.js';
import { checkAdminAuth } from './middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Default password if none in DB

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Connect to MongoDB
connectDB();

// Ensure single admin document exists with default password
async function ensureAdminPassword() {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const defaultAdmin = new Admin({ password: ADMIN_PASSWORD });
    await defaultAdmin.save();
    console.log('Default admin password document created');
  }
}
ensureAdminPassword().catch(console.error);

// Routes

// Get all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Admin login - check password from DB
app.post('/admin/login', async (req, res) => {
  const { password } = req.body;
  try {
    const admin = await Admin.findOne();
    if (admin && password === admin.password) {
      res.json({ success: true, message: 'Authorized' });
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add a new project (admin only)
app.post('/admin/projects', checkAdminAuth, async (req, res) => {
  const { title, description, image, projectUrl, githubLink, tech, isPublic } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const newProject = new Project({ title, description, image, projectUrl, githubLink, tech, isPublic });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Update a project (admin only)
app.put('/admin/projects/:id', checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, projectUrl, githubLink, tech, isPublic, password } = req.body;
  try {
    // Include isPublic in the update
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, projectUrl, githubLink, tech, isPublic },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete a project (admin only)
app.delete('/admin/projects/:id', checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
