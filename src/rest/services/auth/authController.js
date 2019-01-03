import userModel from '../../../models/userModel'
import jwt from 'jsonwebtoken'


module.exports = {

    authenticate: async ctx =>{
        try{
            const{userName, email, password} = ctx.request.body
            const user = await userModel.findOne({$or: [{email}, {userName}]}).select('password')


            if(await user === null){
                ctx.status = 404
                return ctx.message = 'Usuáio não encontrado!'
            }

            const authenticated = await user.authenticate(password)

            if(!authenticated){
                ctx.status = 400
                return ctx.message = 'Usuário ou senha inválidos.'
            }

            const  token =  `${jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d'})}`


            ctx.body = {
            message: 'ok',
            token: token
            }
        }
        catch(err){
            ctx.status = 500
            return ctx.message = "Erro no servidor, não foi possível autenticar o usuário."
        }

    },

    isAuthenticated: async (ctx, next) =>{
        try{
            const {token} = ctx.request.headers

            if(!token){
                ctx.status = 401
                return ctx.message = 'Usuário não autenticado.'
            }

            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)
            ctx.request.user = {
                  id,
            };
           return next()
        }
        catch(err){
            ctx.status = 500;
            return ctx.message = "Erro no servidor, usuário não autenticado."
        }

    },

    isAdmin: async (ctx, next) => {
      try{
        const {token} = ctx.request.headers

        if(!token){
          ctx.status = 401
          return ctx.message = 'Usuário não autenticado.'
        }

        const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)
        ctx.request.user = {
          id,
        };

        const user  =  await userModel.findById(id)

        if (!(user.role === "admin")){
          ctx.status = 403;
          return ctx.message = "Acesso somente para administradores."
        }
        return next()
      }
      catch(err){
        ctx.status = 500;
        return ctx.message = "Erro no servidor, usuário não autenticado."
      }

    }

}