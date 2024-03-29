
import { useEffect, useState } from 'react';
import './App.css';
import { Add } from './components/Add';
import { Block } from './components/Block';

import { defaultData } from './data/data';




function App() {
  const getLocStorData = JSON.parse(localStorage.getItem('items'))
  const [data, setData] = useState(getLocStorData || defaultData)
  

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data))
  }, [data])


  //принимает id нажатого
  const killItem = (id) => {
    let newData = data.filter(e => e.id !== id)
    if (window.confirm('want to delete?')) { setData(newData) }
  }
  const onEdited = (id, value) => {
    setData(data.map(e => e.id === id ? { ...e, title: value } : e))
  }


  return (
    <div className="App">
      <Add
        changeData={setData}
      />
      <Block
        setData={setData}
        killItem={killItem}
        onEdited={onEdited}
        data={data}
      />
    </div>
  );
}

export default App;
