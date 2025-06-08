import { useState } from "react";
import Modal from "./Modal";
import SearchControls from "./SearchControls";
import SearchResultsTable from "./SearchResultsTable";

type SearchBarProps = {
  users: any[];
  cars: any[];
  rentals: any[];
  refreshData: () => void;
};

export default function SearchBar({
  users,
  cars,
  rentals,
  refreshData,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("users");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  function filter() {
    if (category === "users") {
      return users.filter((user) =>
        user.firstname?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category === "cars") {
      return cars.filter((car) =>
        car.model?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category === "rentals") {
      return rentals.filter(
        (rental) =>
          rental.user?.firstname
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          rental.car?.model?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:6543/api/deletecar/${id}`, {
        method: "DELETE",
      });
      //Lav noget .env ligesom dette: await fetch(env.get(SERVER_BASE) + `${endpoint}`, {
      /* Lav en .env fil med variabler, som kan afspejlse endpoints. */
      /* Serpation of concerns */

      refreshData(); // This just updates data without reloading
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  function handleView(item: any) {
    setSelectedItem(item);
  }

  async function handleReturnRental(id: number) {
    if (window.confirm("Are you sure?") !== true) {
      return;
    }
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
    refreshData();
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
        filtered={filter()}
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
