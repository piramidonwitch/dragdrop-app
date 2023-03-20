

export function FilterBlock({ changeFilter, setActiveBtn, activeBtn, setCompleteBtn, completeBtn, setAllBtn, allBtn }) {

    return (
        <div className="filterBlock">

            <button onClick={() => {
                changeFilter('active')
                setActiveBtn(true)
                setCompleteBtn(false)
                setAllBtn(false)
            }}
                className={activeBtn ? 'submitBtnActive' : 'submitBtn'}>active
            </button>

            <button onClick={() => {
                changeFilter('completed')
                setCompleteBtn(true)
                setActiveBtn(false)
                setAllBtn(false)
            }}
                className={completeBtn ? 'submitBtnActive' : 'submitBtn'}>completed
            </button>

            <button onClick={() => {
                changeFilter('all')
                setAllBtn(true)
                setActiveBtn(false)
                setCompleteBtn(false)
            }}
                className={allBtn ? 'submitBtnActive' : 'submitBtn'}>all
            </button>

        </div>
    )
}