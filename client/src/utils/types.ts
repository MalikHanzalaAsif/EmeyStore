export interface ProductInterface {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string;
    quantity: string;
    color: string;
    size: string;
}

export interface userInterface {
    id: string;
    name: string;
    email: string;
}

export interface ordersInterface {
    userId: string;
    orderId: string;
    createdAt: string;
    price: string;
}

export interface formDataInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}