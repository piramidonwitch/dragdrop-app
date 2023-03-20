
import { useEffect, useState } from 'react';
import './App.css';
import { Add } from './components/Add';
import { Block } from './components/Block';
import { FilterBlock } from './components/FilterBlock';
import { defaultData } from './data/data';




function App() {
  const getLocStorData = JSON.parse(localStorage.getItem('items'))
  const [data, setData] = useState(getLocStorData || defaultData)
  const [filter, setFilter] = useState('active')

  const [activeBtn, setActiveBtn] = useState('false')
  const [completeBtn, setCompleteBtn] = useState('false')
  const [allBtn, setAllBtn] = useState('false')

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

  const changeFilter = (value) => {
    setFilter(value)
  }

  let filtredData = data

  if (filter === 'completed') {
    filtredData = filtredData.filter(e => e.isDone === true)
  }
  if (filter === 'active') {
    filtredData = filtredData.filter(e => e.isDone === false)
  }

  const onDone = (id, checked) => {
    setData(
      data.map(e => e.id === id ? { ...e, isDone: checked } : e))
  }

  return (
    <div className="App">
      <Add
        changeData={setData}
        filter={setFilter}
        setActiveBtn={setActiveBtn}
        setCompleteBtn={setCompleteBtn}
        setAllBtn={setAllBtn}
      />
      <Block
        data={filtredData}
        setData={setData}
        killItem={killItem}
        onEdited={onEdited}
        onDone={onDone}
      />
      <FilterBlock
        changeFilter={changeFilter}

        setActiveBtn={setActiveBtn}
        setCompleteBtn={setCompleteBtn}
        setAllBtn={setAllBtn}
        activeBtn={activeBtn}
        completeBtn={completeBtn}
        allBtn={allBtn}

      />

    </div>
  );
}

export default App;
