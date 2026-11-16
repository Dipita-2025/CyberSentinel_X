import React from "react";

function Footer() {
  return (
    <footer className="mx-auto border-t border-(--border) bg-(--bg) flex w-full flex-col gap-8 px-20 py-16 text-caption text-(--text-muted) sm:flex-row sm:items-center sm:justify-between sm:px-32 lg:px-48">
      <p>© {new Date().getFullYear()} CyberSentinel X</p>
      <p className="inline-flex items-center gap-6">
        CyberSentinel / Intelligent trust. Explicit access.
      </p>
    </footer>
  );
}

export default Footer;
