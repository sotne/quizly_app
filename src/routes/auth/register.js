const { User } = require('../../models');
const bcrypt = require('bcrypt');
const axios = require('axios');


module.exports = async (req, res) => {
    console.log(req.body)
    //first check to make sure the password and confirmpass are the same
    if (req.body.password !== req.body.confirmPass){
        res.send({error: 'your password do not match'})
    } else {
        try{
            const mutation = `
            mutation($email: String!, $username:String!, $password:String!){
                register(email:$email, username:$username, password:$password)
            }
            `

            const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
                {
                    query:mutation,
                    variables:{
                        email:req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                    }
                },
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
            )

            const jwtToken = data.data.register
            console.log(jwtToken);

            res.redirect('/')

        } catch(err){
                console.log(err)
                res.redirect('/auth/register');
        }
    }
}