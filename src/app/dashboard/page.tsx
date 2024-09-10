"use client";
import { Suspense, useEffect, useState } from "react";
import {
  Bell,
  Home,
  Users,
  MessageSquare,
  BarChart,
  Settings,
  Search,
  Menu,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeachBarComponent from "@/components/search-bar";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { getCityInDBAction } from "@/actions/getCityInDBAction";
import { CityResult } from "../interfaces/CityResult";

const LazyMap = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Component() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const routeParans = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      if (routeParans.get("city")) {
        console.log(routeParans.get("city"));
        const city = await getCityInDBAction(routeParans.get("city") as string);

        const cityResult: CityResult = {
          name: city?.displayName || city?.name || "",
          id: city?.nominatimId || 0,
          geometry: {
            type: "Polygon",
            coordinates: JSON.parse(city?.geometry || "[]").coordinates,
          },
        };

        setSelectedCity(cityResult);
      }
    }
    fetchData();
  }, [routeParans]);

  return (
    <div className="flex h-screen bg-background">
      {/* Left Aside Menu */}
      <aside
        className={`${isLeftMenuOpen ? "w-64" : "w-16"} border-r bg-muted/40 transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            {isLeftMenuOpen && (
              <h1 className="text-lg font-semibold">Dashboard</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}
            >
              {isLeftMenuOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-2 px-2">
              {[
                { icon: Home, label: "Home" },
                { icon: Users, label: "Friends" },
                { icon: MessageSquare, label: "Messages" },
                { icon: BarChart, label: "Analytics" },
                { icon: Settings, label: "Settings" },
              ].map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${!isLeftMenuOpen && "px-0"}`}
                  >
                    <item.icon
                      className={`h-4 w-4 ${isLeftMenuOpen && "mr-2"}`}
                    />
                    {isLeftMenuOpen && <span>{item.label}</span>}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:px-6 overflow-visible">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Suspense>
            <SeachBarComponent />
          </Suspense>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1  z-0">
          <LazyMap polygon={selectedCity?.geometry.coordinates} />
        </div>
      </main>

      {/* Right Account Info Sidebar */}
      <aside
        className={`${isRightMenuOpen ? "w-64" : "w-16"} border-l bg-muted/40 transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsRightMenuOpen(!isRightMenuOpen)}
            >
              {isRightMenuOpen ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            {isRightMenuOpen && (
              <h2 className="text-lg font-semibold">Account</h2>
            )}
          </div>
          <div className="flex-1 overflow-auto py-4">
            {isRightMenuOpen ? (
              <div className="flex flex-col items-center space-y-4 px-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">@johndoe</p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <span>Posts</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Followers</span>
                    <span className="font-semibold">10,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Following</span>
                    <span className="font-semibold">567</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
