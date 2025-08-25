# Local Development Setup

This guide explains how to develop and test these n8n nodes locally without publishing them.

## Prerequisites

- Docker
- Git

## Setup Instructions

### 1. Set Up Docker Environment

Download and set up the Docker environment with n8n and ngrok:

- Clone the [VirtuousCRM/Docker](https://github.com/VirtuousCRM/Docker) repository
- Navigate to the [integrations folder](https://github.com/VirtuousCRM/Docker/tree/main/integrations)
- Follow the setup instructions to get n8n running locally in Docker

### 2. Build the Custom Nodes

Once your local n8n instance is running, return to this repository and build the nodes:

```bash
npm run build
```

This command compiles the TypeScript nodes and creates a `/dist` folder with the compiled JavaScript files.

### 3. Configure Docker Volume Mapping

To load your custom nodes into n8n, you need to add a volume mapping in the Docker Compose configuration:

1. Open `docker-compose.yaml` in the integrations folder
2. Locate the existing volumes section:
   ```yaml
   volumes:
     - n8n:/home/node/.n8n
   ```
3. Add the following line to mount your dist folder (replace the path with your actual project location):
   ```yaml
   - "C:/Users/JenGandy/Documents/GitHub/n8n-nodes/dist:/home/node/.n8n/custom"
   ```

### 4. Restart and Verify

1. **Restart the n8n container** to load the custom nodes
2. **Verify installation** by looking for "Virtuous" nodes in the n8n node palette

## Development Workflow

After making changes to the node code:

1. Run `npm run build` to recompile
2. Restart the n8n container
3. Test your changes in the n8n interface

## Updating with New Changes

When there are updates to the repository that you want to pull in:

1. **Pull the latest changes** from the repository:
   ```bash
   git pull
   ```
2. **Rebuild the nodes** to compile any new changes:
   ```bash
   npm run build
   ```
3. **Restart the n8n container** to load the updated nodes

## Troubleshooting

- Ensure the volume path in docker-compose.yaml matches your actual project directory
- Check Docker container logs if nodes don't appear
- Verify that the `/dist` folder contains compiled `.js` files after building
