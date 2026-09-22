# II Encuentro Interacciones entre Álgebra, Combinatoria y la Computación

Sitio estático del encuentro (19 y 20 de noviembre de 2026) y de la celebración de los
15 años del semillero ITENUA. No necesita servidor ni dependencias: es HTML, CSS y JS puro.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `config.js` | **Lo que cambias con más frecuencia**: enlace del formulario, lugar, correo, fecha límite. |
| `index.html` | Textos, conferencistas, programa, comité. Cada bloque tiene un comentario `<!-- -->` que explica cómo editarlo. |
| `styles.css` | Diseño. Los colores y tipografías están al inicio, en `:root`. |
| `script.js` | Calcula y dibuja el mosaico de tetrominós del inicio, las pestañas del programa, el menú móvil y rellena `config.js`. |
| `marca.js` | Dibuja la marca (isotipo, imagotipo, isologo) en la página. |
| `marca/` | La marca exportada en SVG (color, una tinta, negativo) y `exportar.html`, que genera PNG y SVG con la tipografía incrustada. |
| `assets/` | Logo de ITENUA, favicon, y ahí van fotos de conferencistas y PDFs del programa. |
| `propuestas/` | Las hojas de propuestas de identidad que se revisaron. Se pueden borrar. |

## Cómo conectar el formulario de inscripción (Google Forms)

Si aún no tienes formulario, `formulario/crear-formulario.gs` lo crea completo: ábrelo, sigue las
instrucciones del encabezado (pegar en script.google.com y ejecutar) y copia la URL "Embed" que
imprime. Si ya tienes uno:

1. Abre tu formulario en Google Forms y pulsa **Enviar**.
2. Elige la pestaña **`< >`** (Insertar HTML) y copia solo la URL que está dentro de `src="..."`.
   Termina en `?embedded=true`.
3. Pégala en `config.js`:

```js
formEmbedUrl: "https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true",
```

Al cargar la página, el formulario aparece dentro de la sección **Inscripción**. El botón
"Abrir el formulario en Google Forms" usa la misma URL sin `?embedded=true`.

## Cómo agregar conferencistas

En `index.html`, sección `§3 Conferencistas`, reemplaza un `<li class="speaker pending">` por:

```html
<li class="speaker">
  <img src="assets/conferencistas/nombre.jpg" alt="Foto de Nombre Apellido">
  <strong>Nombre Apellido</strong>
  <span>Universidad Nacional de Colombia</span>
</li>
```

Fotos cuadradas (mínimo 400 × 400 px) en `assets/conferencistas/`.

## Cómo editar el programa

En `index.html`, sección `§4 Programa`, hay una tabla por día. Cada fila es una actividad:

```html
<tr><td>9:30</td><td>Título de la charla</td><td>Nombre del conferencista</td></tr>
```

Cuando tengas los PDF, descomenta el bloque `<ul class="downloads">` y pon las rutas.

## Ver la página en tu computador

Basta con abrir `index.html` con doble clic. (Las tipografías se descargan de Google Fonts;
sin internet se verá con Times y Segoe UI, nada más.)

## Publicar gratis en GitHub Pages

Una sola vez:

1. Crea una cuenta en [github.com](https://github.com) si no la tienes.
2. Crea un repositorio nuevo, público, llamado por ejemplo `iacc-2026` (sin README).
3. En esta carpeta, en una terminal:

```bash
git init
git add .
git commit -m "Sitio del II Encuentro IACC"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/iacc-2026.git
git push -u origin main
```

4. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
   Branch: `main` / `(root)` → Save**.
5. En un par de minutos la página queda en `https://TU_USUARIO.github.io/iacc-2026/`.

Cada vez que cambies algo:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Si algún día quieren un dominio propio (por ejemplo `iacc.udistrital.edu.co`), se configura
en la misma pantalla de Pages con un registro CNAME; no cambia nada del sitio.

## La marca

La identidad sale de la notación de la diferenciación de Zavadskij, H<sup>∇</sup> + H<sub>Δ</sub>:
un triángulo amarillo (Δ) y uno rojo (∇) que se difuminan uno hacia el otro.

- **Isotipo**: solo los dos triángulos (favicon, redes, sello).
- **Imagotipo**: los triángulos unidos por dos segmentos, con "II IACC" dentro (barra de navegación, firmas).
- **Isologo**: lo mismo con el nombre completo dentro (cabecera, afiches, certificados).

Los archivos están en `marca/`. Para obtener PNG (por ejemplo, para Word o Canva), abre
`marca/exportar.html` en el navegador, elige el ancho y pulsa "Descargar PNG"; el SVG que
descarga desde ahí lleva la tipografía STIX Two incrustada, así que se ve igual en cualquier
programa. Word (2016 o posterior), PowerPoint, Canva e Inkscape aceptan SVG directamente;
para LaTeX conviene el PNG o convertir el SVG a PDF con Inkscape.

Colores: rojo `#C9151E`, amarillo `#F4D300`, negro `#1A1A1A`, blanco. Tipografía: STIX Two Text.

## Cartas membreteadas

En `membrete/` está el papel membreteado en LaTeX (se compila con pdflatex; MiKTeX ya lo tiene todo):

- `membrete.sty`: cabecera con el isologo (dibujado en TikZ, vectorial) y el escudo de la
  Universidad, pie con el sello de los 15 años y el sitio web, y los comandos de carta.
- `carta-invitacion.tex`: carta modelo para conferencistas. Para cada invitado, copia el
  archivo, cambia el bloque "DATOS DE ESTA CARTA" (fecha, tratamiento, nombre, cargo,
  institución, apellido, tipo de charla), ajusta el cuerpo si hace falta y compila:

```bash
pdflatex carta-invitacion.tex
```

Cuando exista el correo oficial, ponlo en `membrete.sty` (`\correo{...}`) y aparecerá en el pie.
Si en el comité prefieren Word, se puede hacer una versión .docx con el mismo diseño.
