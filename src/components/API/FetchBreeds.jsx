const FetchBreeds = async ({setBreeds}, {setLoading}) =>{
    try{
        const result = await ajaxService(`https://api.thecatapi.com/v1/breeds`);
        setBreeds(result); 
        setLoading(false);
    }
    catch (error){
        console.error('fail');
        setLoading(false);
    }
}
export default FetchBreeds