import React, { useState, useEffect } from "react";
import Button from "../button";
import classes from "./style.module.css";

const url = "https://jsonplaceholder.typicode.com/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState();
  // pagination için activePage state tanımlasını yaptık.
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderThead = () => {
    return (
      <thead>
        <tr>
          <th
            onClick={() => {
              // id her tıklanıldığında ters sıraladık.
              if (selectedTodo !== "id") {
                setTodos([...todos].reverse());
              } else {
                setTodos([...todos].sort((a, b) => a.id - b.id));
              }
            }}
          >
            id
          </th>
          <th>başlık</th>
          <th
            // fetchten çektiğimiz veriyi başlık için sıraladık.
            onClick={() => {
              if (!todos[0].completed) {
                setTodos([...todos].sort((a, b) => b.completed - a.completed));
              } else {
                setTodos([...todos].sort((a, b) => a.completed - b.completed));
              }
            }}
          >
            durum
          </th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  //find metodu ile edit kısmını yaptık
  const editTodo = (id, value) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.title = value;
    setTodos(newTodos);
  };

  const remove = (todo) => {
    if (window.confirm("Silmek üzerisiniz emin misiniz")) {
      setTodos((prev) => {
        return prev.filter((x) => x.id !== todo.id);
      });
    }
  };

  const edit = (todo) => {
    setSelectedTodo(todo);
  };
  // pagination kısmında sayfa sayısını for ile bulup sayfa sayısını yazdırdık
  const pagination = () => {
    const pages = [];
    for (let i = 1; i <= todos.length / 15 + 1; i++) {
      pages.push(i);
    }

    return (
      // pagination için navbar kullanıldı
      <nav
        className="d-flex justify-content-center"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                // active sayfanın render edilmesi için tıklama ile setActivePage aktif hale getirdik.
                className={`page-item ${activePage === page ? "active" : ""}`}
                key={page}
                onClick={() => setActivePage(page)}
              >
                <a className="page-link" href="#!">
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  const renderBody = () => {
    return (
      <tbody>
        {todos &&
          todos.length > 0 &&
          todos
            .slice((activePage - 1) * 15, activePage * 15)
            .map((todo, index) => {
              return (
                <tr key={index}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? "Tamamlandı" : "Yapılacak"}</td>
                  <td>
                    <Button
                      className={`btn btn-sm btn-danger ${classes.actionButton} `}
                      onClick={() => remove(todo)}
                    >
                      Sil
                    </Button>
                    <Button
                      onClick={() => edit(todo)}
                      className="btn btn-sm btn-warning"
                    >
                      Düzenle
                    </Button>
                  </td>
                </tr>
              );
            })}
      </tbody>
    );
  };

  const renderEditForm = () => {
    return (
      <div>
        <input
          type="text"
          // Seçili todonun değerini değiştirmek için onChange metodunu kullandık.
          onChange={(e) => editTodo(selectedTodo.id, e.target.value)}
        />

        <Button onClick={() => setSelectedTodo(undefined)}>Kaydet</Button>
        <Button onClick={() => setSelectedTodo(undefined)}>Vazgeç</Button>
      </div>
    );
  };

  return (
    <div className={`${classes.container} container`}>
      {pagination()}
      {selectedTodo && renderEditForm()}
      <table className="table">
        {renderThead()}
        {renderBody()}
      </table>
    </div>
  );
};

export default TodoList;
