import 'server-only'
import sharp from 'sharp'
import {
  argbFromRgb,
  Hct,
  hexFromArgb,
  MaterialDynamicColors as C,
  QuantizerCelebi,
  SchemeTonalSpot,
  Score
} from '@material/material-color-utilities'

// Colour comes from the art, as in Geet: a tonal-spot M3 scheme from the
// image's seed colour, for light and dark. Falls back to a quiet seed.
const FALLBACK_SEED = 0xff6b5b95

const ROLES = {
  surface: C.surface,
  'surface-dim': C.surfaceDim,
  'surface-container-low': C.surfaceContainerLow,
  'surface-container': C.surfaceContainer,
  'surface-container-high': C.surfaceContainerHigh,
  'surface-container-highest': C.surfaceContainerHighest,
  'on-surface': C.onSurface,
  'on-surface-variant': C.onSurfaceVariant,
  outline: C.outline,
  'outline-variant': C.outlineVariant,
  primary: C.primary,
  'on-primary': C.onPrimary,
  'primary-container': C.primaryContainer,
  'on-primary-container': C.onPrimaryContainer,
  secondary: C.secondary,
  'secondary-container': C.secondaryContainer,
  'on-secondary-container': C.onSecondaryContainer,
  tertiary: C.tertiary,
  'tertiary-container': C.tertiaryContainer,
  'on-tertiary-container': C.onTertiaryContainer
}

export async function seedFrom(bytes) {
  if (!bytes) return FALLBACK_SEED
  try {
    const { data, info } = await sharp(bytes).resize(64, 64, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    const pixels = []
    for (let i = 0; i < data.length; i += info.channels) pixels.push(argbFromRgb(data[i], data[i + 1], data[i + 2]))
    const ranked = Score.score(QuantizerCelebi.quantize(pixels, 128), { desired: 1, fallbackColorARGB: FALLBACK_SEED })
    return ranked[0] ?? FALLBACK_SEED
  } catch {
    return FALLBACK_SEED
  }
}

function vars(seed, dark) {
  const scheme = new SchemeTonalSpot(Hct.fromInt(seed), dark, 0)
  return Object.entries(ROLES)
    .map(([name, role]) => `--m-${name}:${hexFromArgb(role.getArgb(scheme))};`)
    .join('')
}

/** CSS custom properties for both modes, scoped to `selector`. */
export function themeCss(seed, selector) {
  return `${selector}{${vars(seed, false)}color-scheme:light}` +
    `@media (prefers-color-scheme:dark){${selector}{${vars(seed, true)}color-scheme:dark}}`
}

/** A small, blurred copy of the art for the backdrop, as a data URL (computed once per cache). */
export async function backdrop(bytes) {
  if (!bytes) return null
  try {
    const out = await sharp(bytes).resize(48, 48, { fit: 'cover' }).blur(4).jpeg({ quality: 70 }).toBuffer()
    return `data:image/jpeg;base64,${out.toString('base64')}`
  } catch {
    return null
  }
}

/** The scheme's custom properties for light and dark, for a page that switches art itself. */
export function themeVars(seed) {
  return { light: vars(seed, false), dark: vars(seed, true) }
}
