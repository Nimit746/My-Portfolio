import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import { connectDB } from './db.js';
import Admin from './models/Admin.js';
import Project from './models/Project.js';
import { checkAdminAuth } from './middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Default password if none in DB

app.use(cors({
  origin: 'https://your-netlify-site.netlify.app',
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));

// Connect to MongoDB
connectDB();

// Ensure single admin document exists with hashed password
async function ensureAdminPassword() {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    // Hash the password before storing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    const defaultAdmin = new Admin({ password: hashedPassword });
    await defaultAdmin.save();
    console.log('Default admin password document created with encrypted password');
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

// Admin login - check password against hashed version in DB
app.post('/admin/login', async (req, res) => {
  const { password } = req.body;
  try {
    const admin = await Admin.findOne();
    if (admin && await bcrypt.compare(password, admin.password)) {
      res.json({ success: true, message: 'Authorized' });
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Login error:', err);
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
  const { title, description, image, projectUrl, githubLink, tech, isPublic } = req.body;
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

// Optional: Add endpoint to change admin password (admin only)
app.put('/admin/change-password', checkAdminAuth, async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long' });
  }

  try {
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    const admin = await Admin.findOne();
    if (admin) {
      admin.password = hashedNewPassword;
      await admin.save();
      res.json({ success: true, message: 'Password changed successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});