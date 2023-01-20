import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../../config';
import { Button } from '../UI/Button';
import { Info } from '../Info';

export const Country = () => {

    const {name} = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
    }, [name]);

    console.log(country)

    return (
        <div>
            <Button onClick={() => navigate(-1)}>
                <IoArrowBack /> Back
            </Button>
            {country && <Info navigate={navigate} {...country}/>}
        </div>
    )
};
