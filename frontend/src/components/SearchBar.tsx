import { useState } from "react";
import Modal from "./Modal";
import SearchControls from "./SearchControls";
import SearchResultsTable from "./SearchResultsTable";

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

      <SearchResultsTable
        filtered={filtered}
        category={category}
        onView={handleView}
        onReturnRental={handleReturnRental}
      />

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
