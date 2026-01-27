**ESCUELA POLITÉCNICA NACIONAL**

**FACULTAD DE INGENIERÍA DE SISTEMAS**

**JUEGOS INTERACTIVOS**

**Karina Arichavala**

**DOCUMENTO DE DISEÑO DE VIDEOJUEGO (GDD)**

**Proyecto: Arithmos**

**I. FICHA TÉCNICA Y CONCEPTO (HIGH CONCEPT)**

Esta sección define la identidad comercial y educativa del proyecto,
estableciendo los límites técnicos y el alcance simplificado para el
desarrollo en Babylon.js.

**1.1 Título del Proyecto**

**Arithmos: El Reino de los Números**

**1.2 Género**

**Aventura de Puzzles en Primera Persona (Linear Puzzle Adventure /
Walking Simulator).** *Subgénero:* Point & Click Educativo en 3D.

**1.3 Plataforma**

**WebGL (Navegador Web para PC y Tablets).**

-   *Motor:* Babylon.js 6.0+

-   *Justificación:* Accesibilidad total sin descargas, optimizado para
    ejecutarse fluidamente en hardware escolar básico.

**1.4 Público Objetivo (Target)**

-   **Demográfico:** Estudiantes de 5to Grado de Educación General
    Básica (9 a 10 años).

-   **Psicográfico:** Niños en transición al pensamiento
    lógico-abstracto que requieren refuerzo visual para conceptos
    matemáticos complejos, prefiriendo experiencias de exploración
    tranquila sobre la competencia o combate.

**1.5 Elevator Pitch (Resumen Ejecutivo)**

*Arithmos* es una aventura de exploración y lógica en primera persona
donde el jugador asume el rol de un \"Ingeniero Mágico\". Su misión es
reactivar una antigua civilización matemática que ha sido sellada por el
caos. A diferencia de los juegos de acción, aquí no hay enemigos ni
combates; el jugador avanza resolviendo \"Puertas Lógicas\" que bloquean
su camino, utilizando conceptos del currículo de 5to grado (como
fracciones y coordenadas) como si fueran llaves para desbloquear el
siguiente pasillo.

**1.6 Referencia (X meets Y)**

\"Es como si **The Witness** (por la resolución de puzzles ambientales
pacíficos) se encontrara con **Khan Academy** (por el rigor
curricular).\"

**1.7 Puntos Únicos de Venta (USPs)**

1.  **Sincronización Curricular Vertical:** La progresión del juego es
    un espejo exacto del Texto Escolar de 5to Grado. El Nivel 1 enseña
    la Unidad 1, y el Nivel 10 evalúa la Unidad 6.

2.  **Mecánica \"Sin Estrés\" (Stress-Free Learning):** Se elimina el
    \"Game Over\", las vidas y el combate. El juego está diseñado para
    permitir la reflexión pausada; el único castigo por fallar un puzzle
    es una pista visual para volver a intentarlo.

3.  **Interfaz Diegética:** No hay exámenes en pantalla. Las matemáticas
    son parte del mundo: para abrir una puerta, el jugador no \"responde
    un quiz\", sino que interactúa físicamente con el objeto correcto
    del entorno.

**II. ANÁLISIS MDA (EL NÚCLEO DEL DISEÑO)**

El diseño de *Arithmos* utiliza el marco de trabajo MDA (Mechanics,
Dynamics, Aesthetics) para estructurar una experiencia que transforma la
ansiedad matemática en confianza y curiosidad.

**2.1 Aesthetics (Estética - La Experiencia Emocional)**

¿Qué buscamos que sienta el estudiante de 9-10 años al jugar?

1.  **Empoderamiento (Competence):** La sensación de capacidad y logro.
    Buscamos transformar la frustración habitual ante un problema
    matemático en satisfacción, permitiendo que el estudiante vea cómo
    su conocimiento tiene un efecto tangible en el mundo, como abrir una
    puerta cerrada o reparar un puente .

2.  **Descubrimiento (Discovery):** La curiosidad por explorar el reino
    de *Arithmos*. El jugador no avanza por la obligación de \"hacer
    deberes\", sino por el deseo genuino de descubrir qué nuevo bioma o
    secreto se desbloquea al resolver el acertijo actual .

