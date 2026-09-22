/**
 * Agrega al formulario de inscripción (ya existente) las preguntas del
 * segundo día: mesa de trabajo de preferencia y vínculo con ITENUA.
 *
 * Cómo usarlo (una sola vez):
 *   1. Abre tu formulario en Google Forms en modo edición y copia la URL de la
 *      barra del navegador (empieza por https://docs.google.com/forms/d/ y termina en /edit).
 *   2. Pégala abajo, en URL_EDICION, entre las comillas.
 *   3. Abre https://script.google.com → Nuevo proyecto, pega este archivo y pulsa Ejecutar (▶).
 *      Autoriza cuando lo pida (es tu propio script, en tu cuenta).
 *   4. Recarga el formulario: las preguntas nuevas aparecen al final. Puedes moverlas
 *      arrastrándolas al lugar que prefieras.
 */
var URL_EDICION = "PEGA_AQUI_LA_URL_DE_EDICION";

function agregarPreguntas() {
  var form = FormApp.openByUrl(URL_EDICION);

  form.addMultipleChoiceItem()
    .setTitle("¿Eres o fuiste integrante del semillero ITENUA?")
    .setHelpText("Lo preguntamos por la conmemoración de los 15 años del semillero, el segundo día del encuentro.")
    .setChoiceValues(["Sí, actualmente", "Sí, fui integrante", "No"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Mesa de trabajo de preferencia")
    .setHelpText(
      "El segundo día, los egresados del semillero se reúnen con los estudiantes según el campo en que trabajan. " +
      "Si eres egresado, elige el campo en el que trabajas; si eres estudiante, el que más te interesa."
    )
    .setChoiceValues([
      "Educación básica y media",
      "Educación universitaria",
      "Finanzas",
      "Industria",
      "Academia e investigación",
      "Otras áreas"
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle("Si trabajas en otra área, ¿en cuál?")
    .setRequired(false);

  Logger.log("Listo: preguntas agregadas a " + form.getTitle());
}
