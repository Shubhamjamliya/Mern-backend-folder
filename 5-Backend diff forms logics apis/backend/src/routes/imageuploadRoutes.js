import express from "express";
import {
  createImageUpload,
  getImageUpload,
  updateImageUpload,
  deleteImageUpload,
} from "../controllers/imageuploadController.js";
import upload from "../utils/multer.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageUpload:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - mobile
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           description: User email address
 *         mobile:
 *           type: string
 *           description: User mobile number (string to allow +91 or leading zeros)
 *         image:
 *           type: string
 *           description: Path or URL of the uploaded image
 *       example:
 *         id: 614c1b2f9f1b2c6f1b1a2c3e
 *         name: John Doe
 *         email: john@example.com
 *         mobile: "+919876543210"
 *         image: "uploads/profile.jpg"
 */

/**
 * @swagger
 * /image-uploads:
 *   get:
 *     summary: Get all image upload records
 *     tags: [ImageUpload]
 *     responses:
 *       200:
 *         description: List of uploaded images with user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageUpload'
 */
router.get("/", getImageUpload);

/**
 * @swagger
 * /image-uploads:
 *   post:
 *     summary: Upload a new image with user details
 *     tags: [ImageUpload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image upload record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUpload'
 */
router.post("/", upload.single("image"), createImageUpload);

/**
 * @swagger
 * /image-uploads/{id}:
 *   put:
 *     summary: Update an image upload record by ID
 *     tags: [ImageUpload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Image upload record ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image upload record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUpload'
 */
router.put("/:id", upload.single("image"), updateImageUpload);

/**
 * @swagger
 * /image-uploads/{id}:
 *   delete:
 *     summary: Delete an image upload record by ID
 *     tags: [ImageUpload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Image upload record ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image upload record deleted successfully
 */
router.delete("/:id", deleteImageUpload);

export default router;
