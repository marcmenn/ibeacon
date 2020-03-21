FROM node
EXPOSE 80
WORKDIR /opt
COPY . .
RUN npm ci
CMD ["npm", "start"]
