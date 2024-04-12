// store.js
import {create} from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  todos: [],
  getTodos: async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos');
      return set({ todos: response.data });
    } catch (error) {
      console.error('Error fetching todos:', error); 
    }
  },
  addTodo: async (todo) => {
    try {
      const response = await axios.post('http://localhost:8000/todos', {...todo});
      return response.data;
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  },
  deleteTodo: async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  },
  editTodo: async (id, todo) => {
    try {
      const response = await axios.put(`http://localhost:8000/todos/${id}`, todo);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t))
      }));
      return response.data;
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  }
  
  
}));

export default useStore;
