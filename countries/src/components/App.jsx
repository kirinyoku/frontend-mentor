import { Header } from './Header';
import { Main } from './Main';
import { HomePage, Page404, Country } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

export const App = () => {

    const [countries, setCountries] = useState([]);

    return (
        <>
            <Header /> 
            <Main>
                <Routes>
                    <Route 
                        path='/' 
                        element={<HomePage countries={countries} setCountries={setCountries} />}
                    />
                    <Route path='/:name' element={<Country />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>    
            </Main>
        </>
    );
};
