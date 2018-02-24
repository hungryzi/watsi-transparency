export function getCenter(countryName) {
  const items = [
    [51.5, -0.1],
    [51.51, -0.1],
    [51.49, -0.05]
  ]

  return items[Math.floor(Math.random()*items.length)];
}
