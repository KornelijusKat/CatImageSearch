import { useState, useEffect } from 'react'

import BreedSelector from '../BreedSelector/BreedSelector'
import './App.css'
import ajaxService from '../API/ajaxService'
import CatGallery from '../CatGallery/CatGallery'
import Loading from '../loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const key = 'api_key=live_cLLScPEnin6oEFzJbZc22fLlBFZOsf'
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cats, setCats] = useState([]);
    const [selectBreed, setSelectBreed] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

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
    },[selectBreed, refreshKey]);
    const handleBreedSelect = (breedId) => {
      setSelectBreed(breedId); 
    };
    
    const handleRefreshClick = () => {
      setRefreshKey(prevKey => prevKey + 1); 
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
      <>
        <header>
          <h1> Find your favourite cat breeds</h1>
        </header>
        <main>
          <section>
            <BreedSelector breeds = {breeds} onSelectedBreed={handleBreedSelect} selectBreed={selectBreed}></BreedSelector>
              {selectBreed && cats.length > 0 ? (
                <>
                  <button className="btn btn-dark mt-2 mb-2" onClick={() => handleRefreshClick(selectBreed)}>Refresh</button>
                  <CatGallery cats = {cats}/>
                
                </>
              ) :(
                <p>Please select a breed</p>
              )}
          </section>
        </main>
      </>
    )
}
export default App
