import "./App.css";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import logo from "./logo.svg";
function App() {
  return (
    <div className="App">
      <header className="flex-items">
        <img src={logo} height={40} width={40} alt="Task Management App" />
        <h1>Task Management App</h1>
      </header>
      <TaskBoard />
    </div>
  );
}

export default App;