3.  **Fantasía (Fantasy):** La inmersión en el rol de \"Guardián de la
    Lógica\". El niño deja de ser un alumno pasivo para convertirse en
    el héroe que restaura el orden en un mundo caótico, dándole un
    propósito narrativo y épico a las operaciones abstractas .

**2.2 Dynamics (Dinámicas - El Comportamiento del Sistema)**

¿Cómo interactúan las reglas para generar esas emociones?

1.  **Progresión por Maestría (Knowledge Gating):** Las barreras del
    mundo no se abren con llaves físicas encontradas en el suelo, sino
    mediante la aplicación lógica de conceptos matemáticos. El jugador
    aprende dinámicamente que prestar atención a la lógica es la única
    forma de avanzar, incentivando el aprendizaje sin necesidad de
    castigos externos.

2.  **Fallo Seguro (Safe Failure):** El sistema está diseñado para
    reducir la ansiedad matemática eliminando el estado de \"Game Over".
    Si el jugador selecciona una respuesta incorrecta, el entorno
    reacciona visualmente (el mecanismo tiembla o emite un sonido suave)
    y el mentor ofrece una pista, convirtiendo el error en parte natural
    del proceso de iteración.

3.  **Narrativa Ambiental:** Los problemas matemáticos no son
    abstractos, sino situaciones contextualizadas en el entorno.
    Calcular una fracción o una coordenada no es un ejercicio aislado,
    sino la acción necesaria para reconstruir la arquitectura del nivel.

**2.3 Mechanics (Mecánicas - Las Reglas del Sistema)**

Las reglas fundamentales que rigen la interacción del jugador con el
mundo virtual:

1.  **Mecánica de Selección Lógica (Point & Click):** La interacción
    principal se basa en la observación y la deducción. El jugador
    navega por el entorno y utiliza el cursor para seleccionar objetos
    interactivos que representan posibles soluciones a un problema
    planteado (ej. elegir entre tres esferas con distintos valores
    numéricos).

2.  **Sistema de Validación de Respuestas:** Al interactuar con un
    objeto, el sistema evalúa internamente si el valor del objeto
    seleccionado coincide con el requisito del obstáculo (ej. si la
    fracción seleccionada corresponde a la apertura del puente). Una
    coincidencia exitosa activa la animación de desbloqueo, mientras que
    una discrepancia activa el sistema de retroalimentación de error .

3.  **Navegación y Exploración:** El jugador tiene libertad de
    movimiento para explorar las \"Salas de Puzzle\" y examinar los
    problemas desde diferentes ángulos, fomentando la observación
    detallada antes de tomar una decisión de selección.

**III. MECÁNICAS DETALLADAS (GAME SYSTEM DESIGN)**

Esta sección profundiza en el funcionamiento técnico de las mecánicas,
definiendo el ciclo de interacción y los sistemas que soportan la
experiencia de juego.

**3.1 Core Loop (Ciclo de Juego Principal)**

El bucle de acciones que el jugador repetirá constantemente para generar
aprendizaje y progreso:

1.  **Observación (Exploración):** El jugador navega por el pasillo
    lineal hasta encontrar un obstáculo visual (una puerta cerrada o un
    puente retraído) que impide el avance.

2.  **Análisis (Identificación del Problema):** El jugador examina el
    entorno para comprender el concepto matemático requerido. Por
    ejemplo, leer un grabado en la puerta que solicita \"La mitad\" o
    una coordenada específica.

3.  **Selección (Acción):** El jugador interactúa mediante un clic del
    mouse con uno de los objetos flotantes disponibles (opciones de
    respuesta) que cree es la solución correcta.

4.  **Feedback (Resolución):**

    -   **Éxito:** El obstáculo se despeja (la puerta se abre),
        otorgando satisfacción inmediata y permitiendo el paso al
        siguiente sector.

    -   **Fallo:** El objeto seleccionado indica error visualmente y el
        mentor (Pipo) proporciona una pista para reorientar al jugador
        sin penalización grave.

**3.2 Sistemas de Juego**

**A. Sistema de Interacción (Point & Click System)** Sustituye las
mecánicas de combate o física compleja por un sistema de validación
lógica.

