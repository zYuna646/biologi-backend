# Use Node.js LTS Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Clean install for production (removes devDependencies)
RUN rm -rf node_modules && \
    npm ci --only=production

# Expose port 3009
EXPOSE 3009

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /app
USER nestjs

# Start the application
CMD ["npm", "run", "start:prod"] 