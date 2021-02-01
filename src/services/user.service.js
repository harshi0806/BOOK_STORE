const mongoose = require('mongoose');
const httpStatus = require('http-status');

const { User, Transaction } = require('../models');
const { aggregatePaging } = require('./aggregatePaging.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};


/**
 * Get user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const getUserInfoById = async (userId) => {
 const userInfo=await Transaction.aggregate([
    { $match : { user : userId } },
    {
      $group: {
        _id: { type : "$type" },
        credit:{$sum:{
          $cond:[{
            $eq:["$type","CREDIT"]
          },"$amount",0]
        }},
        debit:{$sum:{
          $cond:[{
            $eq:["$type","DEBIT"]
          },"$amount",0]
        }}
      }
    },
    {
      $group: {
        _id: null,
        credit:{$sum:"$credit"},
        debit:{$sum:"$debit"}}
    },
    {$project:{
      sum:{$subtract:["$debit","$credit"]}
    }}
  ]);
  if(userInfo.length!=0){
    return userInfo
  }
  else{
    return [{ sum: 0}]
  }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options, userHeaders) => {
  const users = await User.paginate(filter, options);
  return users;
}

module.exports = {
  createUser,
  getUserInfoById,
  getUserByEmail,
  getUserById,
  queryUsers,
};
