import { useState } from "react";

interface CreateCarFormProps {
  closeModal: () => void;
}

// const BASE_URL = process.env.REACT_APP_SERVER_BASE;
const BASE_URL = process.env.REACT_APP_SERVER_BASE;

export default function CreateCarForm({ closeModal }: CreateCarFormProps) {
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  /* Create a car */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/createcar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ maker, model, year }),
    });
    if (response.ok) {
      alert("Car created!");
      closeModal();
    } else {
      alert("Error creating car");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Maker"
        value={maker}
        onChange={(e) => setMaker(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 rounded"
        required
        min="1900"
        max={new Date().getFullYear()}
      />
      <button
        type="submit"
        className="bg-blue-400 text-white rounded p-3 hover:bg-blue-700 transition"
      >
        Create Car
      </button>
    </form>
  );
}
