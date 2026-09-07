# Guía de uso de AI Graph Studio

## 1. Qué hace

Permite dibujar arquitecturas de IA, documentar pasos, estimar tokens y costes, detectar posibles problemas y simular recorridos. Funciona en el navegador, sin API de IA, claves ni cuenta. No ejecuta modelos, herramientas, prompts ni el contenido de los nodos Código. Un grafo exportado no es un agente ejecutable.

La filosofía es utilizar la mínima inteligencia computacional necesaria para completar correctamente la tarea. Es una recomendación contextual: compara calidad, coste, tiempo y riesgo antes de reducir recursos.

## 2. Prompt → Agent → Loop → Graph

- **Prompt:** instrucciones, ejemplos, contexto y formato esperado. No representa una llamada por sí solo; conéctalo a un LLM o agente.
- **LLM:** operación basada en un modelo, con tokens y modelo configurables.
- **Agente:** decide acciones y herramientas para lograr un objetivo. Dibuja sus llamadas internas o refléjalas en Ejecuciones base esperadas.
- **Loop:** repetición limitada de pasos con condición de salida.
- **Grafo:** mapa de nodos y conexiones que expresa dependencias, decisiones y resultado.

Si todos los pasos son conocidos, un workflow fijo puede ser más fácil de probar y mantener que un agente autónomo.

## 3. Conocer la interfaz

Al abrir la web aparece el ejemplo de investigación. Arriba están los proyectos, Guardar, exports, idioma y tema. La paleta de 18 nodos está a la izquierda, el grafo en el centro y las propiedades a la derecha. En móvil, Nodos despliega la paleta y las propiedades aparecen debajo del lienzo.

Los modos son Editor, Analizar, Simular, Plantillas y Aprender. Aprender explica para cada nodo su función, uso, cuándo evitarlo, ejemplo, buena práctica y error habitual. También permite reabrir los primeros pasos.

## 4. Primer proyecto: investigar un tema y preparar un informe

1. Pulsa Nuevo proyecto y escribe `Investigación sobre un tema`.
2. Añade Inicio, Entrada, cuatro nodos Modelo de lenguaje, Evaluador y Salida.
3. Nombra los modelos Planificador, Investigación, Razonamiento y Redactor.
4. En Entrada escribe el objetivo, público, idioma, extensión y criterios de aceptación: por ejemplo, un informe con fuentes, conclusiones y limitaciones.
5. Describe qué recibe y qué entrega cada tarea. No introduzcas credenciales ni datos personales reales para probar.

Puedes cargar directamente la plantilla Investigación e informe con IA para ver una versión mejorada de este ejercicio.

## 5. Conectar nodos

En el panel derecho elige Origen, Destino y una Etiqueta opcional, y pulsa Conectar. Alternativamente, pulsa el puerto azul de un nodo y después el nodo destino. Esc cancela la conexión pendiente.

```text
Inicio → Entrada → Planificador → Investigación → Razonamiento → Redactor → Evaluador → Salida
```

Pulsa una conexión para editar su etiqueta o eliminarla. PASS/FAIL son las etiquetas del evaluador; TRUE/FALSE, YES/NO o etiquetas propias sirven para routers. No se permiten conexiones de un nodo consigo mismo: dibuja los ciclos con dos o más nodos.

## 6. Mover y organizar

Arrastra nodos para moverlos y el fondo para desplazar la vista. La rueda desplaza; Ctrl/⌘ + rueda hace zoom. También tienes +/−, Ajustar a pantalla y Ordenar nodos. El orden automático utiliza la profundidad del grafo.

Mayús + clic permite seleccionar varios nodos. Se pueden mover, duplicar y eliminar juntos. Al duplicar, también se copian las conexiones internas de la selección. Las flechas mueven 10 píxeles; con Mayús, 50. X e Y son editables en propiedades.

