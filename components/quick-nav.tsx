const sections = [
  { href: "#content", label: "Каталог", icon: "01" },
  { href: "#metaBuilderTitle", label: "Build", icon: "02" },
  { href: "#patchRadar", label: "Patch", icon: "03" },
  { href: "#playerStats", label: "Тоглогч", icon: "04" },
];

export function QuickNav() {
  return (
    <nav className="quick-nav" aria-label="Хуудасны хэсгүүд">
      {sections.map((section) => (
        <a className="quick-nav-link" href={section.href} key={section.href}>
          <span className="quick-nav-icon" aria-hidden="true">
            {section.icon}
          </span>
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
