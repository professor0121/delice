import {
  getAllUsersDAO,
  getUsersByAccountTypeDAO,
  getBusinessRequestedUsersDAO,
  getAdvancedUsersDAO,
  softDeleteUserByEmailDAO
} from "../dao/user.dao.js";

import { findUsers } from "../dao/user.dao.js";

export const getAllUsersService = async (query) => {
  const { search, type, page = 1, limit = 20, sort = "latest" } = query;

  return await findUsers({
    search,
    type,
    page: Number(page),
    limit: Number(limit),
    sort,
  });
};


export const getTypedUserService = async (type) => {
  if (!["Personal", "Business", "Admin"].includes(type)) {
    throw new Error("Invalid account type");
  }
  return await getUsersByAccountTypeDAO(type);
};

export const getBusinessRequestedUserService = async () => {
  return await getBusinessRequestedUsersDAO();
};


export const getAdvancedUsersService = async ({
  page = 1,
  limit = 10,
  search = "",
  type = "",
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const query = { isDeleted: { $ne: true } }; // soft delete filter

  // search
  if (search) {
    query.$or = [
      { firstName: new RegExp(search, "i") },
      { lastName: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { userName: new RegExp(search, "i") },
    ];
  }

  // type filter
  if (type) {
    query.accountType = type;
  }

  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const users = await getAdvancedUsersDAO(query, { skip, limit, sort });
  const total = await User.countDocuments(query);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};


export const softDeleteUserService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  return softDeleteUserByEmailDAO(email);
};
