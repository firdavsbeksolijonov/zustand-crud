import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import useStore from '../store';

const TodosModal = ({ open, toggle, edit }) => {
  const { addTodo, editTodo } = useStore();
  

  const handleTodo = (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let address = e.target[1].value;
    let phone = e.target[2].value;

    if (edit) {
      name = name ? name : edit.name;
      address = address ? address : edit.address;
      phone = phone ? phone : edit.phone;
    }

    if (!name || !address || !phone) {
      alert('Please fill all the fields');
      return;
    }

    const payload = { name, address, phone };
    toggle();
    console.log(payload, 'payload');
    if (edit) {
      editTodo(edit.id, payload);
      // alert('Edited Successful');
    } else {
      addTodo(payload);
      window.location.reload();
    }
  }

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        {
          edit ? "Edit Todo" : "Add Todo"
        }
      </ModalHeader>
      <ModalBody>
        <form id='todo-form' onSubmit={handleTodo}>
          <input type="text" placeholder='Name...' defaultValue={edit?.name } className='form-control my-2' />
          <input type="text" placeholder='Address...' defaultValue={edit?.address} className='form-control my-2' />
          <input type="number" placeholder='Phone...' defaultValue={edit?.phone} className='form-control my-2' />
        </form>
      </ModalBody>
      <ModalFooter>
        {
          edit ? <Button type='submit' className='mx-2 btn btn-warning ' form='todo-form'>Edit</Button> : <Button className='mx-2 btn btn-success' type='submit' form='todo-form'>Add</Button>
        }
      </ModalFooter>
    </Modal>
  )
}

export default TodosModal;
