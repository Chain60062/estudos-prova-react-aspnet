import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/pages/tarefa/listar">Ver Tarefas</Link>
        </li>
        <li>
          <Link to="/pages/tarefa/cadastrar">Criar Tarefa</Link>
        </li>
        <li>
          <Link to="/pages/tarefa/alterar">Gerenciar Tarefa</Link>
        </li>
        <li>
          <Link to="/pages/tarefa/naoconcluidas">Não Concluídas</Link>
        </li>
        <li>
          <Link to="/pages/tarefa/concluidas">Concluídas</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
