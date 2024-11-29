FROM node:20 AS build-front
WORKDIR /app/front
RUN apt-get update && apt-get install -y libvips-dev build-essential && rm -rf /var/lib/apt/lists/*
COPY front/package*.json ./
RUN yarn install
COPY front/ ./
RUN yarn build

# Etapa 2: Construir a API
FROM node:20 AS build-api
RUN apt-get update && apt-get install -y libvips-dev build-essential && rm -rf /var/lib/apt/lists/*
WORKDIR /app/api
COPY api/package*.json ./
RUN yarn install
COPY api/ ./
RUN yarn build

# Etapa 3: Configurar o NGINX
FROM nginx:alpine
WORKDIR /etc/nginx

# Copiar o arquivo de configuração do NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar o build do Frontend para o diretório padrão do NGINX
COPY --from=build-front /app/front /usr/share/nginx/html

# Copiar o build da API para o diretório do container
COPY --from=build-api /app/api /usr/share/nginx/api

# Expor a porta 80 para o NGINX
EXPOSE 80

# Comando padrão para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
