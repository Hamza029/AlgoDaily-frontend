import AppRouter from "./routes/AppRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
