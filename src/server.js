/**
 * THIS IS NOT A REAL SERVER
 * THIS IS DESIGNED TO MIMIC A REAL EXPRESS SERVER FOR THE PURPOSES OF THE DEMO
 * IN YOUR PROJECT YOU SHOULD REPLACE ALL THIS WITH A REAL SERVER THAT SAVES YOUR DATA
 * AND SUPPLIES YOUR DATA TO YOUR REACT APP
 */

class Api {
    constructor() {
        this.pizzaData = [
            { orderId: 123456789 },
            { orderId: 234567890 },
            { orderId: 586467865 },
            { orderId: 346578912 }
        ];
    }

    async get(url) {
        return url === "/pizza" ? this.pizzaData : [];
    }

    async post(url) {
        if (url === "/create") {
            const newOrder = { orderId: Math.floor(100000000 + Math.random() * 900000000) };
            return { message: "success", data: newOrder };
        } else throw Error(404);
    }
}

export default new Api();
