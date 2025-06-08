import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.rental.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      firstname: "Dorte",
      lastname: "Pedersen",
      phonenumber: "22554477",
      email: "user1@gmail.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Børge",
      lastname: "Madsen",
      phonenumber: "54789856",
      email: "user2@gmail.com",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      firstname: "Lars",
      lastname: "Hansen",
      phonenumber: "33445566",
      email: "user3@gmail.com",
    },
  });
  const car1 = await prisma.car.create({
    data: {
      maker: "Ford",
      model: "Fiesta",
      year: "2020",
    },
  });

  const car2 = await prisma.car.create({
    data: {
      maker: "Chevrolet",
      model: "Spark",
      year: "2010",
    },
  });

  const car3 = await prisma.car.create({
    data: {
      maker: "Toyota",
      model: "Corolla",
      year: "2018",
    },
  });

  await prisma.rental.create({
    data: {
      userId: user1.id,
      carId: car2.id,
      rentedAt: new Date("2025-01-01T10:00:00Z"),
    },
  });

  await prisma.rental.create({
    data: {
      userId: user2.id,
      carId: car1.id,
      rentedAt: new Date("2025-02-15T12:00:00Z"),
    },
  });

  await prisma.rental.create({
    data: {
      userId: user3.id,
      carId: car3.id,
      rentedAt: new Date("2025-03-05T09:00:00Z"),
    },
  });

  console.log("Seed script ran successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
