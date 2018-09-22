import Dashboard from "views/Components/Dashboard.jsx";

import LoginPage from "views/LoginPage/LoginPage.jsx";
import Registrationpage from "views/LoginPage/Registrationpage.jsx";
import NewPost from "views/Components/NewPost.jsx";
import Myposts from "views/Components/Myposts.jsx";
var indexRoutes = [
  
  { path: "/registration", name: "Registrationpage", component: Registrationpage },
  { path: "/post", name: "Post", component: NewPost },
  { path: "/myposts", name: "Myposts", component: Myposts },
  { path: "/dashboard", name: "Components", component: Dashboard },
 
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/", name: "Components", component: LoginPage },
 
];

export default indexRoutes;
