export default `
  input RecipeInputCreate{
    name: String!
    description: String!
    photo: String
    video: String
    categories: [String]
    ingredients: [String!]!
    prepareSteps: [String!]!
    prepareTime: Int
    portions: Int  
  } 
  input RecipeInputUpdate{
    name: String
    description: String
    photo: String
    video: String
    categories: [String]
    ingredients: [String]
    prepareSteps: [String]
    prepareTime: Int
    portions: Int  
  }

  type Recipe{
    id: ID!
    name: String!
    description: String!
    photo: String
    video: String
    categories: [String]
    ingredients: [String!]!
    prepareSteps: [String!]!
    prepareTime: Int
    portions: Int  
    
  }
    
   type Query {
   "You must be logged to see all your recipes."
    recipes: [Recipe!]!
    
    "You must be logged to see your specifc recipes."
    recipe(id: ID!): Recipe!      
  }
  
  type Mutation{
    "The user must to be logged to create a recipe."
    createRecipe(input: RecipeInputCreate!): Recipe
    
    "The user must to be logged to update a recipe."
    updateRecipe(id: String!, input: RecipeInputUpdate!): Recipe
    
    "The user must to be logged to delete a recipe."
    deleteRecipe(id:  String!): String
  }
    
`
