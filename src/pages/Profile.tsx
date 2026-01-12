import { useState } from "react";
import { User, Bell, Palette, ChevronRight, Check } from "lucide-react";
import { Header } from "../components/layout/Header";
import { BottomNav } from "../components/layout/BottomNav";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useUserStore } from "../stores/useUserStore";
import { useSettingsStore } from "../stores/useSettingsStore";
import { useTaskStore } from "../stores/useTaskStore";
import { Settings } from "../types";

export function Profile() {
  const { user, updateName } = useUserStore();
  const { settings, setTheme, toggleNotifications, updateCategoryNotification } =
    useSettingsStore();
  const { categories } = useTaskStore();

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  const handleUpdateName = async () => {
    if (newName.trim()) {
      await updateName(newName.trim());
      setIsNameModalOpen(false);
    }
  };

  const themeOptions: Array<{ value: Settings["theme"]; label: string }> = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-24">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>

        <Card className="mb-4">
          <button
            onClick={() => {
              setNewName(user?.name || "");
              setIsNameModalOpen(true);
            }}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-border)]/20 flex items-center justify-center">
                <User size={20} className="text-[var(--color-text-secondary)]" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium">Name</span>
                <p className="text-xs text-[var(--color-text-secondary)]">{user?.name}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[var(--color-text-secondary)]" />
          </button>
        </Card>

        <Card className="mb-4">
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-border)]/20 flex items-center justify-center">
                <Palette size={20} className="text-[var(--color-text-secondary)]" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium">Theme</span>
                <p className="text-xs text-[var(--color-text-secondary)] capitalize">
                  {settings.theme}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[var(--color-text-secondary)]" />
          </button>
        </Card>

        <Card>
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-border)]/20 flex items-center justify-center">
                <Bell size={20} className="text-[var(--color-text-secondary)]" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium">Notifications</span>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {settings.notificationsEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[var(--color-text-secondary)]" />
          </button>
        </Card>
      </div>

      <BottomNav onAddClick={() => {}} />

      <Modal isOpen={isNameModalOpen} onClose={() => setIsNameModalOpen(false)} title="Edit Name">
        <div className="space-y-4">
          <Input
            placeholder="Enter your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <Button fullWidth onClick={handleUpdateName} disabled={!newName.trim()}>
            Save
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} title="Theme">
        <div className="space-y-2">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value);
                setIsThemeModalOpen(false);
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-[var(--color-border)]/10 transition-colors"
            >
              <span className="text-sm">{option.label}</span>
              {settings.theme === option.value && (
                <Check size={18} className="text-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        title="Notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.notificationsEnabled
                  ? "bg-[var(--color-accent)]"
                  : "bg-[var(--color-border)]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.notificationsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {settings.notificationsEnabled && (
            <div className="space-y-3 pt-2 border-t border-[var(--color-border)]/20">
              <p className="text-xs text-[var(--color-text-secondary)]">
                Category reminder times
              </p>
              {categories.map((category) => {
                const notification = settings.categoryNotifications.find(
                  (n) => n.categoryId === category.id
                );

                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <span className="text-sm">{category.name}</span>
                    <input
                      type="time"
                      value={notification?.time || "09:00"}
                      onChange={(e) =>
                        updateCategoryNotification({
                          categoryId: category.id,
                          time: e.target.value,
                          enabled: true,
                        })
                      }
                      className="text-sm px-2 py-1 bg-[var(--color-border)]/10 rounded-md border-none outline-none"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
