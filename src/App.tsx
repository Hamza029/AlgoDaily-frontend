import { AppProvider } from "./contexts/AppContext/AppContext";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import AppRouter from "./routes/AppRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={AppRouter} />
        </AppProvider>
      </AuthProvider>
    </>
  );
}

export default App;
