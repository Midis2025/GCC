/** A single navigation destination. */
export interface NavItem {
  label: string;
  href: string;
  /** Short supporting copy, for mega-menu / footer descriptions. */
  description?: string;
  /** Forces target=_blank handling; otherwise inferred from the href. */
  external?: boolean;
  /** One level of nesting is supported by the nav components. */
  children?: NavItem[];
}

/** A titled cluster of links, used by the footer columns. */
export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Social / external profile link. `icon` is a key the UI maps to an SVG. */
export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}
