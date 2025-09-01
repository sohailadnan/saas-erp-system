# SaaS-based ERP System

A modern, agent-oriented SaaS ERP system built with TypeScript, Node.js, and React.

## Architecture Overview

This system is built using a microservices architecture with autonomous agents, following modern cloud-native principles:

- **Frontend**: React-based SPA with TypeScript
- **Backend**: Node.js microservices
- **Agents**: Autonomous business logic handlers
- **Database**: PostgreSQL (per-service)
- **Message Queue**: RabbitMQ
- **API Gateway**: Express-based gateway service
- **Authentication**: JWT with OAuth2 support

## Project Structure

```
.
├── services/          # Microservices
│   ├── user-management/
│   ├── inventory/
│   ├── finance/
│   └── hr/
├── agents/           # Agent components
│   ├── orchestration/
│   └── integration/
├── gateway/          # API Gateway
├── frontend/         # React SPA
├── shared-libs/      # Shared utilities
├── infrastructure/   # DevOps configs
├── tests/           # Test suites
└── docs/            # Documentation
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- PostgreSQL
- RabbitMQ

### Installation

1. Clone the repository.
2. Install dependencies for all packages using Lerna and npm workspaces:
   ```bash
   npm install
   ```
   This command will hoist shared dependencies to the root `node_modules` and link local packages.
3. Set up environment variables. Refer to the `config.ts` files within each service's `src` directory for required variables.
4. Start the development environment (databases, message queues, etc.):
   ```bash
   docker-compose up -d
   ```

## Development

### Running Services

## Development

### Running All Services and Agents

To start all services and agents in parallel (as defined in the root `package.json`):

```bash
npm run dev
```

### Running Individual Services or Agents

To run a specific service or agent independently:

```bash
npm run dev --workspace=<package-name>
# Example: npm run dev --workspace=@saas-erp/user-management
# Example: npm run dev --workspace=@saas-erp/orchestration
```

Alternatively, you can use Lerna directly:

```bash
lerna run dev --scope=<package-name>
# Example: lerna run dev --scope=user-management
# Example: lerna run dev --scope=orchestration
```

### Running Tests

```bash
# Run unit tests for all packages
npm run test

# Run integration tests for all packages
npm run test:integration

# Run E2E tests for all packages
npm run test:e2e
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

Please report any security issues to security@example.com

## Support

For support, please email support@example.com
