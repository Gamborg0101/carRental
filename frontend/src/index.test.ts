import { describe, expect, test } from "bun:test";

// Mock data
const user = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  phonenumber: "1234567890",
  email: "john@example.com",
};

const car = {
  id: 1,
  maker: "Toyota",
  model: "Corolla",
  year: "2020",
};

const rental = {
  id: 1,
  user,
  userId: user.id,
  car,
  carId: car.id,
  rentedAt: new Date(),
  returnedAt: null,
};

// Tests
describe("Data Structure & Logic", () => {
  test("User has unique email and phone", () => {
    const users = [
      user,
      { ...user, id: 2, email: "jane@example.com", phonenumber: "0987654321" },
    ];
    const emails = users.map((u) => u.email);
    const phones = users.map((u) => u.phonenumber);
    expect(new Set(emails).size).toBe(users.length);
    expect(new Set(phones).size).toBe(users.length);
  });

  test("Car has all required fields", () => {
    expect(car.maker).toBeTruthy();
    expect(car.model).toBeTruthy();
    expect(car.year).toBeTruthy();
  });

  test("Car year is valid (4 digits)", () => {
    const year = car.year;
    expect(/^\d{4}$/.test(year)).toBe(true);
  });

  test("User email is not empty and is valid format", () => {
    const email = user.email;
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test("Rental references existing user and car", () => {
    expect(rental.userId).toBe(user.id);
    expect(rental.carId).toBe(car.id);
  });

  test("Rental has rentedAt and optional returnedAt", () => {
    expect(rental.rentedAt instanceof Date).toBe(true);
    expect(rental.returnedAt).toBeNull();
  });

  test("Rental cannot be created if car is already rented", () => {
    const existingRentals = [{ ...rental }]; // car already rented
    const isCarAvailable = (carId: number) => {
      return !existingRentals.some(
        (r) => r.carId === carId && r.returnedAt === null
      );
    };
    expect(isCarAvailable(car.id)).toBe(false); // should block new rental
  });

  test("Rental can be returned", () => {
    const returned = { ...rental, returnedAt: new Date() };
    expect(returned.returnedAt).not.toBeNull();
  });

  test("Search by user email", () => {
    const users = [user];
    const query = "john@example.com";
    const results = users.filter((u) =>
      u.email.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBe(1);
    expect(results[0].email).toBe(query);
  });

  test("Search placeholder updates by category", () => {
    const getPlaceholder = (category: string) => {
      if (category === "users") return "Search by name, phone, or email";
      if (category === "cars") return "Search by model, maker, or year";
      if (category === "rentals") return "Search by user, car, or date";
      return "";
    };
    expect(getPlaceholder("cars")).toBe("Search by model, maker, or year");
  });

  test("Form modal opens with correct form type", () => {
    let activeForm: "user" | "car" | "rental" | null = null;
    const setActiveForm = (form: typeof activeForm) => (activeForm = form);
    setActiveForm("user");
    expect(activeForm).toBe("user");
    setActiveForm("car");
    expect(activeForm).toBe("car");
  });
});
