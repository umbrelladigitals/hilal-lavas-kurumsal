# Production Dockerfile for Next.js
FROM node:20-alpine

# Install native compilation dependencies for packages like better-sqlite3
RUN apk add --no-cache libc6-compat python3 make g++ gcc

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Clean installation of dependencies
RUN npm install

# Copy application files
COPY . .

# Set production variables
ENV NODE_ENV=production
ENV PORT=3120
ENV HOSTNAME="0.0.0.0"

# Build Next.js production bundle
RUN npm run build

EXPOSE 3120

CMD ["npm", "run", "start"]
