import React,{useEffect,useState} from 'react';
import Tmdb from './Tmdb';
import MoviewRow from "./components/MoviewRow";
import FeaturedMoview from './components/FeaturedMovie';
import "./App.css";
function App() {

  const [movieList,setMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);
  useEffect(()=>{
    
    const loadAll = async () =>{
       //pegando a lista toatl
       const list = await Tmdb.getHomeList();
       setMovieList(list);

       //Pega o Featured

       let originals = list.filter(i=>i.slug === 'originals');
       let radomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
       let chosen = originals[0].items.results[radomChosen];
      
       let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv'); 
   

       setFeaturedData(chosenInfo);
    }

    loadAll();
 
  },[]);

  return (
    <div className="page">
       {featuredData &&
         <FeaturedMoview item={featuredData}/>
       }

      <section className="lists">
        {movieList.map((item,key) =>
           
              <MoviewRow key={key} title={item.title} items={item.items} />
            

        )}
      </section>
    </div>
  );
}

export default App;
