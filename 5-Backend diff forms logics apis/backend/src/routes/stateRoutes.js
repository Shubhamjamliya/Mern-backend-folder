import express from "express";
import {
  getStates,
  createState,
  updateState,
  deleteState,
} from "../controllers/stateController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       required:
 *         - name
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: State name
 *         country:
 *           type: string
 *           description: Reference to Country ID
 *       example:
 *         id: 614c1b2f9f1b2c6f1b1a2c3e
 *         name: Maharashtra
 *         country: 614c1b2f9f1b2c6f1b1a2c1a
 */

/**
 * @swagger
 * /states:
 *   get:
 *     summary: Get all states (optionally filter by countryId)
 *     tags: [States]
 *     parameters:
 *       - in: query
 *         name: countryId
 *         schema:
 *           type: string
 *         description: Filter states by country ID
 *     responses:
 *       200:
 *         description: List of states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 */
router.get("/", getStates);

/**
 * @swagger
 * /states:
 *   post:
 *     summary: Create a new state
 *     tags: [States]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       201:
 *         description: State created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */
router.post("/", createState);

/**
 * @swagger
 * /states/{id}:
 *   put:
 *     summary: Update a state by ID
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: State ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       200:
 *         description: State updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */
router.put("/:id", updateState);

/**
 * @swagger
 * /states/{id}:
 *   delete:
 *     summary: Delete a state by ID
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: State ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: State deleted successfully
 */
router.delete("/:id", deleteState);

export default router;
