# Use a base image with Node.js and Bun
FROM oven/bun:1.2.13

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies with a clean install
RUN bun install --frozen-lockfile  

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3333

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3333/health || exit 1

# Default command
CMD ["bun", "run", "dev"]