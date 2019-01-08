import recipeModel from '../../models/recipeModel'
import userModel from '../../models/userModel'

import jwt from 'jsonwebtoken'

export default {
  Query: {
    recipes: async (parent, args, {ctx}) =>{
      try{
        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const recipes = await recipeModel.find().where({user: id})

        if (recipes.length === 0) throw new Error("Não existe nenhuma receita  cadastrada :(")

        return recipes
      }
      catch(err){
        return err
      }
    },
    recipe: async(parent, args, {ctx}) =>{
      try{
        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const recipe = await recipeModel.findById(args.id)

        if( !(recipe.user == id)) throw new Error ("Usuário não autorizado!")

        return recipe
      }
      catch(err){
        return err
      }

    }
  },
  Mutation:{
    createRecipe: async(parent, {input}, {ctx}) =>{

      try{
        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const user = await userModel.findById(id)

        const recipe = await recipeModel.create(input)
        recipe.user = id
        user.recipes.push(recipe)
        await user.save()
        await recipe.save()

        return recipe
      }
      catch(err){
        return err
      }
    },
    updateRecipe: async(parent, args, {ctx}) =>{
      try{
        const {input} = args

        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const recipe = await recipeModel.findById(args.id)

        if( !(recipe.user == id)) throw new Error ("Usuário não autorizado!")

        await recipe.set(input)
        await recipe.save()

        return recipe
      }
      catch(err){
        return err
      }
    },
    deleteRecipe: async(parent, args, {ctx}) =>{

      try{
        const {token} = ctx.request.headers
        if(token === undefined) throw new Error("Usuário não autenticado!")
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const recipe = await recipeModel.findById(args.id)

        if( !(recipe.user == id)) throw new Error ("Usuário não autorizado!")

        await recipe.remove()

        return "Receita deletada com sucesso!"
      }
      catch(err){
        return err
      }
    }
  }
}