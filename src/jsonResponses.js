const recipes = {
    "0": {
        name: "Apricot Peach Hibiscus",
        taste:"Fruity Hibiscus",
        brewTime:"8",
        ingredients: "Hibiscus, Peach, Apricot, Elderberries, Sunflower Petals",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/peachapricot.jpg",
    },
    "1": {
        name: "Earl Grey Green Tea",
        taste:"Tangy Citrus Flavors and Earl Grey",
        brewTime:"4",
        ingredients: "Sencha, Bergamot, Tangerine, Cornflower Blossom",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/earlgrey1.jpg",
    },
    "2": {
        name: "Island Breeze",
        taste:"Warm vanilla and caramel blend",
        brewTime:"3",
        ingredients: "Black Tea, Sencha Green Tea, Caramel, Vanilla, Coconut",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/islandbreeze.jpg",
    },
    "3": {
        name: "Lemon Mint Black Tea",
        taste:"Fresh Mint, and Zesty Lemon",
        brewTime:"4",
        ingredients: "Peppermint, Lemongrass, Black Tea, Orange Peels",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/lemonmint9.jpg",
    },
    "4": {
        name: "Lemongrass",
        taste:"Citrusy Lemongrass",
        brewTime:"5",
        ingredients: "Lemongrass",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/lemongrass6.jpg",
    },
    "5": {
        name: "Mayan Secret",
        taste:"Papaya/Pineapple blend with Green Tea",
        brewTime:"2",
        ingredients: "Sencha, Mate, Rooibos, Darjeeling, Carrot, Lemongrass, Pinapple, Papaya bits",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/mayansecret9.jpg",
    },
    "6": {
        name: "Passion Fruit Black Tea",
        taste:"Sweet and Fruity Passionfruit",
        brewTime:"3",
        ingredients: "Passionfruit, Papaya, Pineapple, Sunflower Petals",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/passionfruit.jpg",
    },
    "7": {
        name: "Pomegranate White Tea",
        taste:"Refreshing and Light Pomegranate",
        brewTime:"3",
        ingredients: "White Tea Pai Mu Tan, Pomegranate, Cranberry, Rose petals",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/pomegranate9.jpg",
    },
    "8": {
        name: "Spicy Chocolate White Tea",
        taste:"Spiced White Tea with Coconut and Chili",
        brewTime:"2",
        ingredients: "White Tea Pai Mu Tan, Cacao, Chili",
        imageRef: "https://www.spicesandtease.com/images/stories/virtuemart/product/spicychocolate.jpg",
    },
};

let recipeCount = 9;

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

const getRecipes = (request, response, params) => {
    const responseJSON = {
        
    }
    
    if (!params.recipe){
        responseJSON.recipes = recipes;
        responseJSON.recipeCount = recipeCount;
    }
    /*else {
        for (let i = 0; i < recipeCount; i++) {
            if(recipes[i].name === params.recipe){
                responseJSON.recipe = recipe[i];
            }
        }
    }*/

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
    if (!params.name || !params.brewTime || !params.taste || !params.ingredients || !params.imageRef) {
        responseJSON.message = 'Missing params, must have name, taste, brew time, ingredients, and reference img';
        return respondJSON(request, response, 400, responseJSON);
    }


    const newRecipe = {
        name: params.name,
        taste: params.taste,
        ingredients: params.ingredients,
        brewTime: params.brewTime,
        imageRef: params.imageRef,
    };

    /*if (recipes.hasOwnProperty(newRecipe.name)) {
        
        recipes[newRecipe.name].taste = newRecipe.taste;
        recipes[newRecipe.name].ingredients = newRecipe.ingredients;
        recipes[newRecipe.name].brewTime = newRecipe.brewTime;
        responseJSON.message = `Updated user.`
        
        return respondJSON(request,response, 204, responseJSON);
    }*/


    recipes[recipeCount] = {};
    recipes[recipeCount].name = newRecipe.name;
    recipes[recipeCount].taste = newRecipe.taste;
    
    let tempIngredients = newRecipe.ingredients;
    console.dir(tempIngredients)
    //tempIngredients = tempIngredients.split(',');
    //tempIngredients.shift();
    recipes[recipeCount].ingredients = tempIngredients;
    
    recipes[recipeCount].ingredients = newRecipe.ingredients;
    recipes[recipeCount].brewTime = newRecipe.brewTime;
    recipes[recipeCount].imageRef = newRecipe.imageRef;
    responseJSON.message = `Created new user.`;
    recipeCount++;

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
