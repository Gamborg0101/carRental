/////////////////////////////////////////////

To do:

UI:
Frontpage:
*New Rental
*Create user
*Create car
*Create rental

*See bookings 
**Long bar, where i can define, what i want to search for. 
**Default display rentals
**Searches:
*** user - pressable - see user and earlier rentals
*** car - pressable - see user and earlier rentals
*** rental - pressable - see user and earlier rentals

Tests: 
All API entries work
Entry to db works
Delete works
Booking works 


Unit tests - særligt for at se, om requests går igennem.
/////////////////////////////////////////////

Prisma migrate:
prisma migrate dev --name init

Run docker:
docker compose up
docker ps - see what connections are established

Kør api mellem docker og bun:
bun run index.ts
Husk at genstarte, hvis ny api kode er skrevet.

start projekt:
backend: run bun index.ts
backend: docker compose up
frontend: npm run dev

curl get:
http://localhost:6543/api/function

curl create: (x stands for request method)
curl -X POST http://localhost:6543/api/function

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
