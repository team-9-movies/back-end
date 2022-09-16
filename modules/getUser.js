
async function getUser(userModel, email, name) {

  const existingUser = await userModel.findOne({ email });
  let user;

  if (!existingUser) {
    console.log('No existing user!')
    const newUser = await userModel.create({ email, name })
    user = newUser;
  } else {
    console.log('User exists in the database!')
    user = existingUser
  }

  return user;
}

module.exports = getUser;