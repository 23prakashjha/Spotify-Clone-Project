Spotify Clone Project Using MERN Stack

The Spotify clone is a full-stack music streaming web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It replicates core Spotify functionality, allowing users to sign up, log in, browse a music library, create and manage playlists, like songs, and play audio tracks.

Backend & Database:

MongoDB stores user accounts, playlists, and song metadata including title, artist, album, genre, duration, and audio file URLs.

Express.js and Node.js manage server-side logic, handle API requests, CRUD operations, and audio streaming.

JWT authentication ensures secure login and access control.

Frontend:

React.js creates a dynamic, responsive UI for playlists, search, and the media player.

Features include play, pause, next/previous, volume control, and displaying album art.

Redux or Context API handles state management across components.

Additional Features:

Admin Panel: Allows admins to add, update, or remove songs from the library.

Search & Filter: Users can search songs by title, artist, or genre.
Setup Instructions:

Install Dependencies: Run npm install in both backend and frontend folders.

Environment Variables: Create .env files for MongoDB URI, JWT secret, and server ports.

Run Backend Server: npm run server

Run Frontend Server: npm run dev

Admin Server (Optional): npm run dev (for admin panel if separate)
Responsive Design: Compatible with desktop and mobile devices.

RESTful API: Cleanly separates client and server logic for easy scalability.
