import { describe, test, expect } from "bun:test";

const BASE = "http://localhost:6543";

describe("User API", () => {
  const randomNum = Math.floor(Math.random() * 90000000) + 10000000; // 8-digit random number

  test("Create user", async () => {
    const res = await fetch(`${BASE}/api/createuser`, {
      method: "POST",
      body: JSON.stringify({
        firstname: "John",
        lastname: "Doe",
        phonenumber: randomNum.toString(),
        email: `test${Date.now()}@example.com`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(201);
  });

  test("Get all users", async () => {
    const res = await fetch(`${BASE}/api/getusers`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});

describe("Car API", () => {
  test("Create car", async () => {
    const res = await fetch(`${BASE}/api/createcar`, {
      method: "POST",
      body: JSON.stringify({
        maker: "Toyota",
        model: "Corolla",
        year: "2021",
      }),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(201);
  });

  test("Get all cars", async () => {
    const res = await fetch(`${BASE}/api/getcars`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});

describe("Rental API", () => {
  let userId: number;
  let carId: number;
  let rentalId: number;

  test("Setup - create user & car", async () => {
    const userRes = await fetch(`${BASE}/api/createuser`, {
      method: "POST",
      body: JSON.stringify({
        firstname: "Anna",
        lastname: "Smith",
        phonenumber: "87654321",
        email: "anna@example.com",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const carRes = await fetch(`${BASE}/api/createcar`, {
      method: "POST",
      body: JSON.stringify({
        maker: "Ford",
        model: "Focus",
        year: "2022",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const users = (await (await fetch(`${BASE}/api/getusers`)).json()) as {
      id: number;
    }[];
    const cars = (await (await fetch(`${BASE}/api/getcars`)).json()) as {
      id: number;
    }[];

    const lastUser = users.at(-1);
    const lastCar = cars.at(-1);

    expect(lastUser).toBeDefined();
    expect(lastCar).toBeDefined();

    userId = lastUser!.id;
    carId = lastCar!.id;
  });

  test("Create rental", async () => {
    const res = await fetch(`${BASE}/api/createrental`, {
      method: "POST",
      body: JSON.stringify({ userId, carId }),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(201);
  });

  test("Fail to rent the same car again", async () => {
    const res = await fetch(`${BASE}/api/createrental`, {
      method: "POST",
      body: JSON.stringify({ userId, carId }),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(400);
  });

  test("Get rentals", async () => {
    const res = await fetch(`${BASE}/api/getrentals`);
    const rentals = (await res.json()) as { id: number }[];
    const lastRental = rentals.at(-1);
    expect(lastRental).toBeDefined();
    rentalId = lastRental!.id;
    expect(res.status).toBe(200);
    expect(Array.isArray(rentals)).toBe(true);
  });

  test("Return rental", async () => {
    const res = await fetch(`${BASE}/api/returnrental/${rentalId}`, {
      method: "POST",
    });
    expect(res.status).toBe(200);
  });
});
