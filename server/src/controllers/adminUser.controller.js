import {
  getAllUsersService,
  getTypedUserService,
  getBusinessRequestedUserService,
  getAdvancedUsersService,
  softDeleteUserService
} from "../services/adminUser.service.js";

export const getAllUser = async (req, res) => {
  try {
    const { users, count } = await getAllUsersService(req.query);

    return res.status(200).json({
      success: true,
      total: count,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getTypedUser = async (req, res) => {
  try {
    const { type } = req.body;

    const users = await getTypedUserService(type);

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBusinessRequestedUser = async (req, res) => {
  try {
    const users = await getBusinessRequestedUserService();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdvancedUsers = async (req, res) => {
  try {
    const data = await getAdvancedUsersService(req.body);

    res.status(200).json({
      message: "Users fetched successfully",
      ...data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const softDeleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await softDeleteUserService(email);

    res.status(200).json({
      message: "User deactivated successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
