import axios from 'axios';
import {useState, useEffect} from 'react'; 
import { Controls } from '../Controls/Controls';
import { List } from '../List';
import { Card } from '../Card';
import { _ALL_COUNTRIES } from '../../config'; 
import { useNavigate } from 'react-router-dom';


export const HomePage = ({ countries, setCountries }) => {

    const [filtredCountries, setFilteredCountries] = useState(countries);
  
    const navigate = useNavigate();

    const handleSearch = (search, region) => {
      let data = [...countries];
  
      if (region) {
        data = data.filter((c) => c.region.includes(region));
      }
  
      if (search) {
        data = data.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      setFilteredCountries(data);
    };
  
    useEffect(() => {
        if (!countries.length)
            axios.get(_ALL_COUNTRIES).then(({ data }) => setCountries(data));
    }, []);
  
    useEffect(() => {
        handleSearch();
    }, [countries]);
    
    return (
        <>
            <Controls onSearch={handleSearch}/>
                <List>  
                    {
                        filtredCountries.map(c => {
                            const countryInfo = {
                                img: c.flags.svg,
                                name: c.name,
                                info: [
                                    {
                                        title: 'Population',
                                        description: c.population.toLocaleString()
                                    },
                                    {
                                        title: 'Region',
                                        description: c.region
                                    },
                                    {
                                        title: 'Capital',
                                        description: c.capital
                                    },
                                ],
                            };

                            return (
                                <Card key={c.name} onClick={() => navigate(`/${c.name}`)} {...countryInfo}/>
                            )
                        })
                    }
                </List>
        </>
    )
}
