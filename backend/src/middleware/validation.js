export const validateBoard = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Board name is required and must be a non-empty string' });
  }

  // Trim the name and add it back to the request body
  req.body.name = name.trim();
  next();
};