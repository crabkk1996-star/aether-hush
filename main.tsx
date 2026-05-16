@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --lake-blue: #2C82CC;
    --cloud-white: #F5FAFF;
    --deep-lake: #1A5A8F;
    --light-beach: #94C4E8;
    --warm-sand: #E8D4B9;
    --soft-mist: #F7FAFD;
    --deep-midnight: #162338;
    --muted-gray: #42566F;

    --font-heading: 'Cormorant', Georgia, serif;
    --font-body: 'Inter', system-ui, sans-serif;

    --ease-primary: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-smooth: cubic-bezier(0.45, 0.05, 0.55, 0.95);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  html {
    scroll-behavior: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-body);
    color: var(--muted-gray);
    background-color: var(--soft-mist);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 300;
  }

  ::selection {
    background-color: rgba(44, 130, 204, 0.2);
    color: var(--deep-midnight);
  }
}

@layer components {
  .grain-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.04;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }

  .waveform-bar {
    width: 2px;
    border-radius: 1px;
    background: linear-gradient(to top, rgba(232, 212, 185, 0.6), rgba(148, 196, 232, 0.8));
    animation: waveform-pulse 1.5s ease-in-out infinite;
    animation-play-state: paused;
  }

  .waveform-bar.playing {
    animation-play-state: running;
  }

  .nav-link-underline {
    position: relative;
  }

  .nav-link-underline::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: var(--light-beach);
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: transform 300ms var(--ease-primary);
  }

  .nav-link-underline:hover::after,
  .nav-link-underline.active::after {
    transform: translateX(-50%) scaleX(1);
  }
}

@layer utilities {
  .text-display-xl {
    font-size: clamp(56px, 8vw, 120px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  .text-display-l {
    font-size: clamp(36px, 5vw, 72px);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }

  .text-heading-m {
    font-size: clamp(24px, 3vw, 42px);
    font-weight: 300;
    line-height: 1.15;
  }

  .text-heading-s {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.3;
    letter-spacing: 0.02em;
  }

  .text-body-l {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.7;
    letter-spacing: 0.01em;
  }

  .text-body-m {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
  }

  .text-body-s {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.02em;
  }

  .text-label {
    font-size: 11px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
}

@keyframes waveform-pulse {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.6);
  }
}

@keyframes scroll-indicator {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(28px);
    opacity: 0;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Atmospheric player breathing */
@keyframes player-breathe {
  0%, 100% {
    opacity: 0.85;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.95;
    transform: translateX(-50%) scale(1.008);
  }
}

/* Card floating drift */
@keyframes float-drift {
  0%, 100% {
    transform: translateY(0);
  }
  33% {
    transform: translateY(-4px);
  }
  66% {
    transform: translateY(2px);
  }
}

/* Soft shimmer on borders */
@keyframes shimmer-soft {
  0% {
    opacity: 0.04;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.04;
  }
}

/* Light reflection drift */
@keyframes light-drift {
  0% {
    transform: translateX(-10%) translateY(0);
    opacity: 0;
  }
  20% {
    opacity: 0.06;
  }
  80% {
    opacity: 0.06;
  }
  100% {
    transform: translateX(110%) translateY(-20px);
    opacity: 0;
  }
}

/* Ultra-slow mist layer drift */
@keyframes mist-drift-1 {
  0% { transform: translateX(0) scale(1); }
  50% { transform: translateX(3%) scale(1.02); }
  100% { transform: translateX(0) scale(1); }
}

@keyframes mist-drift-2 {
  0% { transform: translateX(0) scale(1.02); }
  50% { transform: translateX(-2%) scale(1); }
  100% { transform: translateX(0) scale(1.02); }
}
