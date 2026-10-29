import * as THREE from 'three';

// Preserve the supplied studio light positions, but remove its pink/cyan cast.
// Brand-coloured scene lights then provide the soft lime-green highlights.
export function neutralizeEnvironment(texture: THREE.Texture) {
  if (texture.userData.tocyNeutral) return texture;
  const data = texture.image?.data;
  if (!data) return texture;
  const half = texture.type === THREE.HalfFloatType;
  for (let i = 0; i < data.length; i += 4) {
    const read = (index: number) => half ? THREE.DataUtils.fromHalfFloat(data[index]) : data[index];
    const luminance = 0.2126 * read(i) + 0.7152 * read(i + 1) + 0.0722 * read(i + 2);
    const value = half ? THREE.DataUtils.toHalfFloat(luminance) : luminance;
    data[i] = data[i + 1] = data[i + 2] = value;
  }
  texture.userData.tocyNeutral = true;
  texture.needsUpdate = true;
  return texture;
}
