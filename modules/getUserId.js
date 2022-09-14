
async function getUserId(userModel, userEmail, userName) {

  const existingUser = await userModel.findOne({email: userEmail});  
  let userId;

  if (!existingUser) {
    console.log('No existing user!')
    const newUser = await userModel.create({
      email: userEmail,
      name: userName
    })
    userId = newUser._id;
  } else {
    console.log('User exists in the database!')
    userId = existingUser._id
  }

  return userId;
}

module.exports = getUserId;