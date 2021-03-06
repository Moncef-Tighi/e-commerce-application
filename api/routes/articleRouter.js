import express from "express";
import * as controllers from '../controllers/articleController.js';

const router = express.Router();

router.get('/:code_article', controllers.getOneArticle);
router.get('/', controllers.listeArticle);
router.post('/', controllers.createArticle);
router.put('/', controllers.updateArticle);


export default router;