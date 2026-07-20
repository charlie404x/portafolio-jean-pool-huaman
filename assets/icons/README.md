Los iconos de esta interfaz están embebidos directamente como `<symbol>` dentro
de `index.html` (sprite SVG inline), para evitar llamadas `fetch()` a archivos
locales que el navegador bloquea al abrir el proyecto con doble clic (file://).

Esta carpeta se deja como referencia de estructura. Si prefieres iconos como
archivos .svg independientes, puedes extraer cada <symbol> de index.html a un
archivo .svg individual aquí y referenciarlos con <img> o <object>.
