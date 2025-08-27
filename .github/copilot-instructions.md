# SaaS-based ERP System Development Instructions

## Project Overview
This is a SaaS-based ERP system using an agent-oriented architecture, built with TypeScript, Node.js microservices, and React frontend.

## Architecture Components
- Frontend: React-based SPA
- Backend: Node.js microservices
- Database: PostgreSQL
- Message Queue: RabbitMQ
- API Gateway
- Agent System Components

## Development Guidelines
- Follow TypeScript best practices
- Use agent-oriented design patterns
- Implement microservices architecture
- Ensure proper error handling and logging
- Write comprehensive tests
- Follow security best practices

## Project Structure
```
erp-saas/
├── services/          # Microservices
├── agents/           # Agent components
├── gateway/          # API Gateway
├── frontend/         # React SPA
├── shared-libs/      # Shared utilities
├── infrastructure/   # DevOps configs
├── tests/           # Test suites
└── docs/            # Documentation
```

## Security Considerations
- Implement RBAC
- Use JWT for authentication
- Encrypt sensitive data
- Follow OWASP guidelines

## Testing Requirements
- Unit tests for all components
- Integration tests for services
- E2E tests for critical flows
- Performance testing

## Development Workflow
1. Follow GitFlow
2. Write clean, documented code
3. Review PRs thoroughly
4. Maintain CI/CD pipeline
