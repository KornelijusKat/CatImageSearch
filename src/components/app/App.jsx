import { useState, useEffect } from 'react'
import GetBreeds from '../API/GetBreads'
import BreedSelector from '../breedSelector/BreedSelector'
import './App.css'
import ajaxService from '../API/ajaxService'
import CatGallery from '../catGallery/CatGallery'
import Loading from '../loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const key = 'api_key=live_cLLScPEnin6oEFzJbZc22fLlBFZOsf'
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cats, setCats] = useState([]);
    const [selectBreed, setSelectBreed] = useState('');

    useEffect(() => {
        const fetchBreeds = async () =>{       
            try{
                const result = await ajaxService(`https://api.thecatapi.com/v1/breeds`);
                setBreeds(result); 
                setLoading(false);
            }
            catch (error){
                console.error(`${error}`);
                setLoading(false);
            }
    };
    fetchBreeds()
},[]);
    useEffect(() => {
      const fetchCatImages = async () =>{
        if (!selectBreed) return;
        setLoading(true);
        try{
          const result = await ajaxService(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${selectBreed}&${key}`)
          setCats(result);
          setLoading(false);
        }
        catch(error){
          console.log(`${error}`)
          setLoading(false);
        }
      };
      fetchCatImages();
    },[selectBreed]);
    const handleBreedSelect = (breedId) => {
      setSelectBreed(breedId); 
    };
    if (loading) {
        return (
          <main>
            <Loading></Loading>
          </main>
        );
      }
      console.log("Rendering breeds:", breeds);
    return(
      <section>
        <BreedSelector breeds = {breeds} onSelectedBreed={handleBreedSelect} selectBreed={selectBreed}></BreedSelector>
        {selectBreed && cats.length > 0 ? (
          <CatGallery cats = {cats}></CatGallery>
        ) :(
          <p>Please select a breed</p>
        )}
      </section>
    )
}
export default App
