import React from 'react';

const WhatsappBubble = () => {
  const href = `https://wa.me/254714752613?text=${encodeURIComponent('Hello Amazon Filtration (K) Ltd, I need assistance.')}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.41c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.58.13-.17.26-.67.86-.82 1.04-.15.17-.3.2-.56.07-.26-.13-1.07-.39-2.05-1.24-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.39-.8-1.9-.21-.5-.42-.43-.58-.43-.15 0-.32-.02-.49-.02-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.81 2.77 4.39 3.89.61.26 1.08.41 1.45.53.61.19 1.16.16 1.6.1.49-.07 1.55-.63 1.77-1.25.22-.62.22-1.15.15-1.25-.06-.1-.24-.16-.5-.29z"/>
        <path d="M16 3c-7.18 0-13 5.82-13 13 0 2.29.6 4.45 1.65 6.31L3 29l6.85-1.79C11.61 28.4 13.72 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23c-2.12 0-4.09-.62-5.75-1.68l-.41-.26-4.06 1.06 1.08-3.96-.27-.41C5.53 19.11 5 17.61 5 16 5 9.92 9.92 5 16 5s11 4.92 11 11-4.92 10-11 10z"/>
      </svg>
    </a>
  );
};

export default WhatsappBubble;
