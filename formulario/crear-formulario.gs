/**
 * Crea el formulario de inscripción del II Encuentro IACC en tu cuenta de Google.
 *
 * Cómo usarlo (una sola vez):
 *   1. Abre https://script.google.com y pulsa "Nuevo proyecto".
 *   2. Borra el contenido del editor y pega este archivo completo.
 *   3. Pulsa "Ejecutar" (▶) con la función crearFormulario seleccionada.
 *      La primera vez Google pide autorización: "Revisar permisos" → tu cuenta →
 *      "Avanzado" → "Ir a ... (no seguro)" → "Permitir". Es tu propio script.
 *   4. Abre "Registro de ejecución" (abajo): ahí están las URL.
 *      Copia la de "embed" en config.js → formEmbedUrl.
 *
 * Después puedes editar el formulario en Google Forms como cualquier otro.
 */
function crearFormulario() {
  var form = FormApp.create("Inscripción · II Encuentro Interacciones entre Álgebra, Combinatoria y la Computación");

  form.setDescription(
    "19 y 20 de noviembre de 2026. Entrada libre con inscripción previa.\n" +
    "Con esta inscripción reservamos tu cupo y preparamos tu certificado de asistencia. " +
    "Los datos se usan únicamente para la organización del encuentro."
  );
  form.setCollectEmail(false);          // el correo se pide como pregunta, para validarlo
  form.setAllowResponseEdits(true);
  form.setLimitOneResponsePerUser(false); // true obliga a iniciar sesión con Google
  form.setConfirmationMessage(
    "Inscripción recibida. Te escribiremos al correo indicado con el programa definitivo y el lugar. " +
    "Si necesitas cambiar algo, responde a ese correo."
  );

  // ---------- Datos personales ----------
  form.addSectionHeaderItem().setTitle("Datos personales");

  form.addTextItem()
    .setTitle("Nombre completo")
    .setHelpText("Tal como debe aparecer en el certificado.")
    .setRequired(true);

  var correo = form.addTextItem()
    .setTitle("Correo electrónico")
    .setHelpText("Al que enviaremos la confirmación y el certificado.")
    .setRequired(true);
  correo.setValidation(FormApp.createTextValidation()
    .setHelpText("Escribe un correo válido.")
    .requireTextIsEmail()
    .build());

  form.addTextItem()
    .setTitle("Número de documento de identidad")
    .setHelpText("Solo para el certificado. Puedes dejarlo en blanco si no lo necesitas.")
    .setRequired(false);

  // ---------- Vinculación ----------
  form.addSectionHeaderItem().setTitle("Vinculación académica");

  form.addTextItem()
    .setTitle("Institución")
    .setHelpText("Universidad, colegio o entidad. Si no tienes, escribe \"Independiente\".")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Rol")
    .setChoiceValues([
      "Estudiante de pregrado",
      "Estudiante de posgrado",
      "Profesor(a)",
      "Investigador(a)",
      "Egresado(a)"
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem()
    .setTitle("Programa o departamento")
    .setHelpText("Por ejemplo: Matemáticas, Ingeniería de Sistemas, Licenciatura en Matemáticas.")
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle("Áreas de interés")
    .setChoiceValues(["Álgebra", "Combinatoria", "Computación", "Teoría de números"])
    .setRequired(false);

  // ---------- Participación ----------
  form.addSectionHeaderItem().setTitle("Participación");

  form.addMultipleChoiceItem()
    .setTitle("¿Cómo participarás?")
    .setChoiceValues([
      "Solo como asistente",
      "Quiero proponer una ponencia o charla corta",
      "Quiero presentar un póster"
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle("Título de la ponencia o póster")
    .setHelpText("Solo si marcaste que quieres presentar. El comité te escribirá para pedir el resumen.")
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle("Días a los que asistirás")
    .setChoiceValues(["Jueves 19 de noviembre", "Viernes 20 de noviembre"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("¿Eres o fuiste integrante del semillero ITENUA?")
    .setHelpText("Lo preguntamos por la celebración de los 15 años del semillero.")
    .setChoiceValues(["Sí, actualmente", "Sí, fui integrante", "No"])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Observaciones")
    .setHelpText("Necesidades de accesibilidad, alimentación u otra información que debamos conocer.")
    .setRequired(false);

  // ---------- Consentimiento ----------
  form.addCheckboxItem()
    .setTitle("Tratamiento de datos")
    .setChoiceValues(["Autorizo el uso de mis datos para la organización del encuentro y la expedición del certificado."])
    .setRequired(true);

  // ---------- Hoja de respuestas ----------
  var hoja = SpreadsheetApp.create("Respuestas · Inscripción II Encuentro IACC");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hoja.getId());

  var publicada = form.getPublishedUrl();
  var embed = publicada.replace(/\/viewform.*$/, "/viewform?embedded=true");

  Logger.log("Formulario creado.");
  Logger.log("Editar:      " + form.getEditUrl());
  Logger.log("Público:     " + publicada);
  Logger.log("Embed:       " + embed + "   ← pégalo en config.js (formEmbedUrl)");
  Logger.log("Respuestas:  " + hoja.getUrl());
}
