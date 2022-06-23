import { catchAsync } from './errorController.js';
import * as model from '../models/article.js';
import createError from 'http-errors';
import db from "../models/postGreSql.js";


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
export const createArticle = catchAsync( async function(request, response) {
    const article = request.body.article;
    const articles = await model.readAllArticles(request.query);
    const totalSize = articles.length
    return response.status(200).json({
        status: "ok",
        page : Number(request.query.page) || 1,
        totalSize,
        body : articles
    });

});
export const updateArticle = catchAsync( async function(request, response) {

    const articles = await model.readAllArticles(request.query);
    const totalSize = articles.length
    return response.status(200).json({
        status: "ok",
        page : Number(request.query.page) || 1,
        totalSize,
        body : articles
    });

});
