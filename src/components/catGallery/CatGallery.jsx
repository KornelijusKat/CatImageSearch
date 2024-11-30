import './catGallery.scss'
const CatGallery = ({cats}) =>{
    return(
        <div className="cat-gallery">
            {cats.map((cat) =>(
                <div key={cat.id} className="card mt-1 mb-1">
                    <div className="img-con">
                        <img className="img-fluid" src={cat.url}/>
                    </div>      
                </div>
            ))}
        </div>
    
    )
}
export default CatGallery