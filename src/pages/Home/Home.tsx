import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

function Home() {
  const { currentUserId } = useContext(AuthContext);

  return (
    <div>
      <h1>Current User ID: {currentUserId}</h1>
    </div>
  );
}

export default Home;
