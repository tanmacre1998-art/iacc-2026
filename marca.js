/* ============================================================
   Marca del II Encuentro IACC: Δ (amarillo) y ∇ (rojo).

   window.MARCA.iso(svg, mode)      isotipo: solo los dos triángulos
   window.MARCA.imago(svg, mode)    imagotipo: paralelogramo con "II IACC"
   window.MARCA.isologo(svg, mode)  isologo: paralelogramo con el nombre

   mode: "color" | "mono" | "neg" | "colordark"
   Cada función dibuja dentro del <svg> dado y le fija el viewBox.
   ============================================================ */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var C = { rojo: "#c9151e", amarillo: "#f4d300", negro: "#1a1a1a", blanco: "#ffffff" };
  var FONT = "STIX Two Text, 'Times New Roman', Times, serif";
  var uid = 0;

  var S = 56, H = S * Math.sqrt(3) / 2;   // lado y altura del triángulo
  var TOP = 6, BOT = TOP + H;              // y de la arista superior e inferior
  var PAD = 4;

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function isMono(mode) { return mode === "mono" || mode === "neg"; }
  function ink(mode) { return (mode === "neg" || mode === "colordark") ? C.blanco : C.negro; }

  function triangle(svg, x, kind, color, mode, fadeDir) {
    var pts = kind === "up"
      ? [[x, BOT], [x + S, BOT], [x + S / 2, TOP]]
      : [[x, TOP], [x + S, TOP], [x + S / 2, BOT]];
    var fill = isMono(mode) ? ink(mode) : color;
    if (!isMono(mode) && fadeDir) {
      var id = "marca-g" + (++uid);
      var grad = el("linearGradient", {
        id: id, gradientUnits: "userSpaceOnUse", y1: 0, y2: 0,
        x1: fadeDir === "right" ? x : x + S, x2: fadeDir === "right" ? x + S : x
      }, svg);
      el("stop", { offset: "0", "stop-color": color, "stop-opacity": 1 }, grad);
      el("stop", { offset: "0.45", "stop-color": color, "stop-opacity": 0.95 }, grad);
      el("stop", { offset: "1", "stop-color": color, "stop-opacity": 0.06 }, grad);
      fill = "url(#" + id + ")";
    }
    el("polygon", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: fill }, svg);
  }

  function segment(svg, x1, x2, y, mode) {
    el("line", { x1: x1, x2: x2, y1: y, y2: y, stroke: ink(mode), "stroke-width": 1.6, "stroke-linecap": "round" }, svg);
  }

  // Δ a la izquierda, ∇ a la derecha, separados "gap".
  function base(svg, gap, mode, withSegments) {
    var xL = PAD, xR = xL + S + gap;
    svg.setAttribute("viewBox", "0 0 " + (xR + S + PAD) + " " + (BOT + PAD));
    triangle(svg, xL, "up", C.amarillo, mode, "right");
    triangle(svg, xR, "down", C.rojo, mode, "left");
    if (withSegments) {
      segment(svg, xL + S / 2, xR, TOP, mode);          // ápice de Δ → esquina superior de ∇
      segment(svg, xL + S, xR + S / 2, BOT, mode);      // base de Δ → ápice de ∇
    }
    return { xL: xL, xR: xR };
  }

  function iso(svg, mode) { base(svg, 8, mode, false); }

  function imago(svg, mode) {
    var b = base(svg, 160, mode, true);
    var cx = (b.xL + S / 2 + b.xR + S / 2) / 2;
    var t = el("text", { x: cx, y: TOP + H * 0.72, "text-anchor": "middle", "font-family": FONT, fill: ink(mode) }, svg);
    var a = el("tspan", { "font-size": 22, "font-style": "italic", fill: isMono(mode) ? ink(mode) : C.rojo }, t);
    a.textContent = "II ";
    var s = el("tspan", { "font-size": 30, "letter-spacing": 1.5 }, t);
    s.textContent = "IACC";
  }

  function isologo(svg, mode) {
    var b = base(svg, 236, mode, true);
    var lines = ["II Encuentro", "Interacciones entre Álgebra,", "Combinatoria y la Computación"];
    var y0 = TOP + 13.5, lh = 14.6;
    for (var i = 0; i < lines.length; i++) {
      var y = y0 + i * lh;
      var frac = (y - TOP) / H;                          // 0 arriba, 1 abajo
      var x = b.xL + S / 2 + frac * (S / 2) + 12;        // sigue el lado derecho de Δ
      var t = el("text", { x: x, y: y, "font-family": FONT, "font-size": i === 0 ? 12 : 13, fill: ink(mode) }, svg);
      if (i === 0) { t.setAttribute("font-style", "italic"); if (!isMono(mode)) t.setAttribute("fill", C.rojo); }
      t.textContent = lines[i];
    }
  }

  window.MARCA = { iso: iso, imago: imago, isologo: isologo };
})();
