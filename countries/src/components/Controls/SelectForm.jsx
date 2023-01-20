import Select from 'react-select';

import styled from 'styled-components';

export const SelectForm = styled(Select).attrs({
    styles: {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'var(--ui-color)',
            color: 'var(--text-color)',
            borderRadius: 'var(--radius)',
            padding: '.25rem',
            border: 'none',
            boxShadow: 'var(--shadow)',
            height: '3rem',
            cursor: 'pointer',
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            color: 'var(--text-color)',
            backgroundColor: state.isSelected ? 'var(--bg-color)' : 'var(--ui-color)',
        }),    
    }    
})`
    width: 200px;
    border-radius: var(--radius);
    border: none;
    font-family: var(--family);
    
    & > * {
        box-shadow: var(--shadow);
    }

    & * {
        color: var(--text-color) !important;
    }

    & > div[id] {
        background-color: var(--ui-color);
    } 
`;
