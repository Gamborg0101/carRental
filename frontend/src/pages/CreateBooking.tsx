import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type FormType = "user" | "car" | "rental" | null;

export default function CreateBooking() {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  function closeModal() {
    setActiveForm(null);
  }
  function CreateUserForm() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const response = await fetch("http://localhost:6543/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, phonenumber, email }),
      });
      if (response.ok) alert("User created!");
      else alert("Error creating user");
    }

    return (
      <div className="app-container">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded"
          >
            Create User
          </button>
        </form>
      </div>
    );
  }

  // Car form
  function CreateCarForm() {
    const [maker, setMaker] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const response = await fetch("http://localhost:6543/api/createcar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maker, model, year, isRented: false }),
      });
      if (response.ok) alert("Car created!");
      else alert("Error creating car");
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Maker"
          value={maker}
          onChange={(e) => setMaker(e.target.value)}
          required
        />
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white py-2 rounded">
          Create Car
        </button>
      </form>
    );
  }

  // Rental form
  function CreateRentalForm() {
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
        // Filter only available cars
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
      if (response.ok) {
        alert("Rental created!");
        // Optionally close modal or reset form here
      } else {
        const errorText = await response.text();
        alert("Error: " + errorText);
      }
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>

        <select
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.maker} {car.model}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-500 text-white py-2 rounded">
          Create Rental
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="app-container">
        <Header />
        <div className="flex flex-row items-center justify-center gap-4 px-6">
          <button
            onClick={() => setActiveForm("user")}
            className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Create User
          </button>
          <button
            onClick={() => setActiveForm("car")}
            className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Create Car
          </button>
          <button
            onClick={() => setActiveForm("rental")}
            className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Create Rental
          </button>
        </div>

        {activeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 max-w-md w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>

              {activeForm === "user" && <CreateUserForm />}
              {activeForm === "car" && <CreateCarForm />}
              {activeForm === "rental" && <CreateRentalForm />}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
