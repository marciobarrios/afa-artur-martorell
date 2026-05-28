"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? theme : "system";
  const nextTheme = activeTheme === "light" ? "dark" : activeTheme === "dark" ? "system" : "light";
  const Icon = activeTheme === "light" ? Moon : activeTheme === "dark" ? Monitor : Sun;

  return (
    <Button
      aria-label="Canvia el tema"
      size="icon"
      variant="ghost"
      onClick={() => setTheme(nextTheme)}
      type="button"
    >
      <Icon aria-hidden="true" />
    </Button>
  );
}
