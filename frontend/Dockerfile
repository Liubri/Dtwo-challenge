FROM node:22-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

# Serve stage
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

# Vite default port for info, but serve uses 3000 by default, let's use 5173 to match vite dev habit or 8080
EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
