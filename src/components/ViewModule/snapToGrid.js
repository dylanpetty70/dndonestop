export function snapToGrid(x, y, scale) {
  const snappedX = Math.round(x / scale) * scale
  const snappedY = Math.round(y / scale) * scale - 2
  return [snappedX, snappedY]
}
