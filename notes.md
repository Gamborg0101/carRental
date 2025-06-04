
Prisma migrate:
prisma migrate dev --name init

Run docker:
docker compose up

docker ps - see what connections are established

Start med at lave backenden - lav de mest basale kald:
Post - lav en bookiing
Get - Få alle bookinger
Get - Få enkelt booking

Se denne video:
https://www.youtube.com/watch?v=uGP4CS5V1hE&ab_channel=CodeBrew

Samt denne:
https://www.youtube.com/watch?v=RebA5J-rlwg&t=865s&ab_channel=WebDevSimplified

Create a new User record.
https://www.prisma.io/docs/getting-started/quickstart-sqlite

Using postgres as a relational database(Relational - tables are related to each other using keys)
Prisma ORM - interacts with DB

REST - is a style for building APIs - so a set of rules for how to structure API requests using HTTP methods (Get, post, put/patch, delete)
Example:
A REST API for a blog might have:
Get all posts GET /posts
Get one post GET /posts/1
Create a post POST /posts
Update a post PUT /posts/1
Delete a post DELETE /posts/1

Docker - sets up a postgreSQL - with data, passsword and access on port 5432.
Docker - packs my app, and everything i need - db, code and settings - into a container.
Container is a mini-computer that runs my app.
My examples saves data to a volume, so the data is comitted, and will not get lost.
Therefore i can run a real PostgrSQL database locally, without installing it.

To start this application:
Backend: bun run index.js

Frontend: npm start

docker compose up
