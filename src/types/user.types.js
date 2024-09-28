/**
 * @typedef {Object} IUser
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {boolean} isAdmin
 * @property {boolean} isEmailVerified
 * @property {string} branch
 * @property {string} passingYear
 * @property {string} designation
 * @property {string} about
 * @property {string | null} github
 * @property {string | null} leetcode
 * @property {string | null} linkedin
 */

/**
 * @typedef {Object} IUserProfile
 * @property {string} username
 * @property {string} email
 * @property {string} branch
 * @property {string} passingYear
 * @property {string} designation
 * @property {string} about
 * @property {string | null} github
 * @property {string | null} leetcode
 * @property {string | null} linkedin
 * @property {Array<{
*   viewCount: number,
*   postCount: number,
*   upVoteCount: number,
*   downVoteCount: number
* }>} postData
*/
