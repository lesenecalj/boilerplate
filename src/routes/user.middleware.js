export function validateBodyUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    throw new Error ("Body is wrong");
  }
  next();
}

export function validateUserIdParam(req, res, next) {
  const { id } = req.params;
  if (!id) {
    throw new Error ("Input is wrong");
  }
  next();
}