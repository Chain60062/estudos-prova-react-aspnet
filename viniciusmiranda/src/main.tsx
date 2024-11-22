import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListaDeTarefas from "./pages/tarefa/ListaDeTarefas.tsx";
import CreateToDo from "./pages/tarefa/CreateToDo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pages/tarefa/listar",
    element: <ListaDeTarefas />,
  },
  {
    path: "/pages/tarefa/cadastrar",
    element: <CreateToDo />,
  },
  {
    path: "/pages/tarefa/alterar",
    element: <UpdateToDo />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
