import { useEffect, useState } from "react";
import { API_URI } from "../../config/environment";
import ToDo from "../../interfaces/ToDo";
import { Link } from "react-router-dom";

function UpdateToDo() {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  // Utility function for formatting dates
  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

  // Fetch to-dos on component mount
  useEffect(() => {
    fetch(`${API_URI}/api/tarefa/listar`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao carregar tarefas: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: ToDo[]) => {
        const transformedData = data.map((t) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }));
        setToDos(transformedData);
      })
      .catch((err) => {
        console.error("Error fetching to-dos:", err);
        alert(`Erro ao carregar tarefas: ${err.message}`);
      });
  }, []);

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
        return res.json();
      })
      .then((updatedToDo) => {
        // Update the to-dos list after the status change
        setToDos((prevToDos) =>
          prevToDos.map((toDo) =>
            toDo.id === updatedToDo.id
              ? { ...updatedToDo, createdAt: new Date(updatedToDo.createdAt) }
              : toDo
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
          <th>Categoria</th>
          <th>Data de Criação</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {toDos.length > 0 ? (
          toDos.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.category?.name ?? "Sem categoria"}</td>
              <td>{formatDate(t.createdAt)}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => updateToDoStatus(t.id)}>
                  Atualizar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              Nenhuma tarefa disponível
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      {toDosList}
      <Link to="/">Voltar</Link>
    </>
  );
}

export default UpdateToDo;
