import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { schema,rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {
    public signup = async ({ request, response }: HttpContextContract)=>{
        //console.log(request.body());
        
       
        const req =await  request.validate({
            schema:schema.create({
                name:schema.string(),
                email:schema.string({},[
                    rules.email()
                ]),
               password:schema.string({},[
                   rules.confirmed()
               ])
            }),
            messages: { 
                'name.required':'Name is required to sign up',
                'email.required':'Email is required to sign up',
                'password.required':'password is required to sign up'
              }
        })

        const user = new User()

        user.name=req.name
        user.email=req.email
        user.password=req.password

        await user.save()

        return response.redirect('/');
    }

    public login = async ({ request, auth,response }: HttpContextContract)=>{

        const req = await request.validate({
            schema:schema.create({
                email:schema.string({},[
                    rules.email()
                ]),
                password:schema.string({},[
                    rules.minLength(5)
                ])
            })
            , 
            messages: {       
                'email.required':'Email is required to login',
                'password.required':'Password is required to login',
                'password.minLength':'Password must be at least 8 characters'
              }
        })

        //const user = await User.findBy('email',req.email)
        const email =req.email;
        const password = req.password;

       const isValid= await auth.attempt(email,password)
       console.log(isValid);
       

       
      return response.redirect('/profile');
    
    }
}



 