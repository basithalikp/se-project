/**
 * Border Glow Effect - Interactive cursor-tracking glow for cards and tables
 * Inspired by ReactBits border-glow component
 */

const EDGE_SENSITIVITY = 50; // How close to edge before glow activates
// eslint-disable-next-line no-unused-vars
const GLOW_RADIUS = 600; // Size of glow effect

export const initBorderGlow = () => {
  const glowElements = document.querySelectorAll('.card, .table');
  
  glowElements.forEach(element => {
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
};

const handleMouseMove = (event) => {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  
  // Calculate distance to nearest edge
  const distToTop = event.clientY - rect.top;
  const distToBottom = rect.bottom - event.clientY;
  const distToLeft = event.clientX - rect.left;
  const distToRight = rect.right - event.clientX;
  
  const minDist = Math.min(distToTop, distToBottom, distToLeft, distToRight);
  
  // Only activate glow when near edges
  if (minDist < EDGE_SENSITIVITY) {
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    element.style.setProperty('--mouse-x', `${x}%`);
    element.style.setProperty('--mouse-y', `${y}%`);
    element.classList.add('glow');
  } else {
    element.classList.remove('glow');
  }
};

const handleMouseLeave = (event) => {
  const element = event.currentTarget;
  element.classList.remove('glow');
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBorderGlow);
} else {
  initBorderGlow();
}

// Re-initialize when components mount (useful for React apps)
export const reinitBorderGlow = () => {
  initBorderGlow();
};
