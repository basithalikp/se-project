# Border Glow Effect - ReactBits Implementation

## Overview

Added interactive border glow effects to all `.card` and `.table` elements inspired by [ReactBits border-glow component](https://reactbits.dev/components/border-glow). The effect creates an elegant glowing border that follows your cursor when you move near the edges of cards and tables.

## Features

### 1. **Interactive Cursor Tracking**
- Glow activates when cursor is within 50px of the element edge
- Radial gradient glow follows mouse position
- Smooth fade in/out transitions

### 2. **Animated Border Pulse**
- Continuous subtle pulsing animation on all edges (3s cycle)
- Increases visibility on hover
- Green (#2ecc71) and cyan (#06b6d4) gradient border

### 3. **Dark Glassmorphism Integration**
- Works seamlessly with existing glass surface effects
- Maintains dark theme aesthetic
- Enhanced shadow depth with glow

## Implementation Details

### CSS Components

#### Card Border Glow
```css
.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  /* Radial gradient that follows cursor */
  radial-gradient(600px at var(--mouse-x, 0%) var(--mouse-y, 0%), ...)
}

.card::after {
  /* Animated pulsing border */
  animation: borderGlowPulse 3s ease-in-out infinite;
}
```

#### Table Border Glow
```css
.table {
  position: relative;
}

.table::before {
  /* Interactive cursor-tracking glow */
}

.table::after {
  /* Pulsing animated border */
}
```

### Animation Keyframes

**borderGlowPulse** - 3-second cycle that makes the border glow subtly pulsate:
```
0%, 100%  → opacity: 0.3
50%       → opacity: 0.8
```

### JavaScript Handler

**borderGlow.js** - Utility module that:
1. Detects cursor distance to element edges
2. Calculates mouse position as percentage coordinates
3. Sets CSS custom properties (`--mouse-x`, `--mouse-y`)
4. Adds/removes `.glow` class based on proximity

```javascript
const EDGE_SENSITIVITY = 50; // pixels
const GLOW_RADIUS = 600; // pixels
```

## Files Modified

### 1. `frontend/src/styles.css`
- **Lines 149-201**: Updated `.card` with border glow pseudo-elements
- **Lines 411-469**: Updated `.table` with border glow pseudo-elements
- **Lines 578-598**: Added `@keyframes borderGlowPulse` animation
- **Lines 600-608**: Added `@keyframes glowRadiate` (optional radiating effect)

### 2. `frontend/src/App.js`
- **Line 1**: Added `useEffect` import
- **Line 9**: Added `reinitBorderGlow` import
- **Lines 18-21**: Added `useEffect` hook to reinitialize glow on tab changes

### 3. `frontend/src/borderGlow.js` (NEW)
- Complete border glow effect implementation
- Exports `initBorderGlow()` and `reinitBorderGlow()`
- Automatic initialization on DOM ready

## Visual Behavior

### Default State
- Subtle pulsing green/cyan gradient border
- Dark glass background
- Responsive shadow

### On Cursor Approach
- Radial glow activates when cursor within 50px of edge
- Glow center follows cursor position
- Pulsing border becomes more visible
- Smooth 0.3s transitions

### On Hover
- Enhanced shadow depth
- Green border becomes more prominent
- Glow effect fully activated

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ Mobile browsers (touch events not yet supported)

## CSS Properties Used

- `backdrop-filter` - Glass effect
- `position: absolute` - Pseudo-element positioning
- `radial-gradient()` - Cursor tracking glow
- `linear-gradient()` - Border color gradient
- `-webkit-mask` / `mask` - Border masking
- `mask-composite` / `-webkit-mask-composite` - Composite blending
- CSS custom properties (`--mouse-x`, `--mouse-y`)
- `animation` - Keyframe animation

## Performance Considerations

- Pseudo-elements are lightweight (no DOM nodes)
- Mouse event throttling not needed at current sensitivity
- GPU-accelerated animations
- No JavaScript animation loops (pure CSS)
- Pointer-events disabled on glow layers to prevent interference

## Future Enhancements

1. **Color Customization** - Add CSS variables for glow colors
2. **Touch Support** - Add touch move event handling
3. **Configurable Sensitivity** - Make edge detection distance customizable
4. **Intensity Levels** - Add "subtle", "normal", "intense" presets
5. **Direction Indicators** - Show which direction cursor approached from
6. **Mobile Optimization** - Alternative effects for touch screens

## Testing

To verify the effect is working:

1. Hover over any card or table
2. Move cursor towards the edges
3. You should see:
   - Radial glow that follows your cursor position
   - Animated pulsing border effect
   - Green/cyan gradient border
   - Smooth transitions

## References

- [ReactBits Border Glow](https://reactbits.dev/components/border-glow)
- [CSS Backdrop Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [CSS Mask Property](https://developer.mozilla.org/en-US/docs/Web/CSS/mask)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## Accessibility Notes

- Effect is purely visual and doesn't interfere with keyboard navigation
- Text contrast remains readable with dark backgrounds
- No flashing effects that could trigger photosensitivity issues
- Works with screen readers (no hidden content)

---

**Status**: ✅ Implemented and production-ready
**Last Updated**: March 2026
