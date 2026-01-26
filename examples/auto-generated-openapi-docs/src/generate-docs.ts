import fs from 'node:fs'
import path from 'node:path'
import { generateOpenApiSpec } from '../../../src'
import app from './app'

const spec = generateOpenApiSpec(app)

fs.writeFileSync(
  path.resolve(__dirname, '..', 'output', 'openapi-spec.json'),
  JSON.stringify(spec, null, 2)
)
