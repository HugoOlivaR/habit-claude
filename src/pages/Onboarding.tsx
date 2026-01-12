import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ListTodo, Bell, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useUserStore } from "../stores/useUserStore";

const SLIDES = [
  {
    icon: CheckCircle2,
    title: "Track Your Habits",
    description:
      "Create daily, weekly, or custom habits and watch your progress grow over time.",
  },
  {
    icon: ListTodo,
    title: "Organize by Time",
    description:
      "Group your tasks into Morning, Workload, and Night categories for better focus.",
  },
  {
    icon: Bell,
    title: "Stay on Track",
    description:
      "Set reminders for your habits and never miss an important task again.",
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { user, setUser, completeOnboarding } = useUserStore();
  const [step, setStep] = useState<"welcome" | "slides" | "name">(
    user ? "slides" : "welcome"
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState("");

  const handleGetStarted = () => {
    setStep("slides");
  };

  const handleNextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setStep("name");
    }
  };

  const handleComplete = async () => {
    if (name.trim()) {
      await setUser(name.trim());
      await completeOnboarding();
      navigate("/");
    }
  };

  if (step === "welcome") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-12">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Sparkles size={40} className="text-[var(--color-background)]" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">
            Welcome to DailyHabit!
          </h1>
          <p className="text-[var(--color-text-secondary)] text-center max-w-xs">
            A simple, joyful way to take control of your time and routines
          </p>
        </div>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={handleGetStarted}>
            Get Started
          </Button>
          {user && (
            <button
              onClick={() => navigate("/")}
              className="w-full text-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              Already a user? Log in
            </button>
          )}
        </div>
      </div>
    );
  }

  if (step === "slides") {
    const slide = SLIDES[currentSlide];
    const Icon = slide.icon;

    return (
      <div className="min-h-screen flex flex-col px-8 pt-20 pb-12">
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-16 h-16 bg-[var(--color-border)]/20 rounded-2xl flex items-center justify-center mb-6">
            <Icon size={32} className="text-[var(--color-text-primary)]" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">
            {slide.title}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-center max-w-xs">
            {slide.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {SLIDES.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-border)]"
                }`}
              />
            ))}
          </div>
          <Button fullWidth onClick={handleNextSlide}>
            {currentSlide < SLIDES.length - 1 ? "Next" : "Continue"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-8 pt-20 pb-12">
      <div className="flex-1 flex flex-col justify-center animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">What's your name?</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We'll use this to personalize your experience
        </p>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleComplete()}
        />
      </div>

      <Button fullWidth onClick={handleComplete} disabled={!name.trim()}>
        Complete Setup
      </Button>
    </div>
  );
}
