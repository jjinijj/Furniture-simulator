import React from 'react';
import './App.css';
import Button from './components/Button';
import FurnitureCard from './components/FurnitureCard';
import Counter from './components/Counter';
import FurnitureCounter from './components/FurnitureCounter';

function App() {
  const projectName = "Furniture Simulator";
  const emoji ="🪑"

  const handleAddClick = () =>{
    alert('가구 추가!');
  }
  const handleDeleteClick = () =>{
  alert('가구 삭제!');
  }
  const handleRotateClick = () =>{
  alert('가구 회전!');
  }

  return (
    <div className="App">
      <h1> React학습</h1>
      <h2> 1. 버튼 컴포넌트</h2>
        <Button
          text = "가구 추가 ➕ "
          variant='green'
          onClick={handleAddClick}
        />
        <Button
          text = "가구 삭제 🗑️ "
          variant='red'
          onClick={handleDeleteClick}
        />
        <Button
          text = "가구 회전 🔁 "
          variant='blue'
          onClick={handleRotateClick}
        />

        <h2>2. State 연습</h2>
        <Counter/>

        <h2>3. useState 심화</h2>
        <FurnitureCounter/>
    </div>

  );
}
export default App;
