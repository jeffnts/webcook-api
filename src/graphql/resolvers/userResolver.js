import userModel from '../../models/userModel'

import jwt from 'jsonwebtoken'

export default {
  Query: {
    users: async (parent, args, {ctx})=>{
      try{
        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const user = await userModel.findById(id)
        console.log(user)
        const users = await userModel.find()

        if(user.role === 'admin'){
          return users
        }
        else{
          throw new Error ("Acesso somente para administradores.")

        }
        //return users

      }catch(err){
        return err
      }
    },

    user: async (parent, args, {ctx}) =>{
      const {token} = ctx.request.headers
      if(token === undefined) throw new Error("Usuário não autenticado!")
      const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

      return await userModel.findById(id)
    }
  },
  Mutation: {
    createUser: async (parent, {name, userName, email, password}) => {

      try {
        const user = await userModel.create({
          name,
          userName,
          email,
          password
        })

        return user
      }
      catch (err) {
        if( await userModel.findOne({email})){
          throw new Error("Usuário com email já cadastrado.")
        }
        if( await userModel.findOne({userName})){
          throw new Error("Nome de Usuário já está sendo usado.")
        }
       return err
      }
    },

    updateUser: async (parent, {input}, {ctx}) => {
      try {
        if(input.role === 'admin'){
          throw new Error("Apenas Administradores pode realizar esta operação.")
        }

        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const user = await userModel.findById(id)

        await user.set(input)
        await user.set({role: 'user'})
        await user.save()

        return user
      }
      catch (err) {
        return err
      }
    },

    deleteUser: async (parent, args, {ctx}) => {
      try {
        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const user = await userModel.findById(id)
        user.remove()
        return "Usuário deletado com sucesso!"
      }
      catch (err) {
        return err
      }
    }

  }
}