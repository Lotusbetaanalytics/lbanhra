# FROM node:14-alpine as base
# WORKDIR /app
# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install
# # COPY . /app
# # CMD node server.js
# COPY . .

# CMD [ "node", "server.js" ]
# EXPOSE 8000
FROM node:14-alpine as base
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
EXPOSE 8000


FROM base as production
ENV NODE_ENV=production
RUN npm install
COPY . /app
CMD ["node", "server.js"] 

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /

CMD [ "nodemon", "server.js" ]
