import React,{useState} from 'react';
import './MoviewRow.css';

export default ({title,items}) => {
   
    let mapImg;
 
     if (items){
        mapImg = items.results.map(item =>{
            return (
             <div key={item.id} className="moveRow--item">
               <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}  />
              </div>
            )
        })

     }



    

    return (
        <div className="movieRow">
           <h2>{title}</h2>
           <div className="movieRow--listarea">
               <div className="movieRow--list">
                   {mapImg}
               </div>
           </div>
        </div>
    )
}