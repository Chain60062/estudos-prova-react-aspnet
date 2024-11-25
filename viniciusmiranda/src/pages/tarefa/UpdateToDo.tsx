import { useEffect, useState } from "react";
import { API_URI } from "../../config/environment";
import ToDo from "../../interfaces/ToDo";

function UpdateToDo() {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  // Fetch to-dos on component mount
  useEffect(() => {
    fetch(`${API_URI}/api/tarefa/listar`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setToDos(data));
  }, []);

  // Function to update a to-do's status
const updateToDoStatus = (id: number) => {
  fetch(`${API_URI}/api/tarefa/alterar/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Erro ao atualizar: ${errorMessage}`);
      }
      return res.json()
    })
    .then((updatedToDo) => {
      setToDos((prevToDos) =>
        prevToDos.map((toDo) =>
          toDo.id === updatedToDo.id ? updatedToDo : toDo
        )
      );
    })
    .catch((err) => {
      console.error("Error updating to-do:", err);
      alert(`Erro ao atualizar status da tarefa: ${err.message}`);
    });
};

  const toDosList = (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {toDos.map((t) => (
          <tr key={t.id}>
            <td>{t.title}</td>
            <td>{t.description}</td>
            <td>{t.status}</td>
            <td>
              <button onClick={() => updateToDoStatus(t.id)}>Atualizar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <div>{toDosList}</div>;
}

export default UpdateToDo;