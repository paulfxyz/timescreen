export const PICTURE_DEFAULTS = Object.freeze({
  brightness: 100, contrast: 100, saturation: 100, temperature: 0,
});
export const PICTURE_LIMITS = Object.freeze({
  brightness: [15, 150], contrast: [70, 140], saturation: [0, 160], temperature: [-50, 50],
});
export const PICTURE_PRESETS = Object.freeze({
  standard: { label: 'Standard', brightness: 100, contrast: 100, saturation: 100, temperature: 0 },
  cinema: { label: 'Cinema', brightness: 80, contrast: 108, saturation: 85, temperature: 16 },
  vivid: { label: 'Vivid', brightness: 115, contrast: 112, saturation: 125, temperature: -6 },
  night: { label: 'Night', brightness: 35, contrast: 95, saturation: 70, temperature: 22 },
});
export function normalizePicture(values = {}) {
  return Object.fromEntries(Object.entries(PICTURE_LIMITS).map(([key, [min, max]]) => {
    const value = Number(values[key]);
    return [key, values[key] !== undefined && values[key] !== null && values[key] !== '' && Number.isFinite(value)
      ? Math.round(Math.max(min, Math.min(max, value))) : PICTURE_DEFAULTS[key]];
  }));
}
export function pictureFilter(picture) {
  const p = normalizePicture(picture);
  return `brightness(${p.brightness / 100}) contrast(${p.contrast / 100}) saturate(${p.saturation / 100})`;
}
export function matchingPicturePreset(picture) {
  return Object.entries(PICTURE_PRESETS).find(([, preset]) =>
    Object.keys(PICTURE_LIMITS).every(key => picture[key] === preset[key]))?.[0] || 'custom';
}
