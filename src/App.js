import { useState } from "react";
import "./App.css";
import "animate.css";

function App() {
  const [classes, setClasses] = useState(false);
  return (
    <div className="App">
      <div
        className={`kk  ${classes && " animate__animated animate__bounce"}`}
        onClick={() => setClasses(true)}
      >
        kkkk
      </div>
    </div>
  );
}

export default App;
