import recipeModel from '../../models/recipeModel'

export default {
  Query: {
    //All recipes
    recipes: async () =>{
      try{
        return await recipeModel.find()
      }
      catch(err){

      }
    },
    recipe: async(args, {id}) =>{
      try{
        return await recipeModel.findById(id)
      }
      catch(err){

      }

    }
  }
}