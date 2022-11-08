import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';

  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    const conversionPLNTOUSD = [
        { amount: 111, expected: 'PLN 111.00 = $31.71' },
        { amount: 240, expected: 'PLN 240.00 = $68.57' },
        { amount: 999, expected: 'PLN 800.00 = $228.57' },
        { amount: 1200, expected: 'PLN 999.00 = $285.43' },
      ];
    
      const conversionUSDTOPLN = [
        { amount: 33, expected: '$33.00 = PLN 115.50' },
        { amount: 75, expected: '$75.00 = PLN 262.50' },
        { amount: 160, expected: '$160.00 = PLN 560.00' },
        { amount: 200, expected: '$200.00 = PLN 700.00' },
      ];


      for (const value of conversionPLNTOUSD) {
        it('should render proper info about conversion when PLN -> USD', () => {
          render(<ResultBox from="PLN" to="USD" amount={value.amount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent(value.expected);
        });
      }

      for (const value of conversionUSDTOPLN) {
        it('should render proper info about conversion when USD -> PLN', () => {
          render(<ResultBox from="USD" to="PLN" amount={value.amount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent(value.expected);
        });
      }
      
      it('should return false if value is < 0', () => {
        render(<ResultBox from="USD" to="PLN" amount={-1} />);
        const output = screen.getByTestId("wrong-value");
        expect(output).toHaveTextContent("Wrong value...");
      });

});