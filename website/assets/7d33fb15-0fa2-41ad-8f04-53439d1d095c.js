/* @ds-bundle: {"format":3,"namespace":"BasaltGameDesignSystem_b7ea37","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Progress","sourcePath":"components/core/Progress.jsx"},{"name":"StatChip","sourcePath":"components/core/StatChip.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"814916e7f8ed","components/core/Badge.jsx":"f88fd75ef055","components/core/Button.jsx":"e11d29498896","components/core/Card.jsx":"a3ded8c6275a","components/core/Icon.jsx":"148b236a801c","components/core/Progress.jsx":"54e045bc084f","components/core/StatChip.jsx":"d5abebef1a19","components/feedback/Dialog.jsx":"fa2989e5c776","components/feedback/Toast.jsx":"b00b58b929e6","components/feedback/Tooltip.jsx":"a34b234aa53f","components/forms/Checkbox.jsx":"e3eeeb73f2e8","components/forms/Input.jsx":"a557894ce462","components/forms/Select.jsx":"f57bf6d1afd2","components/forms/Switch.jsx":"d2fd95627eb6","components/navigation/Tabs.jsx":"5bd75337b7f8","ui_kits/game-hud/GameHud.jsx":"3dafa8ad987a","ui_kits/press-kit/PressKit.jsx":"4cc1b2b5e545","ui_kits/steam/StorePage.jsx":"1a3c8009fbce","ui_kits/website/Site.jsx":"4804398a1990"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BasaltGameDesignSystem_b7ea37 = window.BasaltGameDesignSystem_b7ea37 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Basalt Game — Avatar
 * Player / member avatar. Image or initials, optional status ring.
 */
