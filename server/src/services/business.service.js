import { findUserByEmail, updateUserByEmail } from "../dao/user.dao.js";

export const requestBusinessActivationService = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("User not found");

  if (user.isActivatedBusinessAccount === "Activated") {
    throw new Error("Your business account is already activated");
  }

  return updateUserByEmail(email, {
    accountType: "Business",
    isActivatedBusinessAccount: "Requested",
  });
};


export const approveBusinessActivationService = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("User not found");

  if (user.isActivatedBusinessAccount !== "Requested") {
    throw new Error("User did not request business activation");
  }

  return updateUserByEmail(email, {
    isActivatedBusinessAccount: "Activated",
  });
};
