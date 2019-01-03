import userModel from '../../models/userModel'
import jwt from 'jsonwebtoken'

module.exports = {

    create: async ctx =>{

        const {email} = ctx.request.body;
        const {userName} = ctx.request.body;

        try{
            if( await userModel.findOne({email})){
                ctx.status = 403;
                return ctx.message = "Usuário com email já cadastrado."
            }
            if( await userModel.findOne({userName})){
                ctx.status = 406;
                return ctx.message = "Nome de usuário já está sendo usado."
            }

            const user = await userModel.create({

                name: ctx.request.body.name,
                userName: ctx.request.body.userName,
                email: ctx.request.body.email,
                password: ctx.request.body.password

            });

            ctx.status = 201;
            ctx.message = "Usuário criado com sucesso!"
        }
        catch(err){

            ctx.status = 500;
            return ctx.message = "Erro no servidor, o usuário não pôde ser criado."
        }

    },

    list: async ctx =>{
        try{

            const users = await userModel.find();

            if( await users.length === 0 ) {

                ctx.status = 204;
                return ctx.message = "Não existe nenhum usuário  cadastrado :("
            }


            ctx.status = 200;
            ctx.body = users;
        }
        catch(err){

            ctx.status = 500;
            return ctx.message = "Erro no servidor. Não foi possível listar os usuários."


        }

    },
    show: async (ctx) =>{
      try{
      const {token} = ctx.request.headers
      const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

      const user = await userModel.findById(id)

      if(!user){
          ctx.status = 404
          return ctx.message = "Usuário não encontrado."
      }

      ctx.status = 200
      ctx.body = user
      }
      catch(err){
          ctx.status = 500
          return ctx.message = "Erro no servidor. Não foi possível listar o usuário."
      }
    },
    update: async (ctx) =>{
        try{
          const {token} = ctx.request.headers
          const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

          const user = await userModel.findById(id)

          if(!user){
            ctx.status = 404;
            return ctx.message = "Usuário não encontrado."
          }
          if(ctx.request.body.role === "admin"){
            ctx.status = 403
            return ctx.message = "Somente administradores pode executar esta operação."
          }
          await user.set(ctx.request.body)
          await user.set({role: 'user'})
          await user.save()

          ctx.status = 200;
          ctx.message = "Usuário atualizado com sucesso!"
        }
        catch(err){
            ctx.status = 500;
            return ctx.message = "Erro no servidor. Não foi possível atualizar o usuário."

        }
    },
    remove: async (ctx) =>{
        try{
          const {token} = ctx.request.headers
          const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

          const user = await userModel.findById(id)
          if(!user){
            ctx.status = 404;
            return ctx.message = "Usuário não encontrado."
          }

            await user.remove()

            ctx.status = 204
            ctx.message = "Usuário deletado com sucesso!"



        }
        catch(err){
            ctx.status = 500
            return ctx.message = "Erro no servidor. Não foi possível deletar o usuário."
        }
    }

};