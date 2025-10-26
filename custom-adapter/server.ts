import { start } from 'workflow/api';
import flow from './.well-known/workflow/v1/flow.js';
import step from './.well-known/workflow/v1/step.js';
import * as webhook from './.well-known/workflow/v1/webhook.js';
import { handleUserSignup } from './workflows/user-signup.js';

const server = Bun.serve({
  port: process.env.PORT,
  routes: {
    '/.well-known/workflow/v1/flow': {
      POST: req => flow.POST(req),
    },

    '/.well-known/workflow/v1/step': {
      POST: req => step.POST(req),
    },

    "/.well-known/workflow/v1/webhook/:token": webhook, // webhook exports handlers for GET, POST, DELETE, etc.

    '/': {
      GET: async req => {
        // random email
        const email = `test-${crypto.randomUUID()}@test.com`;

        const run = await start(handleUserSignup, [email]);

        return Response.json({
          message: 'User signup workflow started',
          runId: run.runId,
        });
      },
    },
  },
});


console.log(`Server listening on http://localhost:${server.port}`);

