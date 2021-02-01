const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/list').post(auth(), validate(userValidation.getUsers), userController.getUsers)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and retrieval
 */

/**
 * @swagger
 * path:
 *  /user/list:
 *    post:
 *      summary: Users list
 *      description: Get all users exclude login user.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - type
 *              properties:
 *                limit:
 *                  type: number
 *                page:
 *                  type: number
 *                search:
 *                  type: string
 *              example:
 *                limit: 10
 *                page: 1
 *                search : Harshita Shrivastava
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/User'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *
 */