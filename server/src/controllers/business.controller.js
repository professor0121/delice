import {
  requestBusinessActivationService,
  approveBusinessActivationService,
} from "../services/business.service.js";

export const activationBusinessRequest = async (req, res) => {
  try {
    const email = req.user.email; // from auth middleware

    const user = await requestBusinessActivationService(email);

    res.status(200).json({
      message: "Business activation request submitted",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activateBusinessAdmin = async (req, res) => {
  try {
    const { email } = req.body; // admin sends email of user to activate

    const user = await approveBusinessActivationService(email);

    res.status(200).json({
      message: "Business account activated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

