import "./App.css";
import GameBoard from "./Components/GameBoard/GameBoard";

const DATA = {
  India: "Delhi",
  France: "Paris",
  Germany: "Berlin",
  China: "Beijing",
  USA: "Washington",
};

function App() {
  return (
    <>
      <div>
        <GameBoard data={DATA} />
      </div>
    </>
  );
}

export default App;
