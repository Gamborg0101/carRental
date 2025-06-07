// SearchResultsTable.tsx
import React from "react";

type SearchResultsTableProps = {
  filtered: any[]; // the already-filtered list
  category: string; // "users" | "cars" | "rentals"
  onView: (item: any) => void;
  onReturnRental: (id: number) => void;
};

export default function SearchResultsTable({
  filtered,
  category,
  onView,
  onReturnRental,
}: SearchResultsTableProps) {
  return (
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
        {filtered.map((item: any) => (
          <tr key={item.id} className="text-center">
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
                  {item.user.firstname} {item.user.lastname}
                </td>
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
                onClick={() => onView(item)}
              >
                View
              </button>
              {category === "rentals" && item.returnedAt === null && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => onReturnRental(item.id)}
                >
                  Return Car
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
