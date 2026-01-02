import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, HeadContent, Outlet, Scripts, useLocation, Link } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { forwardRef, createElement } from "react";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$3 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const navItems = [
  { path: "/", icon: BookOpen, label: "Read" },
  { path: "/progress", icon: Map, label: "Journey" },
  { path: "/achievements", icon: Award, label: "Badges" },
  { path: "/settings", icon: Settings, label: "Settings" }
];
function Navigation() {
  const location = useLocation();
  return /* @__PURE__ */ jsx("nav", { className: "nav-bottom fixed bottom-0 left-0 right-0 px-4 py-2 z-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-lg mx-auto flex items-center justify-around", children: navItems.map((item) => {
    const isActive = location.pathname === item.path;
    const Icon2 = item.icon;
    return /* @__PURE__ */ jsxs(
      Link,
      {
        to: item.path,
        className: `nav-item flex flex-col items-center gap-1 px-4 py-2 rounded-lg ${isActive ? "active" : "text-[var(--stone)]"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Icon2, { className: "w-6 h-6" }),
            isActive && /* @__PURE__ */ jsx(
              motion.div,
              {
                layoutId: "nav-indicator",
                className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--gold)]",
                transition: { type: "spring", stiffness: 500, damping: 30 }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: item.label })
        ]
      },
      item.path
    );
  }) }) });
}
const appCss = "/assets/styles-C4Kfw6Qk.css";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      },
      {
        name: "theme-color",
        content: "#FAF7F2"
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default"
      },
      {
        title: "Scripture Journey — Bible Reading Tracker"
      },
      {
        name: "description",
        content: "Track your daily Bible reading with the Navigators reading plan. Earn XP, maintain streaks, and unlock achievements."
      }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "manifest",
        href: "/manifest.json"
      },
      {
        rel: "apple-touch-icon",
        href: "/icon-192.png"
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen pb-20", children: [
        /* @__PURE__ */ jsx("main", { className: "main-content max-w-lg mx-auto px-4 py-6", children: /* @__PURE__ */ jsx(Outlet, {}) }),
        /* @__PURE__ */ jsx(Navigation, {})
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./settings-DkQTOu69.mjs");
const Route$3 = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./progress-ClcW6iJi.mjs");
const Route$2 = createFileRoute("/progress")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./achievements-BoDUMW1Y.mjs");
const Route$1 = createFileRoute("/achievements")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-T-juD2L5.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$3.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$4
});
const ProgressRoute = Route$2.update({
  id: "/progress",
  path: "/progress",
  getParentRoute: () => Route$4
});
const AchievementsRoute = Route$1.update({
  id: "/achievements",
  path: "/achievements",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AchievementsRoute,
  ProgressRoute,
  SettingsRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
const routerONKtQx0c = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getRouter
});
export {
  createLucideIcon as c,
  routerONKtQx0c as r
};
