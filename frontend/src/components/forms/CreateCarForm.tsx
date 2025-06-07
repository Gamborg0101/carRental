import { useState } from "react";

export default function CreateCarForm() {
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
