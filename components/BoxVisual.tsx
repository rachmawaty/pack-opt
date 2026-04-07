"use client";

interface Props {
  l: number;
  w: number;
  h: number;
}

export default function BoxVisual({ l, w, h }: Props) {
  // isometric projection constants
  const scale = 120 / Math.max(l, w, h);
  const sl = l * scale;
  const sw = w * scale;
  const sh = h * scale;

  const ox = 20;   // left offset
  const oy = 120;  // top face baseline

  // isometric offsets
  const ix = 0.6;  // x step per unit right
  const iy = 0.35; // y step per unit right
  const jx = -0.6; // x step per unit depth
  const jy = 0.35; // y step per unit depth

  // 8 corners of the box
  // front-bottom-left as origin
  const pts = {
    fbl: [ox,              oy + sh],
    fbr: [ox + sl * ix,    oy + sh + sl * iy],
    ftr: [ox + sl * ix,    oy + sl * iy],
    ftl: [ox,              oy],
    bbl: [ox + sw * jx,    oy + sh + sw * jy],
    bbr: [ox + sl * ix + sw * jx, oy + sh + sl * iy + sw * jy],
    btr: [ox + sl * ix + sw * jx, oy + sl * iy + sw * jy],
    btl: [ox + sw * jx,    oy + sw * jy],
  };

  const p = (key: keyof typeof pts) => pts[key].join(",");

  return (
    <svg
      viewBox="-20 -10 220 200"
      className="w-full max-w-[260px] mx-auto"
      aria-label="Box diagram"
    >
      {/* back faces (darker) */}
      <polygon
        points={`${p("btl")} ${p("btr")} ${p("bbr")} ${p("bbl")}`}
        fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1"
      />
      {/* left face */}
      <polygon
        points={`${p("ftl")} ${p("fbl")} ${p("bbl")} ${p("btl")}`}
        fill="#a7f3d0" stroke="#6ee7b7" strokeWidth="1"
      />
      {/* right face */}
      <polygon
        points={`${p("fbr")} ${p("ftr")} ${p("btr")} ${p("bbr")}`}
        fill="#a7f3d0" stroke="#6ee7b7" strokeWidth="1"
      />
      {/* top face (lightest) */}
      <polygon
        points={`${p("ftl")} ${p("ftr")} ${p("btr")} ${p("btl")}`}
        fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1"
      />
      {/* front face */}
      <polygon
        points={`${p("fbl")} ${p("fbr")} ${p("ftr")} ${p("ftl")}`}
        fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1"
      />

      {/* dimension labels */}
      {/* width label — along bottom front edge */}
      <text
        x={(pts.fbl[0] + pts.fbr[0]) / 2}
        y={pts.fbl[1] + 14}
        textAnchor="middle"
        fontSize="10"
        fill="#15803d"
        fontWeight="600"
      >
        {l} cm
      </text>

      {/* height label — along front-left edge */}
      <text
        x={pts.ftl[0] - 14}
        y={(pts.ftl[1] + pts.fbl[1]) / 2 + 4}
        textAnchor="middle"
        fontSize="10"
        fill="#15803d"
        fontWeight="600"
      >
        {h} cm
      </text>

      {/* depth label — along top-left edge */}
      <text
        x={(pts.ftl[0] + pts.btl[0]) / 2 - 6}
        y={(pts.ftl[1] + pts.btl[1]) / 2 - 6}
        textAnchor="middle"
        fontSize="10"
        fill="#15803d"
        fontWeight="600"
      >
        {w} cm
      </text>
    </svg>
  );
}
