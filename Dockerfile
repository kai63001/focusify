FROM node:18

WORKDIR /webApp

COPY package.json pnpm-lock.yaml* ./


RUN curl -L https://unpkg.com/@pnpm/self-installer | node && \
    pnpm config set store-dir /usr/local/pnpm-store && \
    pnpm install --frozen-lockfile && \
    npm install -g pnpm
# Install production dependencies
RUN pnpm install

COPY . .
# Set the environment to production
ENV NODE_ENV=production

RUN pnpm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]