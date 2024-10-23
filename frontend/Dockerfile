FROM node:22
WORKDIR /uphill
RUN apt-get update && apt-get install -y \
    build-essential \
    libc6 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*
COPY package*.json .env next.config.mjs postcss.config.mjs tailwind.config.ts tsconfig.json ./
RUN npm install 
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]