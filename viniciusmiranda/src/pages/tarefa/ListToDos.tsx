import { useEffect, useState } from "react";
import { API_URI } from "../../config/environment";
import ToDo from "../../interfaces/ToDo";
import { Link } from "react-router-dom";

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
      .then((data: ToDo[]) => {
        data.forEach((t) => {
          t.createdAt = new Date(t.createdAt);
        });
        setToDos(data);
      })
      .catch((err) => alert(err.message));
  }, []);

  const toDosList = (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Data de Criação</th>
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
              <td>
                {t.createdAt.getDate()}/{t.createdAt.getMonth() + 1}/
                {t.createdAt.getFullYear()}
              </td>
              <td>{t.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              Nehuma tarefa disponível
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      {toDosList}
      <Link to="/">voltar</Link>
    </>
  );
}

export default ListToDos;
