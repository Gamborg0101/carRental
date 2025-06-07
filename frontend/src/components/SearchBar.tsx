import { useState } from "react";
import Modal from "./Modal";

type SearchBarProps = {
  users: any[];
  cars: any[];
  rentals: any[];
};

export default function SearchBar({ users, cars, rentals }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("users");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filtered =
    category === "users"
      ? users.filter((u) =>
          u.firstname?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : category === "cars"
      ? cars.filter((car) =>
          car.model?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : rentals.filter(
          (rental) =>
            rental.user?.firstname
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            rental.car?.model?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  async function handleDelete(id: number) {
    const endpoint = `/api/delete${category.slice(0, -1)}/${id}`;
    await fetch(`http://localhost:6543${endpoint}`, {
      method: "DELETE",
    });
    alert(`${category.slice(0, -1)} deleted`);
    setSelectedItem(null);
    window.location.reload();
  }

  function handleView(item: any) {
    setSelectedItem(item);
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="users">Users</option>
          <option value="cars">Cars</option>
          <option value="rentals">Rentals</option>
        </select>

        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder={`Search ${category}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            {category === "users" && (
              <>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Email</th>
              </>
            )}
            {category === "cars" && (
              <>
                <th className="border px-4 py-2">Model</th>
                <th className="border px-4 py-2">Maker</th>
                <th className="border px-4 py-2">Year</th>
              </>
            )}
            {category === "rentals" && (
              <>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Car</th>
                <th className="border px-4 py-2">Rented At</th>
              </>
            )}
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item: any, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{item.id}</td>
              {category === "users" && (
                <>
                  <td className="border px-4 py-2">
                    {item.firstname} {item.lastname}
                  </td>
                  <td className="border px-4 py-2">{item.phonenumber}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                </>
              )}
              {category === "cars" && (
                <>
                  <td className="border px-4 py-2">{item.model}</td>
                  <td className="border px-4 py-2">{item.maker}</td>
                  <td className="border px-4 py-2">{item.year}</td>
                </>
              )}
              {category === "rentals" && (
                <>
                  <td className="border px-4 py-2">
                    {item.user?.firstname} {item.user?.lastname}
                  </td>
                  <td className="border px-4 py-2">{item.car?.model}</td>
                  <td className="border px-4 py-2">
                    {new Date(item.rentedAt).toLocaleDateString()}
                  </td>
                </>
              )}
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleView(item)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <Modal
          item={selectedItem}
          category={category}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
