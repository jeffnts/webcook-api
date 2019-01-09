export default `
  
  input UserInput {    
    name: String
    userName: String    
    email: String   
    role: String
    photo: String      
  }
  
  type User {
    id: ID!
    name: String!
    userName: String!    
    email: String!    
    role: String!
    photo: String
    recipes:[Recipe!]!     
  }

  type Query {
    "Only admins can see the users."  
    users: [User!]!
    
    "You must be logged to see the informations about your user."
    user: User!
  }
  
  type Mutation {
    "Anyone can create a user."
    createUser(name: String!, userName: String!, email: String!, password: String!): User
    
    "You must to be logged to update your user."
    updateUser(input: UserInput): User
    
    "You must to be logged to delete your user."
    deleteUser: String
  }
`;
