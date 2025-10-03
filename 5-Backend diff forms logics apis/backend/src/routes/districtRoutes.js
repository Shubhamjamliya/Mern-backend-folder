import express from "express";
import {
  getDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../controllers/districtController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     District:
 *       type: object
 *       required:
 *         - name
 *         - state
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: District name
 *         state:
 *           type: string
 *           description: Reference to State ID
 *         country:
 *           type: string
 *           description: Reference to Country ID
 *       example:
 *         id: 614c1b2f9f1b2c6f1b1a2c3e
 *         name: Pune
 *         state: 614c1b2f9f1b2c6f1b1a2c2b
 *         country: 614c1b2f9f1b2c6f1b1a2c1a
 */

/**
 * @swagger
 * /districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     responses:
 *       200:
 *         description: List of districts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/District'
 */
router.get("/", getDistricts);

/**
 * @swagger
 * /districts:
 *   post:
 *     summary: Create a new district
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/District'
 *     responses:
 *       201:
 *         description: District created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/District'
 */
router.post("/", createDistrict);

/**
 * @swagger
 * /districts/{id}:
 *   put:
 *     summary: Update a district by ID
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: District ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/District'
 *     responses:
 *       200:
 *         description: District updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/District'
 */
router.put("/:id", updateDistrict);

/**
 * @swagger
 * /districts/{id}:
 *   delete:
 *     summary: Delete a district by ID
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: District ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: District deleted successfully
 */
router.delete("/:id", deleteDistrict);

export default router;
