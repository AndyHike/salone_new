# Deployment Guide - Salon Website

## Docker Setup for Coolify

### Prerequisites
- Docker and Docker Compose installed
- Directus already running via Coolify
- Next.js application ready

### Step 1: Build Docker Image

```bash
# Build the image
docker build -t salon-app:latest .

# Or use docker-compose
docker-compose build
```

### Step 2: Environment Variables

Create `.env.local` with your Directus configuration:

```env
# For local development
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_API_TOKEN=your_api_token_here
DIRECTUS_URL=http://directus:8055

# For production (in Coolify)
NEXT_PUBLIC_DIRECTUS_URL=http://directus:8055
DIRECTUS_API_TOKEN=your_production_token
DIRECTUS_URL=http://directus:8055
```

### Step 3: Run Container

**Development (with docker-compose):**

```bash
docker-compose up -d
```

**Production (Individual container):**

```bash
docker run -d \
  --name salon-app \
  -p 3000:3000 \
  -e DIRECTUS_API_TOKEN=your_token \
  -e DIRECTUS_URL=http://directus:8055 \
  -e NEXT_PUBLIC_DIRECTUS_URL=http://directus:8055 \
  --network salon_network \
  salon-app:latest
```

### Step 4: Deploy to Coolify

1. Go to Coolify dashboard
2. Add new application
3. Select Docker option
4. Paste this docker-compose configuration:

```yaml
version: '3.8'
services:
  salon-app:
    image: salon-app:latest
    ports:
      - "3000:3000"
    environment:
      DIRECTUS_API_TOKEN: ${DIRECTUS_API_TOKEN}
      DIRECTUS_URL: http://directus:8055
      NEXT_PUBLIC_DIRECTUS_URL: http://directus:8055
      NODE_ENV: production
    networks:
      - salon_network
    restart: unless-stopped

networks:
  salon_network:
    external: true
```

5. Set environment variables in Coolify
6. Deploy

### Networking Between Containers

Containers can communicate over Docker network:
- From app to directus: `http://directus:8055`
- From host to app: `http://localhost:3000`
- From host to directus: `http://localhost:8055`

### Troubleshooting

**Connection refused:**
- Check if Directus container is running: `docker ps`
- Check network: `docker network ls`
- Verify API token is valid

**Build fails:**
- Clear cache: `docker system prune -a`
- Rebuild: `docker build --no-cache -t salon-app:latest .`

**Port already in use:**
- Change port in docker-compose or use: `docker run -p 3001:3000 ...`

**API not responding:**
- Check logs: `docker logs salon-app`
- Verify DIRECTUS_URL matches actual container name
- Ensure containers are on same network

### View Logs

```bash
# Using docker-compose
docker-compose logs -f app

# Using docker
docker logs -f salon-app
```

### Stop Containers

```bash
# Using docker-compose
docker-compose down

# Using docker
docker stop salon-app
docker rm salon-app
```

### Health Check

Visit `http://localhost:3000/api/test-directus` to verify:
- App is running
- Connection to Directus is working
- API token is valid

Should return JSON with services data if everything works.
