import { useState } from "react"

export function Add ({changeData, filter, setActiveBtn, setCompleteBtn, setAllBtn}) {
    const [error, setError] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        const title = e.target.inp.value
        if(e.target.inp.value.trim().length === 0) {
            setError('please input data')
        } else {
            changeData(prevData=>[...prevData, {id: Date.now(), title, isDone: false}])
            setError('')
        }
        e.target.reset()
        window.addEventListener('click', () => {setError('')}, {
            capture: false,
            once: true,
            passive: false,
        })
        filter('active')
        setActiveBtn(true)
        setCompleteBtn(false)
        setAllBtn(false)
    }
    return (
        <form onSubmit={submitHandler} autoComplete='off'>
            { error && <p>{error}</p> }
            <input placeholder="new item" name="inp"></input>
            <button className="submitBtn" type='submit' value='add item'>add item</button>
        </form>
    )
}