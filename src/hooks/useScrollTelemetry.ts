import { useState, useEffect } from 'react';
import { WAYPOINTS } from '../data/elevationRoute';
import type { Waypoint } from '../types/trek';

export interface ScrollTelemetry {
  scrollProgress: number; // 0 to 1
  virtualAltitude: number; // 822m to 4130m
  virtualAltitudeFeet: number;
  oxygenPercentage: number; // approx 99% down to 62%
  currentWaypoint: Waypoint;
  isScrolled: boolean;
}

export function useScrollTelemetry(): ScrollTelemetry {
  const [telemetry, setTelemetry] = useState<ScrollTelemetry>({
    scrollProgress: 0,
    virtualAltitude: 822,
    virtualAltitudeFeet: 2697,
    oxygenPercentage: 99,
    currentWaypoint: WAYPOINTS[0],
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      // Virtual altitude from 822m (Pokhara) to 4130m (ABC)
      const minAlt = 822;
      const maxAlt = 4130;
      const virtualAlt = Math.round(minAlt + (maxAlt - minAlt) * progress);
      const virtualFeet = Math.round(virtualAlt * 3.28084);

      // Oxygen calculation at altitude
      // Sea level: 100%, 4130m is approx 62.4%
      const o2 = Number((100 - (virtualAlt - 822) * (37.6 / (maxAlt - minAlt))).toFixed(1));

      // Determine nearest waypoint
      const waypointIndex = Math.min(
        Math.floor(progress * WAYPOINTS.length),
        WAYPOINTS.length - 1
      );
      const currentWaypoint = WAYPOINTS[waypointIndex] || WAYPOINTS[0];

      setTelemetry({
        scrollProgress: progress,
        virtualAltitude: virtualAlt,
        virtualAltitudeFeet: virtualFeet,
        oxygenPercentage: o2,
        currentWaypoint,
        isScrolled: scrollY > 60,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return telemetry;
}