function Avatar({
  src = null,
  name = '',
  size = 40,
  shape = 'rounded',
  // rounded | circle | square
  status = null,
  // null | 'online' | 'away' | 'offline'
  ring = false,
  ...rest
}) {
  const radius = shape === 'circle' ? '50%' : shape === 'square' ? 'var(--radius-xs)' : 'var(--radius-md)';
  const initials = name.split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const statusColor = {
    online: 'var(--success)',
    away: 'var(--gold-500)',
    offline: 'var(--stone-500)'
  }[status];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: size,
      height: size,
      flex: 'none'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      background: src ? 'var(--stone-700)' : 'linear-gradient(135deg, var(--teal-500), var(--teal-700))',
      color: 'var(--stone-050)',
      fontFamily: 'var(--font-display)',
      fontSize: size * 0.38,
      border: ring ? '2px solid var(--primary)' : '1px solid var(--border)',
      boxShadow: ring ? 'var(--glow-mint)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: size * 0.3,
      height: size * 0.3,
      minWidth: 8,
      minHeight: 8,
      borderRadius: '50%',
      background: statusColor,
      border: '2px solid var(--bg)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Basalt Game — Badge
 * Small blocky status/label. Uppercase Rubik Mono One for the "voxel HUD" feel.
 */
function Badge({
  children,
  tone = 'neutral',
  // neutral | primary | accent | gold | info | success | warning | danger
  variant = 'soft',
  // soft | solid | outline
  size = 'md',
  // sm | md
  ...rest
}) {
  const tones = {
    neutral: {
      solid: 'var(--stone-600)',
      on: 'var(--stone-050)',
      soft: 'rgba(143,163,178,0.16)',
      text: 'var(--stone-200)'
    },
    primary: {
      solid: 'var(--primary)',
      on: 'var(--on-primary)',
      soft: 'var(--success-bg)',
      text: 'var(--mint-400)'
    },
    accent: {
      solid: 'var(--accent)',
      on: 'var(--on-accent)',
      soft: 'rgba(255,126,95,0.16)',
      text: 'var(--coral-400)'
    },
    gold: {
      solid: 'var(--gold-500)',
      on: 'var(--stone-950)',
      soft: 'var(--warning-bg)',
      text: 'var(--gold-400)'
    },
    info: {
      solid: 'var(--info)',
      on: 'var(--stone-950)',
      soft: 'var(--info-bg)',
      text: 'var(--teal-400)'
    },
    success: {
      solid: 'var(--success)',
      on: 'var(--stone-950)',
      soft: 'var(--success-bg)',
      text: 'var(--mint-400)'
    },
    warning: {
      solid: 'var(--warning)',
      on: 'var(--stone-950)',
      soft: 'var(--warning-bg)',
      text: 'var(--gold-400)'
    },
    danger: {
      solid: 'var(--danger)',
      on: '#fff',
      soft: 'var(--danger-bg)',
      text: '#FF8878'
    }
  }[tone];
  const pad = size === 'sm' ? '3px 7px' : '5px 10px';
  const fs = size === 'sm' ? '9px' : '10px';
  let bg, color, border;
  if (variant === 'solid') {
    bg = tones.solid;
    color = tones.on;
    border = 'transparent';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = tones.text;
    border = 'currentColor';
  } else {
    bg = tones.soft;
    color = tones.text;
    border = 'transparent';
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontFamily: 'var(--font-label)',
      fontSize: fs,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: pad,
      color,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius-sm)',
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Basalt Game — Button
 * Chunky, game-feel button. Solid "block" shadow, snappy press.
 */
function Button({
  children,
  variant = 'primary',
  // primary | secondary | ghost | outline | danger
  size = 'md',
  // sm | md | lg
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  ...rest
}) {
  const Tag = as;
  const sizes = {
    sm: {
      padding: '8px 14px',
      font: 'var(--text-sm)',
      radius: 'var(--radius-sm)',
      gap: '6px'
    },
    md: {
      padding: '12px 20px',
      font: 'var(--text-base)',
      radius: 'var(--radius-md)',
      gap: '8px'
    },
    lg: {
      padding: '16px 28px',
      font: 'var(--text-lg)',
      radius: 'var(--radius-md)',
      gap: '10px'
    }
  }[size];
  const palettes = {
    primary: {
      bg: 'var(--primary)',
      color: 'var(--on-primary)',
      border: 'transparent',
      block: 'rgba(23,140,107,0.9)'
    },
    secondary: {
      bg: 'var(--accent)',
      color: 'var(--on-accent)',
      border: 'transparent',
      block: 'rgba(232,86,59,0.9)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--text)',
      border: 'transparent',
      block: 'transparent'
    },
    outline: {
      bg: 'transparent',
      color: 'var(--text)',
      border: 'var(--border-strong)',
      block: 'transparent'
    },
    danger: {
      bg: 'var(--danger)',
      color: '#fff',
      border: 'transparent',
      block: 'rgba(211,58,40,0.9)'
    }
  }[variant];
  const solid = variant === 'primary' || variant === 'secondary' || variant === 'danger';
  const style = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.gap,
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: sizes.font,
    lineHeight: 1,
    padding: sizes.padding,
    color: palettes.color,
    background: palettes.bg,
    border: `2px solid ${palettes.border}`,
    borderRadius: sizes.radius,
    boxShadow: solid ? `0 4px 0 0 ${palettes.block}` : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transform: 'translateY(0)',
    transition: 'transform var(--dur-fast) var(--ease-bounce), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };
  const onDown = e => {
    if (disabled || !solid) return;
    e.currentTarget.style.transform = 'translateY(4px)';
    e.currentTarget.style.boxShadow = `0 0px 0 0 ${palettes.block}`;
  };
  const reset = e => {
    if (disabled || !solid) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = `0 4px 0 0 ${palettes.block}`;
  };
  const onEnter = e => {
    if (disabled) return;
    if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-2)';
    if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--primary)';
    if (variant === 'primary') e.currentTarget.style.background = 'var(--primary-hover)';
    if (variant === 'secondary') e.currentTarget.style.background = 'var(--accent-hover)';
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = palettes.bg;
    if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--border-strong)';
    reset(e);
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: style,
    disabled: as === 'button' ? disabled : undefined,
    onMouseDown: onDown,
    onMouseUp: reset,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Basalt Game — Card
 * Surface container. Optional hover-lift and "block" bottom shadow.
 */
function Card({
  children,
  padding = 'md',
  // none | sm | md | lg
  interactive = false,
  // hover lift
  accent = null,
  // null | 'primary' | 'accent' | 'gold' — top edge accent
  style = {},
  ...rest
}) {
  const pads = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  }[padding];
  const accentColor = accent && {
    primary: 'var(--primary)',
    accent: 'var(--accent)',
    gold: 'var(--gold-500)'
  }[accent];
  const base = {
    position: 'relative',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: pads,
    boxShadow: 'var(--shadow-md)',
    transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    overflow: 'hidden',
    ...(accentColor ? {
      borderTop: `3px solid ${accentColor}`
    } : {}),
    ...style
  };
  const onEnter = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = 'var(--border-strong)';
    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
  };
  const onLeave = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef
} = React;
/**
 * Basalt Game — Icon
 * Thin wrapper over Lucide (loaded from CDN as window.lucide). Renders a
 * placeholder that Lucide swaps for an inline SVG. Stroke icon set, 2px.
 */
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      // reset so re-renders re-draw the right glyph
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        nameAttr: 'data-lucide',
        attrs: {
          width: size,
          height: size,
          'stroke-width': strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      lineHeight: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Progress.jsx
try { (() => {
/**
 * Basalt Game — Progress
 * Blocky progress / XP bar. Optional segmented (voxel) fill and label.
 */
function Progress({
  value = 0,
  // 0..100
  tone = 'primary',
  // primary | gold | accent | info
  size = 'md',
  // sm | md | lg
  segmented = false,
  // render as discrete voxel blocks
  label = null,
  showValue = false,
  ...rest
}) {
  const v = Math.max(0, Math.min(100, value));
  const heights = {
    sm: 6,
    md: 10,
    lg: 16
  }[size];
  const color = {
    primary: 'var(--primary)',
    gold: 'var(--gold-500)',
    accent: 'var(--accent)',
    info: 'var(--info)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", rest, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)'
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-secondary)'
    }
  }, Math.round(v), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: heights,
      background: 'var(--stone-700)',
      borderRadius: segmented ? 'var(--radius-xs)' : 'var(--radius-pill)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)'
    }
  }, segmented ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      gap: 2,
      padding: 2
    }
  }, Array.from({
    length: 20
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      background: (i + 1) * 5 <= v ? color : 'transparent',
      borderRadius: 1,
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${v}%`,
      background: color,
      borderRadius: 'var(--radius-pill)',
      boxShadow: `0 0 12px -2px ${color}`,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Progress.jsx", error: String((e && e.message) || e) }); }

// components/core/StatChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Basalt Game — StatChip
 * HUD stat readout: icon + mono value + label. Signature in-game element.
 */
function StatChip({
  icon = null,
  value,
  label = null,
  tone = 'neutral',
  // neutral | primary | gold | accent | info
  size = 'md',
  // sm | md
  ...rest
}) {
  const tones = {
    neutral: 'var(--text)',
    primary: 'var(--mint-400)',
    gold: 'var(--gold-400)',
    accent: 'var(--coral-400)',
    info: 'var(--teal-400)'
  }[tone];
  const pad = size === 'sm' ? '6px 10px' : '9px 14px';
  const valSize = size === 'sm' ? 'var(--text-sm)' : 'var(--text-lg)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: pad,
      background: 'var(--bg-deep)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-block)'
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: tones,
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: valSize,
      color: tones
    }
  }, value), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 9,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, label)));
}
Object.assign(__ds_scope, { StatChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatChip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const {
  useEffect
} = React;
/**
 * Basalt Game — Dialog (modal)
 * Centered panel over a scrim. Controlled via `open`.
 */
function Dialog({
  open = false,
  onClose,
  title = null,
  children,
  footer = null,
  width = 480
}) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--scrim)',
      backdropFilter: 'blur(4px)',
      padding: 20,
      animation: 'bg-fade var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      animation: 'dlg-pop var(--dur-base) var(--ease-bounce)'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 24px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-2xl)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fermer",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      display: 'flex',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: '16px 24px',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-raised)'
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, `
        @keyframes bg-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes dlg-pop { from { opacity: 0; transform: translateY(12px) scale(0.96) } to { opacity: 1; transform: none } }
      `));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Basalt Game — Toast
 * Notification chip. Present a single toast; manage a stack in your app.
 */
function Toast({
  tone = 'primary',
  // primary | success | info | warning | danger | neutral
  title = null,
  children = null,
  icon = null,
  onClose = null
}) {
  const tones = {
    primary: {
      accent: 'var(--primary)',
      bg: 'var(--success-bg)'
    },
    success: {
      accent: 'var(--success)',
      bg: 'var(--success-bg)'
    },
    info: {
      accent: 'var(--info)',
      bg: 'var(--info-bg)'
    },
    warning: {
      accent: 'var(--warning)',
      bg: 'var(--warning-bg)'
    },
    gold: {
      accent: 'var(--gold-500)',
      bg: 'var(--warning-bg)'
    },
    danger: {
      accent: 'var(--danger)',
      bg: 'var(--danger-bg)'
    },
    neutral: {
      accent: 'var(--stone-400)',
      bg: 'rgba(143,163,178,0.1)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      minWidth: 300,
      maxWidth: 420,
      padding: '14px 16px',
      background: 'var(--surface)',
      border: '1px solid var(--border-strong)',
      borderLeft: `4px solid ${tones.accent}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)',
      background: tones.bg,
      color: tones.accent,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--text)',
      fontSize: 'var(--text-base)'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-sm)',
      marginTop: title ? 2 : 0
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fermer",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      display: 'flex',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Basalt Game — Tooltip
 * Simple hover tooltip. Wraps a trigger; shows a label on hover/focus.
 */
