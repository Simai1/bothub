FROM node:18.18.0
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
COPY ./dist /usr/src/app/dist
COPY ./prisma /usr/src/app/prisma
RUN npm i
RUN npx prisma generate
CMD ["npm","run","start"]