-   **Input:** El sistema detecta la posición del cursor y los clics del
    jugador sobre los \"Objetos Interactivos Matemáticos\" (MIOS).

-   **Validación:** Cada objeto interactivo posee un valor interno. Al
    ser seleccionado, el sistema compara este valor con el requisito del
    obstáculo actual. Si coinciden, se activa el evento de apertura; si
    no, se activa el evento de error.

**B. Sistema de Asistencia Adaptativa (Mentor System)** Para evitar el
bloqueo o la frustración, el juego implementa un sistema de pistas
gestionado por el NPC \"Pipo\":

-   **Estado Pasivo:** Pipo acompaña al jugador en silencio, permitiendo
    la reflexión autónoma.

-   **Estado Activo:** Tras un intento fallido o un tiempo de
    inactividad prolongado, Pipo interviene ofreciendo una pista
    contextual (ej. resaltar sutilmente la propiedad matemática clave) .

**C. Sistema de Progresión Lineal (Unlock System)** La estructura del
juego es secuencial, basada en \"Cámaras de Desafío\".

-   **Avance:** No existen puntos de experiencia ni subida de niveles
    del personaje. La progresión se mide por la superación de obstáculos
    que corresponden a las Unidades del texto escolar.

-   **Hitos:** Al completar una secuencia de puzzles, el jugador
    desbloquea el acceso al siguiente bioma temático.

**3.3 Mapeo de Controles (Input Mapping)**

El esquema de control está diseñado para la máxima accesibilidad en PC
(Mouse y Teclado), priorizando la simplicidad.

  -----------------------------------------------------------------------
  **Acción**           **Input (PC)**     **Contexto**
  -------------------- ------------------ -------------------------------
  **Moverse**          Teclas W, A, S, D  Desplazamiento del personaje
                                          por el escenario.

  **Mirar**            Movimiento del     Control de la cámara en primera
                       Mouse              persona.

  **Interactuar /      Clic Izquierdo     Seleccionar respuestas o
  Seleccionar**                           activar mecanismos.

  **Pausar / Menú**    Tecla ESC          Acceso al menú principal y
                                          opciones.
  -----------------------------------------------------------------------

Aquí tienes la **Sección IV** completa, ajustada para reflejar que el
juego es una aventura de puzzles sin combate. La narrativa ahora se
centra en \"reparar\" el mundo en lugar de \"luchar\" contra él.

**IV. NARRATIVA Y MUNDO (WORLDBUILDING)**

Esta sección describe el contexto ficticio que da sentido a los
problemas matemáticos, transformando ejercicios abstractos en misiones
heroicas de reparación y descubrimiento.

**4.1 Premisa del Mundo (Setting)**

El juego transcurre en **Arithmos**, un antiguo universo digital
construido sobre los cimientos de la \"Lógica Dorada\". En Arithmos, las
leyes de la física son literalmente matemáticas: los puentes se
sostienen gracias a fracciones equivalentes y las puertas se abren
mediante coordenadas exactas. Recientemente, una anomalía conocida como
**\"El Glitch\"** (La Discordia) ha infectado el núcleo del mundo,
desordenando las ecuaciones que mantienen la realidad unida. Los números
han perdido su valor y las estructuras geométricas se han desmoronado o
bloqueado el paso.

**4.2 Sinopsis de la Historia**

El jugador asume el rol del último **Aprendiz de los Guardianes**.
Despierta en el Valle Cartesiano (Nivel 1) sin recuerdos, guiado
únicamente por el \"Códice\" (una representación diegética del Texto
Escolar). Su misión es viajar a través de las distintas Regiones de
Arithmos, que corresponden a las Unidades del libro de 5to Grado, para
restaurar los \"Pilares de Lógica\" corruptos. A medida que avanza y
resuelve los puzzles de bloqueo (Puertas Lógicas), el Aprendiz
\"depura\" el código del mundo, eliminando el Glitch y devolviendo el
orden hasta llegar al núcleo final.

**4.3 Personajes Principales**

**A. El Guardián (Avatar del Jugador)**

-   **Rol:** Protagonista silencioso en primera persona.

