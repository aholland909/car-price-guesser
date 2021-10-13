//validate user password and email
exports.validUser = (user) => {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" && user.password.trim() != "";

  return validEmail && validPassword;
};
