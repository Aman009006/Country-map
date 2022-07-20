import React , {useState ,useEffect} from "react";
import axios from 'axios'
import './style.scss'

function Dashboard() {

    const [country,setCountry]=useState([])
    const [showAll,setShowAll]=useState(false)


    useEffect(() => {

    const options = {
        url: 'https://restcountries.com/v3.1/all',
        method: 'GET'
      };
          
    axios(options)
        .then(response => {
          setCountry(response.data)
        });

    }, []);
    function getSearchCountry(e){
      if(e !== ''){
        const options = {
            url: `https://restcountries.com/v3.1/name/${e}`,
            method: 'GET'
          };
              
        axios(options)
            .then(response => {
              setCountry(response.data)
            });
      }
    }
    function getWithRegion(e){
          const options = {
              url: `https://restcountries.com/v3.1/region/${e}`,
              method: 'GET'
            };
                
          axios(options)
              .then(response => {
                setCountry(response.data)
              });
    }
    function sortCountry(){

        function SortArray(x, y){
            if (x.name.official < y.name.official) {return -1;}
            if (x.name.official > y.name.official) {return 1;}
            return 0;
        }

        const newArr = country.sort(SortArray)
        setCountry(newArr)
        setShowAll(!showAll)
    }
    function sortPopulation(e){
        if(e === 1){
            function SortArray(x, y){
                if (x.population < y.population) {return -1;}
                if (x.population > y.population) {return 1;}
                return 0;
            }
    
            const newArr = country.sort(SortArray)
            setCountry(newArr)
            setShowAll(!showAll)
        }else if(e===2){
            function SortArray(x, y){
                if (x.population < y.population) {return 1;}
                if (x.population > y.population) {return -1;}
                return 0;
            }
    
            const newArr = country.sort(SortArray)
            setCountry(newArr)
            setShowAll(!showAll)
        }
    }


  return (
   <>

    <div className="nav">
        <div className="counttry__content">
            <input onChange={(e)=>getSearchCountry(e.target.value)} placeholder='поиск по названию' type="text" />
            <button onClick={()=>sortCountry()} className="sort">Сортировка по алфавиту</button>
            <button onClick={()=>sortPopulation(1)} className="sort">Сортировка по возрастанию популяции</button>
            <button onClick={()=>sortPopulation(2)} className="sort">Сортировка по убыванию популяции</button>
            <select onChange={(e)=>getWithRegion(e.target.value)} name="all" id="">
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
        </select>
        </div>
    </div>

    <div className="dashboard">
        {country?.map((item)=>{
            return(
                <div  key={item?.name.official} className="counttry__content">
                    <img src={item.flags.svg} alt="" className="flag" />
                    <p className="population">{item.name.official}</p>
                    <p className="population">Популяция: {item.population}</p>
                    <p className="population">Столица: {item.capital}</p>
                    <img src={item.coatOfArms.svg} alt="" className="gerb" />
                </div>
            )
        })}
    </div>

</>
  );
}

export default Dashboard;
