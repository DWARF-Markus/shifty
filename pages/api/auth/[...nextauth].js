import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const bcrypt = require('bcrypt');

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'your email',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "Your email" },
          password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
          const user = await fetch('http://localhost:3000/api/getcompany', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              company: {
                email: credentials.email,
              }
            })
          })
            .then(res => res.json())
            .then(async (data) => {
              if (data.company) {
                if (data.company.email === credentials.email) {
                  return await bcrypt.compare(credentials.password, data.company.password).then(function (result) {
                    if (result) {
                      return { id: data.company.id, name: data.company.name, email: data.company.email, isAdmin: true };
                    } else {
                      return false;
                    }
                  });
                }
              }
            });

          if (user) {
            return Promise.resolve(user)
          } else {
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
    // callbacks: {
    //   redirect: async () => {
    //     return Promise.resolve('/app')
    //   },
    // },
    pages: {
      signIn: '/signin',
    }
  })