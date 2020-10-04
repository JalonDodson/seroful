import Joi from "joi";

export const userSchema = Joi.object({
  first: Joi.string().min(3).max(20).required(),
  last: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`)),
  repeat_password: Joi.ref("password").with("password", "repeat_password")
});


