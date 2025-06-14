import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_SERVER_BASE;

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

interface CreateRentalFormProps {
  closeModal: () => void;
}

export default function CreateRentalForm({
  closeModal,
}: CreateRentalFormProps) {
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");
  const [users, setUsers] = useState<User[]>(
    []
  ); /* State is an array of user objects - TS needs to know what is inside of the array   */
  const [cars, setCars] = useState<Car[]>([]);

  function getAvailableCars(carsData: any[]): Car[] {
    return carsData.filter(
      (car) => !car.rentals || car.rentals.every((r: any) => r.returnedAt)
    );
  }

  /* Create a rental */
  useEffect(() => {
    fetch(`${BASE_URL}/api/getusers`)
      .then((res) => res.json())
      .then((usersData) => setUsers(usersData));

    fetch(`${BASE_URL}/api/getcars`)
      .then((res) => res.json())
      .then((carsData) => setCars(getAvailableCars(carsData)));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch(`${BASE_URL}/api/createrental`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Number(userId),
        carId: Number(carId),
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Rental created!");
        closeModal();
      } else {
        alert("Error creating rental");
      }
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
