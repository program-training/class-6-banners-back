// Middleware to check if user is an admin
export const isAdmin = (req:any, res:any, next:any) => {
    const user = req.user; // Assuming you have user information in the request object
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin permissions required.' });
    }
    next();
  };
  
  // Middleware to check if user has permission to access a specific user's data
  export const hasUserPermission = (req:any, res:any, next:any) => {
    const user = req.user; // Assuming you have user information in the request object
    const requestedUserId = req.params.id; // Assuming you're passing the user ID in the route parameter
  
    // Check if the user is an admin or has created the requested user card
    if (!user || (!user.isAdmin && user.id !== requestedUserId)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };

  

