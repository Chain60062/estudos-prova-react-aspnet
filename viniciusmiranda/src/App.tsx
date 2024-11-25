import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/pages/tarefa/listar">tarefas</Link>
        </li>
        <li>
          <Link to="/pages/tarefa/cadastrar">criar tarefa</Link>
        </li>
        <li>
          <Link to="/pages/tarefa/alterar">atualizar tarefa</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
