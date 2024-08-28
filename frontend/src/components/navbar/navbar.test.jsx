import React from 'react';
import {screen, render} from '@testing-library/react'
import Navbar from './Navbar';

describe('Test the title', ()=>{
    it('Grep the title', ()=>{
        render(<Navbar/>)

        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
    })
})