import { Reorder } from "framer-motion"
import { useRef, useState, useLayoutEffect } from "react"


export function Block({ data, setData, killItem, onEdited }) {
    
    return (
        <div>
            <Reorder.Group axis="y" values={data} onReorder={setData} >
                {data.map(item =>
                    <Item key={item.id} item={item} killItem={killItem} onEdited={onEdited}/>
                )}
            </Reorder.Group>
        </div>
    )
}

function Item({ item, killItem, onEdited }) {

    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(item.title)
    const editTitleInputRef = useRef('null')
    
    //манипуляции с DOM поэтому useLayoutEffect, а не useEffect
    useLayoutEffect(()=>{
        if (isEditMode && editTitleInputRef) {editTitleInputRef.current.focus()
        }
        }, [isEditMode])
    
    const changeHandler = (event) => {
        setValue(event.target.value)
    }
    
    return (
        <Reorder.Item
            className="item"
            value={item} // для комноненты framer motion
            whileDrag={{ scale: 1.2 }} // для комноненты framer motion
            onDoubleClick={() => { killItem(item.id) }}
        >
            {isEditMode ? (
                <input value={value} onChange={changeHandler} ref={editTitleInputRef}/>
            ) : (
                <div className="title">
                    <span>{item.title}</span>
                </div>
            )}

            {isEditMode ? (
                <button onClick={() => { 
                    onEdited(item.id, value)
                    setIsEditMode(false)
                    }}>
                    ok
                </button>
            ) : (
                <button onClick={() => { setIsEditMode(!isEditMode) }}>
                    edit
                </button>)}

        </Reorder.Item>
    )
}