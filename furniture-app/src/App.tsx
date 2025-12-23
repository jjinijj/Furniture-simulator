import React from 'react';
import './App.css';
import Button from './components/Button';
import Counter from './components/Counter';
import FurnitureCounter from './components/FurnitureCounter';
import FurnitureList from './components/FurnitureList';
import ConditionalExample from './components/ConditionalExample';
import TernaryExample from './components/TernaryExample';
import AndExample from './components/AndExample';
import StockExample from './components/StockExample';
import EffectExample from './components/EffectExample';
import Timer from './components/Timer';
import InputExample from './components/InputExample';
import CheckboxRadioExample from './components/CheckboxRadioExample';
import FormExample from './components/FormExample';

function App() {

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

        <h2>4. 리스트 랜더링</h2>
        <FurnitureList/>

        <h2>5. 조건부 랜더링</h2>
        <ConditionalExample/>
        <TernaryExample/>
        <AndExample/>
        <StockExample/>

        <h2>5. 조건부 랜더링 UseEffect </h2>
        <EffectExample/>

        <h2>5. 조건부 랜더링 UseEffect Timer </h2>
        <Timer/>

        <h2> 6. Input 컴포넌트</h2>
        <InputExample/>
        <CheckboxRadioExample/>
        <FormExample/>
        
    </div>

  );
}
export default App;
