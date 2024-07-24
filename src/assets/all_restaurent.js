import restaurentimage1 from './ex1.png';
import restaurentimage2 from './ex2.png';
import restaurentimage3 from './ex3.png';
import restaurentimage4 from './ex4.png';
import restaurentimage5 from './ex5.png';
import restaurentimage6 from './ex6.png';
import restaurentimage7 from './exp7.png';
import restaurentimage8 from './exp8.png';
import restaurentimage9 from './exp9.png';
import restaurentimage10 from './exp10.png';

export const all_restaurants = [
    {
        id: 1,
        bg_image: restaurentimage1,
        name: 'Chicken Republic',
        menu: ['Jollof Rice', 'Fried Rice', 'White Rice', 'Beans'],
        food: [
            {
                id: 1,
                name: 'Fried Rice Chicken and Salad',
                price: '4500',
                image: restaurentimage1
            },
            {
                id: 2,
                name: 'Jollof Rice and Chicken',
                price: '3500',
                image: restaurentimage2
            },
            {
                id: 3,
                name: 'White Rice and Beef',
                price: '4000',
                image: restaurentimage3
            }
        ]
    },
    {
        id: 2,
        bg_image: restaurentimage2,
        name: 'KFC',
        menu: ['Chicken Bucket', 'Burgers', 'Fries', 'Drinks'],
        food: [
            {
                id: 4,
                name: 'Chicken Bucket',
                price: '5000',
                image: restaurentimage4
            },
            {
                id: 5,
                name: 'Zinger Burger',
                price: '3000',
                image: restaurentimage5
            },
            {
                id: 6,
                name: 'Fries',
                price: '1500',
                image: restaurentimage6
            }
        ]
    },
    {
        id: 3,
        bg_image: restaurentimage3,
        name: 'Dominos',
        menu: ['Pizza', 'Pasta', 'Sides', 'Desserts'],
        food: [
            {
                id: 7,
                name: 'Pepperoni Pizza',
                price: '6000',
                image: restaurentimage7
            },
            {
                id: 8,
                name: 'Chicken Alfredo Pasta',
                price: '4500',
                image: restaurentimage8
            },
            {
                id: 9,
                name: 'Garlic Bread',
                price: '2000',
                image: restaurentimage9
            }
        ]
    },
    {
        id: 4,
        bg_image: restaurentimage4,
        name: 'McDonalds',
        menu: ['Burgers', 'Fries', 'Drinks', 'Desserts'],
        food: [
            {
                id: 10,
                name: 'Big Mac',
                price: '3500',
                image: restaurentimage10
            },
            {
                id: 11,
                name: 'Chicken Nuggets',
                price: '3000',
                image: restaurentimage1
            },
            {
                id: 12,
                name: 'McFlurry',
                price: '2500',
                image: restaurentimage2
            }
        ]
    },
    {
        id: 5,
        bg_image: restaurentimage5,
        name: 'Pizza Hut',
        menu: ['Pizza', 'Pasta', 'Sides', 'Desserts'],
        food: [
            {
                id: 13,
                name: 'Margherita Pizza',
                price: '5500',
                image: restaurentimage3
            },
            {
                id: 14,
                name: 'Spaghetti Bolognese',
                price: '5000',
                image: restaurentimage4
            },
            {
                id: 15,
                name: 'Chicken Wings',
                price: '3000',
                image: restaurentimage5
            }
        ]
    },
    {
        id: 6,
        bg_image: restaurentimage6,
        name: 'Subway',
        menu: ['Subs', 'Salads', 'Drinks', 'Desserts'],
        food: [
            {
                id: 16,
                name: 'Turkey Sub',
                price: '4000',
                image: restaurentimage6
            },
            {
                id: 17,
                name: 'Veggie Delight Sub',
                price: '3500',
                image: restaurentimage7
            },
            {
                id: 18,
                name: 'Caesar Salad',
                price: '3000',
                image: restaurentimage8
            }
        ]
    },
    {
        id: 7,
        bg_image: restaurentimage7,
        name: 'Starbucks',
        menu: ['Coffee', 'Tea', 'Pastries', 'Sandwiches'],
        food: [
            {
                id: 19,
                name: 'Latte',
                price: '2500',
                image: restaurentimage9
            },
            {
                id: 20,
                name: 'Cappuccino',
                price: '2700',
                image: restaurentimage10
            },
            {
                id: 21,
                name: 'Blueberry Muffin',
                price: '1500',
                image: restaurentimage1
            }
        ]
    },
    {
        id: 8,
        bg_image: restaurentimage8,
        name: 'Burger King',
        menu: ['Burgers', 'Fries', 'Drinks', 'Desserts'],
        food: [
            {
                id: 22,
                name: 'Whopper',
                price: '3800',
                image: restaurentimage2
            },
            {
                id: 23,
                name: 'Chicken Fries',
                price: '2800',
                image: restaurentimage3
            },
            {
                id: 24,
                name: 'Oreo Shake',
                price: '2200',
                image: restaurentimage4
            }
        ]
    },
    {
        id: 9,
        bg_image: restaurentimage9,
        name: 'Taco Bell',
        menu: ['Tacos', 'Burritos', 'Quesadillas', 'Drinks'],
        food: [
            {
                id: 25,
                name: 'Crunchy Taco',
                price: '2000',
                image: restaurentimage5
            },
            {
                id: 26,
                name: 'Beef Burrito',
                price: '3500',
                image: restaurentimage6
            },
            {
                id: 27,
                name: 'Chicken Quesadilla',
                price: '4000',
                image: restaurentimage7
            }
        ]
    },
    {
        id: 10,
        bg_image: restaurentimage10,
        name: 'Dunkin Donuts',
        menu: ['Donuts', 'Coffee', 'Sandwiches', 'Drinks'],
        food: [
            {
                id: 28,
                name: 'Glazed Donut',
                price: '1000',
                image: restaurentimage8
            },
            {
                id: 29,
                name: 'Iced Coffee',
                price: '2000',
                image: restaurentimage9
            },
            {
                id: 30,
                name: 'Breakfast Sandwich',
                price: '3000',
                image: restaurentimage10
            }
        ]
    }
];
