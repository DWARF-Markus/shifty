import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'your email',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "Your email" },
          password: {  label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
          const user = await fetch('http://localhost:3000/api/getuser', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                email: credentials.username,
              }
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data) {
              if (data.result.email === credentials.username && data.result.password === credentials.password) {
                return { id: data.result.id, name: data.result.firstName, email: data.result.email }
              }
            }
          })

          
          // const user = { id: 1, name: 'A', email: 'a@b.dk' }

          // // console.log(credentials);
          // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            
            return Promise.resolve(user)
          } else {
            // If you return null or false then the credentials will be rejected
            // You can also Reject this callback with an Error or with a URL:
            // return Promise.reject(new Error('error message')) // Redirect to error page
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
            return Promise.resolve(null)
          }
        }
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET
    },
  })