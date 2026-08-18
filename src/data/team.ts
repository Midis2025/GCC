export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public. Omit until a real photograph is supplied. */
  image?: string;
  bio?: string;
  linkedin?: string;
}

/**
 * ============================================================================
 * TEAM
 * ============================================================================
 * EMPTY BY DESIGN. No names, roles, photographs or biographies have been
 * supplied, and none may be invented.
 *
 * The About page checks this array: while it is empty the team section is not
 * rendered at all - no placeholder cards, no silhouette avatars, no "coming
 * soon" state. Add real entries here and the section appears automatically.
 */
export const team: TeamMember[] = [];

export function hasTeam(): boolean {
  return team.length > 0;
}
