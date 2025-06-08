import { useState, useEffect } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface Car {
  id: number;
  maker: string;
  model: string;
}

export default function CreateRentalForm() {
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");
  const [users, setUsers] = useState<User[]>(
    []
  ); /* State is an array of user objects - TS needs to know what is inside of the array   */
  const [cars, setCars] = useState<Car[]>([]);

  function getAvailableCars(cars: Car[]): Car[] {
    return cars;
  }

  useEffect(() => {
    fetch("http://localhost:6543/api/getusers").then((users) => users.json());
  });

  /* Create a rental */
  useEffect(() => {
    fetch("http://localhost:6543/api/getusers")
      .then((res) => res.json())
      .then((usersData) => setUsers(usersData));

    fetch("http://localhost:6543/api/getcars")
      .then((res) => res.json())
      .then((carsData) => setCars(getAvailableCars(carsData)));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch("http://localhost:6543/api/createrental", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Number(userId),
        carId: Number(carId),
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Rental created!");
        }
      })
      .catch((error) => {
        console.error("Rental creation failed:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="user-select" className="font-semibold">
        Select User:
      </label>
      <select
        id="user-select"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="" disabled>
          -- Choose a user --
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstname} {user.lastname}
          </option>
        ))}
      </select>

      <label htmlFor="car-select" className="font-semibold">
        {/* Hidden selector for car */}
      </label>
      <select
        id="car-select"
        value={carId}
        onChange={(e) => setCarId(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="" disabled>
          -- Choose a car --
        </option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.maker} {car.model}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-400 text-white rounded p-3 hover:bg-blue-700 transition"
      >
        Create Rental
      </button>
    </form>
  );
}
