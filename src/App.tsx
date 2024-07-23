import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import AppRouter from "./routes/AppRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={AppRouter} />
      </AuthProvider>
    </>
  );
}

export default App;
