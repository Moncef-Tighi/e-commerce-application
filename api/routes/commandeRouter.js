import express from "express";
import * as controllers from '../controllers/commandController.js';

const router = express.Router();

router.get('/:id_commande', controllers.getOneCommande);
router.get('/', controllers.listeCommand);
router.post('/', controllers.createCommande);


export default router;