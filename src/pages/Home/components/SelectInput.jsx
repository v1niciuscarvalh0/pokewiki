export const SelectInput = ({ fieldName, options, handleSelection }) => {
    return (
        <>
            <select class="form-select p-3 w-100" aria-label="Default select example" id="pokemonType" onChange={(e) => handleSelection(e.target.value)}>
                {options.map((option) => {
                    return (
                        <option value={option.value}>{option.name}</option>
                    )
                })}
            </select>
        </>
    )
}