| Atajo | Acción |
| --- | --- |
| Ctrl/⌘ + S | Guardar localmente |
| Ctrl/⌘ + Z | Deshacer |
| Ctrl/⌘ + Mayús + Z o Ctrl/⌘ + Y | Rehacer |
| Ctrl/⌘ + D | Duplicar selección |
| Ctrl/⌘ + A fuera de un campo | Seleccionar todos los nodos |
| Supr / Retroceso fuera de un campo | Eliminar selección o conexión |
| Esc | Cancelar conexión y vaciar selección |

Se conservan hasta 60 estados de deshacer en memoria; no se recuperan al reabrir.

## 7. Configurar modelos, tokens y latencia

Selecciona Planificador, elige proveedor, escribe un nombre de modelo y selecciona Rápido / económico. Los nombres de modelos son libres. Introduce tokens de entrada y salida por ejecución. Por ejemplo, 1.500 y 450 son una hipótesis, no una medición.

Ejecuciones base esperadas multiplica el consumo. Si un agente hace tres llamadas internas, puedes indicarlo aquí o dibujarlas por separado; evita contarlas dos veces. La latencia en milisegundos y su clase son datos manuales de planificación, no un cronómetro ni un SLA.

Prompt, Herramienta, Código, Memoria y controles no consumen tokens LLM por defecto. Evaluador, Protección y RAG tienen una casilla Utiliza un modelo. Actívala cuando corresponda; para embeddings selecciona la clase adecuada. El contenido de Código nunca se ejecuta.

## 8. Paralelizar la investigación

Sustituye Investigación por:

```text
División paralela → Investigación A / Investigación B / Investigación C → Unión
```

Cada rama debe responder a una pregunta independiente o consultar una fuente. Conecta las tres a Unión y después a Razonamiento. Esto puede reducir esperas, pero no reduce automáticamente tokens. No paralelices tareas que necesitan resultados mutuos o comparten estado mutable sin coordinación.

## 9. Reservar el modelo potente

En Razonamiento selecciona Razonamiento frontera, un nivel alto y el modelo que quieras estimar. Mantén planificación, redacción y corrección en modelos económicos si cumplen los requisitos de calidad.

Para formatear tablas, ordenar resultados o validar un esquema, usa Código determinista. El analizador puede sugerirlo por el nombre, la descripción o la casilla Tarea potencialmente determinista. Revisa la sugerencia: no comprende la semántica real de la tarea.

## 10. Verificar y corregir con un ciclo limitado

Añade Bucle y un modelo llamado Corrección:

```text
Evaluador → PASS → Salida
Evaluador → FAIL → Bucle → Corrección → Evaluador
```

En Bucle indica condición de repetición `FAIL`, salida `PASS`, visitas esperadas 2 y máximo 3. El máximo limita las visitas de cada nodo dentro del componente cíclico, incluida la evaluación inicial. No significa tres correcciones adicionales.

En Evaluador configura una caída antes de PASS mediante Fallos antes de PASS. El simulador corregirá una vez y después pasará. Si se supera el límite, se detiene; no transforma el agotamiento en un PASS artificial.

Dibuja siempre el retorno: un Loop aislado no identifica qué tareas repetir. Si varios controladores comparten un componente cíclico, el estimador multiplica sus límites como aproximación conservadora y muestra un aviso. No interpreta exactamente todos los bucles anidados.

## 11. Interpretar el análisis

Analizar muestra eficiencia, fiabilidad, complejidad, dependencias, profundidad, llamadas, tokens, costes y avisos:

- Crítico: estructura o control potencialmente problemático para una ejecución limitada.
- Aviso: necesita revisión.
- Optimización: mejora contextual posible.
- Buena práctica: patrón explícito que conviene verificar.

Cada aviso explica qué ocurre, por qué y la recomendación. Una puntuación alta no certifica calidad ni seguridad. Las dependencias son proporciones de nodos, no de tiempo. La profundidad condensa cada ciclo en un bloque. Las llamadas incluyen ejecuciones estimadas de nodos que usan modelos.

