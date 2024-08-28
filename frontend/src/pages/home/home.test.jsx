import React from 'react';
import {screen, render} from '@testing-library/react'
import Home from './home'
import { TodoProvider } from '../../components/context';
describe('EntryContainer is in the document', ()=>{
    it('Grep EntryContainer', ()=>{
        render(
            <TodoProvider>
                <Home/>
        </TodoProvider>
    )
        screen.debug()
        const entryContainer = screen.getByTestId('entryContainer');
        expect(entryContainer).toBeInTheDocument();
    })
})