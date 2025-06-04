import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      firstname: "Dorte",
      lastname: "Pedersen",
      phonenumber: "22554477",
      email: "user1@gmail.com",
    },
  });
  const car1 = await prisma.car.create({
    data: {
      maker: "Ford",
      model: "Fiesta",
      year: "2020",
      isRented: false,
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
  const car2 = await prisma.car.create({
    data: {
      maker: "Chevrolet",
      model: "Spark",
      year: "2010",
      isRented: true,
    },
  });
  await prisma.rental.create({
    data: {
      userId: user1.id,
      carId: car2.id,
      rentedAt: new Date(),
    },
  });
  console.log("Seed script ran successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
