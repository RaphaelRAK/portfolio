"use client";

import posthog from "posthog-js";

interface Props {
  href: string;
  linkType: string;
  projectSlug: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function ProjectExternalLink({ href, linkType, projectSlug, className, style, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() =>
        posthog.capture("project_external_link_clicked", {
          link_type: linkType,
          project_slug: projectSlug,
          url: href,
        })
      }
    >
      {children}
    </a>
  );
}
