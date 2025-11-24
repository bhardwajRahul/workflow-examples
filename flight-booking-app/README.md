# Flight Booking App

This example shows how to use Workflow to make AI agents more reliable and production-ready by adding automatic retries, resume capabilities, and fault tolerance to AI SDK applications. It showcases a conversational flight booking assistant that can search flights, check status, and book tickets—all while being resilient to network failures and LLM errors.

## Getting Started

### Prerequisites

- An API key from [Vercel AI Gateway](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai&title=Go+to+AI+Gateway)

### Local Development

1. Clone this example and install dependencies:

   ```bash
   git clone https://github.com/vercel/workflow-examples
   cd workflow-examples/flight-booking-app
   pnpm install
   ```

2. Create a `.env.local` file:

   ```bash
   touch .env.local
   ```

3. Add your API key to the `.env.local` file:

   ```bash
   AI_GATEWAY_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the app

## Deploying

### Vercel (Recommended)

Deploy directly to Vercel, no additional configuration is needed. Workflow works out of the box.

### Other Platforms (Railway, Render, etc.)

For non-Vercel deployments, you'll need to configure a PostgreSQL World to handle workflow state persistence.

1. **Set up a PostgreSQL database** (Railway, Supabase, Neon, etc.)
2. **Add environment variables:**

    ```bash
    WORKFLOW_TARGET_WORLD="@workflow/world-postgres"
    WORKFLOW_POSTGRES_URL="postgres://postgres:password@db.yourdb.co:5432/postgres"
    WORKFLOW_POSTGRES_JOB_PREFIX="workflow_"
    WORKFLOW_POSTGRES_WORKER_CONCURRENCY=10
    ```
3. Run the following command to setup the database schema:

    ```bash
    pnpm exec workflow-postgres-setup
    ```

4. Deploy to your platform of choice

Learn more about the Workflow PostgreSQL World [here](https://useworkflow.dev/docs/deploying/world/postgres-world)

## Key Features Demonstrated

- **Retryable AI calls** - `streamText` calls wrapped in `'use step'` functions automatically retry on failure
- **Multi-turn conversations** - Workflow orchestrates the tool-calling loop across multiple LLM interactions
- **Stream reconnection** - Client can reconnect to in-progress workflows using `WorkflowChatTransport`
- **Tool execution** - Five flight booking tools (search, status check, airport info, booking, baggage) demonstrating real-world agent patterns
- **Error simulation** - 30% random failure rate to showcase automatic retry behavior

This project uses the following stack:

- [Next.js](https://nextjs.org) 15 (App Router)
- [Vercel AI SDK](https://ai-sdk.dev/docs) with `streamText` and tools
- [Workflow DevKit](https://useworkflow.dev) for durability
- [Tailwind CSS](https://tailwindcss.com) for styling
