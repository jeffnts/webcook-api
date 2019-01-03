export default `
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
    user(id: ID!): User!
  }
`;