-   **Habilidad:** Posee la \"Visión Lógica\", que le permite ver e
    interactuar con los valores numéricos ocultos en los objetos del
    entorno (Mecánica Point & Click).

-   **Motivación:** Restauración del orden y curiosidad por descubrir el
    origen del Glitch.

**B. Pipo (El Mentor)**

-   **Apariencia:** Un pequeño búho robótico flotante con una pantalla
    por rostro.

-   **Función Diegética:** Actúa como la interfaz de usuario (UI) y el
    sistema de ayuda integrado. Pipo escanea los puzzles y ofrece pistas
    visuales o verbales cuando el jugador se atasca en una selección.

-   **Personalidad:** Alentador, paciente y metódico.

**C. El Glitch (Antagonista Ambiental)**

-   **Naturaleza:** No es un villano con personalidad, sino una fuerza
    caótica pasiva. Se manifiesta como estática visual, números erróneos
    flotantes y barreras de color rojo que bloquean el camino.

-   **Metáfora:** Representa la confusión y el error matemático que el
    estudiante debe \"corregir\" mediante la lógica, no \"destruir\"
    mediante la fuerza.

**4.4 Premisa Pedagógica (Juego Serio)**

El diseño narrativo sigue una estructura de Andamiaje Cognitivo
(Scaffolding) alineada con el currículo nacional:

1.  **Narrativa como Contexto:** Los problemas matemáticos no son
    abstractos; son situaciones contextualizadas. Calcular un perímetro
    es la única forma de reconstruir la muralla de la Torre para poder
    cruzarla.

2.  **Progresión Curricular:** La historia evoluciona en dificultad
    paralela al año escolar:

    -   **Acto 1 (Fundamentos):** Coordenadas y Aritmética básica
        (Niveles 1-3).

    -   **Acto 2 (Complejidad):** Fracciones y Geometría (Niveles 4-6).

    -   **Acto 3 (Resolución):** Decimales y Lógica Combinatoria
        (Niveles 7-10).

**V. DISEÑO DE NIVELES (LEVEL DESIGN)**

El diseño de niveles de *Arithmos* sigue una progresión lineal basada en
el currículo de 5to Grado. Cada nivel funciona como una \"Cámara de
Desafío\" (Challenge Room) conectada por pasillos narrativos.

**5.1 Estructura Estándar y Layout (Pattern Design)**

Para mantener la consistencia y facilitar la orientación del jugador,
todos los niveles siguen el mismo patrón arquitectónico de flujo lineal:

**Esquema del Mapa (Vista Superior General):**

\[ SALIDA / META \]

\^

\|

(Zona de Transición)

\[ OBSTÁCULO LÓGICO \] \<\-\-- La Puerta/Puente/Barrera

\^

\|

\[ ZONA DE INTERACCIÓN \]

(Opc A) (Opc B) (Opc C) \<\-\-- Objetos Flotantes

\^

\|

\[ ZONA DE APROXIMACIÓN \]

(Pasillo seguro donde Pipo explica el tema)

\^

\|

\[ ENTRADA \]

-   **Flujo de Dificultad:** La dificultad no radica en la destreza
    (saltos o puntería), sino en la complejidad abstracta del concepto
    matemático, la cual aumenta progresivamente desde el Nivel 1
    (identificación visual simple) hasta el Nivel 10 (lógica abstracta).

**5.2 Desglose de Niveles y Objetivos**

**NIVEL 1: El Valle Cartesiano**

-   **Tema:** Coordenadas (x,y)

-   **Objetivo:** Abrir la Gran Puerta de Piedra.

-   **Layout:** Un valle verde con ruinas antiguas. Al final del
    sendero, una puerta con un panel de cuadrícula brillante.

-   **Interacción:** Pipo solicita la coordenada (2,3). El jugador debe
    hacer clic en el botón situado en la intersección correcta del panel
    para deslizar la puerta.

**NIVEL 2: La Montaña de Cifras**

-   **Tema:** Valor Posicional y Suma.

-   **Objetivo:** Despertar al Golem Guardián.

-   **Layout:** Un paso de montaña estrecho bloqueado por un gigante de
    roca dormido que tiene el número **15,420** grabado.

