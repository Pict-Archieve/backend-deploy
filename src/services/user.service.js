import mongoose from 'mongoose';
// import { Aggregate, Types } from 'mongoose';

// const { Aggregate, Types } = pkg;

import { UserModel } from "../models/user.model.js";

const userServices = {
  findUserById: (id) => {
    return UserModel.findOne({ _id: id });
  },

  findUser: (email) => {
    return UserModel.findOne({ email });
  },
  //by college id
  findUserByCollegeId: (id) => {
    return UserModel.findOne({collegeId})
  },
  //by prn
  findUserByPrn: (id) => {
    return UserModel.findOne({prn})
  },

  createUser: (user) => {
    return UserModel.create(user);
  },

  deleteUser: (id) => {
    return UserModel.deleteOne({ _id: id });
  },

  resetPassword: (email, newPassword) => {
    return UserModel.findOneAndUpdate({ email }, { password: newPassword });
  },

  verifyUserEmail: (email) => {
    return UserModel.findOneAndUpdate({ email }, { isEmailVerified: true });
  },

  editProfile: (userId, updatedProfile) => {
    return UserModel.findByIdAndUpdate(userId, updatedProfile);
  },

  getUserProfile: (userId) => {
    return UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "postData",
          pipeline: [
            {
              $addFields: {
                upVoteCount: {
                  $size: "$upVotes",
                },
                downVoteCount: {
                  $size: "$downVotes",
                },
              },
            },
            {
              $group: {
                _id: null,
                viewCount: { $sum: "$views" },
                postCount: { $sum: 1 },
                upVoteCount: { $sum: "$upVoteCount" },
                downVoteCount: { $sum: "$downVoteCount" },
              },
            },
          ],
        },
      },
      {
        $project: {
          password: 0,
          isAdmin: 0,
          isEmailVerified: 0,
          "postData._id": 0,
          _id: 0,
        },
      },
    ]);
  },

  searchUser: (search, limit, skip) => {
    return UserModel.aggregate([
      {
        $match: {
          username: {
            $regex: new RegExp(search, "i"),
          },
          isEmailVerified: true,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          username: 1,
          designation: 1,
          passingYear: 1,
          branch: 1,
        },
      },
    ]);
  },
};

export default userServices;

