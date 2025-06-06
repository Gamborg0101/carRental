import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export default function GetBookings() {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, carsRes, rentalsRes] = await Promise.all([
          fetch("http://localhost:6543/api/getusers"),
          fetch("http://localhost:6543/api/getcars"),
          fetch("http://localhost:6543/api/getrentals"),
        ]);

        const usersData = await usersRes.json();
        const carsData = await carsRes.json();
        const rentalsData = await rentalsRes.json();

        setUsers(usersData);
        setCars(carsData);
        setRentals(rentalsData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <Header />
      <SearchBar users={users} cars={cars} rentals={rentals} />
      <Footer />
    </div>
  );
}
