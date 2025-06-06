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
  isRented: boolean;
}

interface Rental {
  userId: number;
  carId: number;
}

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

async function handleGetAllUsers() {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), {
    headers: defaultHeaders,
  });
}

async function handleGetSingleUser(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  return new Response(JSON.stringify(user), {
    headers: defaultHeaders,
  });
}

async function handleGetSingleCar(id: number) {
  const car = await prisma.car.findUnique({ where: { id } });
  return new Response(JSON.stringify(car), {
    headers: defaultHeaders,
  });
}

async function handleGetSingleRental(id: number) {
  const rental = await prisma.rental.findUnique({ where: { id } });
  return new Response(JSON.stringify(rental), {
    headers: defaultHeaders,
  });
}

async function handleGetAllCars() {
  const cars = await prisma.car.findMany();
  return new Response(JSON.stringify(cars), {
    headers: defaultHeaders,
  });
}

async function handleGetAllRentals() {
  const rentals = await prisma.rental.findMany();
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

    /* ---------------- */
    /* Cleans request strings for id's */
    function idGenerator(url: URL) {
      const id = url.searchParams.get("id");
      if (id === null || id === "") throw new Error("Invalid ID");
      return parseInt(id);
    }

    /* GET - single user */
    if (method == "GET" && pathname.startsWith("/api/getuser/id")) {
      try {
        const id = idGenerator(new URL(request.url));
        return handleGetSingleUser(id);
      } catch {
        return new Response("ID parameter is required and must be valid", {
          status: 400,
        });
      }
    }

    /* Get signle car */
    if (method == "GET" && pathname.startsWith("/api/getcar/id")) {
      try {
        const id = idGenerator(new URL(request.url));
        return handleGetSingleCar(id);
      } catch {
        return new Response("ID parameter is required and must be valid", {
          status: 400,
        });
      }
    }

    /* Get single rental*/
    if (method == "GET" && pathname.startsWith("/api/getrental/id")) {
      try {
        const id = idGenerator(new URL(request.url));
        return handleGetSingleRental(id);
      } catch {
        return new Response("ID parameter is required and must be valid", {
          status: 400,
        });
      }
    }

    /* GET - all users  */
    if (method == "GET" && pathname == "/api/getusers") {
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
        return new Response("User created", { status: 201 });
      } catch {
        return new Response("Server error", { status: 500 });
      }
    }

    /* POST - create a car */
    if (method == "POST" && pathname == "/api/createcar") {
      try {
        const json = (await request.json()) as CarInput;
        await createNewCar(json);
        return new Response("Car created", { status: 201 });
      } catch {
        return new Response("Server error", { status: 500 });
      }
    }

    /* POST - create a rental */
    if (method == "POST" && pathname == "/api/createrental") {
      try {
        const json = (await request.json()) as Rental;
        await createNewRental(json);
        return new Response("Car is rented", { status: 201 });
      } catch {
        return new Response("Server error", { status: 500 });
      }
    }

    /*
    Make a determinator function for delete?
    */

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

console.log(`BUN API is running on http://localhost:${PORT}`);
