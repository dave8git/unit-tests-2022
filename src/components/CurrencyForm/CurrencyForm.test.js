import { render, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component currencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
    });

    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const singleTest of testCases) {
        it('should run action callback with proper data on form submit', () => {
            const action = jest.fn();
    
            // render component 
            render(<CurrencyForm action={action} />);
    
            // find "convert" button 
            const submitButton = screen.getByTxt('Convert');
    
            // simulate user click on "convert" button
            userEvent.click(submitButton);
    
            // check if action callback was called once
            // expect(action).toHaveBeenCalledTime(1);
    
            // find field elems 
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');
    
            // set test values to fields 
            userEvent.type(amountField, testCases.amount);
            userEvent.selectOptions(fromField, testCases.from);
            userEvent.selectOptions(toField, testCases.to);
    
            // check if action callback was called once and with proper argument 
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({ amount: testCases.amount, from: testCases.from, to: testCases.to });

            cleanup();
        });
    }
});