import userModel from '../../models/userModel'
import recipeModel from '../../models/recipeModel'


export default {
  Query: {
    users: async () => await userModel.find(),
    user: async (parent, args) => await userModel.findById(args.id )
  },
  Mutation: {
    createUser: async (parent, args) => {

      try {

      }
      catch (err) {

      }
    },
    updateUser: async (parent, args) => {

      try {

      }
      catch (err) {

      }
    },
    deleteUser: async (parent, args) => {

      try {

      }
      catch (err) {

      }
    }

  },

  User: {
    recipes: (parent, args) => recipeModel.find()
  }
}