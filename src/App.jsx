import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencil } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [validationMsg, setValidationMsg] = useState([]);
  const [todoList, setTodoList] = useState([]);

  const createTodo = () => ({
    id: id ? id : Date.now(),
    title,
    category,
    date,
    description,
  });

  const validateTodo = (todo) => {
    let msg = [];
    if(!todo.title) msg.push("title");
    if(!todo.category) msg.push("category");
    if(!todo.date) msg.push("date");
    if(!todo.description) msg.push("description");
    setValidationMsg(msg);
    return msg.length === 0;
  }

  const clearForm = () => {
    setId("");
    setTitle("");
    setCategory("");
    setDate("");
    setDescription("");
    setValidationMsg([]);
  }

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = createTodo();
    if(validateTodo(newTodo)) {
      setTodoList([...todoList, newTodo]);
      clearForm();
    }
  }

  const editTodo = (event) => {
    event.preventDefault();
    const editedTodo = createTodo();
    if(validateTodo(editedTodo)) {
      const newList = [...todoList];
      const index = newList.findIndex(item => item.id === id);
      newList[index] = editedTodo;
      setTodoList(newList);
      clearForm();
    }
  }

  const loadTodoData = (index) => {
    const { id, title, category, date, description } = todoList[index];
    setId(id);
    setTitle(title);
    setCategory(category);
    setDate(date);
    setDescription(description);
  }

  const removeTodo = (id) => {
    if(window.confirm("Deseja realmente apagar a tarefa?")){
      const newList = todoList.filter((item) => item.id !== id );
      setTodoList(newList);
    }
  }

  return (
    <div className="container">
      <div className="col-12 div_body">
        <div className="col-4 div_input">
          <div className="col-12 div_form">
            <div className="div_form_input">
              <h1 className="titulo">Cadastrar Tarefa</h1>
              <form>
                <p>Titulo</p>
                <input
                  type="text"
                  required
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                  style={validationMsg.includes('title') ? { borderColor: "red"} : { marginBottom: "20px" }}
                />
                {validationMsg.includes('title') && <span className="alet_input">Campo obrigatório</span>}

                <p>Categoria</p>
                <select
                  required
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}
                  style={validationMsg.includes('category') ? { borderColor: "red"} : { marginBottom: "20px" }}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Prioridade">Prioridade</option>
                  <option value="Outros">Outros</option>
                </select>
                {validationMsg.includes('category') && <span className="alert_input">Campo obrigatório</span>}

                <p>Data</p>
                <input type="date" min={new Date().toJSON().substring(0,10)} required onChange={(event) => setDate(event.target.value)} value={date} style={validationMsg.includes('date') ? { borderColor: "red"}: {marginBottom:"20px"}} />
                {validationMsg.includes('date') && <span className="alert_input">Campo obrigatório</span>}

                <p>Descrição</p>
                <input type="text" required onChange={(event) => setDescription(event.target.value)} value={description} style={validationMsg.includes('description') ? { borderColor: "red"}: {marginBottom:"20px"}} />
                {validationMsg.includes('description') && <span className="alert_input">Campo obrigatório</span>}

                <div className="btn_form">
                  <button className="btn btn_lg success " onClick={(event) => id ? editTodo(event) : addTodo(event) } > {id ? "Atualizar" : "Adicionar"} </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-8">
  <span className="titulo_body_tarefa"><h1>Minhas Tarefas</h1> <span>Total: {todoList.length} {todoList.length <= 1 ? "tarefa" : "tarefas"}</span></span>
  {todoList.length > 0 ? (
    <ul>
      {todoList.map((item, index) => (
      <li key={index}>
        <h3>{item.title}</h3>
        <p>Categoria: {item.category}</p>
        <p>Data: {item.date}</p>
        <p>Descrição: {item.description}</p>
        <div className="direito">
        <button className="btn_icon draw" onClick={() => loadTodoData(index)}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button className="btn_icon alert_outline" onClick={() => removeTodo(item.id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        </div>
      </li>
      ))}
    </ul>
  ) : (
    <p>Você não tem tarefas cadastradas.</p>
  )}
</div>
      </div>
    </div>
  )
}

export default App
