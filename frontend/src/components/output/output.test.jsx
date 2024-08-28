import React from "react";
import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import Output from "./Output";
import { TodoProvider } from "../context";
import { ToastContainer } from 'react-toastify';

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

const mockData = [{ todo_id: 1, todo: 'Test Todo' }];

describe('Test the output', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData)
        });
    });

    it('greps the todoText', async () => {
        render(
            <TodoProvider>
                <Output />
                <ToastContainer />
            </TodoProvider>
        );

        await waitForElementToBeRemoved(screen.getByTestId('loader'));
        const todoText = await screen.findByTestId('todoText');
        expect(todoText).toBeInTheDocument();
    });
});
