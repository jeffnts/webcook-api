import userModel from '../../models/userModel'
import recipeModel from '../../models/recipeModel'


export default {
  Query: {
    users: async () => await userModel.find(),
    user: async (parent, args) => await userModel.findById(args.id )
  },
  User: {
    recipes: (parent, args) => recipeModel.find()
  }
}