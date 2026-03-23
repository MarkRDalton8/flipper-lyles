"use client";

import { useState } from "react";
import { GameGuide } from "@/lib/types";

interface FindThisGameProps {
  game: GameGuide;
}

interface Location {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  distance: number;
  machines: Array<{
    id: number;
    name: string;
  }>;
}

export default function FindThisGame({ game }: FindThisGameProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!game.pinball_map) {
    return null;
  }

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!hasSearched) {
        requestLocation();
      }
    } else {
      setIsOpen(false);
    }
  };

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocations(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setLoading(false);
          setError("Location permission denied. Please enable location access or enter your zip code.");
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by your browser.");
    }
  };

  const fetchLocations = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const machineIds = game.pinball_map!.machine_ids;
      const allLocations: Location[] = [];

      // Fetch locations for each machine ID
      for (const machineId of machineIds) {
        const res = await fetch(
          `https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${lat}&lon=${lon}&by_machine_id=${machineId}&max_distance=50&send_all_within_distance=1`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch from Pinball Map");
        }

        const data = await res.json();

        if (data.locations && Array.isArray(data.locations)) {
          allLocations.push(...data.locations);
        }
      }

      // Deduplicate by location ID and sort by distance
      const uniqueLocations = Array.from(
        new Map(allLocations.map((loc) => [loc.id, loc])).values()
      ).sort((a, b) => a.distance - b.distance);

      setLocations(uniqueLocations.slice(0, 10));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Couldn't reach Pinball Map. Try again or search directly on pinballmap.com.");
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between font-oswald text-2xl text-gold hover:text-orange transition-colors mb-4"
      >
        <span className="flex items-center gap-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Find {game.title} Near You
        </span>
        <span className="text-txt2">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div>
          {loading && (
            <div className="text-txt2 py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
              <p className="mt-4">Searching for {game.title} machines nearby...</p>
            </div>
          )}

          {error && (
            <div className="bg-danger border border-red rounded-lg px-6 py-4 mb-6">
              <p className="text-txt2">{error}</p>
            </div>
          )}

          {!loading && !error && hasSearched && locations.length === 0 && (
            <div className="text-txt2 mb-6">
              <p>No {game.title} machines found within 50 miles.</p>
              <a
                href={`https://pinballmap.com/map?by_machine_id=${game.pinball_map!.machine_ids[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-orange transition-colors"
              >
                Try expanding your search on Pinball Map →
              </a>
            </div>
          )}

          {!loading && locations.length > 0 && (
            <div className="space-y-3 mb-6">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-card border border-border rounded-lg px-5 py-4 hover:border-gold transition-colors"
                >
                  <a
                    href={`https://pinballmap.com/map?by_location_id=${location.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-oswald text-lg text-gold hover:text-orange transition-colors block mb-1"
                  >
                    {location.name} →
                  </a>
                  <p className="text-txt2 text-sm">
                    {location.street}, {location.city}, {location.state} {location.zip}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-orange font-mono">{location.distance.toFixed(1)} mi</span>
                    {location.machines && location.machines.length > 0 && (
                      <span className="text-txt2">
                        {location.machines.map((m) => m.name).join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-txt2 text-sm border-t border-border pt-4">
            <p>
              Location data provided by{" "}
              <a
                href="https://pinballmap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-orange transition-colors"
              >
                Pinball Map
              </a>{" "}
              — a free, community-maintained pinball locator. Help keep it accurate by updating
              machines at locations you visit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