-   **Interacción:** Tres orbes de energía flotan cerca. El jugador
    selecciona el orbe cuya suma descompuesta coincide con el valor del
    Golem (\$10,000 + 5,000 + 400 + 20\$).

**NIVEL 3: Fábrica de Multiplicación**

-   **Tema:** Multiplicación y Propiedad Distributiva.

-   **Objetivo:** Reactivar el Generador Principal.

-   **Layout:** Interior industrial. Un generador apagado impide que el
    ascensor funcione. Requiere una carga de **48V**.

-   **Interacción:** El jugador debe seleccionar la batería que muestra
    la operación correcta (6 x 8) entre varias opciones incorrectas (6+8
    o 88).

**NIVEL 4: El Río Divisor**

-   **Tema:** División Exacta.

-   **Objetivo:** Disolver la Barrera de Glitch.

-   **Layout:** Un puente de cristal sobre un río de datos. Una pared de
    estática roja con el número **24** bloquea el paso.

-   **Interacción:** El jugador elige una \"Varita Divisora\" con el
    número **6** (divisor exacto) para fragmentar la barrera en partes
    iguales y eliminarla.

**NIVEL 5: El Puente Fraccionario**

-   **Tema:** Fracciones Simples (1/2) y Representación Gráfica.

-   **Objetivo:** Bajar el Puente Levadizo.

-   **Layout:** Islas flotantes. Un puente mecánico está alzado. La
    consola de control muestra el símbolo \"1/2\".

-   **Interacción:** Tres palancas con hologramas visuales (pasteles
    gráficos). El jugador debe hacer clic en la palanca que muestra el
    gráfico de la mitad exacta para activar el mecanismo.

**NIVEL 6: La Torre del Perímetro**

-   **Tema:** Perímetro de Polígonos.

-   **Objetivo:** Reparar la Muralla Defensiva.

-   **Layout:** Almenas de un castillo. Hay un hueco en la pared con
    forma de trapecio y las medidas de sus lados (2m, 3m, 2m, 3m).

-   **Interacción:** El jugador selecciona el bloque de piedra que
    corresponde a la suma total de los lados (**10m**) para que encaje
    mágicamente y complete el muro.

**NIVEL 7: Mercado Decimal**

-   **Tema:** Números Decimales (Dinero).

-   **Objetivo:** Pagar el Peaje del Mercado.

-   **Layout:** Un bazar antiguo automatizado. Un torno de acceso pide
    una tarifa exacta de **\$3.50**.

-   **Interacción:** Se presentan grupos de monedas virtuales. El
    jugador selecciona el grupo que suma la cantidad decimal exacta para
    liberar el torno.

**NIVEL 8: La Cueva Cuadrada**

-   **Tema:** Área $m^{2}$.

-   **Objetivo:** Iluminar el Camino Seguro.

-   **Layout:** Una caverna oscura. El suelo tiene baldosas apagadas. Se
    requiere iluminar un área rectangular de **12** baldosas (3x4).

-   **Interacción:** El jugador activa el interruptor que enciende la
    cuadrícula de 3x4 en el suelo, revelando el camino sobre el abismo.

**NIVEL 9: Laboratorio Cúbico**

-   **Tema:** Volumen $m^{3}$..

-   **Objetivo:** Abrir la Compuerta Hidráulica.

-   **Layout:** Instalación subacuática. Un tanque vacío conecta con la
    puerta de salida. Se necesita llenar con ${8m}^{2}$. de agua.

-   **Interacción:** El jugador selecciona la válvula conectada al
    contenedor de volumen correcto para llenar el sistema y abrir la
    compuerta por presión.

**NIVEL 10: El Núcleo (The Core)**

-   **Tema:** Lógica y Secuencias (Combinatoria).

-   **Objetivo:** Reiniciar el Sistema (Eliminar el Glitch Final).

-   **Layout:** El corazón digital de Arithmos. Una pantalla gigante
    muestra patrones de colores cambiantes (la fuente del caos).

-   **Interacción:** El Glitch muestra una serie lógica incompleta
    (Rojo, Azul, Rojo, Azul, \...). El jugador debe seleccionar el color
    final correcto para estabilizar el sistema y ganar el juego.

Aquí tienes la **Sección VI: Arte y Audio** completamente renovada.

