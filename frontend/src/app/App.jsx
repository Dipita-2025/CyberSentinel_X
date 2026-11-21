import { RouterProvider } from "react-router-dom";
import router from "./router";
import Notification from "../components/ui/Notification";

const App = () => (
  <>
    <RouterProvider router={router} />
    <Notification />
  </>
);

export default App;
