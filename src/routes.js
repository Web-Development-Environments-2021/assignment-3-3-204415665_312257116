import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [

  //* ------------------------------ Auth ------------------------------ *//

  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/About",
    name: "About",
    component: () => import("./pages/AboutPage.vue")
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },

  //* ------------------------------ Users ------------------------------ *//

  {
    path: "/users/favoriteMatches",
    name: "favoriteMatches",
    component: () => import("./pages/usersPages/users_favoriteMatchesPage")
  },

  //* ------------------------------ UnionAgent ------------------------------ *//

  {
    path: "/unionAgent/leagueManagement",
    name: "leagueManagement",
    component: () => import("./pages/unionAgentPages/unionAgent_leagueManagementPage")
  },
  {
    path: "/unionAgent/match",
    name: "match",
    component: () => import("./pages/unionAgentPages/unionAgent_matchPage")
  },

  //* ------------------------------ Players ------------------------------ *//

  {
    path: "/players/playerDetails/:playerID",
    name: "playerDetails",
    component: () => import("./pages/playerDetailsPage.vue")
  },

  //* ------------------------------ Teams ------------------------------ *//

  {
    path: "/teams/teamDetails/:teamName",
    name: "teamDetails",
    component: () => import("./pages/teamDetailsPage")
  },

  //* ------------------------------ Matches ------------------------------ *//

  {
    path: "/matches/currentStageMatches",
    name: "currentStageMatches",
    component: () => import("./pages/matchesPages/matches_currentStageMatchesPage")
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
