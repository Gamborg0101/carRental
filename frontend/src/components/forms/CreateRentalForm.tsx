import { useState, useEffect } from "react";

export default function CreateRentalForm() {
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");
  const [users, setUsers] = useState<
    { id: number; firstname: string; lastname: string }[]
  >([]);
  const [cars, setCars] = useState<
    { id: number; maker: string; model: string; isRented: boolean }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const usersRes = await fetch("http://localhost:6543/api/getusers");
      const usersData = await usersRes.json();
      setUsers(usersData);

      const carsRes = await fetch("http://localhost:6543/api/getcars");
      const carsData = await carsRes.json();
      setCars(carsData.filter((car: any) => !car.isRented));
    }
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:6543/api/createrental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: parseInt(userId),
        carId: parseInt(carId),
      }),
    });
    if (response.ok) alert("Rental created!");
    else {
      const errorText = await response.text();
      alert("Error: " + errorText);
    }
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
        Select Car:
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
