export const roleAuthMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Ensure user is attached by auth middleware
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
      }

      const userRole = req.user.accountType;

      // Convert single role → array for easy checking
      const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      if (!rolesArray.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied: You don't have permission to access this resource",
        });
      }

      next();
    } catch (error) {
      console.error("Role Auth Middleware Error:", error);
      return res.status(500).json({ message: "Server error in roleAuthMiddleware" });
    }
  };
};
