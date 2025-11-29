export function validate(fields = []) {
  return (req, res, next) => {
    const errors = [];

    fields.forEach((f) => {
      if (!req.body[f]) {
        errors.push(`El campo '${f}' es obligatorio`);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}
