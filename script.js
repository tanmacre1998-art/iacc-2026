(function () {
  "use strict";

  /* ------------------------------------------------------------
     1. Datos de config.js → página
     ------------------------------------------------------------ */
  var site = window.SITE || {};

  function setText(key, value) {
    document.querySelectorAll('[data-site="' + key + '"]').forEach(function (el) {
      el.textContent = value;
    });
  }
  function setLink(key, href, text) {
    document.querySelectorAll('[data-site="' + key + '"]').forEach(function (el) {
      if (href) {
        el.setAttribute("href", href);
        if (text) el.textContent = text;
      } else {
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-disabled");
      }
    });
  }

  var venueFull = [site.venue, site.city].filter(Boolean).join(", ");
  if (site.venue) {
    setText("venue", venueFull);
    setText("venueShort", venueFull);
  }
  if (site.registrationDeadline) setText("registrationDeadline", site.registrationDeadline);

  setLink("firstMeetingUrl", site.firstMeetingUrl);
  setLink("itenuaUrl", site.itenuaUrl);
  setLink("contactEmail", site.contactEmail ? "mailto:" + site.contactEmail : "", site.contactEmail);

  var formLink = site.formLinkUrl || (site.formEmbedUrl ? site.formEmbedUrl.replace(/\?embedded=true$/, "") : "");
  setLink("formLinkUrl", formLink);

  if (site.formEmbedUrl) {
    var host = document.getElementById("form-embed");
    var iframe = document.createElement("iframe");
    iframe.src = site.formEmbedUrl;
    iframe.title = "Formulario de inscripción";
    iframe.loading = "lazy";
    host.innerHTML = "";
    host.appendChild(iframe);
  }

  /* ------------------------------------------------------------
     2. Marca (isologo en el inicio, imagotipo en la barra)
     ------------------------------------------------------------ */
  document.querySelectorAll("svg[data-mark]").forEach(function (svg) {
    if (window.MARCA) window.MARCA[svg.getAttribute("data-mark")](svg, svg.getAttribute("data-mode") || "color");
  });

  /* ------------------------------------------------------------
     3. Pestañas del programa
     ------------------------------------------------------------ */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length]);
        if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length]);
      });
    });
  });

  /* ------------------------------------------------------------
     4. Menú en pantallas pequeñas
     ------------------------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
