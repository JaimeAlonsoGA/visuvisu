import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { classIds } from "./species";

export interface Settings {
  /** Show the common name under each exam image as a hint. */
  showCommonName: boolean;
  /** Class ids included in the exam. */
  examClasses: number[];
}

const DEFAULTS: Settings = { showCommonName: true, examClasses: classIds };
const STORAGE_KEY = "visu.settings.v1";

const SettingsContext = createContext<{
  settings: Settings;
  ready: boolean;
  update: (patch: Partial<Settings>) => void;
}>({ settings: DEFAULTS, ready: false, update: () => {} });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<Settings>;
        // Drop class ids that no longer exist after a data update.
        const examClasses = saved.examClasses?.filter((id) => classIds.includes(id));
        setSettings({
          ...DEFAULTS,
          ...saved,
          examClasses: examClasses?.length ? examClasses : DEFAULTS.examClasses,
        });
      })
      .catch((e) => console.warn("Could not load settings", e))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch((e) =>
      console.warn("Could not save settings", e)
    );
  }, [settings, ready]);

  const update = useCallback((patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch })), []);

  const value = useMemo(() => ({ settings, ready, update }), [settings, ready, update]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
