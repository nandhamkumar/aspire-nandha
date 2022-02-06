// Author: Nandha
// Unit Test Set Spending Limit Screen
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import SetSpendingLimit from '../SetSpendingLimit';


describe('Set Spending Limit Screen test', () => {
    test('Check if rendered correctly', async () => {

        const store = configureStore({
            profile_data: {
                "Name": "Nandha Kumar",
                "card_cvv": "432",
                "card_expiry": "12/22",
                "card_limit": 5000,
                "card_number": "8374097534569843",
                "card_spent": 450,
                "card_limit_active": true,
                "card_frozen": false,
                "card_balance": 3000
            }
        });

        const component = (
            <Provider store={store}>
                <SetSpendingLimit store={store} />
            </Provider>
        );
        let root = await waitFor(() =>
            render(component)
        );
        expect(root.getAllByText('Spending Limit').length).toBe(1)
        expect(root.getAllByText('Save').length).toBe(1)
        expect(root.getAllByText('S$ 5,000').length).toBe(1)
        expect(root.getAllByText('S$ 10,000').length).toBe(1)
        expect(root.getAllByText('S$ 20,000').length).toBe(1)

    });
});