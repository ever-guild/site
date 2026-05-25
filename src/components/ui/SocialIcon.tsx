import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaTelegram,
  FaUpwork,
  FaEnvelope,
  FaGlobe,
  FaLink,
} from 'react-icons/fa6';
import './SocialIcon.scss';

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  github: FaGithub as unknown as React.FC<{ size?: number }>,
  linkedin: FaLinkedin as unknown as React.FC<{ size?: number }>,
  twitter: FaXTwitter as unknown as React.FC<{ size?: number }>,
  x: FaXTwitter as unknown as React.FC<{ size?: number }>,
  telegram: FaTelegram as unknown as React.FC<{ size?: number }>,
  upwork: FaUpwork as unknown as React.FC<{ size?: number }>,
  email: FaEnvelope as unknown as React.FC<{ size?: number }>,
  mail: FaEnvelope as unknown as React.FC<{ size?: number }>,
  website: FaGlobe as unknown as React.FC<{ size?: number }>,
  default: FaLink as unknown as React.FC<{ size?: number }>,
};

interface SocialIconProps {
  platform: string;
  url: string;
  label?: string;
  size?: number;
}

export const SocialIcon = React.memo(function SocialIcon({
  platform,
  url,
  label,
  size = 22,
}: SocialIconProps) {
  const Icon = iconMap[platform.toLowerCase()] || iconMap.default;
  const displayLabel = label || platform;

  return (
    <a
      href={url}
      className="social-icon"
      aria-label={`Ever Guild on ${displayLabel}`}
      target="_blank"
      rel="noopener noreferrer"
      title={displayLabel}
    >
      <Icon size={size} />
    </a>
  );
});