He puesto mucho énfasis en tu petición sobre la música: debe sentirse
como una **aventura épica** (para que el niño se sienta héroe), pero con
un ritmo **\"Zen\"** (para que no se estrese ni sienta que se le acaba
el tiempo).

Copia y pega esto en tu documento:

**VI. ARTE Y AUDIO (LOOK & FEEL)**

La dirección artística de *Arithmos* está diseñada para crear un entorno
de aprendizaje libre de estrés. El objetivo es reducir la carga
cognitiva visual y auditiva, permitiendo que el estudiante se concentre
exclusivamente en el razonamiento lógico.

**6.1 Dirección de Arte Visual**

-   **Estilo Gráfico:** Low Poly / Flat Shading (Minimalista).

    -   **Concepto:** El mundo parece construido con bloques de juguete
        coloridos y suaves. Se eliminan las texturas ruidosas o
        hiperrealistas que distraen la atención.

    -   **Referencia:** Estética similar a *Monument Valley* o *Animal
        Crossing*.

    -   **Justificación Técnica:** Garantiza un rendimiento fluido (60
        FPS) en navegadores web escolares.

-   **Paleta de Colores Funcional (Color-Coding):** El color no es solo
    decorativo, comunica la función de los objetos:

    -   **Ambiente (Fondo):** Tonos pasteles fríos y desaturados (Azul
        Cielo #87CEEB, Verde Menta #98FF98) para transmitir calma y
        seguridad.

    -   **Interactables (Primer Plano):** Los objetos del puzzle
        (palancas, botones) usan colores cálidos y saturados (Naranja
        #FFA500, Amarillo Dorado #FFD700) para indicar: *\"Aquí debes
        hacer clic\"*.

**6.2 Diseño de Audio (Soundscape)**

El audio es la herramienta principal para controlar el ritmo emocional
del juego.

-   **Filosofía Musical: \"Aventura Sin Prisa\"**

    -   La música **NO** debe tener tempos rápidos, percusión agresiva
        ni bucles cortos que generen ansiedad o sensación de cuenta
        regresiva.

    -   Se busca un estilo **Ambient Orchestral**. Instrumentación
        orgánica (piano, flauta, cuerdas suaves) con mucho espacio y
        silencio entre notas.

    -   **Referencia Sonora:** La música de exploración de *Minecraft*
        (C418) o *The Legend of Zelda: Breath of the Wild* (Piano
        ambiental).

    -   **Tempo:** Entre 60 y 80 BPM (Latidos en reposo).

-   **Diseño de Efectos de Sonido (SFX):** Los sonidos deben ser
    \"redondos\" y amables, evitando ruidos estridentes o alarmas.

    -   **Interacción (Hover):** Un suave *click* de madera o burbuja al
        pasar el mouse por una opción.

    -   **Éxito (Success):** Un arpegio ascendente de arpa o campanillas
        (Feedback positivo inmediato).

    -   **Error (Fail):** Un sonido grave y seco (como madera chocando),
        pero nunca un \"Buzzer\" de error tipo concurso de TV, para no
        castigar emocionalmente al niño.

    -   **Voces:** El mentor Pipo utiliza \"Gibberish\" (balbuceo
        sintetizado agudo y alegre), lo que añade carisma sin necesidad
        de doblaje costoso.

**6.3 Interfaz de Usuario (UI/UX)**

-   **Cursor Reactivo:** El puntero del mouse cambia de forma (de Flecha
    a Mano) o brilla cuando pasa sobre un objeto interactivo, indicando
    claramente qué es \"clicable\".

-   **Ausencia de HUD:** No hay contadores de tiempo, ni barras de vida,
    ni puntuaciones en pantalla. La pantalla está limpia para favorecer
    la inmersión.

**VII. ARQUITECTURA DE SOFTWARE (INGENIERÍA)**

Esta sección define la estructura técnica del proyecto *Arithmos*. La
arquitectura ha sido diseñada priorizando la **modularidad** (bajo
acoplamiento) y la **mantenibilidad**, utilizando principios de
ingeniería de software (SOLID) sobre un motor basado en la web.

**7.1 Stack Tecnológico y Herramientas**

Selección de herramientas basada en la accesibilidad web y la robustez
del tipado estático.

  --------------------------------------------------------------------------
  **Categoría**      **Tecnología**   **Justificación Técnica**
  ------------------ ---------------- --------------------------------------
  **Motor Gráfico**  **Babylon.js     Framework nativo de WebGL. Permite
                     6.0+**           despliegue directo en navegadores sin
                                      plugins y está optimizado para
                                      hardware escolar.

  **Lenguaje**       **TypeScript     El tipado estático es crítico para
                     5.0**            prevenir errores en tiempo de
                                      ejecución (ej: sumar string con
                                      number) y facilita el refactoring del
                                      código lógico.

  **Control de       **Git + GitHub** Gestión del código fuente. Se
  Versiones**                         utilizará un flujo de trabajo
                                      simplificado (*Trunk Based
                                      Development*) adecuado para un solo
                                      desarrollador.

  **Persistencia**   **LocalStorage   Sistema ligero para guardar el
                     (JSON)**         progreso (Nivel Desbloqueado) en el
                                      navegador del cliente, evitando la
                                      complejidad de una base de datos SQL
                                      remota.

  **IDE**            **Visual Studio  Con extensiones ESLint y Prettier para
                     Code**           asegurar la calidad y formato del
                                      código.
  --------------------------------------------------------------------------

**7.2 Patrones de Diseño Aplicados**

Para evitar el \"Spaghetti Code\", se implementarán los siguientes
patrones de diseño estándar:

1.  **Singleton Pattern (Patrón Creacional):**

    -   *Aplicación:* Clase GameManager.

    -   *Justificación:* Necesitamos una única instancia global que
        coordine el estado del juego (Saber si estamos en el Menú,
        Jugando o en Pausa) y que sea accesible desde cualquier script
        sin pasar referencias constantemente.

2.  **Observer Pattern (Patrón de Comportamiento):**

    -   *Aplicación:* Sistema de Puzzles (PuzzleManager).

    -   *Justificación:* Desacopla la lógica de la respuesta visual.
        Cuando el jugador selecciona la respuesta correcta, el objeto
        emite una notificación (notifyObservers). La Puerta y el Audio,
        que están \"escuchando\", reaccionan independientemente. Esto
        permite cambiar la puerta por un puente sin tocar el código del
        puzzle.

3.  **State Pattern (Patrón de Comportamiento):**

    -   *Aplicación:* Flujo de Escenas.

    -   *Justificación:* Gestiona las transiciones entre MainMenuState,
        GameplayState y WinState, asegurando que el jugador no pueda
        mover el personaje mientras está en el menú.

**7.3 Diagramas de Ingeniería**

**A. Diagrama de Clases Conceptual (Core Architecture)** Estructura
estática de las clases principales para el prototipo:

-   **GameManager (Singleton):** El cerebro. Controla CurrentState y
    carga las escenas.

-   **PlayerController:** Gestiona el input (WASD) y la cámara. No tiene
    lógica de juego, solo física de movimiento.

-   **InteractableObject:** Clase base para cualquier objeto cliqueable.

    -   *Atributos:* id, value, isCorrect.

    -   *Métodos:* onPointerDown().

-   **DoorMechanism:** Controla la animación de salida. Se suscribe al
    InteractableObject.


**B. Diagrama de Estados (Game Flow)** Flujo de estados del sistema para
la gestión de la sesión de juego:

1.  **Init (Start):** Carga de assets y conexión con Babylon.js engine.

2.  **Menu State:** Muestra UI de \"Iniciar\". El tiempo de juego está
    detenido.

3.  **Gameplay State:**

    -   *Listening:* Esperando input del jugador.

    -   *Processing:* Validando respuesta del puzzle.

4.  **Transition State:** Animación de puerta abriéndose/Carga de nivel.

5.  **Win State:** Mensaje final y guardado de progreso en LocalStorage.

**7.4 Estructura de Datos (Persistencia)**

El guardado de partida será un archivo JSON simple almacenado
localmente:

{

\"player_id\": \"student_01\",

\"last_level_completed\": 4,

\"settings\": {

\"sound_volume\": 0.8,

\"music_enabled\": true

}

}
