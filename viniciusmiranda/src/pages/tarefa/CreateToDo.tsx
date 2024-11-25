import { useState, useEffect } from "react";
import { API_URI } from "../../config/environment";
import Category from "../../interfaces/Category";
import { ICreateToDo } from "../../interfaces/ToDo";

function CreateToDo() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URI}/api/categoria/listar`);
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (err) {
      alert("Erro ao buscar categorias: " + err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(categoryId === 0) {
      alert("Escolha ou Crie uma Categoria");
      return;
    }
    const toDo: ICreateToDo = {
      categoryId,
      title,
      description,
    };
    
    fetch(`${API_URI}/api/tarefa/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      })
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Nome da Tarefa</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <label htmlFor="description">Descrição</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />

      <label htmlFor="categoria">Categorias:</label>
      <select
        onBlur={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCategoryId(Number(e.target.value))
        }
      >
        <option>Escolha Uma Categoria</option>
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">Criar Tarefa</button>
    </form>
  );
}

export default CreateToDo;
