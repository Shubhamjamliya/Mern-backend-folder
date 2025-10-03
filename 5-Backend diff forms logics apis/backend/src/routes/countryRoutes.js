import express from "express";
import {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry,
} from "../controllers/countryController.js";
import upload from "../utils/multer.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Country name
 *         image:
 *           type: string
 *           description: URL or path of the uploaded image
 *       example:
 *         id: 614c1b2f9f1b2c6f1b1a2c3d
 *         name: India
 *         image: uploads/india.png
 */

/**
 * @swagger
 * /countries:
 *   post:
 *     summary: Create a new country
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Country created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 */
router.post("/", upload.single("image"), createCountry);

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of all countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */
router.get("/", getCountries);

/**
 * @swagger
 * /countries/{id}:
 *   put:
 *     summary: Update a country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Country updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 */
router.put("/:id", upload.single("image"), updateCountry);

/**
 * @swagger
 * /countries/{id}:
 *   delete:
 *     summary: Delete a country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country deleted successfully
 */
router.delete("/:id", deleteCountry);

export default router;
