import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
// putting a ts ignore here because swagger-ui-express types are conflicting with express types we use for echt
// @ts-ignore
import swaggerUi from 'swagger-ui-express'
import { z } from 'zod'
import { validate } from '../../../src'
import todo from './routes/todo'

const openapiSpecContent = fs.readFileSync(
  path.resolve(__dirname, '..', 'output', './openapi-spec.json'),
  'utf8'
)
const openapiSpec = JSON.parse(openapiSpecContent)

const app = express()

// Regular route
app.get(
  '/health',
  validate({
    body: z.object({
      message: z.string(),
    }),
  }),
  (_req, res) => {
    res.json({ message: 'Hello World' })
  }
)

// Using a router
app.use('/todo', todo)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))

export default app
