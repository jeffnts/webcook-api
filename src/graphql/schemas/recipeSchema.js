export default `
  type Recipe{
    id: ID!
    name: String!
    description: String!
    photo: String
    video: String
    categories: [String]
    ingredients: [String!]!
    prepareSteps: [String]
    prepareTime: Int
    portions: Int  
    
  }
    
   type Query {
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe!      
  }
    
`
