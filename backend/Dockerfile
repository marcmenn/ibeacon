FROM node:11-alpine
EXPOSE 3443
WORKDIR /opt
COPY . .
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]
