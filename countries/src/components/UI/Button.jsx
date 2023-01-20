import styled from 'styled-components';

export const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    color: var(--text-color);
    background-color: var(--ui-color);
    box-shadow: var(--shadow);
    line-height: 2.5;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
`;
