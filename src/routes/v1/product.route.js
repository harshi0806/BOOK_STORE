const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/add').post(productController.createProducts);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management and retrieval
 */

 /**
 * @swagger
 * path:
 *  /product/add:
 *    post:
 *      summary: Create a Product
 *      description: Only user can create Product.
 *      tags: [Product]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - book_type
 *                - title
 *                - author
 *                - book_img
 *                - price
 *              properties:
 *                book_type:
 *                  type: array
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *                book_img:
 *                  type: string
 *                new_price:
 *                  type: string
 *                old_price:
 *                  type: string
 *              example:
 *                book_type: [thriller, mystery]
 *                title: Don't Go There
 *                author: Juliana Silva
 *                book_img: canva-white-bold-text-thriller-mystery-book-cover-CejxvxrTCyg.jpg
 *                new_price: 233
 *                old_price: 290
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Product'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
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