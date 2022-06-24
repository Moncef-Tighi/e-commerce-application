import { catchAsync } from './errorController.js';
import * as model from '../models/article.js';
import createError from 'http-errors';


export const listeArticle = catchAsync( async function(request, response) {

    const articles = await model.readAllArticles(request.query);
    const totalSize = articles.length
    return response.status(200).json({
        status: "ok",
        page : Number(request.query.page) || 1,
        totalSize,
        body : articles
    });

});

export const getOneArticle = catchAsync( async function(request, response, next) {
    const code_article = request.params.code_article;
    if (!code_article) return next(createError(400, "Le code article n'a pas été trouvé"))

    const articles = await model.readOneArticle(code_article);
    if (!articles) return next(createError(400, "Aucune artucke avec ce code_article n'a été trouvé"))
    return response.status(200).json({
        status: "ok",
        body : articles
    });

});

export const createArticle = catchAsync( async function(request, response,next) {
    const article = request.body.article;
    if (!article || !article.code_article) return next(createError(400, "Impossible de trouver l'article"))
    const articleCreation = await model.createArticle(article);

    return response.status(200).json({
        status: "ok",
        body : articleCreation
    });

});
export const updateArticle = catchAsync( async function(request, response, next) {

    const article = request.body.article;
    if (!article || !article.code_article) return next(createError(400, "Impossible de trouver l'article"))
    const articleUpdate = await model.updateArticle(article);

    return response.status(200).json({
        status: "ok",
        body : articleUpdate
    });
});
