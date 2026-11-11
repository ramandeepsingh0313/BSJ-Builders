"use client";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const eventName = "bsj-theme-change";
function subscribe(callback: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== "bsj-theme" && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
    callback();
  };
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", syncStorage);
  };
}
function getSnapshot() {
  try {
    const stored = localStorage.getItem("bsj-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch { /* Theme switching remains usable when storage is unavailable. */ }
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark");
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("bsj-theme", next); } catch { /* Optional persistence. */ }
    window.dispatchEvent(new Event(eventName));
  }
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
    <Sun className="theme-sun" size={19} strokeWidth={1.7} aria-hidden="true" />
    <Moon className="theme-moon" size={19} strokeWidth={1.7} aria-hidden="true" />
  </button>;
}
