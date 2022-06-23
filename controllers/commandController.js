import { catchAsync } from './errorController.js';
import * as model from '../models/command.js';
import createError from 'http-errors';


export const listeCommand = catchAsync( async function(request, response) {

    const commandes = await model.readAllCommandes(request.query);
    const totalSize = commandes.length
    return response.status(200).json({
        status: "ok",
        page : Number(request.query.page) || 1,
        totalSize,
        body : commandes
    });

});

export const createCommande = catchAsync( async function(request, response,next) {
    const commande = request.body.commande;
    if (!commande || !commande.code_commande) return next(createError(400, "Impossible de trouver les informations de la commande"))
    const commandeCreation = await model.createCommande(...commande);

    return response.status(200).json({
        status: "ok",
        body : commandeCreation
    });

});
