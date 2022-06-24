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

export const getOneCommande = catchAsync( async function(request, response, next) {
    const id_commande = request.params.id_commande;
    if (!id_commande) return next(createError(400, "Le numéro de commande n'a pas été trouvé"))

    const commande = await model.readOneCommande(id_commande);
    if (!commande) return next(createError(400, "Aucune commande avec cet id n'a été trouvé"))
    return response.status(200).json({
        status: "ok",
        body : commande
    });

});


export const createCommande = catchAsync( async function(request, response,next) {
    const commande = request.body;
    if (!commande) return next(createError(400, "Impossible de trouver les informations de la commande"))
    const commandeCreation = await model.createCommande(commande);

    return response.status(200).json({
        status: "ok",
        body : commandeCreation
    });

});
