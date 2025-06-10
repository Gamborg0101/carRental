import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

// const BASE_URL = process.env.REACT_APP_SERVER_BASE;
const BASE_URL = process.env.REACT_APP_SERVER_BASE;

export default function GetBookings() {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [usersRes, carsRes, rentalsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/getusers`),
        fetch(`${BASE_URL}/api/getcars`),
        fetch(`${BASE_URL}/api/getrentals`),
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <Header />
      <SearchBar
        users={users}
        cars={cars}
        rentals={rentals}
        refreshData={fetchData}
      />
      <Footer />
    </div>
  );
}
