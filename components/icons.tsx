type IconProps = React.SVGProps<SVGSVGElement>;

const base = { width: 16, height: 16, "aria-hidden": true } as const;

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
      <path d="M5 7v4.5M5 4.75v.01M8 11.5V7m0 2.25C8 7.5 11 7 11 9.25v2.25" strokeLinecap="round" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" {...props}>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="m2 4 6 4.5L14 4" />
    </svg>
  );
}

export const socialIcons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
} as const;
