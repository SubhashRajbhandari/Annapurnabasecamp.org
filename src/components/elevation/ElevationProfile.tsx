import React, { useState } from 'react';
import { WAYPOINTS } from '../../data/elevationRoute';
import type { Waypoint } from '../../types/trek';
import { Mountain, MapPin, Gauge, Thermometer, Wind, Eye, Compass } from 'lucide-react';

export const ElevationProfile: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint>(WAYPOINTS[WAYPOINTS.length - 1]); // default ABC

  // Chart dimensions & scaling
  const chartWidth = 900;
  const chartHeight = 280;
  const minAlt = 600;
  const maxAlt = 4400;

  // Calculate coordinates for SVG path
  const points = WAYPOINTS.map((wp, idx) => {
    const x = (idx / (WAYPOINTS.length - 1)) * (chartWidth - 80) + 40;
    const y = chartHeight - ((wp.altitudeMeters - minAlt) / (maxAlt - minAlt)) * (chartHeight - 60) - 30;
    return { x, y, wp };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <section id="elevation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono mb-3 shadow-xs font-bold">
          <Compass className="w-4 h-4 text-sky-600" />
          <span>TOPOGRAPHIC TELEMETRY & ROUTE VECTOR</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
          ALTITUDE ELEVATION PROFILE
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-medium">
          Interactive vertical profile of the Annapurna Sanctuary route from Pokhara (822m) to Annapurna Base Camp (4,130m). Select any waypoint to inspect physiological telemetry, terrain metrics, and scenic landmarks.
        </p>
      </div>

      {/* Main Interactive Elevation Visualization Card */}
      <div className="glass-panel hud-border rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden bg-white/95 border border-sky-200/90 shadow-lg">
        {/* SVG Curve Elevation Visualizer */}
        <div className="relative w-full overflow-x-auto pb-4">
          <div className="min-w-[750px] relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                </linearGradient>

                <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="70%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>

              {/* Threshold Lines: 3000m (Acclimatization line) */}
              {(() => {
                const y3000 = chartHeight - ((3000 - minAlt) / (maxAlt - minAlt)) * (chartHeight - 60) - 30;
                const y4000 = chartHeight - ((4000 - minAlt) / (maxAlt - minAlt)) * (chartHeight - 60) - 30;
                return (
                  <>
                    <line
                      x1="30"
                      y1={y3000}
                      x2={chartWidth - 20}
                      y2={y3000}
                      stroke="rgba(245, 158, 11, 0.45)"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                    />
                    <text x="35" y={y3000 - 6} fill="#D97706" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      3,000M THRESHOLD // ACCLIMATIZATION STAGE
                    </text>

                    <line
                      x1="30"
                      y1={y4000}
                      x2={chartWidth - 20}
                      y2={y4000}
                      stroke="rgba(2, 132, 199, 0.45)"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                    />
                    <text x="35" y={y4000 - 6} fill="#0284C7" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      4,000M THRESHOLD // SANCTUARY CIRQUE
                    </text>
                  </>
                );
              })()}

              {/* Filled Elevation Area */}
              <path d={areaD} fill="url(#elevationGrad)" />

              {/* Elevation Line */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#curveStroke)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Waypoint Markers */}
              {points.map(({ x, y, wp }) => {
                const isSelected = activeWaypoint.id === wp.id;
                return (
                  <g
                    key={wp.id}
                    onClick={() => setActiveWaypoint(wp)}
                    className="cursor-pointer group"
                  >
                    {/* Vertical connecting line */}
                    <line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={chartHeight - 10}
                      stroke={isSelected ? '#0284C7' : 'rgba(2, 132, 199, 0.2)'}
                      strokeWidth={isSelected ? '2' : '1'}
                      strokeDasharray={isSelected ? 'none' : '2 2'}
                    />

                    {/* Outer Glow Halo */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="rgba(2, 132, 199, 0.2)"
                        className="animate-ping"
                      />
                    )}

                    {/* Point Circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '8' : '5'}
                      fill={isSelected ? '#0284C7' : '#FFFFFF'}
                      stroke={isSelected ? '#FFFFFF' : '#0284C7'}
                      strokeWidth={isSelected ? '3' : '2'}
                      className="transition-all duration-200 group-hover:scale-125 shadow-sm"
                    />

                    {/* Node label */}
                    <text
                      x={x}
                      y={chartHeight + 14}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="monospace"
                      fill={isSelected ? '#0284C7' : '#475569'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {wp.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Waypoint Telemetry Drawer */}
        <div className="mt-6 pt-6 border-t border-sky-100 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Waypoint Main Header */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-sky-100 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
                DAY {activeWaypoint.dayNumber} OF EXPEDITION
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {activeWaypoint.distanceKm} KM FROM TRAILHEAD
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-1 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-sky-600 shrink-0" />
              <span>{activeWaypoint.name}</span>
            </h3>
            <div className="text-sm text-sky-700 font-mono font-bold mb-3">
              {activeWaypoint.coordinates}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
              {activeWaypoint.description}
            </p>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 font-mono font-bold shadow-2xs">
              Status: {activeWaypoint.statusHighlight}
            </div>
          </div>

          {/* Middle: Physiological & Mountain Metrics */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-3 font-mono">
            <div className="bg-sky-50/70 rounded-2xl p-3.5 border border-sky-200 shadow-xs">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-semibold">
                <Mountain className="w-3.5 h-3.5 text-sky-600" />
                <span>Exact Altitude</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-950">
                {activeWaypoint.altitudeMeters.toLocaleString()} m
              </div>
              <div className="text-[11px] text-sky-700 font-bold">
                {activeWaypoint.altitudeFeet.toLocaleString()} ft ASL
              </div>
            </div>

            <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200 shadow-xs">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-semibold">
                <Gauge className="w-3.5 h-3.5 text-amber-600" />
                <span>O₂ Availability</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-700">
                {activeWaypoint.oxygenSaturationEst}%
              </div>
              <div className="text-[11px] text-slate-500">
                vs Sea Level (100%)
              </div>
            </div>

            <div className="bg-sky-50/70 rounded-2xl p-3.5 border border-sky-200 shadow-xs">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-semibold">
                <Thermometer className="w-3.5 h-3.5 text-sky-600" />
                <span>Day / Night Temp</span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-950">
                {activeWaypoint.avgTempDayNight}
              </div>
              <div className="text-[11px] text-sky-700 font-semibold">
                Seasonal Average
              </div>
            </div>

            <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200 shadow-xs">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-semibold">
                <Wind className="w-3.5 h-3.5 text-emerald-600" />
                <span>Barometric Zone</span>
              </div>
              <div className="text-base sm:text-lg font-black text-emerald-700">
                {activeWaypoint.altitudeMeters > 3000 ? 'High Alpine' : 'Sub-Tropical'}
              </div>
              <div className="text-[11px] text-slate-500">
                Pressure Tier
              </div>
            </div>
          </div>

          {/* Right: Key Sights & Sensation highlights */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-4 border border-sky-200 shadow-xs">
            <div className="text-xs font-mono text-sky-800 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Panoramic Peaks & Landmarks</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {activeWaypoint.scenicViews.map((view, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span className="font-medium">{view}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Trail surface: Stone stairs / Glacier</span>
              <span className="text-sky-700 font-bold">TIMS Sector 2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
