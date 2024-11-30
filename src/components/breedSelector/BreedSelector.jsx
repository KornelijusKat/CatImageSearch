const BreedSelector = ({breeds, onSelectedBreed, selectBreed}) =>{
    const handleChange = (event) => {
        const selectedBreedId = event.target.value;
        onSelectedBreed(selectedBreedId); 
      };
    const handleSubmit = (event) => {
        event.preventDefault(); 
        const selectElement = event.target.elements.catBreeds;
        const selectedBreedId = selectElement.value;
        onSelectedBreed(selectedBreedId); 
    }
    console.log(breeds)
    return(
        <form onSubmit={handleSubmit}>
            <select name="catBreeds" id='catBreeds' value={selectBreed} onChange={handleChange}>
            {breeds.map((cat) => {
                return(
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>);}  
            )}
            </select>
      
        </form>
      )
}
export default BreedSelector