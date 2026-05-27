"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Moon : theme === "dark" ? Monitor : Sun;

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
