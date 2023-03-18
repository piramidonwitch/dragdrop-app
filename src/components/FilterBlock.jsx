export function FilterBlock ({changeFilter}) {
    return (
        <div className="filterBlock">
        <button className="submitBtn" onClick={()=>{changeFilter('all')}}>all</button>
        <button className="submitBtn" onClick={()=>{changeFilter('completed')}}>completed</button>
        <button className="submitBtn" onClick={()=>{changeFilter('active')}}>active</button>
        </div>
    )
}