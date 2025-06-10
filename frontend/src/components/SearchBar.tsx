import { useState } from "react";
import Modal from "./Modal";
import SearchControls from "./SearchControls";
import SearchResultsTable from "./SearchResultsTable";

// const BASE_URL = process.env.REACT_APP_SERVER_BASE;
const BASE_URL = process.env.REACT_APP_SERVER_BASE;

console.log(BASE_URL);

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

  const filter = () => {
    const query = searchQuery.toLowerCase();
    switch (category) {
      case "users":
        if (!users || !Array.isArray(users)) return [];
        return users.filter((user) =>
          user.firstname.toLowerCase().includes(query)
        );

      case "cars":
        if (!cars || !Array.isArray(cars)) return [];
        return cars.filter((car) => car.model.toLowerCase().includes(query));

      case "rentals":
        if (!rentals || !Array.isArray(rentals)) return [];
        return rentals.filter(
          (rental) =>
            rental.user?.firstname?.toLowerCase().includes(query) ||
            rental.car?.model?.toLowerCase().includes(query)
        );
      default:
        return [];
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete it?")) return;

    try {
      await fetch(`${BASE_URL}/api/deletecar/${id}`, {
        method: "DELETE",
      });
      refreshData();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  function handleView(item: any) {
    setSelectedItem(item);
  }

  const handleReturnRental = async (id: number) => {
    if (!window.confirm("Are you sure you want to return the car?")) return;

    try {
      /* Return rental */
      await fetch(`${BASE_URL}/api/returnrental/${id}`, {
        method: "POST",
      });
      /* Delete rental */
      await fetch(`${BASE_URL}/api/deleterental/${id}`, {
        method: "DELETE",
      });
      alert("Car returned and rental deleted");
      setSelectedItem(null);
      refreshData();
    } catch (error) {
      console.error("Return rental failed", error);
    }
  };

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
