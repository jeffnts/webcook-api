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
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe!      
  }
  
  type Mutation{
    createRecipe(input: RecipeInputCreate!): Recipe
    updateRecipe(id: String!, input: RecipeInputUpdate!): Recipe
    deleteRecipe(id:  String!): String
  }
    
`