function Tooltip({
  label,
  children,
  side = 'top'
}) {
  const [show, setShow] = useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 60,
      ...pos,
      whiteSpace: 'nowrap',
      padding: '6px 10px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: 'var(--stone-950)',
      background: 'var(--stone-100)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-md)',
      pointerEvents: 'none',
      animation: 'tip-in var(--dur-fast) var(--ease-out)'
    }
  }, label, /*#__PURE__*/React.createElement("style", null, `@keyframes tip-in { from { opacity: 0; transform: ${pos.transform} translateY(2px) } }`)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Basalt Game — Checkbox
 * Blocky check with mint fill.
 */
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label = null,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", _extends({
    role: "checkbox",
    "aria-checked": on,
    onClick: toggle,
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-xs)',
      background: on ? 'var(--primary)' : 'var(--bg-deep)',
      border: `2px solid ${on ? 'var(--primary)' : 'var(--border-strong)'}`,
      boxShadow: on ? 'var(--shadow-block)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, rest), on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--stone-950)",
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Basalt Game — Input
 * Text field with label, optional icon, and error state.
 */
function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  size = 'md',
  // sm | md | lg
  id,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const pads = {
    sm: '8px 12px',
    md: '11px 14px',
    lg: '14px 16px'
  }[size];
  const fs = {
    sm: 'var(--text-sm)',
    md: 'var(--text-base)',
    lg: 'var(--text-lg)'
  }[size];
  const borderColor = error ? 'var(--danger)' : focused ? 'var(--primary)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      color: focused ? 'var(--primary)' : 'var(--text-muted)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      width: '100%',
      padding: pads,
      paddingLeft: iconLeft ? 40 : undefined,
      fontFamily: 'var(--font-body)',
      fontSize: fs,
      color: 'var(--text)',
      background: 'var(--bg-deep)',
      border: `2px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      boxShadow: focused ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
/**
 * Basalt Game — Select
 * Custom dropdown matching the dark blocky style.
 */
function Select({
  options = [],
  // [{ value, label }]
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Choisir…',
  label = null,
  disabled = false,
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => o.value === current);
  const pick = val => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    },
    ref: ref
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      padding: '11px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: selected ? 'var(--text)' : 'var(--text-muted)',
      background: 'var(--bg-deep)',
      border: `2px solid ${open ? 'var(--primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      boxShadow: open ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out)'
    }
  }, selected ? selected.label : placeholder, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      zIndex: 40,
      background: 'var(--surface)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: 6,
      maxHeight: 240,
      overflowY: 'auto'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.value,
    onClick: () => pick(o.value),
    style: {
      padding: '9px 12px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--text-base)',
      color: o.value === current ? 'var(--mint-400)' : 'var(--text)',
      background: o.value === current ? 'var(--success-bg)' : 'transparent',
      cursor: 'pointer'
    },
    onMouseEnter: e => {
      if (o.value !== current) e.currentTarget.style.background = 'var(--surface-2)';
    },
    onMouseLeave: e => {
      if (o.value !== current) e.currentTarget.style.background = 'transparent';
    }
  }, o.label)))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Basalt Game — Switch (toggle)
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label = null,
  size = 'md',
  // sm | md
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const dims = size === 'sm' ? {
    w: 36,
    h: 20,
    k: 14
  } : {
    w: 46,
    h: 26,
    k: 20
  };
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", _extends({
    role: "switch",
    "aria-checked": on,
    onClick: toggle,
    style: {
      position: 'relative',
      width: dims.w,
      height: dims.h,
      borderRadius: 999,
      background: on ? 'var(--primary)' : 'var(--stone-600)',
      boxShadow: on ? 'var(--glow-mint)' : 'inset 0 1px 3px rgba(0,0,0,0.4)',
      transition: 'background var(--dur-base) var(--ease-out)',
      flex: 'none'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: (dims.h - dims.k) / 2,
      left: on ? dims.w - dims.k - (dims.h - dims.k) / 2 : (dims.h - dims.k) / 2,
      width: dims.k,
      height: dims.k,
      borderRadius: 999,
      background: on ? 'var(--stone-950)' : 'var(--stone-200)',
      transition: 'left var(--dur-base) var(--ease-bounce)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Basalt Game — Tabs
 * Segmented tabs with a sliding mint indicator.
 */
function Tabs({
  tabs = [],
  // [{ id, label, icon? }]
  value,
  defaultValue = null,
  onChange,
  variant = 'underline',
  // underline | pill
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue || tabs[0] && tabs[0].id);
  const active = isControlled ? value : internal;
  const pick = id => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };
  if (variant === 'pill') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: 'var(--bg-deep)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        ...style
      }
    }, tabs.map(t => {
      const on = t.id === active;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        onClick: () => pick(t.id),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '8px 16px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 'var(--text-sm)',
          color: on ? 'var(--on-primary)' : 'var(--text-secondary)',
          background: on ? 'var(--primary)' : 'transparent',
          borderRadius: 'var(--radius-sm)',
          boxShadow: on ? 'var(--shadow-block)' : 'none',
          transition: 'all var(--dur-fast) var(--ease-out)'
        }
      }, t.icon, t.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border)',
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => pick(t.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '12px 16px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 'var(--text-base)',
        color: on ? 'var(--text)' : 'var(--text-muted)',
        borderBottom: `3px solid ${on ? 'var(--primary)' : 'transparent'}`,
        marginBottom: -1,
        transition: 'color var(--dur-fast), border-color var(--dur-fast)'
      }
    }, t.icon, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/game-hud/GameHud.jsx
