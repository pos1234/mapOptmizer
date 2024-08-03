# Setup Instructions

1. Clone the Repository:
   git clone https://github.com/pos1234/mapOptmizer.git
   cd mapOptmizer
2. Install Dependencies:
   npm install
3. Set Up the Database:
   docker-compose up
4. Run Migrations:
   npx prisma migrate deploy
5. Start the Application:
   npm run dev
   
# Route Calculation Approach

1. Distance Calculation:
   The Haversine formula is used to calculate the distance between two geographical points (latitude and longitude).
2. Path Optimization:
   Starting from the first location, the algorithm iteratively selects the nearest unvisited location, adds it to the path, and marks it as visited until all locations are included.
3. API Endpoint:
   The /api/shortest-path endpoint accepts a list of locations and returns the optimized path.

# Assumptions and Design Decisions

1. Assumptions:
   All locations have valid latitude and longitude values.
2. Design Decisions:
   Frontend: The map is displayed using React Leaflet, and OpenStreetMap is used for tile layers.
   Backend: The application uses Prisma with PostgreSQL for database operations.
   API Design: Routes and optimization logic are separated for clarity and maintainability.

# Ideas for Further Improvements

1 Enhanced Algorithm:
  Implement more advanced algorithms such as Christofides' Algorithm for better path optimization.
2. User Interface:
   Improve the UI with interactive features such as drag-and-drop markers and real-time route adjustments.
3. Error Handling:
   Add better error handling and user feedback, especially for invalid inputs and network issues.
4. Testing:
   Write comprehensive tests for both frontend and backend components to ensure robustness and reliability.
5. Performance Optimization:
   Optimize performance for large datasets and enhance the efficiency of the pathfinding algorithm.
