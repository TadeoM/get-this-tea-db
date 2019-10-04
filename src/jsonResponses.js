const recipes = {};

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    response.writeHead(status, headers);
    response.end();
};

const getRecipes = (request, response) => {
    const responseJSON = {
        recipes,
    }

    return respondJSON(request, response, 200, responseJSON);
};

const getRecipesMeta = (request, response) => {
    return respondJSONMeta(request, response, 200);
};

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
    }

    return respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => {
    return respondJSONMeta(request, response, 404);
};

const addRecipe = (request, response, params) => {
    const responseJSON = {
        message: '',
    }
    if (!params.name || !params.brewTime) {
        responseJSON.message = 'Missing params name and/or age.';
        return respondJSON(request, response, 400, responseJSON);
    }

    
    const newRecipe = {
        name: params.name,
        taste: params.taste,
        ingredients: params.ingredients,
        brewTime: params.brewTime,
    };

    /*if (recipes.hasOwnProperty(newRecipe.name)) {
        
        recipes[newRecipe.name].taste = newRecipe.taste;
        recipes[newRecipe.name].ingredients = newRecipe.ingredients;
        recipes[newRecipe.name].brewTime = newRecipe.brewTime;
        responseJSON.message = `Updated user.`
        
        return respondJSON(request,response, 204, responseJSON);
    }*/
    
    
    recipes[newRecipe.name] = {};
    recipes[newRecipe.name].name = newRecipe.name;
    recipes[newRecipe.name].taste = newRecipe.taste;
    recipes[newRecipe.name].ingredients = newRecipe.ingredients;
    recipes[newRecipe.name].brewTime = newRecipe.brewTime;
    responseJSON.message = `Created new user.`;

    return respondJSON(request, response, 201, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for is not found.',
        id: 'notFound',
    }

    return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
    getRecipes,
    getRecipesMeta,
    notReal,
    notRealMeta,
    addRecipe,
    /*success,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    internal,
    notImplemented,*/
    notFound,
};
