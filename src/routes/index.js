import {
  List
} from '../pages'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <List type="homes"/>,
    name: 'Homes'
  },
  {
    path: '/homes',
    exact: true,
    main: () => <List type="homes"/>,
    name: 'Homes'
  },
  {
    path: '/lots',
    main: () => <List type="lots"/>,
    name: 'Lots'
  }
]

export default routes;
