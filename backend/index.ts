import { serve } from "bun";
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
}

interface Rental {
  userId: number;
  carId: number;
}

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

async function handleGetAllUsers() {
  const users = await prisma.user.findMany({
    include: {
      rentals: true,
    },
  });
  return new Response(JSON.stringify(users), {
    headers: defaultHeaders,
  });
}

async function handleGetAllCars() {
  const cars = await prisma.car.findMany({
    include: {
      rentals: true,
    },
  });
  return new Response(JSON.stringify(cars), {
    headers: defaultHeaders,
  });
}

async function handleGetAllRentals() {
  const rentals = await prisma.rental.findMany({
    include: {
      user: true,
      car: true,
    },
  });
  return new Response(JSON.stringify(rentals), {
    headers: defaultHeaders,
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

  // Check if the user already has this car rented and not returned
  const existingRental = await prisma.rental.findFirst({
    where: {
      carId: data.carId,
      returnedAt: null,
    },
    include: {
      car: true /* Forstå det her 100%  */,
    },
  });

  if (existingRental) {
    throw new Error(
      "User " + existingRental.userId + " already has this car rented."
    );
  }

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

async function returnRental(id: number) {
  const rental = await prisma.rental.update({
    where: { id },
    data: { returnedAt: new Date() },
    include: { car: true },
  });
  console.log(`Rental ${id} marked as returned`);
}

serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);
    if (method === "OPTIONS") {
      /* Preflight requests */
      return new Response(null, {
        status: 200,
        headers: defaultHeaders,
      });
    }

    /* ---------------- */

    /* POST - return a car */
    if (method === "POST" && pathname.startsWith("/api/returnrental")) {
      const id = parseInt(pathname.split("/").pop() || "");
      if (isNaN(id)) return new Response("Invalid rental ID", { status: 400 });
      await returnRental(id);
      return new Response("Rental returned", {
        status: 200,
        headers: defaultHeaders,
      });
    }

    /* GET - all users  */
    if (method == "GET" && pathname == "/api/getusers") {
      /* Hvis jeg skriver stort API - det skal fikses */
      return handleGetAllUsers();
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
        return new Response("User created", {
          status: 201,
          headers: defaultHeaders,
        });
      } catch {
        return new Response("Server error", { status: 500 });
      }
    }

    /* POST - create a car */
    if (method == "POST" && pathname == "/api/createcar") {
      try {
        const json = (await request.json()) as CarInput;
        await createNewCar(json);
        return new Response("Car created", {
          status: 201,
          headers: defaultHeaders,
        });
      } catch {
        return new Response("Server error", { status: 500 });
      }
    }

    /* POST - create a rental */
    if (method == "POST" && pathname == "/api/createrental") {
      try {
        const json = (await request.json()) as Rental;
        await createNewRental(json);
        return new Response("Car is rented", {
          status: 201,
          headers: defaultHeaders,
        });
      } catch (error: any) {
        return new Response(error.message || "Server error", { status: 400 });
      }
    }

    /* DELETE */
    if (method == "DELETE") {
      let match;

      match = pathname.match(/^\/api\/deleteuser\/(\d+)$/);
      if (match) {
        const id = Number(match[1]);
        await deleteUser(id);
        return new Response("User deleted", {
          /* Extract til metoder */ status: 200,
          headers: defaultHeaders,
        });
      }
      match = pathname.match(/^\/api\/deletecar\/(\d+)$/);
      if (match) {
        const id = Number(match[1]);
        await deleteCar(id);
        return new Response("Car deleted", {
          status: 200,
          headers: defaultHeaders,
        });
      }

      match = pathname.match(/^\/api\/deleterental\/(\d+)$/);
      if (match) {
        const id = Number(match[1]);
        await deleteRental(id);
        return new Response("Rental deleted", {
          status: 200,
          headers: defaultHeaders,
        });
      }
      return new Response("Not Found", { status: 500 });
    }
    return new Response("Not Found", { status: 500 });
  },
});

console.log(`BUN API is running on http://localhost:${PORT}`);
