import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower trailing cursor
  const trailConfig = { damping: 30, stiffness: 150, mass: 1 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  const createRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    setClickRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setClickRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      createRipple(e.clientX, e.clientY);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Hide native cursor
    document.body.style.cursor = 'none';
    
    // Add cursor-none to all interactive elements
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY, createRipple]);

  if (!isVisible) return null;

  return (
    <>
      {/* Click ripples */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
            }}
          >
            <div className="w-12 h-12 rounded-full border-2 border-primary" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary/30 via-orange-500/20 to-primary/30 rounded-full blur-xl" />
        </motion.div>
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.15, type: "spring", stiffness: 400 }}
        >
          {/* Inner dot */}
          <motion.div 
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              backgroundColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--primary))",
            }}
          />
          
          {/* Outer ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-primary/60 rounded-full"
            animate={{
              width: isHovering ? 48 : 32,
              height: isHovering ? 48 : 32,
              opacity: isHovering ? 1 : 0.5,
              borderRadius: isHovering ? "12px" : "50%",
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Hover indicator dots */}
          {isHovering && (
            <>
              {[0, 90, 180, 270].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(20px)`,
                  }}
                  transition={{ delay: angle / 1000 }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Secondary trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-primary/20 rounded-full"
          animate={{
            scale: isClicking ? 1.5 : isHovering ? 2.5 : 1.5,
            opacity: isHovering ? 0.3 : 0.2,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
