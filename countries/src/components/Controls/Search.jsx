import { IoSearch } from 'react-icons/io5';

import styled from 'styled-components';

const InputContainer = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    background-color: var(--ui-color);
    border-radius: var(--radius);
    box-shadow: var(--shadow);

    @media(min-width: 767px) {
        margin-bottom: 0;
        width: 280px;
    }
`;

const Input = styled.input.attrs({
    type: 'search',
    placeholder: 'Search for a country',
})`
    background-color: var(--ui-color);
    color: var(--text-color);
    margin-left: 2rem;
    border: none;
    outline: none;
`;

export const Search = ({search, setSearch}) => {
  return (
    <InputContainer>
        <IoSearch />
        <Input onChange={(e) => setSearch(e.target.value)} value={search} />
    </InputContainer>  
  )
};
