import { Brain } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full  h-full min-h-screen overflow-x-clip">
        <Outlet />
      </div>
    </>
  );
}

export default App;
