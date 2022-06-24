import createError from 'http-errors'

export const catchAsync= function(func){
    /*
        Tout les MIDDELWARE asynchrones doivent être placés à l'intérieur de cette fonction.
        ça permet de throw une erreur en cas de problème dans l'opération asynchrone sans
        devoir entourner toute les opérations asynchrones avec un bloc try/catch
    */
    return (request, response, next) => {
        func(request, response, next).catch(error => {
            console.log(error);
            if (error.code==="23505") {
                return next(createError(400, `La création a échouée, cette ligne existe déjà. Détail : ${error.detail}`))
            }
            return next(createError(500, `La requête asynchrone a échouée avec le message : ${error}`))
        });
    }
}


const logError = function(err) {
    if (err.status!=404) {
        console.error(err.message);
    }
}



export const errorHandeler = function(err, request, response, next) {
    
    err.status= err.status || 500;
    err.message = err.message || "erreur interne";
    logError(err);
    if (process.env.NODE_ENV==='production') {
        return response.status(err.status).json( {
            status : "error",
            statusCode : err.stack,
            message : err.message,
        });    

    } else if (process.env.NODE_ENV==='development') {
        return response.status(err.status).json( {
            status: "error",
            statusCode : err.status,
            message : err.message,
            stack : err.stack
        });    
    }
}