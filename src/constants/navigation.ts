type NavLink = {
  id: string;
  href: string;
  canonicalPath: string;
  label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { id: "home", href: "/", canonicalPath: "/", label: "Home" },
  { id: "about", href: "/about/", canonicalPath: "/about", label: "About" },
  { id: "now", href: "/now/", canonicalPath: "/now", label: "Now" },
  { id: "blog", href: "/blog/", canonicalPath: "/blog", label: "Blog" },
  {
    id: "experiments",
    href: "/experimental/",
    canonicalPath: "/experimental",
    label: "Experiments",
  },
  {
    id: "contact",
    href: "/contact/",
    canonicalPath: "/contact",
    label: "Contact",
  },
];
