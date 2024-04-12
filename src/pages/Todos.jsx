import React, { useEffect,useState } from 'react';
import useStore from '../store';
import { Table, Button } from 'react-bootstrap';
import TodosModal from '../modal/TodosModal';

const TodoList = () => {
  // store
  const { todos, getTodos, deleteTodo } = useStore();
// useState
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleAddTodo = () => {
    setModal(true);
    getTodos();
    // window.location.reload();
  };

  const toggle = () => {
    setModal(false);
    setEdit("");
    getTodos();
  }

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    getTodos();
  }

  const handleEditTodo = (item) => {
    setModal(true);
    setEdit(item ? item : null);
    getTodos();
  };

  return (
    <> 
      <div className="d-flex justify-content-center">
        <TodosModal open={modal} toggle={toggle} edit={edit} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id:</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo,index) => (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>{todo.address}</td>
              <td>{todo.phone}</td>
              <td>
                <Button className='mx-2' variant="warning" onClick={() => handleEditTodo(todo)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={()=> handleDeleteTodo(todo.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className="add-btn" variant="success" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </>
  );
};

export default TodoList;