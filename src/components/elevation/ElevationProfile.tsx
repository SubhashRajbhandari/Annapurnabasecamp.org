import React, { useState } from 'react';
import { WAYPOINTS } from '../../data/elevationRoute';
import type { Waypoint } from '../../types/trek';
import { MapPin, Thermometer, Eye, Compass, Activity } from 'lucide-react';

export const ElevationProfile: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint>(WAYPOINTS[WAYPOINTS.length - 1]); // default ABC

  // Chart dimensions & scaling
  const chartWidth = 900;
  const chartHeight = 260;
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
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-3 shadow-xs">
          <Compass className="w-4 h-4 text-sky-600" />
          <span>Trail Topography & Altitude Map</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Altitude Route Profile
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Interactive vertical profile of the Annapurna Sanctuary route from Pokhara (822m) to Annapurna Base Camp (4,130m). Click any milestone along the trail to inspect walking distances, scenery, and acclimatization advice.
        </p>
      </div>

      {/* Main Interactive Elevation Visualization Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden border border-slate-200 shadow-sm">
        {/* SVG Curve Elevation Visualizer */}
        <div className="relative w-full overflow-x-auto pb-4">
          <div className="min-w-[750px] relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.20" />
                  <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                </linearGradient>

                <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="60%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* Threshold Lines */}
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
                      stroke="rgba(217, 119, 6, 0.4)"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                    />
                    <text x="35" y={y3000 - 6} fill="#B45309" fontSize="11" fontWeight="bold">
                      3,000m Altitude Threshold • Acclimatization Zone
                    </text>

                    <line
                      x1="30"
                      y1={y4000}
                      x2={chartWidth - 20}
                      y2={y4000}
                      stroke="rgba(2, 132, 199, 0.4)"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                    />
                    <text x="35" y={y4000 - 6} fill="#0369A1" fontSize="11" fontWeight="bold">
                      4,000m High Alpine Sanctuary Cirque
                    </text>
                  </>
                );
              })()}

              {/* Filled Area Gradient */}
              <path d={areaD} fill="url(#elevationGrad)" />

              {/* Topographic Curve Line */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#curveStroke)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Interactive Milestone Waypoint Nodes */}
              {points.map(({ x, y, wp }) => {
                const isCurrent = activeWaypoint.id === wp.id;
                return (
                  <g
                    key={wp.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveWaypoint(wp)}
                  >
                    <circle
                      cx={x}
                      y={y}
                      r={isCurrent ? 8 : 5}
                      className={`transition-all duration-200 ${
                        isCurrent
                          ? 'fill-amber-500 stroke-white stroke-[3]'
                          : 'fill-sky-600 group-hover:fill-amber-500 stroke-white stroke-2'
                      }`}
                    />
                    {isCurrent && (
                      <circle
                        cx={x}
                        y={y}
                        r={14}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className={`text-[11px] font-bold transition-all ${
                        isCurrent ? 'fill-slate-950 font-extrabold text-xs' : 'fill-slate-600 group-hover:fill-slate-900'
                      }`}
                    >
                      {wp.name}
                    </text>

                    <text
                      x={x}
                      y={y + 18}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-500 font-medium"
                    >
                      {wp.altitudeMeters}m
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Milestone Quick Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 uppercase shrink-0 mr-1">
            Trail Waypoints:
          </span>
          {WAYPOINTS.map((wp) => {
            const isCurrent = activeWaypoint.id === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => setActiveWaypoint(wp)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {wp.name} ({wp.altitudeMeters}m)
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Waypoint Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Cols: Details & Scenery */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
              DAY {activeWaypoint.dayNumber} OF EXPEDITION
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium">Distance from trailhead: {activeWaypoint.distanceKm} km</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            {activeWaypoint.name} — {activeWaypoint.altitudeMeters}m ({activeWaypoint.altitudeFeet.toLocaleString()}ft)
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {activeWaypoint.description}
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Mountain Views & Landmarks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeWaypoint.scenicViews.map((view, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  🏔️ {view}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Metrics & Temperatures */}
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3.5 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">
              Mountain Environmental Metrics
            </h4>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-600" /> Effective Oxygen:
              </span>
              <span className="font-bold text-slate-900">{activeWaypoint.oxygenSaturationEst}% sea-level</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" /> Average Temp:
              </span>
              <span className="font-bold text-slate-900">{activeWaypoint.avgTempDayNight}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Trail Highlight:
              </span>
              <span className="font-bold text-emerald-700">{activeWaypoint.statusHighlight}</span>
            </div>
          </div>

          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 text-xs text-sky-900 leading-relaxed">
            💡 <strong>Guide Note:</strong> Rest and hydration breaks are scheduled every 90 minutes. Our Sherpa guide team carries pulse oximeters for daily morning & evening health checks.
          </div>
        </div>
      </div>
    </section>
  );
};
