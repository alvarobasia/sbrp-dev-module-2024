"use client";

import * as React from "react";
import { Search, MapPinHouseIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CityResult } from "@/app/interfaces/CityResult";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function FloatingSearchBar() {
  const [query, setQuery] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const route = useRouter();

  const { data } = useQuery({
    queryKey: ["cities", searchValue],
    queryFn: async () => {
      if (query.length < 3) return [];

      const resultsCities: CityResult[] = await fetch(
        "/api/get-cities?q=" + searchValue
      ).then((res) => res.json());

      setIsOpen(resultsCities.length > 0);
      return resultsCities;
    },
  });

  const onClickCity = (city: CityResult) => {
    // add name in route
    route.push("dashboard/?city=" + city.name.split(",")[0]);
  };

  const handleSearch = () => setSearchValue(query);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    inputRef.current?.addEventListener("focus", () => {
      if (data && data.length > 0) setIsOpen(true);
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [data]);

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <div className="flex items-center gap-2 w-[440px]">
        <Input
          type="text"
          placeholder="Search frameworks..."
          className="pl-8"
          value={query}
          ref={inputRef}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button
          className="bg-white hover:bg-slate-100 group"
          onClick={() => handleSearch()}
        >
          <Search className=" h-5 w-5 text-muted-foreground group-hover:text-slate-500" />
        </Button>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1">
          <ScrollArea className="h-fit rounded-md border bg-background shadow-lg">
            {data && data.length > 0 ? (
              <ul className="p-4">
                {data.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center cursor-pointer py-2 px-2 hover:bg-accent hover:text-accent-foreground rounded-md text-sm"
                    onClick={() => onClickCity(item)}
                  >
                    <MapPinHouseIcon className="h-8 w-8 mr-2" />
                    {item.name.split(",")[0]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-muted-foreground">No results found.</p>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
