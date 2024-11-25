import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateToDo from "./pages/tarefa/CreateToDo.tsx";
import ListToDos from "./pages/tarefa/ListToDos.tsx";
import UpdateToDo from "./pages/tarefa/UpdateToDo.tsx";
import NotDoneToDos from "./pages/tarefa/NotDoneToDos.tsx";
import DoneToDos from "./pages/tarefa/DoneToDos.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pages/tarefa/listar",
    element: <ListToDos />,
  },
  {
    path: "/pages/tarefa/cadastrar",
    element: <CreateToDo />,
  },
  {
    path: "/pages/tarefa/alterar",
    element: <UpdateToDo />,
  },
  {
    path: "/pages/tarefa/naoconcluidas",
    element: <NotDoneToDos />,
  },
  {
    path: "/pages/tarefa/concluidas",
    element: <DoneToDos />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