try { (() => {
// Basalt Game — In-game HUD for the evolution simulation "Genesis"
const DS = window.BasaltGameDesignSystem_b7ea37;
const {
  Button,
  Badge,
  Card,
  Icon,
  Tabs,
  StatChip,
  Progress,
  Switch,
  Tooltip,
  Toast
} = DS;
function WorldView() {
  // Voxel world placeholder: iso grid + scattered cube "settlements"
  const blobs = [{
    x: 30,
    y: 40,
    s: 40,
    c: ['#63E8C0', '#2AA9D6', '#1B6E9E']
  }, {
    x: 52,
    y: 55,
    s: 30,
    c: ['#FFD277', '#FFC24B', '#E8A21F']
  }, {
    x: 44,
    y: 28,
    s: 24,
    c: ['#FF9B82', '#FF7E5F', '#E8563B']
  }, {
    x: 66,
    y: 38,
    s: 34,
    c: ['#8CF2D6', '#33D6A6', '#178C6B']
  }, {
    x: 20,
    y: 62,
    s: 22,
    c: ['#FFD277', '#FFC24B', '#E8A21F']
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'radial-gradient(120% 100% at 50% 10%, #21414B 0%, #16232D 50%, #10151B 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.3,
      backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
      backgroundSize: '44px 44px',
      transform: 'perspective(700px) rotateX(60deg) translateY(30%) scale(1.7)',
      transformOrigin: 'bottom'
    }
  }), blobs.map((k, i) => /*#__PURE__*/React.createElement("svg", {
    key: i,
    viewBox: "0 0 64 72",
    style: {
      position: 'absolute',
      left: k.x + '%',
      top: k.y + '%',
      width: k.s,
      filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.5))'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 2 L60 18 L32 34 L4 18 Z",
    fill: k.c[0]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18 L32 34 L32 70 L4 54 Z",
    fill: k.c[1]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 18 L32 34 L32 70 L60 54 Z",
    fill: k.c[2]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '30%',
      top: '38%',
      width: 64,
      height: 64,
      border: '2px solid var(--mint-400)',
      borderRadius: 8,
      boxShadow: 'var(--glow-mint)'
    }
  }));
}
function GameHud() {
  const [speed, setSpeed] = React.useState('x1');
  const [paused, setPaused] = React.useState(false);
  const [toast, setToast] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-deep)',
      color: 'var(--text)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "26",
    height: "29",
    alt: ""
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    variant: "soft",
    size: "sm"
  }, "G\xE9n\xE9ration 42")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18
    }),
    value: "1 284",
    label: "Population",
    tone: "primary",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "wheat",
      size: 18
    }),
    value: "+128",
    label: "Nourriture / an",
    tone: "gold",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 18
    }),
    value: "Feu",
    label: "D\xE9couverte",
    tone: "accent",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "thermometer",
      size: 18
    }),
    value: "14\xB0C",
    label: "Climat",
    tone: "info",
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "Param\xE8tres"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Menu"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 18
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 12,
      padding: '0 16px 12px',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(WorldView, null), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--mint-400)',
      marginBottom: 10
    }
  }, "Colonie s\xE9lectionn\xE9e"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24
    }
  }, "VAL-D'AURORE"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Progress, {
    value: 68,
    tone: "gold",
    label: "\xC9volution",
    showValue: true
  }), /*#__PURE__*/React.createElement(Progress, {
    value: 45,
    tone: "primary",
    label: "Sant\xE9",
    showValue: true
  }), /*#__PURE__*/React.createElement(Progress, {
    value: 80,
    segmented: true,
    tone: "accent",
    label: "Moral"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)',
      marginBottom: 10
    }
  }, "Chronique"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      overflowY: 'auto'
    }
  }, [{
    i: 'flame',
    t: 'La maîtrise du feu',
    d: 'An 4 120 av. notre ère',
    tone: 'var(--coral-400)'
  }, {
    i: 'sprout',
    t: 'Premières cultures',
    d: 'An 4 080',
    tone: 'var(--mint-400)'
  }, {
    i: 'home',
    t: 'Naissance d\'un village',
    d: 'An 3 990',
    tone: 'var(--gold-400)'
  }, {
    i: 'users',
    t: 'Grande migration',
    d: 'An 3 900',
    tone: 'var(--teal-400)'
  }].map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: e.tone,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: e.i,
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, e.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, e.d)))))), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Mode narration",
    defaultChecked: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '12px 16px',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: paused ? 'primary' : 'outline',
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: paused ? 'play' : 'pause',
      size: 18
    }),
    onClick: () => setPaused(p => !p)
  }, paused ? 'Reprendre' : 'Pause'), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: speed,
    onChange: setSpeed,
    tabs: [{
      id: 'x1',
      label: '×1'
    }, {
      id: 'x2',
      label: '×2'
    }, {
      id: 'x5',
      label: '×5'
    }, {
      id: 'max',
      label: 'Max'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 28,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 16
    }),
    value: "\u22123 900",
    label: "Ann\xE9e",
    tone: "neutral",
    size: "sm"
  })), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 70,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "gold",
    title: "Nouveau palier atteint !",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "award",
      size: 18
    }),
    onClose: () => setToast(false)
  }, "Ton esp\xE8ce ma\xEEtrise d\xE9sormais le feu.")));
}
window.GameHud = GameHud;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/game-hud/GameHud.jsx", error: String((e && e.message) || e) }); }

