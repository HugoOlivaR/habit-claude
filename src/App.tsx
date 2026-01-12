import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Onboarding } from "./pages/Onboarding";
import { Insights } from "./pages/Insights";
import { Profile } from "./pages/Profile";
import { DragBar } from "./components/layout/DragBar";
import { useUserStore } from "./stores/useUserStore";
import { useTaskStore } from "./stores/useTaskStore";
import { useSettingsStore } from "./stores/useSettingsStore";
import { useTheme } from "./hooks/useTheme";

function AppContent() {
  const { user, isLoading: userLoading, initialize: initUser } = useUserStore();
  const { isLoading: taskLoading, initialize: initTasks } = useTaskStore();
  const { isLoading: settingsLoading, initialize: initSettings } = useSettingsStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useTheme();

  useEffect(() => {
    const init = async () => {
      await Promise.all([initUser(), initTasks(), initSettings()]);
      setIsInitialized(true);
    };
    init();
  }, [initUser, initTasks, initSettings]);

  const isLoading = !isInitialized || userLoading || taskLoading || settingsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const needsOnboarding = !user || !user.onboardingComplete;

  return (
    <Routes>
      <Route
        path="/"
        element={needsOnboarding ? <Navigate to="/onboarding" replace /> : <Home />}
      />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/insights"
        element={needsOnboarding ? <Navigate to="/onboarding" replace /> : <Insights />}
      />
      <Route
        path="/profile"
        element={needsOnboarding ? <Navigate to="/onboarding" replace /> : <Profile />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DragBar />
      <AppContent />
    </BrowserRouter>
  );
}
