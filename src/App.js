import React,{useEffect,useState} from 'react';
import Tmdb from './Tmdb';
import MoviewRow from "./components/MoviewRow";
import "./App.css";
function App() {

  const [movieList,setMovieList] = useState([]);
  useEffect(()=>{
    
    const loadAll = async () =>{
       //pegando a lista toatl
       const list = await Tmdb.getHomeList();
       setMovieList(list);
    }

    loadAll();

  },[]);

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item,key) =>
           
              <MoviewRow key={key} title={item.title} items={item.items} />
            

        )}
      </section>
    </div>
  );
}

export default App;
