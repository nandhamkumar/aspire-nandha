// Author: Nandha
// Unit Test Debit Card Screen
import { render, waitFor } from '@testing-library/react-native';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import DebitCard from '../DebitCard';


describe('Debit Card Screen test', () => {
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
                <DebitCard store={store} />
            </Provider>
        );
        let root = await waitFor(() =>
            render(component)
        );
        expect(root.getAllByText('Debit Card').length).toBe(1)
        expect(root.getAllByText('Available Credit').length).toBe(1)
        expect(root.getAllByText('Hide card number').length).toBe(1)
        expect(root.getAllByText('Top-up account').length).toBe(1)
        expect(root.getAllByText('Weekly spending limit').length).toBe(1)
        expect(root.getAllByText('Freeze card').length).toBe(1)
        expect(root.getAllByText('Get a new card').length).toBe(1)
        expect(root.getAllByText('Deactivated cards').length).toBe(1)
        expect(root.getAllByText('Loading...').length).toBe(1)



    });

});