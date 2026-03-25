import { Routes, Route, Navigate } from 'react-router-dom';
import Todo from './pages/Todo'
import Auth from './pages/Auth'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/auth' />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </>
  );

}

export default App
