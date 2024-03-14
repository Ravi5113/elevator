import React from "react";
import Elevator from "./Components/Elevator/elevator";

const App = () => {
  const floors = [1, 2, 3, 4, 5]; // Define number of floors

  return (
    <div className="App">
      <Elevator floors={floors} />
    </div>
  );
};

export default App;
