import ajaxService from "./ajaxService";
import { useEffect, useState } from "react";
const GetBreeds = () =>{
    const key = 'api_key=live_cLLScPEnin6oEFzJbZc22fLlBFZOsf'
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBreeds = async () =>{
            
            try{
                const result = await ajaxService(`https://api.thecatapi.com/v1/breeds`);
                setBreeds(result); 
                setLoading(false);
            }
            catch (error){
                console.error('fail');
                setLoading(false);
            }
    };
    fetchBreeds()
},[]);
    
    if (loading) {
        return <p>Loading breeds...</p>;
      }
    return(
      <select name="catBreeds" id='catBreeds' >
        {console.log(breeds)}
        {breeds.map((cat) => {
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>}
        )}
      </select>
    )
}

export default GetBreeds