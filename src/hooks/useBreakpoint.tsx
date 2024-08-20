import { useState, useEffect } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("md"); // Default breakpoint

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1536px)").matches) {
        setBreakpoint("2xl");
      } else if (window.matchMedia("(min-width: 1280px)").matches) {
        setBreakpoint("xl");
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setBreakpoint("lg");
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setBreakpoint("md");
      } else {
        setBreakpoint("sm");
      }
    };

    // Set the initial breakpoint
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
