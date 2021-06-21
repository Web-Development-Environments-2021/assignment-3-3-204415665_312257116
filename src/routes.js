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
  {
    path: "/unionAgent/addMatchResult",
    name: "addMatchResult",
    component: () => import("./pages/unionAgentPages/unionAgent_addMatchResultPage")
  },
  {
    path: "/unionAgent/addMatchEventsLog",
    name: "addMatchEventsLog",
    component: () => import("./pages/unionAgentPages/unionAgent_addMatchEventsLogPage")
  },
  {
    path: "/unionAgent/addRefereeToMatch",
    name: "addRefereeToMatch",
    component: () => import("./pages/unionAgentPages/unionAgent_addRefereeToMatchPage")
  },

  //* ------------------------------ Players ------------------------------ *//

  {
    path: "/players/playerFullDetails/:playerID",
    name: "playerFullDetails",
    component: () => import("./pages/playersPages/players_playerFullDetailsPage")
  },

  //* ------------------------------ Teams ------------------------------ *//

  {
    path: "/teams/teamFullDetailsByID/:teamId",
    name: "teamFullDetailsByID",
    component: () => import("./pages/teamsPages/teams_teamFullDetailsByIDPage")
  },
  {
    path: "/teams/teamFullDetailsByName/:teamName",
    name: "teamFullDetailsByName",
    component: () => import("./pages/teamsPages/teams_teamFullDetailsByNamePage")
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
