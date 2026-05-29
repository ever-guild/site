import React from 'react';
import type { IconType } from 'react-icons';
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

const iconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  x: FaXTwitter,
  telegram: FaTelegram,
  upwork: FaUpwork,
  email: FaEnvelope,
  mail: FaEnvelope,
  website: FaGlobe,
  default: FaLink,
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
      <Icon size={size} aria-hidden="true" focusable="false" />
    </a>
  );
});
