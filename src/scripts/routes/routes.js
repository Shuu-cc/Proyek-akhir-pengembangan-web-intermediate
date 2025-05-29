import HomePage from '../pages/home/home-page.js';
import AboutPage from '../pages/about/about-page.js';
import RegisterPage from '../pages/register/register-page.js';
import LoginPage from '../pages/login/login-page.js';
import AddPage from '../pages/add/add-page.js';
import OfflinePage from '../pages/offline/offline-page.js';


const routes = {
  '/': new HomePage(),
  '/add': new AddPage(),
  '/about': new AboutPage(),
  '/register': new RegisterPage(), 
  '/login': new LoginPage(),
  '/offline': new OfflinePage(),
};

export default routes;
