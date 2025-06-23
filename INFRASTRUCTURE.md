# UTxO RPC Documentation Infrastructure

This document describes the deployment architecture and infrastructure setup for the UTxO RPC documentation site.

## Architecture Overview

The application consists of two main services:

1. **Nextra Documentation Site** - The main documentation site built with Next.js and Nextra
2. **gRPC UI Service** - An embedded gRPC web interface for interactive API exploration

## Services

### Nextra Documentation (`nextra`)
- **Port**: 8080
- **Framework**: Next.js with Nextra theme
- **Purpose**: Serves the main documentation website
- **Proxy**: Routes `/grpcui/*` requests to the gRPC UI service

### gRPC UI Service (`grpcui`)
- **Port**: 8081
- **Purpose**: Provides an interactive web UI for gRPC API exploration
- **Integration**: Embedded as an iframe in the documentation site

## Docker Configuration

### Multi-Container Setup

The application uses Docker Compose to orchestrate both services:

```yaml
services:
  nextra:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - GRPCUI_URL=http://grpcui:8081
    ports:
      - "8080:8080"
    environment:
      - PORT=8080

  grpcui:
    build:
      context: .
      dockerfile: Dockerfile.grpcui
    ports:
      - "8081:8081"
    environment:
      - USE_PLAINTEXT=false
      - GRPC_TARGET=mainnet.utxorpc-v0.demeter.run:443
      - API_KEY=utxorpc13rfqzhrntg93wh7uwg8
      - API_KEY_HEADER=dmtr-api-key
```

### Build Arguments & Environment Variables

#### Nextra Service
- `GRPCUI_URL` (build arg): URL for proxying gRPC UI requests (configured at build time)
- `PORT`: Port the Next.js server listens on

#### gRPC UI Service
- `USE_PLAINTEXT`: Whether to use plaintext connection (false for SSL/TLS)
- `GRPC_TARGET`: Target gRPC server endpoint
- `API_KEY`: Authentication key for the gRPC service
- `API_KEY_HEADER`: Header name for the API key (default: "dmtr-api-key")
- `GRPC_PORT`: Port for the gRPC UI service (default: 8081)

## Deployment

### Local Development

1. **Start both services**:
   ```bash
   docker-compose up --build
   ```

2. **Access the application**:
   - Documentation: http://localhost:8080
   - gRPC UI (direct): http://localhost:8081
   - gRPC UI (embedded): http://localhost:8080/grpcui

### Production Deployment

For production deployments:

1. **Update environment variables** in `docker-compose.yml`:
   ```yaml
   environment:
     - GRPC_TARGET=your-production-grpc-endpoint:443
     - API_KEY=your-production-api-key
     - API_KEY_HEADER=your-auth-header-name
   ```

2. **Configure build arguments** for internal service communication:
   ```yaml
   args:
     - GRPCUI_URL=http://grpcui:8081
   ```

3. **Deploy with Docker Compose**:
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

## Version Pinning

The infrastructure uses pinned versions for reproducibility:

- **Go**: `golang:1.24-alpine`
- **Alpine Linux**: `alpine:3.21`
- **Node.js**: `node:19-alpine`
- **gRPC UI**: Commit hash `aa3edefac370a32da4524893ffdca9c591ba0aeb`

## Network Configuration

### Internal Communication
- Services communicate via Docker's internal networking
- The `nextra` service proxies requests to `grpcui:8081`
- gRPC UI binds to `0.0.0.0:8081` to accept connections from other containers

### External Access
- **Port 8080**: Main documentation site
- **Port 8081**: Direct access to gRPC UI (optional)

## Configuration Examples

### Different gRPC Endpoints

**Local Development (Plaintext)**:
```yaml
environment:
  - USE_PLAINTEXT=true
  - GRPC_TARGET=localhost:50051
  - API_KEY=""
```

**Demeter Mainnet (SSL)**:
```yaml
environment:
  - USE_PLAINTEXT=false
  - GRPC_TARGET=mainnet.utxorpc-v0.demeter.run:443
  - API_KEY=utxorpc13rfqzhrntg93wh7uwg8
  - API_KEY_HEADER=dmtr-api-key
```

**Custom Endpoint**:
```yaml
environment:
  - USE_PLAINTEXT=false
  - GRPC_TARGET=api.example.com:443
  - API_KEY=your-api-key
  - API_KEY_HEADER=authorization
```

## Troubleshooting

### Common Issues

1. **Connection Refused Errors**:
   - Ensure gRPC UI service binds to `0.0.0.0` not `127.0.0.1`
   - Check Docker network connectivity between services

2. **Build-time vs Runtime Configuration**:
   - `GRPCUI_URL` must be set as a build argument for Next.js rewrites
   - gRPC connection settings can be runtime environment variables

3. **SSL/TLS Issues**:
   - Set `USE_PLAINTEXT=false` for encrypted endpoints
   - Ensure the target endpoint supports TLS

### Logs

View service logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs nextra
docker-compose logs grpcui
```

## Security Considerations

- API keys are passed as environment variables
- Use Docker secrets for sensitive production deployments
- The gRPC UI service only accepts connections from the documentation service
- SSL/TLS is enforced for production gRPC endpoints