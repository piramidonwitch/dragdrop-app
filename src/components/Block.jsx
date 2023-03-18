import { Reorder } from "framer-motion"
import { useRef, useState, useLayoutEffect } from "react"


export function Block({ data, setData, killItem, onEdited, onDone }) {

    return (
        <div>
            <Reorder.Group axis="y" values={data} onReorder={setData} >
                {data.map(item =>
                    <Item key={item.id}
                        item={item}
                        killItem={killItem}
                        onEdited={onEdited}
                        onDone={onDone}
                    />
                )}
            </Reorder.Group>
        </div>
    )
}

function Item({ item, killItem, onEdited, onDone }) {

    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(item.title)
    const editTitleInputRef = useRef('null')
    //манипуляции с DOM поэтому useLayoutEffect, а не useEffect
    useLayoutEffect(() => {
        if (isEditMode && editTitleInputRef) {
            editTitleInputRef.current.focus()
        }
    }, [isEditMode])
    const changeHandler = (event) => {
        setValue(event.target.value)
    }
    const onPressHandler = (event) => {
        if (event.keyCode === 13) {
            onEdited(item.id, value)
            setIsEditMode(false)
        }
    }

    return (
        <Reorder.Item
            className="item"
            value={item} // для комноненты framer motion
            whileDrag={{ scale: 1.2 }} // для комноненты framer motion
            onDoubleClick={() => { killItem(item.id) }}
        >
            <label className="check">
            <input type="checkbox" checked={item.isDone}
                onChange={(e) => {
                    const checked = e.target.checked
                    setTimeout(()=>{onDone(item.id, checked)}, 150)
                }}
            />
            </label>

            {isEditMode ? (
                <input className="edit"
                value={value}
                    onChange={changeHandler}
                    ref={editTitleInputRef}
                    onKeyDown={onPressHandler}
                />
            ) : (
                <div className="title">
                    <span>{item.title}</span>
                </div>
            )}
            {isEditMode ? (
                <button className="btn" onClick={() => {
                    onEdited(item.id, value)
                    setIsEditMode(false)
                }}>
                    ok
                </button>
            ) : (
                <button className="btn" onClick={() => { setIsEditMode(!isEditMode) }}>
                    edit
                </button>)}
        </Reorder.Item>
    )
}
