import React from 'react';
import {screen, render} from '@testing-library/react'
import Entry from './Entry'
import { TodoProvider } from '../context';


describe('Test the entry', ()=>{
    it('Test the input', ()=>{
        render(
            <TodoProvider>
                <Entry/>
        </TodoProvider>
    )

        const entry = screen.getByRole('textbox', {
            name:/Eingabe Todo/i
        })
        expect(entry).toBeInTheDocument();
    })
})