// ui_kits/press-kit/PressKit.jsx
try { (() => {
// Basalt Game — Press kit for "Genesis"
const DS = window.BasaltGameDesignSystem_b7ea37;
const {
  Button,
  Badge,
  Card,
  Icon
} = DS;
const MARK = '../../assets/logo-mark.svg';
function Fact({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text)',
      fontWeight: 600,
      fontSize: 14,
      textAlign: 'right'
    }
  }, v));
}
function Asset({
  tint,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/10',
      background: `radial-gradient(90% 80% at 55% 25%, ${tint}, #10151B)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 64 72",
    style: {
      width: 34
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 2 L60 18 L32 34 L4 18 Z",
    fill: "#63E8C0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18 L32 34 L32 70 L4 54 Z",
    fill: "#2AA9D6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 18 L32 34 L32 70 L60 54 Z",
    fill: "#1B6E9E"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 16
  })));
}
function PressKit() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      minHeight: '100vh',
      color: 'var(--text)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border)',
      background: 'linear-gradient(180deg,#1B2530,var(--bg))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '40px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    width: "40",
    height: "45",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24
    }
  }, "BASALT GAME"), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    variant: "soft",
    style: {
      marginLeft: 6
    }
  }, "Press Kit")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-6xl)',
      margin: '0 0 10px',
      lineHeight: 0.95
    }
  }, "GENESIS"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-secondary)',
      maxWidth: 560,
      margin: 0
    }
  }, "Une simulation voxel de l'\xE9volution humaine. Dossier de presse \u2014 visuels, logos et informations libres de droits pour la couverture \xE9ditoriale."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 18
    })
  }, "T\xE9l\xE9charger le kit (.zip)"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "youtube",
      size: 18
    })
  }, "Voir le trailer")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '36px 24px',
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-3xl)',
      margin: '0 0 12px'
    }
  }, "DESCRIPTION"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "Dans Genesis, vous semez une poign\xE9e d'humains dans un monde de cubes vivant, puis vous observez mille g\xE9n\xE9rations \xE9crire leur histoire : d\xE9couverte du feu, migrations, agriculture, premi\xE8res cit\xE9s. Chaque partie diverge selon le climat, les ressources et le hasard. Un bac \xE0 sable narratif o\xF9 l'humanit\xE9 enti\xE8re tient dans la paume de votre main."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-3xl)',
      margin: '32px 0 14px'
    }
  }, "CARACT\xC9RISTIQUES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 12
    }
  }, [{
    i: 'sprout',
    t: 'Écosystème émergent',
    d: 'Climat, faune et ressources interagissent en continu.'
  }, {
    i: 'git-branch',
    t: 'Générations vivantes',
    d: 'Chaque humain naît, apprend, transmet et meurt.'
  }, {
    i: 'fast-forward',
    t: 'Maîtrise du temps',
    d: 'Du battement de cœur au millénaire, à votre rythme.'
  }, {
    i: 'book-open',
    t: 'Chronique narrée',
    d: 'Le jeu raconte les grands tournants de votre espèce.'
  }].map(f => /*#__PURE__*/React.createElement(Card, {
    key: f.t,
    padding: "md"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mint-400)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.i,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      margin: '10px 0 4px'
    }
  }, f.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, f.d)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-3xl)',
      margin: '32px 0 14px'
    }
  }, "VISUELS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Asset, {
    tint: "#1F3A44",
    label: "capture_01.png"
  }), /*#__PURE__*/React.createElement(Asset, {
    tint: "#3A2A22",
    label: "capture_02.png"
  }), /*#__PURE__*/React.createElement(Asset, {
    tint: "#242E3A",
    label: "capture_03.png"
  }), /*#__PURE__*/React.createElement(Asset, {
    tint: "#2A3A2A",
    label: "capture_04.png"
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-3xl)',
      margin: '32px 0 14px'
    }
  }, "LOGOS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    width: "36",
    height: "40",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20
    }
  }, "BASALT")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'var(--stone-050)',
      borderRadius: 'var(--radius-md)',
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    width: "36",
    height: "40",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: 'var(--stone-950)'
    }
  }, "BASALT")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--mint-400)',
      marginBottom: 8
    }
  }, "Fiche technique"), /*#__PURE__*/React.createElement(Fact, {
    k: "Titre",
    v: "Genesis"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Studio",
    v: "Basalt Game"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Bas\xE9 \xE0",
    v: "Lyon, France"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Sortie",
    v: "Q3 2026 \xB7 Early Access"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Plateformes",
    v: "PC \xB7 Mac"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Prix",
    v: "19,99 \u20AC"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Langues",
    v: "FR \xB7 EN"
  }), /*#__PURE__*/React.createElement(Fact, {
    k: "Genre",
    v: "Simulation \xB7 Bac \xE0 sable"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)',
      marginBottom: 10
    }
  }, "Contact presse"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 18,
    color: "var(--mint-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14
    }
  }, "press@basalt.game")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, ['twitter', 'youtube', 'twitch', 'globe'].map(s => /*#__PURE__*/React.createElement(Icon, {
    key: s,
    name: s,
    size: 20
  })))))));
}
window.PressKit = PressKit;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/press-kit/PressKit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/steam/StorePage.jsx
try { (() => {
// Basalt Game — Store page for "Genesis" (brand-styled store layout)
const DS = window.BasaltGameDesignSystem_b7ea37;
const {
  Button,
  Badge,
  Card,
  Icon,
  Progress
} = DS;
const MARK = '../../assets/logo-mark.svg';
function Shot({
  tint,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      aspectRatio: '16/9',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      cursor: 'pointer',
      border: `2px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
      boxShadow: active ? 'var(--glow-mint)' : 'none',
      background: `radial-gradient(90% 80% at 55% 25%, ${tint}, #10151B)`,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 64 72",
    style: {
      width: 22
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 2 L60 18 L32 34 L4 18 Z",
    fill: "#63E8C0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18 L32 34 L32 70 L4 54 Z",
    fill: "#2AA9D6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 18 L32 34 L32 70 L60 54 Z",
    fill: "#1B6E9E"
  })));
}
function Row({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '9px 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text)',
      fontWeight: 600
    }
  }, value));
}
function StorePage() {
  const shots = ['#1F3A44', '#3A2A22', '#242E3A', '#2A3A2A'];
  const [active, setActive] = React.useState(0);
  const [wish, setWish] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      minHeight: '100vh',
      color: 'var(--text)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-raised)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    width: "18",
    height: "20",
    alt: ""
  }), " Basalt Store ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  }), " Simulation ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  }), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text)'
    }
  }, "Genesis"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '28px 24px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-5xl)',
      margin: '0 0 6px'
    }
  }, "GENESIS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 22,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    variant: "solid"
  }, "Early Access"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Simulation"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Voxel"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Bac \xE0 sable"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Solo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/9',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      background: `radial-gradient(100% 90% at 55% 20%, ${shots[active]}, #10151B)`,
      position: 'relative',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.3,
      backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
      backgroundSize: '38px 38px',
      transform: 'perspective(600px) rotateX(60deg) translateY(35%) scale(1.6)',
      transformOrigin: 'bottom'
    }
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 64 72",
    style: {
      position: 'absolute',
      left: '42%',
      top: '38%',
      width: 46,
      filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 2 L60 18 L32 34 L4 18 Z",
    fill: "#63E8C0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18 L32 34 L32 70 L4 54 Z",
    fill: "#2AA9D6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 18 L32 34 L32 70 L60 54 Z",
    fill: "#1B6E9E"
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    style: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      background: 'rgba(16,21,27,0.7)'
    }
  }, "Visuel \xB7 placeholder")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10
    }
  }, shots.map((t, i) => /*#__PURE__*/React.createElement(Shot, {
    key: i,
    tint: t,
    active: i === active,
    onClick: () => setActive(i)
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-3xl)',
      margin: '32px 0 10px'
    }
  }, "\xC0 PROPOS"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "Genesis est une simulation voxel de l'\xE9volution humaine. S\xE8me une poign\xE9e d'humains dans un monde vivant, puis regarde-les d\xE9couvrir le feu, migrer, cultiver la terre et b\xE2tir des civilisations. Chaque partie diverge \u2014 mille destins, une seule esp\xE8ce."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 14,
      marginTop: 18
    }
  }, [{
    i: 'sprout',
    t: 'Écosystème vivant'
  }, {
    i: 'git-branch',
    t: 'Générations émergentes'
  }, {
    i: 'fast-forward',
    t: 'Contrôle du temps'
  }, {
    i: 'book-open',
    t: 'Chronique narrée'
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      padding: 12,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mint-400)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.i,
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, f.t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'sticky',
      top: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    accent: "primary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Acc\xE8s anticip\xE9"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      margin: '10px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40
    }
  }, "19,99 \u20AC"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, "\u221220%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-muted)',
      textDecoration: 'line-through'
    }
  }, "24,99 \u20AC"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-cart",
      size: 18
    })
  }, "Acheter Genesis"), /*#__PURE__*/React.createElement(Button, {
    variant: wish ? 'secondary' : 'outline',
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 18
    }),
    onClick: () => setWish(w => !w)
  }, wish ? 'Dans ta wishlist' : 'Ajouter à la wishlist'))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, "\xC9valuations"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--mint-400)'
    }
  }, "Tr\xE8s positif")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "94% des 1 240 \xE9valuations"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Progress, {
    value: 94,
    tone: "primary"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, "D\xE9tails"), /*#__PURE__*/React.createElement(Row, {
    label: "D\xE9veloppeur",
    value: "Basalt Game"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "\xC9diteur",
    value: "Basalt Game"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Sortie",
    value: "Q3 2026"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Langues",
    value: "FR \xB7 EN"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Plateforme",
    value: "PC \xB7 Mac"
  }))))));
}
window.StorePage = StorePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/steam/StorePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
// Basalt Game — Marketing site (studio + first game "Genesis")
// Composes DS primitives from window.BasaltGameDesignSystem_b7ea37.
const DS = window.BasaltGameDesignSystem_b7ea37;
const {
  Button,
  Badge,
  Card,
  Icon,
  Tabs,
  StatChip,
  Dialog,
  Input,
  Toast
} = DS;
const MARK = '../../assets/logo-mark.svg';

