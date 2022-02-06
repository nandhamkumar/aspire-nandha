// Author: Nandha
// Unit Test Helper Functions
import { _formatCurrency, _getUserInfo } from '../helper';


//Test _formatCurrency function
test('Test _formatCurrency', () => {
    expect(_formatCurrency(1000, '')).toBe('1,000');  // Blank currency
    expect(_formatCurrency(1000, '$')).toBe('$1,000');  // $ Currency
    expect(_formatCurrency(1000, 'S$')).toBe('S$1,000'); // S$ Currency
    expect(_formatCurrency(100, '')).toBe('100'); // Amount <= 1000
    expect(_formatCurrency(1000000, '')).toBe('1,000,000'); // Amount >= 1M
    expect(_formatCurrency(1000)).toBe('$1,000'); // Amount without Currency - Default to $

});


//Test _getUserInfo async function
test('Test _getUserInfo', async () => {
    const result = _getUserInfo('test_token');
    expect(result).resolves.toEqual({
        "Name": "Nandha Kumar",
        "card_cvv": "432",
        "card_expiry": "12/22",
        "card_limit": 5000,
        "card_number": "8374097534569843",
        "card_spent": 450,
        "card_limit_active": true,
        "card_frozen": false,
        "card_balance": 3000
    });

});