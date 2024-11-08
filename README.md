# Astro Dashboard

## 🧑‍🚀 Instalar dependencias

Recomiendo utilizar bun o pnpm para el manejo de dependencias

```sh
npm install
```

```sh
bun install
```

```sh
pnpm install
```

## 🚀 Extructura del proyecto

A continuación, se muestra la estructura de carpetas y archivos dentro de tu proyecto Astro:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro busca archivos con extensión `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta basada en el nombre del archivo.

No hay nada especial acerca de `src/components/`, pero es donde nos gusta colocar cualquier componente de Astro/React/Vue/Svelte/Preact.

Cualquier recurso estático, como imágenes, puede colocarse en el directorio `public/`.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                                      |
| :------------------------ | :---------------------------------------------------------- |
| `bun install`             | Instala dependencias                                        |
| `bun run dev`             | Inicia el servidor de desarrollo local en `localhost:4321`  |
| `bun run build`           | Construye tu sitio de producción en `./dist/`               |
| `bun run preview`         | Previsualiza tu construcción localmente, antes de desplegar |
| `bun run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check`        |
| `bun run astro -- --help` | Obtén ayuda usando el CLI de Astro                          |

## 👀 Documentación?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
