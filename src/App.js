import Tabel from "./componets/Tabel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="px-[8%] py-[2%]">
      <Tabel />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
