/**
 * @typedef {import('mongoose').Types.ObjectId} ObjectId
 */

/**
 * @typedef {Object} IAuthToken
 * @property {ObjectId} id
 * @property {string} email
 * @property {boolean} isAdmin
 */

/**
 * @typedef {Object} IForgotPasswordToken
 * @property {ObjectId} id
 * @property {string} email
 * @property {boolean} isAdmin
 */

/**
 * @typedef {Object} IEmailVerificationToken
 * @property {ObjectId} id
 * @property {string} email
 * @property {boolean} isAdmin
 */
