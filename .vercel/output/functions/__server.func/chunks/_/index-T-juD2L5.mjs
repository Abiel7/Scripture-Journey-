import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { u as useStore, a as getXPProgress, g as getLevelTitle } from "./useStore-Z2mlBqQM.mjs";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { r as readingPlan } from "./readingPlan-D2jIqtgV.mjs";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { c as createLucideIcon } from "./router-oNKtQx0c.mjs";
import "zustand";
import "zustand/middleware";
import "@tanstack/react-router";
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$4);
const __iconNode$3 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$3);
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function ReadingCard({ reading, index, dateKey }) {
  const { completedReadings, completeReading, uncompleteReading, canCompleteReading, isViewingWithinGracePeriod } = useStore();
  const dayReadings = completedReadings[dateKey] || [];
  const isCompleted = dayReadings.includes(reading.id);
  const isOldTestament = index >= 2;
  const withinGracePeriod = isViewingWithinGracePeriod();
  const canComplete = canCompleteReading(index, dateKey);
  const isLocked = !isCompleted && (!withinGracePeriod || !canComplete);
  const isNextUp = withinGracePeriod && canComplete && !isCompleted;
  const handleToggle = () => {
    if (isLocked) return;
    if (isCompleted) {
      uncompleteReading(reading.id, dateKey);
    } else {
      completeReading(reading.id, dateKey);
    }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.08, duration: 0.3 },
      children: /* @__PURE__ */ jsx(
        Card,
        {
          onClick: handleToggle,
          className: cn(
            "p-4 transition-all duration-200",
            isLocked && "opacity-60 cursor-not-allowed",
            !isLocked && "cursor-pointer hover:shadow-md",
            isCompleted && "bg-primary/5 border-primary/30",
            isNextUp && "ring-2 ring-primary/30 shadow-sm"
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            isLocked ? /* @__PURE__ */ jsx("div", { className: "mt-1 h-6 w-6 rounded-full border-2 border-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(Lock, { className: "h-3 w-3 text-muted-foreground" }) }) : /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: isCompleted,
                onCheckedChange: handleToggle,
                disabled: isLocked,
                className: cn(
                  "mt-1 h-6 w-6 rounded-full border-2",
                  isCompleted && "bg-primary border-primary data-[state=checked]:bg-primary"
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: isOldTestament ? "secondary" : "default",
                    className: cn(
                      "text-xs font-medium",
                      isOldTestament ? "bg-[var(--sage)] hover:bg-[var(--sage)] text-white" : "bg-accent hover:bg-accent text-accent-foreground"
                    ),
                    children: isOldTestament ? "OT" : "NT"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: cn(
                  "font-display text-lg font-semibold truncate",
                  isLocked && "text-muted-foreground"
                ), children: reading.book }),
                isNextUp && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs text-primary border-primary/30", children: "Next" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: cn(
                "text-base",
                isCompleted || isLocked ? "text-muted-foreground" : "text-foreground"
              ), children: reading.passage }),
              isLocked && !withinGracePeriod && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1 italic", children: "Outside 3-day window (view only)" }),
              isLocked && withinGracePeriod && !canComplete && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1 italic", children: "Complete previous reading first" })
            ] }),
            isCompleted && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0 },
                animate: { opacity: 1, scale: 1 },
                className: "text-primary text-lg",
                children: "✦"
              }
            )
          ] })
        }
      )
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ProgressPrimitive.Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ProgressPrimitive.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function DailyReadings() {
  const { settings, navigateDay, completedReadings, isViewingToday, isViewingWithinGracePeriod, syncToToday } = useStore();
  const { currentMonth, currentDay, isCatchUpDay } = settings;
  useEffect(() => {
    syncToToday();
  }, [syncToToday]);
  const viewingToday = isViewingToday();
  const withinGracePeriod = isViewingWithinGracePeriod();
  const month = readingPlan[currentMonth - 1];
  const dayData = month?.days[currentDay - 1];
  if (!month || !dayData) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  const dateKey = `${currentMonth}-${currentDay}`;
  const dayReadings = completedReadings[dateKey] || [];
  const completedCount = dayReadings.length;
  const totalReadings = 4;
  const progressPercent = completedCount / totalReadings * 100;
  return /* @__PURE__ */ jsxs("div", { className: "page-enter space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          onClick: () => navigateDay("prev"),
          className: "rounded-full h-10 w-10",
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-semibold", children: month.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Day ",
          currentDay,
          " of 25",
          isCatchUpDay && viewingToday && /* @__PURE__ */ jsx("span", { className: "ml-1 text-primary", children: "(Catch-up)" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          onClick: () => navigateDay("next"),
          disabled: viewingToday,
          className: "rounded-full h-10 w-10",
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
        }
      )
    ] }),
    !viewingToday && /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        onClick: syncToToday,
        className: "w-full gap-2",
        children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
          "Return to Today"
        ]
      }
    ),
    !viewingToday && withinGracePeriod && /* @__PURE__ */ jsx(Card, { className: "bg-[var(--sage)]/10 border-[var(--sage)]/30", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 pb-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--sage)] font-medium", children: "Within 3-Day Grace Period" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "You can still complete these readings" })
    ] }) }),
    !withinGracePeriod && /* @__PURE__ */ jsx(Card, { className: "bg-muted/50 border-muted", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 pb-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Outside 3-Day Window" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "These readings can no longer be completed" })
    ] }) }),
    isCatchUpDay && viewingToday && /* @__PURE__ */ jsx(Card, { className: "bg-primary/5 border-primary/30", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 pb-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-medium", children: "Catch-up Day — No new readings today" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Use this time to complete any missed readings from Day 25" })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 pb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: viewingToday ? "Today's Progress" : "Day Progress" }),
        /* @__PURE__ */ jsxs("span", { className: "font-display font-semibold text-primary", children: [
          completedCount,
          "/",
          totalReadings
        ] })
      ] }),
      /* @__PURE__ */ jsx(Progress, { value: progressPercent, className: "h-2" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "ornament-divider text-xs mb-1", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "bg-accent/10 text-accent border-accent/30", children: "New Testament" }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          month.tracks.nt1,
          " • ",
          month.tracks.nt2
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "ornament-divider text-xs mb-1", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "bg-[var(--sage)]/10 text-[var(--sage)] border-[var(--sage)]/30", children: "Old Testament" }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          month.tracks.ot1,
          " • ",
          month.tracks.ot2
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: dayData.readings.map((reading, index) => /* @__PURE__ */ jsx(
      ReadingCard,
      {
        reading,
        index,
        dateKey
      },
      reading.id
    )) }),
    completedCount === totalReadings && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center",
        children: /* @__PURE__ */ jsxs(Card, { className: "inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-primary/30", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: "✨" }),
          /* @__PURE__ */ jsx("span", { className: "font-display text-primary font-semibold", children: "Perfect Day Complete!" }),
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: "✨" })
        ] })
      }
    )
  ] });
}
function StreakDisplay() {
  const { streak } = useStore();
  const hasStreak = streak.current > 0;
  return /* @__PURE__ */ jsx(Card, { className: "flex-1", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      className: "flex items-center gap-3",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: cn(
                "text-3xl",
                hasStreak ? "fire-icon" : "opacity-30 grayscale"
              ),
              animate: hasStreak ? { scale: [1, 1.08, 1] } : {},
              transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              },
              children: "🔥"
            }
          ),
          hasStreak && streak.current >= 7 && /* @__PURE__ */ jsx(Fragment, { children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute text-xs text-primary",
              initial: { opacity: 0 },
              animate: {
                opacity: [0, 1, 0],
                y: [0, -15],
                x: [0, (i - 1) * 6]
              },
              transition: {
                duration: 1.2,
                delay: i * 0.25,
                repeat: Infinity
              },
              style: { bottom: "100%", left: "50%" },
              children: "✦"
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "font-display text-2xl font-bold",
              initial: { scale: 1.3, color: "var(--gold)" },
              animate: { scale: 1, color: "var(--foreground)" },
              transition: { duration: 0.3 },
              children: streak.current
            },
            streak.current
          ),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "day streak" })
        ] }),
        streak.longest > 0 && streak.longest > streak.current && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-auto gap-1 text-muted-foreground", children: /* @__PURE__ */ jsxs("span", { children: [
          "Best: ",
          streak.longest
        ] }) })
      ]
    }
  ) }) });
}
function XPBar() {
  const { xp } = useStore();
  const progress = getXPProgress(xp.total, xp.level);
  const levelTitle = getLevelTitle(xp.level);
  const [showXPGain, setShowXPGain] = useState(false);
  const [lastXP, setLastXP] = useState(xp.todayEarned);
  useEffect(() => {
    if (xp.todayEarned > lastXP) {
      setShowXPGain(true);
      const timer = setTimeout(() => setShowXPGain(false), 1500);
      setLastXP(xp.todayEarned);
      return () => clearTimeout(timer);
    }
  }, [xp.todayEarned, lastXP]);
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 pb-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            children: /* @__PURE__ */ jsx("span", { className: "font-display text-lg font-bold text-primary-foreground", children: xp.level })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-display text-lg font-semibold", children: levelTitle }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Level ",
            xp.level
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right relative", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-lg font-semibold text-primary", children: progress.current }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground text-sm", children: [
          " / ",
          progress.required,
          " XP"
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: showXPGain && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: -20 },
            exit: { opacity: 0, y: -30 },
            className: "absolute right-0 bottom-full text-primary font-display font-bold xp-float",
            children: "+XP"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative h-3 rounded-full overflow-hidden bg-secondary", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 h-full rounded-full xp-shimmer",
        initial: { width: 0 },
        animate: { width: `${Math.min(progress.percentage, 100)}%` },
        transition: { duration: 0.8, ease: "easeOut" }
      }
    ) }),
    xp.todayEarned > 0 && /* @__PURE__ */ jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "mt-2 text-xs text-center text-[var(--sage)]",
        children: [
          "+",
          xp.todayEarned,
          " XP earned today ✦"
        ]
      }
    )
  ] }) });
}
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-display text-3xl font-semibold", children: [
        /* @__PURE__ */ jsx("span", { className: "illuminated-letter", children: "S" }),
        /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "cripture" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm italic", children: "Journey through the Word" })
    ] }),
    /* @__PURE__ */ jsx(StreakDisplay, {}),
    /* @__PURE__ */ jsx(XPBar, {}),
    /* @__PURE__ */ jsx("div", { className: "ornament-divider text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("span", { children: "Today's Readings" }) }),
    /* @__PURE__ */ jsx(DailyReadings, {})
  ] });
}
export {
  Home as component
};
