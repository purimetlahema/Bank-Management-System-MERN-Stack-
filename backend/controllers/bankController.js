const User = require("../models/User");

// -------------------- GET PROFILE --------------------
async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
}

// -------------------- DEPOSIT --------------------
async function deposit(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);

    user.balance = user.balance + Number(amount);
    await user.save();

    res.status(200).json({
      message: "Amount Added successfully",
      balance: user.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Amount failed to add" });
  }
}

// -------------------- WITHDRAW --------------------
async function withdraw(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient amount" });
    }

    user.balance -= Number(amount);
    await user.save();

    res.json({
      message: "Withdraw success",
      balance: user.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Failed withdraw" });
  }
}

// -------------------- TRANSFER --------------------
async function transfer(req, res) {
  try {
    const { toAccount, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ accountNumber: toAccount });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver Not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    sender.balance -= Number(amount);
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    res.json({
      message: "Amount transferred successfully",
      balance: sender.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Transfer failed" });
  }
}

// -------------------- LIST BENEFICIARIES --------------------
async function listBeneficiaries(req, res) {
  try {
    const all = await User.find().select("-password");
    res.json({ beneficiaries: all });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch beneficiaries" });
  }
}

module.exports = {
  getProfile,
  deposit,
  withdraw,
  listBeneficiaries,
  transfer
};
