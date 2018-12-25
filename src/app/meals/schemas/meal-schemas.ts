import { normalize, schema } from 'normalizr';

// // Define a users schema
// const user = new schema.Entity('users');

// // Define your comments schema
// const comment = new schema.Entity('comments', {
//   commenter: user
// });

// // Define your article
// const article = new schema.Entity('articles', {
//   author: user,
//   comments: [comment]
// });

const ingredientSchema = new schema.Entity('ingredient');

const ingredientQuantitySchema = new schema.Entity('ingredientQuantities', {
    ingredient: ingredientSchema
});

const mealSchema = new schema.Entity('meals', {
    ingredientQuantities: [ingredientQuantitySchema]
});

const mealsSchema = {meals: [mealSchema]};

export {ingredientQuantitySchema, mealSchema, mealsSchema}