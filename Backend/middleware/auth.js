import Admin from '../models/Admin.js';

export async function checkAdminAuth(req, res, next) {
  try {
    const { password } = req.body;

    console.log("checkAdminAuth middleware - checking authentication");

    // Validate password is provided
    if (!password) {
      console.log("checkAdminAuth middleware - No password provided");
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    // Find admin with error handling
    const admin = await Admin.findOne().catch(err => {
      console.error("checkAdminAuth middleware - Database query error:", err);
      throw new Error('Database connection failed');
    });

    if (!admin) {
      console.log("checkAdminAuth middleware - No admin found in database");
      return res.status(500).json({
        success: false,
        message: 'Admin configuration not found'
      });
    }

    // Check password
    if (password === admin.password) {
      console.log("checkAdminAuth middleware - Authentication successful");
      next();
    } else {
      console.log("checkAdminAuth middleware - Invalid password");
      res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
  } catch (err) {
    console.error("checkAdminAuth middleware - Server error:", err);
    res.status(500).json({
      success: false,
      message: 'Server error occurred during authentication',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}