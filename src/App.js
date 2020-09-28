import React,{useEffect,useState} from 'react';
import Tmdb from './Tmdb';
import MoviewRow from "./components/MoviewRow";
import FeaturedMoview from './components/FeaturedMovie';
import Header from './components/Header';
import "./App.css";
function App() {

  const [movieList,setMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);
  const [blackHeader,setBlackHeader] = useState(false);
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

  useEffect(() =>{
     const scrollListener = () =>{
       if(window.scrollY > 10){
         setBlackHeader(true);
       }else{
         setBlackHeader(false);
       }
     }
     window.addEventListener('scroll', scrollListener);
     return () =>{
       window.removeEventListener('scroll',scrollListener);
     }
  },[])

  return (
    <div className="page">
       <Header black={blackHeader} />

       {featuredData &&
         <FeaturedMoview item={featuredData}/>
       }

      <section className="lists">
        {movieList.map((item,key) =>
           
              <MoviewRow key={key} title={item.title} items={item.items} />
            

        )}
      </section>

      <footer>
         Feito com <span role="img" arial-label="coração">&hearts;</span> por Marcelo
         Direitos de imagem para Netflix<br/>
         Dados pegos do site de Themoviedb.org
      </footer>
       {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_400,c_limit/Netflix_LoadTime.gif" alt="carregando"/>
      </div>
      }
    </div>
  );
}

export default App;
