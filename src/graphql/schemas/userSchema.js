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
    users: [User!]!
    user: User!
  }
  
  type Mutation {
    createUser(name: String!, userName: String!, email: String!, password: String!): User
    updateUser(input: UserInput): User
    deleteUser: String
  }
`;
