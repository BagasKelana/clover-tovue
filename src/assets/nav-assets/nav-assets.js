export const navItems = [
  {
    exact: true,
    to: "/",
    prependIcon: "mdi-format-list-bulleted",
    title: "All Task",
    value: "",
  },
  {
    exact: true,
    to: "/important",
    prependIcon: "mdi-star",
    title: "Important",
    value: "Important",
  },
  {
    exact: true,
    to: "/today",
    prependIcon: "mdi-calendar-today",
    title: "Today",
    value: "today",
  },
  {
    exact: true,
    to: "/overdue",
    prependIcon: "mdi-calendar-alert",
    title: "Overdue",
    value: "overdue",
  },
];
