import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { u as useStore, g as getLevelTitle } from "./useStore-Z2mlBqQM.mjs";
import { r as readingPlan } from "./readingPlan-D2jIqtgV.mjs";
import { useState } from "react";
import "zustand";
import "zustand/middleware";
function Settings() {
  const {
    settings,
    updateSettings,
    resetProgress,
    streak,
    xp,
    getCompletedCount
  } = useStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const completedReadings = getCompletedCount();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-semibold text-[var(--charcoal)]", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-[var(--stone)] text-sm mt-1", children: "Customize your journey" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold text-[var(--charcoal)] mb-4", children: "Your Progress" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-[var(--parchment)] rounded-lg", children: [
          /* @__PURE__ */ jsx("span", { className: "block font-display text-2xl font-bold text-[var(--gold)]", children: xp.level }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--stone)]", children: getLevelTitle(xp.level) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-[var(--parchment)] rounded-lg", children: [
          /* @__PURE__ */ jsx("span", { className: "block font-display text-2xl font-bold text-[var(--navy)]", children: xp.total }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--stone)]", children: "Total XP" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-[var(--parchment)] rounded-lg", children: [
          /* @__PURE__ */ jsx("span", { className: "block font-display text-2xl font-bold text-[var(--rose)]", children: streak.longest }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--stone)]", children: "Best Streak" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-[var(--parchment)] rounded-lg", children: [
          /* @__PURE__ */ jsx("span", { className: "block font-display text-2xl font-bold text-[var(--sage)]", children: completedReadings }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--stone)]", children: "Readings Done" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold text-[var(--charcoal)] mb-4", children: "Reading Plan" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[var(--charcoal)] mb-2", children: "Starting Month" }),
        /* @__PURE__ */ jsx("select", { value: settings.startMonth, onChange: (e) => updateSettings({
          startMonth: parseInt(e.target.value)
        }), className: "w-full p-3 bg-[var(--parchment)] border border-[var(--gold)]/20 rounded-lg font-body text-[var(--charcoal)] focus:outline-none focus:border-[var(--gold)]", children: readingPlan.map((month) => /* @__PURE__ */ jsxs("option", { value: month.month, children: [
          month.name,
          " (Month ",
          month.month,
          ")"
        ] }, month.month)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[var(--charcoal)] mb-2", children: "Jump to Day" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("select", { value: settings.currentMonth, onChange: (e) => updateSettings({
            currentMonth: parseInt(e.target.value)
          }), className: "flex-1 p-3 bg-[var(--parchment)] border border-[var(--gold)]/20 rounded-lg font-body text-[var(--charcoal)] focus:outline-none focus:border-[var(--gold)]", children: readingPlan.map((month) => /* @__PURE__ */ jsx("option", { value: month.month, children: month.name }, month.month)) }),
          /* @__PURE__ */ jsx("select", { value: settings.currentDay, onChange: (e) => updateSettings({
            currentDay: parseInt(e.target.value)
          }), className: "w-24 p-3 bg-[var(--parchment)] border border-[var(--gold)]/20 rounded-lg font-body text-[var(--charcoal)] focus:outline-none focus:border-[var(--gold)]", children: [...Array(25)].map((_, i) => /* @__PURE__ */ jsxs("option", { value: i + 1, children: [
            "Day ",
            i + 1
          ] }, i + 1)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold text-[var(--charcoal)] mb-3", children: "About" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-[var(--stone)] mb-3", children: [
        "Scripture Journey uses the ",
        /* @__PURE__ */ jsx("strong", { children: "Navigators Bible Reading Plan" }),
        " — a 12-month plan with 25 daily readings across 4 scripture tracks."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--stone)]", children: "Read 4 passages daily from both Old and New Testament to experience the unity and variety of Scripture." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card p-5 border-[var(--rose)]/30", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold text-[var(--rose)] mb-3", children: "Reset Data" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--stone)] mb-4", children: "This will permanently delete all your progress, including streaks, XP, and achievements." }),
      !showResetConfirm ? /* @__PURE__ */ jsx(motion.button, { whileHover: {
        scale: 1.02
      }, whileTap: {
        scale: 0.98
      }, onClick: () => setShowResetConfirm(true), className: "w-full py-3 bg-[var(--parchment)] text-[var(--rose)] font-medium rounded-lg border border-[var(--rose)]/30 hover:bg-[var(--rose)]/10 transition-colors", children: "Reset All Progress" }) : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-center text-[var(--rose)] font-medium", children: "Are you sure? This cannot be undone." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(motion.button, { whileHover: {
            scale: 1.02
          }, whileTap: {
            scale: 0.98
          }, onClick: () => setShowResetConfirm(false), className: "flex-1 py-3 bg-[var(--parchment)] text-[var(--stone)] font-medium rounded-lg", children: "Cancel" }),
          /* @__PURE__ */ jsx(motion.button, { whileHover: {
            scale: 1.02
          }, whileTap: {
            scale: 0.98
          }, onClick: () => {
            resetProgress();
            setShowResetConfirm(false);
          }, className: "flex-1 py-3 bg-[var(--rose)] text-white font-medium rounded-lg", children: "Yes, Reset" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center text-xs text-[var(--stone)] pb-4", children: [
      /* @__PURE__ */ jsx("p", { children: "Scripture Journey v1.0" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Based on The Navigators Bible Reading Plan" })
    ] })
  ] });
}
export {
  Settings as component
};
