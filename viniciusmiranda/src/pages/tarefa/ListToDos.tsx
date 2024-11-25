import { useEffect, useState } from "react";
import { API_URI } from "../../config/environment";
import ToDo from "../../interfaces/ToDo";

function ListToDos() {
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

  const toDosList = (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {toDos.length > 0 ? (
          toDos.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.category?.name}</td>
              <td>{t.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              Nehuma tarefa disponível
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      {toDosList}
    </div>
  );
}

export default ListToDos;
