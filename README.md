<h1>Description of Role</h1>
I chose the <strong>Product Engineer</strong> role because it aligns well with my interests and skillset. In this role, I am responsible for both the frontend and backend of the application I built. My focus has been on usability, UI/UX, functionality, maintainability, and user flow. I implemented responsive UI components using React and TypeScript, integrated APIs, and aimed to create a great developer experience through well-structured and tested code.

<h3>Description of Project</h3>
This project is a full-stack, lightweight car rental management application designed to showcase my skills as a product engineer. It enables users to create and manage users, cars, and rentals, including renting cars to specific users. The app connects to a backend API running on Bun with Prisma and Postgres, which serves data about cars, users, and rentals to the frontend. Additionally, I implemented a filtering feature to help users easily find what they need.

<h3>Possible improvements</h3>

* IDs currently increment only and never reset — adding a system to save previous users to track car previously booking history. 

* Add authentication

* Implement more thorough data validation

* Create a view file for all endpoints

* Clean up and improve the UI



Reseed database:
npx prisma migrate reset
Press -y

It automatically reseeds, so the database should be freshly populated with new data
