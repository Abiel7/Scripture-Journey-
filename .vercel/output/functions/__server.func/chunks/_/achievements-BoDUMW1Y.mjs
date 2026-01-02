import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { u as useStore } from "./useStore-Z2mlBqQM.mjs";
import "zustand";
import "zustand/middleware";
function AchievementBadge({ achievement, index = 0 }) {
  const { unlocked, name, description, icon, unlockedDate } = achievement;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.4 },
      className: `card p-4 text-center ${!unlocked ? "achievement-locked" : ""}`,
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "text-4xl mb-2",
            whileHover: unlocked ? { scale: 1.2, rotate: [0, -10, 10, 0] } : {},
            transition: { duration: 0.3 },
            children: icon
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-base font-semibold text-(--charcoal) mb-1", children: name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-(--stone) mb-2", children: description }),
        unlocked ? /* @__PURE__ */ jsxs("div", { className: "text-xs text-(--gold) font-medium", children: [
          "✦ Unlocked ",
          unlockedDate ? new Date(unlockedDate).toLocaleDateString() : ""
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-xs text-(--stone)", children: "🔒 Locked" })
      ]
    }
  );
}
function AchievementGrid({ achievements }) {
  const grouped = {
    streak: achievements.filter((a) => a.type === "streak"),
    readings: achievements.filter((a) => a.type === "readings"),
    level: achievements.filter((a) => a.type === "level"),
    special: achievements.filter((a) => a.type === "special")
  };
  const sections = [
    { title: "Streak Milestones", key: "streak", icon: "🔥" },
    { title: "Reading Goals", key: "readings", icon: "📖" },
    { title: "Level Achievements", key: "level", icon: "⭐" },
    { title: "Special Badges", key: "special", icon: "✨" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "space-y-8", children: sections.map((section) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "ornament-divider mb-4", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-sm font-display font-semibold text-[var(--charcoal)]", children: [
      /* @__PURE__ */ jsx("span", { children: section.icon }),
      section.title
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: grouped[section.key].map((achievement, index) => /* @__PURE__ */ jsx(
      AchievementBadge,
      {
        achievement,
        index
      },
      achievement.id
    )) })
  ] }, section.key)) });
}
function Achievements() {
  const {
    achievements
  } = useStore();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-semibold text-[var(--charcoal)]", children: "Achievements" }),
      /* @__PURE__ */ jsx("p", { className: "text-[var(--stone)] text-sm mt-1", children: "Badges earned on your journey" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card p-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "🏆" }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-3xl font-bold text-[var(--gold)]", children: unlockedCount }),
        /* @__PURE__ */ jsxs("span", { className: "text-[var(--stone)] text-xl", children: [
          "/ ",
          totalCount
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--stone)]", children: "badges unlocked" }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 bg-[var(--parchment)] rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]", style: {
        width: `${unlockedCount / totalCount * 100}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsx(AchievementGrid, { achievements })
  ] });
}
export {
  Achievements as component
};
