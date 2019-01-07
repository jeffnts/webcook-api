import recipeModel from '../../models/recipeModel'
import userModel from '../../models/userModel'
import jwt from 'jsonwebtoken'


module.exports = {
  create:async (ctx) =>{
    const {token} = ctx.request.headers
    const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

    try{

      const user = await userModel.findById(id)
      if (!user){
        ctx.status = 404;
        ctx.message = "Usuário não encontrado."
      }
      const recipe = await recipeModel.create(ctx.request.body)
      recipe.user = id
      user.recipes.push(recipe)
      await user.save()
      await recipe.save()
      ctx.status = 201
      return ctx.message = "Receita criada com sucesso!"


    }
    catch(err){
      ctx.status = 500;
      return ctx.message = "Erro no servidor, a receita  não pôde ser criada."

    }


  },


    list: async ctx =>{

      try{
        const {token} = ctx.request.headers
        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

        const recipes = await recipeModel.find().where({user: id})


        if(await recipes.length === 0) {

            ctx.status = 404
            return ctx.message = "Não existe nenhuma receita  cadastrada :("

        }

        ctx.status = 200;
        ctx.body = recipes;
      }
      catch(err){
        ctx.throw(500, "Erro no servidor. Não foi possível encontrar as receitas.")
      }


    },
    show: async (ctx) =>{
        try{
            const {token} = ctx.request.headers
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

            const recipe = await recipeModel.findById(ctx.params.id)

            if(!recipe){
                ctx.status = 404;
                return ctx.message = "Receita não encontrada."
            }

            if( !(recipe.user == id)) {
              ctx.status = 401
              return ctx.message = "Usuário não autorizado!"
            }


            ctx.status = 200
            ctx.body = recipe
        }
        catch(err){
            ctx.status = 500;
            return ctx.message = "Erro no servidor. Não foi possível listar a receita."
        }
    },
    update: async (ctx) =>{
        try{
          const {token} = ctx.request.headers
          const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

          const recipe = await recipeModel.findById(ctx.params.id)

          if(!recipe){
              ctx.status = 404;
              return ctx.message = "Receita não encontrada."
          }
          if( !(recipe.user == id)) {
            ctx.status = 401
            return ctx.message = "Usuário não autorizado!"
          }
          await recipe.set(ctx.request.body)
          await recipe.save()

          ctx.status = 200;
          ctx.message = "Receita atualizado com sucesso!"
        }
        catch(err){
            ctx.status = 500;
            return ctx.message = "Erro no servidor. Não foi possível atualizar a receita."

        }
    },
    remove: async (ctx) =>{
        try{
          const {token} = ctx.request.headers
          const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

          const recipe = await recipeModel.findById(ctx.params.id)

          if( !(recipe.user == id)) {
            ctx.status = 401
            return ctx.message = "Usuário não autorizado!"
          }
          if(!recipe){
            ctx.status = 404;
            return ctx.message = "Receita não encontrada."
          }

          await recipe.remove()

          ctx.status = 204;
          ctx.message = "Receita deletada com sucesso!"





        }
        catch(err){
            ctx.status = 500;
            return ctx.message = "Erro no servidor. Não foi possível deletar a receita."
        }
    }


};