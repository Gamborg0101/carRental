import { deepEquals, serve } from "bun";
import { PrismaClient } from "@prisma/client";

const PORT = 6543;
const prisma = new PrismaClient();

interface UserInput {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
}

interface CarInput {
  model: string;
  maker: string;
  year: string;
  isRented: boolean;
}

interface Rental {
  userId: number;
  carId: number;
}

async function handleGetAllUsers() {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}

async function handleGetSingleUser(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}

async function handleGetAllCars() {
  const cars = await prisma.car.findMany();
  return new Response(JSON.stringify(cars), {
    headers: { "Content-Type": "application/json" },
  });
}

async function handleGetAllRentals() {
  const rentals = await prisma.rental.findMany();
  return new Response(JSON.stringify(rentals), {
    headers: { "Content-Type": "application/json" },
  });
}

async function createNewUser(data: UserInput) {
  await prisma.user.create({
    data,
  });
  console.log("User succesfully created");
}

async function createNewCar(data: CarInput) {
  await prisma.car.create({
    data,
  });
  console.log("Car succesfully created");
}

async function createNewRental(data: Rental) {
  const timeStamp = new Date();

  await prisma.car.update({
    where: { id: data.carId },
    data: { isRented: true },
  });

  await prisma.rental.create({
    data: {
      userId: data.userId,
      carId: data.carId,
      rentedAt: timeStamp,
      returnedAt: null,
    },
  });

  console.log("Rental created");
}

async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });
  console.log(`User ${id} is deleted`);
}
async function deleteCar(id: number) {
  await prisma.car.delete({
    where: { id },
  });
  console.log(`Car ${id} is deleted`);
}

async function deleteRental(id: number) {
  await prisma.rental.delete({
    where: { id },
  });
  console.log(`Rental ${id} is deleted`);
}

/* ENDPOINTS - new file? - maybe files for each type of request */

serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);

    /* GET - all users  */
    if (method == "GET" && pathname == "/api/getusers") {
      return handleGetAllUsers();
    }

    /*GET - Get single user */
    let match = pathname.match(/^\/api\/user\/(\d+)$/);
    if (method === "GET" && match) {
      const id = Number(match[1]);
      return handleGetSingleUser(id);
    }

    /* GET - all cars  */
    if (method == "GET" && pathname == "/api/getcars") {
      return handleGetAllCars();
    }

    /* GET - all rentals  */
    if (method == "GET" && pathname == "/api/getrentals") {
      return handleGetAllRentals();
    }

    /* POST - create a user */
    if (method == "POST" && pathname == "/api/createuser") {
      try {
        const json = (await request.json()) as UserInput; // Assert the value - no guarantees
        await createNewUser(json);
        return new Response("User created", { status: 201 });
      } catch {
        return new Response("Server error", { status: 404 });
      }
    }

    /* POST - create a car */
    if (method == "POST" && pathname == "/api/createcar") {
      try {
        const json = (await request.json()) as CarInput;
        await createNewCar(json);
        return new Response("Car created", { status: 201 });
      } catch {
        return new Response("Server error", { status: 404 });
      }
    }

    /* POST - create a rental */
    if (method == "POST" && pathname == "/api/createrental") {
      try {
        const json = (await request.json()) as Rental;
        await createNewRental(json);
        return new Response("Car is rented", { status: 201 });
      } catch {
        return new Response("Server error", { status: 404 });
      }
    }

    /* DELETE */
    if (method == "DELETE") {
      let match;

      match = pathname.match(/^\/api\/deleteuser\/(\d+)$/);
      if (match) {
        const id = Number(match[1]);
        await deleteUser(id);
        return new Response("User deleted", { status: 200 });
      }
      match = pathname.match(/^\/api\/deletecar\/(\d+)$/);
      if (match) {
        const id = Number(match[1]);
        await deleteCar(id);
        return new Response("Car deleted", { status: 200 });
      }

      match = pathname.match(/^\/api\/deleterental\/(\d+)$/);
      if (match) {
        const id = Number(match[1]);
        await deleteRental(id);
        return new Response("Rental deleted", { status: 200 });
      }
      return new Response("Not Found", { status: 404 });
    }
    return new Response("Not Found", { status: 404 });
  },
});
