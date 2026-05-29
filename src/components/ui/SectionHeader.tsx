import React from "react";
import "./SectionHeader.scss";

interface SectionHeaderProps {
  title: React.ReactNode;
  lead?: React.ReactNode;
}

export const SectionHeader = React.memo(function SectionHeader({
  title,
  lead,
}: SectionHeaderProps) {
  return (
    <header className="sec-head">
      <h2 className="sec-head__title">{title}</h2>
      {lead && <p className="sec-head__lead">{lead}</p>}
    </header>
  );
});

export default SectionHeader;
