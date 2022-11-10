import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import AccountsPage from "./pages/AccountsPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/AccountPage";

// for getting rid of warning in console
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="w-full h-screen flex">
          <Header />
          <div className="w-5/6 h-screen flex flex-col justify-center items-center">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/accounts/:id" element={<AccountPage />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path='/projects/:id' element={<Project />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
