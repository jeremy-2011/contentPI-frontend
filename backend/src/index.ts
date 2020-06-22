import cors from 'cors'
import express from 'express'
//import jwt from 'jsonwebtoken';
import { makeExecutableSchema } from 'apollo-server'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'
import models from './models'

const app = express()
app.use(
  cors()
) /*
const resolvers = {
  Query: {
    sayHello: (_: any, args: any): any => {
      return {
        message: `Hello ${args.name || `word`}`
      }
    }
  }
}*/
/*
const typeDefs = `
type Hello{
  message:String!
}
type Query {
  sayHello(name:String!):Hello
}
`*/
import { $server } from '../config'
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema,
  context: { models } //async ({ req }) => {
  // if (req) {
  //return {
  //  me,
  // models: {
  // },
  //};
  //}
  //},
})
server.applyMiddleware({ app, path: '/graphql' })
const alter = true
const force = false

models.sequelize.sync({ alter, force }).then(() => {
  app.listen($server.port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
  })
})
