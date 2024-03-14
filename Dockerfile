# Stage 1: Build
FROM node:lts as builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y git && apt-get clean

# Copy project files
COPY package*.json ./
COPY tsconfig.json ./
COPY hardhat.config.ts ./
COPY ./contracts ./contracts
COPY ./scripts ./scripts
COPY ./test ./test

# Install project dependencies
RUN npm install --save-dev

# Compile the project
RUN npx hardhat compile

# Stage 2: Run
FROM node:lts

WORKDIR /app

COPY --from=builder /app .

# Install production dependencies
RUN npm install --production

# Run the Hardhat node
CMD ["npx", "hardhat", "node"]