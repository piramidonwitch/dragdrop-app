import { useState } from "react"
import randomColor from "randomcolor"

export function Add ({changeData}) {
    const [error, setError] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        const title = e.target.inp.value
        if(e.target.inp.value.trim().length === 0) {
            setError('please input data')
        } else {
            changeData(prevData=>[...prevData, {id: Date.now(), title, color: randomColor({luminosity: 'light'})}])
            setError('')
        }
        e.target.reset()
        window.addEventListener('click', () => {setError('')}, {
            capture: false,
            once: true,
            passive: false,
        })
    }

    return (
        <form onSubmit={submitHandler} autoComplete='off'>
            { error && <p className="error_m">{error}</p> }
            <input placeholder="new item" name="inp" maxLength="20"></input>
            <button className="submitBtn" type='submit' value='add item'>+</button>
        </form>
    )
}