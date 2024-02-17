export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }catch(err) {
        res.status(400).json({message: err.errors.map((error) => error.message)});
    }
};