La estimación suma todas las ramas, incluidas alternativas de routers y nodos desconectados. Es un escenario conservador de diseño, no una esperanza probabilística. La simulación suma únicamente el recorrido elegido; por eso pueden diferir los totales.

## 12. Presupuesto y catálogo de costes

Pulsa Esc para ver los ajustes del proyecto. Configura presupuesto esperado y máximo de tokens. Cero significa sin presupuesto. Por debajo del 80% está dentro; del 80% al 100%, cerca; por encima del 100%, superado.

En Catálogo de precios introduce proveedor, modelo y precio por millón de tokens de entrada y salida. Usa la misma moneda para todas las filas y los mismos nombres de proveedor/modelo que en los nodos. Puedes activar precios propios de un nodo para sustituir el catálogo.

Los ejemplos tienen precios cero. **Cero significa precio no configurado, no servicio gratuito.** No se consultan precios online. No se incluyen impuestos, herramientas, infraestructura, caché, descuentos ni trabajo humano.

Coste = (tokens entrada × precio entrada + tokens salida × precio salida) / 1.000.000. Un ciclo sin máximo puede tener peor caso indeterminado. El límite global detiene la simulación, pero no convierte artificialmente ese presupuesto en finito.

## 13. Simular

Selecciona un router y escribe la etiqueta exacta de la rama. Si está vacía, se usa la primera. Configura en el evaluador los fallos antes de PASS. Las condiciones escritas documentan el diseño; no son expresiones ejecutables.

Paso siguiente avanza una visita. Ejecutar simulación muestra el recorrido completo. La miniatura destaca el nodo actual. Las ramas paralelas comparten ronda; Unión espera las ramas activadas que pueden alcanzarla. Las dependencias ambiguas pueden provocar una parada explícita.

Un Loop/Retry con varias salidas usa REPEAT/FAIL/TRUE/YES para repetir y EXIT/PASS/FALSE/NO para salir. Con una salida sigue la conexión, respetando el límite del ciclo. Aprobación humana y Protección con varias salidas siguen la etiqueta configurada; no se realiza una aprobación ni una protección real.

El resumen incluye visitas, llamadas, rondas, tokens y coste. El peor caso corresponde a toda la arquitectura. El simulador tiene un tope de seguridad de 10.000 pasos incluso si el límite global vale cero.

## 14. Guardar, importar y exportar

Guardar conserva el proyecto en este navegador. Proyectos locales permite abrir, duplicar y eliminar. Duplicar desde la barra superior crea otro identificador. Importar JSON también crea una copia nueva: no sobrescribe silenciosamente otro proyecto.

| Export | Uso |
| --- | --- |
| JSON | Copia editable completa, incluyendo catálogo y presupuesto. |
| SVG | Diagrama vectorial ampliable. |
| PNG | Imagen para correo, presentaciones o redes; máximo 8.192 px por lado y 16 megapíxeles, con reducción de grafos grandes. |
| Mermaid | Diagrama textual, no código ejecutable de agentes. |
| Markdown | Documentación de arquitectura, nodos, modelos, conexiones, estimaciones y avisos en el idioma seleccionado. |
| HTML imprimible / PDF | Descarga HTML, ábrelo y usa Imprimir → Guardar como PDF. |

Los nombres largos se recortan visualmente en las imágenes; JSON y documentación conservan el texto completo. El HTML imprimible presenta documentación como texto estructurado seguro, sin ejecutar HTML escrito en los nodos.

Exporta JSON regularmente. Los datos locales no están cifrados por la aplicación y no se sincronizan entre dispositivos. Límites V1: 500 nodos, 2.000 conexiones y 5 MB por proyecto. No incluye colaboración simultánea ni exportadores ejecutables LangGraph/n8n.
