FROM node
EXPOSE 80
WORKDIR /opt
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
