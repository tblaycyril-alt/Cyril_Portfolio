import { lazy, PropsWithChildren, Suspense, useEffect, useState, useRef } from "react";
import { About, Practice as Career, Contact, SocialIcons } from "./PortfolioSections";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import WhatIDo from "./WhatIDo";
import Work from "./PortfolioWork";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

function DeferredTools() {
  const slot = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: '800px' });
    if (slot.current) observer.observe(slot.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={slot} style={{minHeight:'100vh'}}>{ready && <Suspense fallback={<div style={{height:'100vh'}}/>}><TechStack/></Suspense>}</div>;
}

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && <DeferredTools />}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
