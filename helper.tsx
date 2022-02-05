//This file contains reusable helper functions that are frequently call from multiple other files

// Format Amount with commas and Currency. Currency is optional
export function _formatCurrency(amount: string | number, currency: string = '$') {
    return currency + (amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0')

}


// This function returns the user details
// Currently calls a mock api for the demo
export async function _getUserInfo(auth_token: string) {

    let promise = new Promise(async (res, rej) => {
        fetch("https://mocki.io/v1/0069372a-2384-4d84-8061-4d1d0c2ef380")
            .then(response => response.text())
            .then(result => {
                let result_json = JSON.parse(result)
                if(!result_json){
                    throw 'Invalid'
                }
                res(result_json)
            }).catch(() => {
                //Send some values just in case the Mock API expires for this demo
                res({
                    "Name": "Nandha Kumar",
                    "card_cvv": "432",
                    "card_expiry": "12/22",
                    "card_limit": 5000,
                    "card_number": "8374097534569843",
                    "card_spent": 450,
                    "card_limit_active": true,
                    "card_frozen": false,
                    "card_balance": 3000
                })
            })
    })
    let result = await promise
    return result
}