import { body, validationResult } from 'express-validator';

const validateRequestapplyjobs = async (req, res, next) => {
  console.log(req.body);
  
  // 1. Setup rules for validation.
  const rules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('contact').isMobilePhone().withMessage('Invalid phone number format'),
  ];

  try {
    // 2. Run those rules.
    await Promise.all(rules.map((rule) => rule.run(req)));

    // 3. Check if there are any errors after running the rules.
    const validationErrors = validationResult(req);
    console.log(validationErrors.array());

    // 4. If there are errors, return the error message.
    if (!validationErrors.isEmpty()) {
      return res.render('404error', {isMainPage: true, message:  validationErrors.array()[0].msg})
    }

    // No validation errors, proceed to the next middleware.
    next();
  } catch (error) {
    // Log any unexpected errors during validation.
    console.error('Error during validation:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const validateRequestregister = async (req, res, next) => {
  console.log(req.body);

  // 1. Setup rules for validation.
  const rules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];

  try {
    // 2. Run those rules.
    await Promise.all(rules.map((rule) => rule.run(req)));

    // 3. Check if there are any errors after running the rules.
    const validationErrors = validationResult(req);
    console.log(validationErrors.array());

    // 4. If there are errors, return the error message.
    if (!validationErrors.isEmpty()) {
        return res.render('404error', {isMainPage: true, message:  validationErrors.array()[0].msg});
    }

    // No validation errors, proceed to the next middleware.
    next();
  } catch (error) {
    // Log any unexpected errors during validation.
    console.error('Error during validation:', error);
    return res.status(500).send('Internal Server Error');
  }
};



export { validateRequestapplyjobs, validateRequestregister };
