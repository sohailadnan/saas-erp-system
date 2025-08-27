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

1. Clone the repository
2. Install dependencies in each service:
   ```bash
   cd services/user-management && npm install
   cd ../inventory && npm install
   # Repeat for other services
   ```
3. Set up environment variables
4. Start the development environment:
   ```bash
   docker-compose up -d
   ```

## Development

### Running Services

Each service can be run independently:

```bash
cd services/<service-name>
npm run dev
```

### Running Agents

Agents can be started individually:

```bash
cd agents/<agent-name>
npm run start
```

### Running Tests

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
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
