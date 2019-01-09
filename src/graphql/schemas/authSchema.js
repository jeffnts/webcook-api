export default `
  type Token{
  token: String!
  }
  
  type Mutation{
    """Log a user into the system according your userName or email and password. 
    After logged you have to pass the genereted token into the Header to get the access to the system."""   
    login(userName: String, email: String, password: String!): Token!
  }
`