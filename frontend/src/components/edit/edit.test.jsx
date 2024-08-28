import React from "react";
import {screen, render} from '@testing-library/react';
import Edit from "./Edit";
import { TodoProvider } from "../context";

describe('test the textbox', ()=>{
    it('Test the EditInput', ()=>{
        render(
            <TodoProvider>
                <Edit/>
        </TodoProvider>
        )
        const editInput = screen.getByRole('textbox', {
            nmae:/Edit Todo/i
        })
        expect(editInput).toBeInTheDocument();
    })
})