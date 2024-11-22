import { useEffect, useState } from "react";
import { API_URI } from "../../config/environment";

interface ToDo {
  id: number;
  title: string;
}

function ListaDeTarefas() {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    fetch(`${API_URI}/api/tarefa/listar`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: ToDo[]) => setToDos(data))
      .catch((err) => alert(err.message));
  }, []);

  const toDosList = toDos.map((t) => <li key={t.id}>{t.title}</li>);

  return (
    <nav>
      <ul>{toDosList}</ul>
    </nav>
  );
}

export default ListaDeTarefas;
