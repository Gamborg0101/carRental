import { useEffect, useState } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
}

export default function GetBookings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6543/api/getusers")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {data.map((element: User) => (
        <div>{element.firstname}</div>
      ))}
    </div>
  );
}
