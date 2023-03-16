const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyStaffToken = require("../middleware/staffAuth");
require("dotenv").config();

const staffEntity = require("../models/Staff");
const Staff = require("../models/Staff");

// @route GET api/staff
// @desc Check if staff is logged in
// @access Public
router.get("/", verifyStaffToken, async (req, res) => {
  try {
    const staff = await staffEntity.findById(req.staffId).select("-password");
    if (!staff)
      return res
        .status(400)
        .json({ success: false, message: "Staff not found" });
    res.json({ success: true, staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/", verifyStaffToken, async (req, res) => {
    // check data
    if (!req.staffId)
      return res
        .status(400)
        .json({ success: false, message: "Missing StaffId" });
    try {
      // Check for existing user
      const staff = await staffEntity.findOne({
        _id: req.staffId,
      }).select("-__v");
      if (!staff)
        return res
          .status(400)
          .json({ success: false, message: "Staff is not exist" });
  
      res.json({
        success: true,
        message: "Staff Found",
        staff,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server error" });
    }
  });

router.put("/:id", async (req, res) => {
// get customer
const { password } = req.body;

// validation
if (!password)
    return res
    .status(400)
    .json({ success: false, message: "Missing Password" });
try {
    // Pass all
    const hashedPassword = await argon2.hash(password);
    const lastStaff = await staffEntity.findOneAndUpdate({_id: req.params.id}, {password: hashedPassword}, { new: true })

    res.json({
    success: true,
    message: "Staff created successfully",
    users: lastStaff,
    });
} catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
}
})

router.delete("/:id", async (req, res) => {
    try {
      const deleteStaff = await staffEntity.findOneAndDelete(
        {_id: req.params.id}
      );
  
      if (!deleteStaff)
        return res.status(401).json({
          success: false,
          message: "Staff not found or user not authorized",
        });
      res.json({
        success: true,
        message: "Staff Deleted",
        users: deleteStaff,
      });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ success: false, message: "Interval server error" });
    }
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // check data
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing Username and/or Password" });
    try {
      // Check for existing user
      const staff = await staffEntity.findOne({ username }).select("+password");
      if (!staff)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });
  
      // Username found
      const passwordValid = await argon2.verify(staff.password, password);
      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });
      const accessToken = jwt.sign(
        {
          staffId: staff._id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      const push = {
        username: staff.username,
        _id: staff._id,
        createdAt: staff.createdAt,
      };
      res.json({
        success: true,
        message: "Staff logged in successfully",
        push,
        accessToken: accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server error" });
    }
  });

  router.get("/all", async (req, res) => {
    try {
      const staffs = await staffEntity.find({}).select("-password");
      if (!staffs)
        return res
          .status(400)
          .json({ success: false, message: "Staff not found" });
  
      return res.json({ success: true, staffs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

// @route POST api/staff/register
// @desc create staff
// @access Public
router.post("/register", async (req, res) => {
    // get staff
    const { username, password } = req.body;
  
    // validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing Username and/or Password" });
    try {
      // Pass all
      const hashedPassword = await argon2.hash(password);
      const lastStaff = await staffEntity.findOne({}).sort({ _id: "desc" });
      let _id;
      if (lastStaff === null) {
        _id = 1;
      } else {
        _id = lastStaff._id + 1;
      }
      const newStaff = new Staff({
        _id,
        username,
        password: hashedPassword,
      });
      await newStaff.save();
      const push = {
        username: newStaff.username,
        _id: newStaff._id,
        createdAt: newStaff.createdAt,
      };
      res.json({
        success: true,
        message: "Staff created successfully",
        push,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = router;