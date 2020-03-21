FROM node
EXPOSE 3443
WORKDIR /opt
COPY . .
RUN npm ci
CMD ["npm", "run start"]
