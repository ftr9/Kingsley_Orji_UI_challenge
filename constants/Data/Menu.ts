import { Imenu } from '@/types';

export const MENU: Imenu[] = [
  {
    name: 'MilkShake',
    link: 'milkshakes',
    description: '20 cups of different flavour',
    image: require('../../assets/images/final_restore_1.png'),
  },
  {
    name: 'Chicken Burger',
    description: '20 sets of different flavour',
    image: require('../../assets/images/burger/crispy_chicken-removebg-preview.png'),
    link: 'burgers',
  },
  {
    name: 'Chocolate Drinks',
    description: '20 cups of different flavour',
    image: require('../../assets/images/chocolates.png'),
    link: 'chocolatedrinks',
  },
  {
    name: 'Coffee Drinks',
    description: '20 cups of different flavour',
    image: require('../../assets/images/lyamma.png'),
    link: 'coffeedrinks',
  },
];
