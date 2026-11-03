const PALETTE = ["#E4572E", "#17A398", "#6C5CE7", "#E8A33D", "#2E86AB", "#C2437A", "#4C8C4A"];

export const initials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

export default function Avatar({ name, size = 44 }) {
  const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length;
  return (
    <span className="avatar" style={{ width: size, height: size, background: PALETTE[idx], fontSize: size * 0.38 }}>
      {initials(name)}
    </span>
  );
}
