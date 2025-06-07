import { useState } from "react";
import Modal from "./Modal";
import SearchControls from "./SearchControls";

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

  async function handleReturnRental(id: number) {
    // 1. Return the car
    await fetch(`http://localhost:6543/api/returnrental/${id}`, {
      method: "POST",
    });

    // 2. Delete the rental
    await fetch(`http://localhost:6543/api/deleterental/${id}`, {
      method: "DELETE",
    });

    alert("Car returned and rental deleted");
    setSelectedItem(null);
    window.location.reload();
  }

  return (
    <div className="p-4">
      <SearchControls
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

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
                  <td className="border px-4 py-2">{item.user.firstname}</td>
                  <td className="border px-4 py-2">{item.car.model}</td>
                  <td className="border px-4 py-2">
                    {item.rentedAt
                      ? new Date(item.rentedAt).toLocaleString()
                      : "N/A"}
                  </td>
                </>
              )}
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleView(item)}
                >
                  View
                </button>
                {category === "rentals" && item.returnedAt === null && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReturnRental(item.id)}
                  >
                    Return Car
                  </button>
                )}
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
