FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

COPY src ./src


EXPOSE 3000

CMD ["node", "src/server.js"]
