import recipeModel from '../../models/recipeModel'

export default {
  Query: {
    recipes: async () =>{
      try{
        return await recipeModel.find()
      }
      catch(err){

      }
    },
    recipe: async(parent, {id}) =>{
      try{
        return await recipeModel.findById(id)
      }
      catch(err){

      }

    }
  },
  Mutation:{
    createRecipe: async(parent, {input}) =>{

      try{

      }
      catch(err){

      }
    },
    updateRecipe: async(parent, args) =>{

      try{

      }
      catch(err){

      }
    },
    deleteRecipe: async(parent, args) =>{

      try{

      }
      catch(err){

      }
    }
  }
}