export default `
  type Token{
  token: String!
  }
  
  type Mutation{
    login(userName: String, email: String, password: String!): Token!
  }
`