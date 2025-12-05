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

export const updateUserByEmail = (email, data) => {
  return User.findOneAndUpdate({ email }, data, { new: true });
};

export const getAllUsersDAO = () => {
  return User.find().select("-password");
};

export const getUsersByAccountTypeDAO = (type) => {
  return User.find({ accountType: type }).select("-password");
};

export const getBusinessRequestedUsersDAO = () => {
  return User.find({
    accountType: "Business",
    isActivatedBusinessAccount: "Requested"
  }).select("-password");
};

export const getAdvancedUsersDAO = (query, options) => {
  return User.find(query)
    .select("-password")
    .skip(options.skip)
    .limit(options.limit)
    .sort(options.sort);
};


export const softDeleteUserByEmailDAO = (email) => {
  return User.findOneAndUpdate({ email }, { isDeleted: true }, { new: true });
};



export const findUsers = async ({ search, type, page, limit, sort }) => {
  const query = {};

  // Filter by account type
  if (type) {
    query.accountType = type;
  }

  // Search by name / email / username
  if (search) {
    query.$or = [
      { firstName: new RegExp(search, "i") },
      { lastName: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { userName: new RegExp(search, "i") },
    ];
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Sorting
  const sortOptions = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort(sortOptions);

  const count = await User.countDocuments(query);

  return { users, count };
};
