import express from "express";
import { searchStudents } from "../controllers/searchStudentController.js";

const router = express.Router();

/**
 * @swagger
 * /searchstudents/search:
 *   get:
 *     summary: Search students with advanced filters
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by student name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by student email
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: string
 *         description: Filter by mobile
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Male, Female, Other]
 *         description: Filter by gender
 *     responses:
 *       200:
 *         description: List of students matching the filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   mobile:
 *                     type: string
 *                   gender:
 *                     type: string
 *                     enum: [Male, Female, Other]
 *                   country:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   state:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   district:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get("/search", searchStudents);

export default router;
// Advanced Search Route
