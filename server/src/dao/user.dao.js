import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserByUsername = async (userName) => {
  return await User.findOne({ userName });
};

export const createUser = async (userData) => {
  return await User.create(userData);
};


export const verifyUser = (userId) =>
  User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });


export const updateUserPassword = async (email, newHashedPassword) => {
  return await User.findOneAndUpdate(
    { email: email },              // FIND USER BY EMAIL
    { password: newHashedPassword }, 
    { new: true }
  );
};
