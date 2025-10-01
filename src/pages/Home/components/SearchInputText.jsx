export const SearchInputText = ({fieldName, handleSearch}) => {
    return (
        <>
            <div class="form-floating mb-3 w-100">
                <input type="text" class="form-control" placeholder="pikachu" onChange={e => handleSearch(e.target.value)}></input>
                <label for="floatingInput">{fieldName}</label>
            </div>
        </>
    )
}