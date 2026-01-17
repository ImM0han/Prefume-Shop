import React, { useState } from 'react';

const ShareButton = ({ product }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `Check out ${product.name} - ${product.shortDescription}`;

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
      setShowShareMenu(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareClick = async () => {
    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error occurred, show menu instead
        setShowShareMenu(!showShareMenu);
      }
    } else {
      // Fallback to custom share menu
      setShowShareMenu(!showShareMenu);
    }
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 w-full justify-center hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg" 
        onClick={handleShareClick}
      >
        <span className="text-xl">🔗</span>
        Share
      </button>
      
      {showShareMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-[998]" 
            onClick={() => setShowShareMenu(false)}
          ></div>
          <div className="absolute bottom-full left-0 right-0 bg-white rounded-lg shadow-xl p-2 mb-2 z-[999] md:bottom-auto md:mb-0 md:rounded-t-lg md:rounded-b-lg animate-slideUp md:animate-none">
            <button 
              className="flex items-center gap-3 w-full p-4 border-none bg-white text-left cursor-pointer rounded-lg transition-colors duration-200 text-base text-gray-800 hover:bg-gray-100" 
              onClick={shareToFacebook}
            >
              <span className="text-xl">📘</span>
              Facebook
            </button>
            <button 
              className="flex items-center gap-3 w-full p-4 border-none bg-white text-left cursor-pointer rounded-lg transition-colors duration-200 text-base text-gray-800 hover:bg-gray-100" 
              onClick={shareToTwitter}
            >
              <span className="text-xl">🐦</span>
              Twitter
            </button>
            <button 
              className="flex items-center gap-3 w-full p-4 border-none bg-white text-left cursor-pointer rounded-lg transition-colors duration-200 text-base text-gray-800 hover:bg-gray-100" 
              onClick={shareToWhatsApp}
            >
              <span className="text-xl">💬</span>
              WhatsApp
            </button>
            <button 
              className="flex items-center gap-3 w-full p-4 border-none bg-white text-left cursor-pointer rounded-lg transition-colors duration-200 text-base text-gray-800 hover:bg-gray-100" 
              onClick={copyToClipboard}
            >
              <span className="text-xl">📋</span>
              Copy Link
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;

