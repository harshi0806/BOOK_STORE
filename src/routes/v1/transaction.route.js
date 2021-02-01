const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(transactionValidation.createTransaction), transactionController.createTransaction)
  .get(auth(), transactionController.getTransactions)
  router
  .route('/:transactionId')
  .delete(auth(), validate(transactionValidation.deleteTransaction), transactionController.deleteTransaction);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction management and retrieval
 */

/**
 * @swagger
 * path:
 *  /transaction:
 *    post:
 *      summary: Create a transaction
 *      description: Only login user can create transactions.
 *      tags: [Transaction]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - amount
 *                - type
 *                - note
 *              properties:
 *                amount:
 *                  type: number
 *                type:
 *                  type: string 
 *                  enum: [CREDIT, DEBIT]
 *                note:
 *                  type: string
 *              example:
 *                amount: 10
 *                type: DEBIT
 *                note: Buy a bag
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all transactions
 *      description: Only login user retrieve all his/her transactions.
 *      tags: [Transaction]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/User'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /transaction/{id}:
 *    delete:
 *      summary: Delete a transaction
 *      description: Logged in users can delete only his/her transaction.
 *      tags: [Transaction]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Transaction id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
