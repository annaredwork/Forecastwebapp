import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
      
      // Show banner after a short delay
      setTimeout(() => {
        setShowBanner(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
      setShowBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
    setShowBanner(false);
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <>
      {/* Install Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <div 
              className="relative backdrop-blur-xl rounded-2xl p-4 shadow-2xl border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.9) 0%, rgba(236, 72, 153, 0.9) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseBanner}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>

              <div className="flex items-center gap-4">
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 50%, #F59E0B 100%)'
                  }}
                >
                  ✨
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">
                    Install App
                  </h3>
                  <p className="text-white/90 text-sm">
                    Add to home screen for quick access!
                  </p>
                </div>

                {/* Install button */}
                <button
                  onClick={handleInstallClick}
                  className="bg-white text-purple-600 font-bold px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Install Button (bottom right) */}
      {!showBanner && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleInstallClick}
          className="fixed bottom-6 right-6 z-50 backdrop-blur-xl rounded-full p-4 shadow-2xl border-2"
          style={{
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.9) 0%, rgba(236, 72, 153, 0.9) 100%)',
            borderColor: 'rgba(255, 255, 255, 0.3)'
          }}
          title="Install App"
        >
          <Download className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </>
  );
}