// ---- small building blocks -------------------------------------------------
function VoxelHero() {
  // Stylized placeholder standing in for real game art (voxel world).
  const cubes = [{
    x: 12,
    y: 30,
    s: 34,
    c: ['#63E8C0', '#2AA9D6', '#1B6E9E']
  }, {
    x: 26,
    y: 62,
    s: 26,
    c: ['#FFD277', '#FFC24B', '#E8A21F']
  }, {
    x: 70,
    y: 24,
    s: 30,
    c: ['#FF9B82', '#FF7E5F', '#E8563B']
  }, {
    x: 82,
    y: 58,
    s: 22,
    c: ['#8CF2D6', '#33D6A6', '#178C6B']
  }, {
    x: 50,
    y: 74,
    s: 28,
    c: ['#63E8C0', '#2AA9D6', '#1B6E9E']
  }, {
    x: 60,
    y: 14,
    s: 18,
    c: ['#FFD277', '#FFC24B', '#E8A21F']
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      minHeight: 420,
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'radial-gradient(120% 90% at 70% 20%, #1F3A44 0%, #16232D 45%, #10151B 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.35,
      backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      transform: 'perspective(600px) rotateX(58deg) translateY(40%) scale(1.6)',
      transformOrigin: 'bottom'
    }
  }), cubes.map((k, i) => /*#__PURE__*/React.createElement("svg", {
    key: i,
    viewBox: "0 0 64 72",
    style: {
      position: 'absolute',
      left: k.x + '%',
      top: k.y + '%',
      width: k.s,
      filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.5))'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 2 L60 18 L32 34 L4 18 Z",
    fill: k.c[0]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18 L32 34 L32 70 L4 54 Z",
    fill: k.c[1]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 18 L32 34 L32 70 L60 54 Z",
    fill: k.c[2]
  }))), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    variant: "soft",
    style: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      background: 'rgba(16,21,27,0.7)'
    }
  }, "Visuel du jeu \xB7 placeholder"));
}
function ShotTile({
  tint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/10',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      background: `radial-gradient(90% 80% at 60% 20%, ${tint}, #10151B)`,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 64 72",
    style: {
      width: 30
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 2 L60 18 L32 34 L4 18 Z",
    fill: "#63E8C0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18 L32 34 L32 70 L4 54 Z",
    fill: "#2AA9D6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 18 L32 34 L32 70 L60 54 Z",
    fill: "#1B6E9E"
  })));
}

