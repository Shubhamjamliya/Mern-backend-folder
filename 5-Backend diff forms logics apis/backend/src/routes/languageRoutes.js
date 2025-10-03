import express from "express";
import {
  createLanguage,
  getLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} from "../controllers/languageController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Language name
 *       example:
 *         id: 614c1b2f9f1b2c6f1b1a2c3e
 *         name: English
 */

/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Get all languages
 *     tags: [Languages]
 *     responses:
 *       200:
 *         description: List of languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 */
router.get("/", getLanguages);

/**
 * @swagger
 * /languages/{id}:
 *   get:
 *     summary: Get a language by ID
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Language ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Language found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       404:
 *         description: Language not found
 */
router.get("/:id", getLanguageById);

/**
 * @swagger
 * /languages:
 *   post:
 *     summary: Create a new language
 *     tags: [Languages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       201:
 *         description: Language created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 */
router.post("/", createLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   put:
 *     summary: Update a language by ID
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Language ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       200:
 *         description: Language updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 */
router.put("/:id", updateLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     summary: Delete a language by ID
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Language ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Language deleted successfully
 */
router.delete("/:id", deleteLanguage);

export default router;
