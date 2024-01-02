import logo from "./logo.svg";
import "./App.css";
import Turnos from "./pages/Turnos";
import { MedicoProvider } from "./contex/medico";
function App() {
  return (
    <div className="App">
      <MedicoProvider>
        <Turnos></Turnos>
      </MedicoProvider>
    </div>
  );
}

export default App;
