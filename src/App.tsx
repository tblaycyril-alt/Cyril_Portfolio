import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const ProjectPage = lazy(() => import("./components/PortfolioWork").then(module => ({ default: module.PortfolioProjectPage })));

const App = () => {
  if (window.location.pathname.startsWith("/work/")) return <Suspense fallback={<div style={{padding:24}}>Loading project…</div>}><ProjectPage /></Suspense>;
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
