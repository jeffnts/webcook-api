import userModel from '../../models/userModel'
import jwt from 'jsonwebtoken'



export default{

  Mutation: {
    login: async (parent, { userName, email, password}) => {
      if(!(userName || email)) throw new Error("Favor informar um email ou nome de usuário.")

      const user = await userModel.findOne({$or: [{email}, {userName}]}).select('password')

      if(await user === null) throw new Error("Nome de usuário, ou email incorretos.")

      const authenticated = await user.authenticate(password)
      if(!authenticated) throw new Error("Usuário ou senha inválidos.")

      const  token =  `${jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d'})}`

      return {token}
    }

  }
}