// ---- page ------------------------------------------------------------------
function Site() {
  const [wishlisted, setWishlisted] = React.useState(false);
  const [trailer, setTrailer] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [tab, setTab] = React.useState('screens');
  const wishlist = () => {
    setWishlisted(true);
    setToast(true);
    setTimeout(() => setToast(false), 3200);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      minHeight: '100vh',
      color: 'var(--text)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(10px)',
      background: 'rgba(21,27,34,0.8)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1160,
      margin: '0 auto',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    width: "30",
    height: "34",
    alt: "Basalt"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      letterSpacing: 0.4
    }
  }, "BASALT")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center'
    }
  }, ['Le jeu', 'Studio', 'Actus', 'Communauté'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: 'var(--text-secondary)',
      fontWeight: 600,
      fontSize: 15,
      textDecoration: 'none'
    }
  }, l)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 15
    }),
    onClick: wishlist
  }, wishlisted ? 'Ajouté' : 'Wishlist')))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: '0 auto',
      padding: '64px 24px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    variant: "solid",
    size: "md"
  }, "Early Access \xB7 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-6xl)',
      lineHeight: 0.95,
      margin: '20px 0 0'
    }
  }, "REGARDE", /*#__PURE__*/React.createElement("br", null), "L'HUMANIT\xC9", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mint-400)'
    }
  }, "GRANDIR")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-secondary)',
      maxWidth: 460,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text)'
    }
  }, "Genesis"), " est une simulation voxel de l'\xE9volution humaine. S\xE8me une civilisation, puis regarde mille g\xE9n\xE9rations \xE9crire leur histoire."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 20
    }),
    onClick: wishlist
  }, "Ajouter \xE0 la wishlist"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "youtube",
      size: 20
    }),
    onClick: () => setTrailer(true)
  }, "Trailer")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18
    }),
    value: "1 284",
    label: "Wishlists",
    tone: "primary"
  }), /*#__PURE__*/React.createElement(StatChip, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "star",
      size: 18
    }),
    value: "Tr\xE8s positif",
    label: "Retours",
    tone: "gold"
  }))), /*#__PURE__*/React.createElement(VoxelHero, null)), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: '0 auto',
      padding: '40px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, [{
    i: 'sprout',
    t: 'Sème la vie',
    d: 'Choisis un biome, place les premiers humains et laisse la nature faire le reste.'
  }, {
    i: 'git-branch',
    t: 'Mille destins',
    d: 'Migrations, découvertes, cultures — chaque partie diverge et te surprend.'
  }, {
    i: 'fast-forward',
    t: 'Le temps t\'appartient',
    d: 'Accélère les siècles ou zoome sur une seule vie. Ton rythme, ton histoire.'
  }].map(f => /*#__PURE__*/React.createElement(Card, {
    key: f.t,
    padding: "lg",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--success-bg)',
      color: 'var(--mint-400)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-block)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.i,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '16px 0 6px',
      fontSize: 'var(--text-xl)'
    }
  }, f.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-base)'
    }
  }, f.d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: '0 auto',
      padding: '40px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-4xl)'
    }
  }, "M\xC9DIAS"), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: tab,
    onChange: setTab,
    tabs: [{
      id: 'screens',
      label: 'Captures'
    }, {
      id: 'devlog',
      label: 'Devlog'
    }]
  })), tab === 'screens' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(ShotTile, {
    tint: "#1F3A44"
  }), /*#__PURE__*/React.createElement(ShotTile, {
    tint: "#3A2A22"
  }), /*#__PURE__*/React.createElement(ShotTile, {
    tint: "#242E3A"
  })) : /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Devlog #12"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '12px 0 6px'
    }
  }, "Le feu, enfin"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-secondary)'
    }
  }, "Cette semaine : la ma\xEEtrise du feu d\xE9bloque la cuisson, la nuit devient plus s\xFBre, et les villages grandissent 2\xD7 plus vite. On te raconte comment on l'a simul\xE9."))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: '0 auto',
      padding: '48px 24px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      background: 'linear-gradient(135deg,#1B2530,#16232D)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: 'var(--mint-400)'
    }
  }, "Le studio"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 12px',
      fontSize: 'var(--text-4xl)'
    }
  }, "UN PETIT STUDIO,", /*#__PURE__*/React.createElement("br", null), "DE GRANDES HISTOIRES"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      maxWidth: 480,
      margin: 0
    }
  }, "Basalt Game est un studio ind\xE9pendant. On fabrique des mondes en cubes o\xF9 chaque syst\xE8me, aussi petit soit-il, raconte quelque chose de l'humanit\xE9.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 12
    }
  }, ['Léa F.', 'Marc O.', 'Zoé R.', 'Sam K.', 'Ilan T.', '+4'].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '1',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      color: 'var(--teal-400)',
      fontSize: 18
    }
  }, n)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      padding: '40px 24px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-4xl)',
      margin: '0 0 10px'
    }
  }, "SUIS L'AVENTURE"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      margin: '0 0 22px'
    }
  }, "Un devlog par mois. Z\xE9ro spam, promis."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      maxWidth: 460,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "toi@exemple.com",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    }),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "S'inscrire"))), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border)',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1160,
      margin: '0 auto',
      padding: '28px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    width: "24",
    height: "27",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16
    }
  }, "BASALT GAME"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 13,
      marginLeft: 8
    }
  }, "\xA9 2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      color: 'var(--text-muted)'
    }
  }, ['twitter', 'youtube', 'twitch', 'github'].map(s => /*#__PURE__*/React.createElement(Icon, {
    key: s,
    name: s,
    size: 20
  }))))), /*#__PURE__*/React.createElement(Dialog, {
    open: trailer,
    onClose: () => setTrailer(false),
    title: "Genesis \u2014 Trailer",
    width: 640,
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => {
        setTrailer(false);
        wishlist();
      }
    }, "Ajouter \xE0 la wishlist")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/9',
      borderRadius: 'var(--radius-lg)',
      background: 'radial-gradient(90% 80% at 50% 30%, #1F3A44, #10151B)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--stone-950)',
      boxShadow: 'var(--glow-mint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 28
  })))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 120
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Ajout\xE9 \xE0 ta wishlist !",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 18
    }),
    onClose: () => setToast(false)
  }, "On te pr\xE9viendra au lancement de Genesis.")));
}
window.Site = Site;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.StatChip = __ds_scope.StatChip;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
