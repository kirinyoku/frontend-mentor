import { useState, useEffect } from 'react';
import { IoMoon, IoMoonOutline } from 'react-icons/io5'
import { Container } from './Container';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const HeaderEl = styled.header`
    box-shadow: var(--shadow);
    background-color: var(--ui-color);
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
`; 

const Title = styled(Link).attrs({
    to: '/',
})`
    color: var(--text-color);
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    text-decoration: none;
`;

const ThemeSwitch = styled.div`
    color: var(--text-color);
    font-size: var(--fs-sm);
    cursor: pointer;
    text-transform: capitalize;
`;

export const Header = () => {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme])

    return (
        <HeaderEl>
            <Container>
                <Wrapper>
                    <Title>
                        Where is the world?
                    </Title>
                    <ThemeSwitch onClick={toggleTheme}>
                        {theme === 'light' 
                            ? <IoMoon size='14px' /> 
                            : <IoMoonOutline size='14px' />
                        }
                        <span style={{marginLeft: '0.75rem'}}>
                            {theme} Theme 
                        </span>
                    </ThemeSwitch>
                </Wrapper>
            </Container>
        </HeaderEl>  
    )
};
