import { defineMenu } from './types';

const menus = defineMenu({
  path: '/',
  children: [
    {
      path: '/',
      name: 'home',
      icon: 'home'
    },
  ]
});

export default menus;
