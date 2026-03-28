"use client";

import { useState } from "react";

export default function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="hero-photo-wrap">
      <div className="hero-photo-ring hero-photo-ring-outer" />
      <div className="hero-photo-ring hero-photo-ring-inner" />
      <div className="hero-photo-frame">
        {failed ? (
          <div className="hero-photo-fallback">NK</div>
        ) : (
          <img
            src="/profile.jpg"
            alt="Neeraja Khanapure"
            className="hero-photo"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
