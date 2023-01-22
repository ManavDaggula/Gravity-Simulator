import './App.css';
require("./script")

function App() {
  return (
    <div className="App">
      <ul className="menu">
        <li>New Planet</li>
        <li>Clear</li>
    </ul>
    <div className="mouse-stat">move your curser inside screen</div>
    <div className="screen">
      {/* planets inserted here */}
    </div>
    <div className="prompt"></div>
    </div>
  );
}

export default App;
