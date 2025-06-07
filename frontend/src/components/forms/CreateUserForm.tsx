import { useState } from "react";

export default function CreateUserForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch("http://localhost:6543/api/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, phonenumber, email }),
    })
      .then((response) => {
        if (response.ok)
          alert(
            "User created!"
          ); /* .ok checks if the request is in the 200-299 range. Returns boolean */
        else alert("Error creating user");
      })
      .catch(() => {
        alert("Error creating user");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-400 text-white rounded p-3 hover:bg-blue-700 transition"
      >
        Create User
      </button>
    </form>
  );
}
