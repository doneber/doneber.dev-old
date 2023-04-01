---
title: "YouTube Summarizer"
description: "La herramienta para resumir videos de YouTube"
pubDate: "April 1 2023"
demoLink: "https://yt-summarizer.doneber.dev/"
ghRepo: "https://github.com/doneber/yt-summarizer"
heroImage: "/screens/yt-summarizer.jpg"
---

Este proyecto es una herramienta que permite resumir videos de YouTube en texto solo pasándole el enlace del video. Solo necesitar ir a este [enlace](https://yt-summarizer.doneber.dev/) y una vez dentro, pasarle tu enlace del video de YouTube

### ¿Cómo surgió la idea de este proyecto?

Consumir videos de YouTube que pueden durar decenas de minutos solo para encontrar información específica no es muy práctico. Incluso algunas veces el contenido del video resulta ser solamente clickbait o con demasiado relleno.

### ¿Qué tecnologías y herramientas se usaron?

Para el frontend:

| Descripción | Tecnología |
| --- | --- |
| Lenguaje Principal | JavaScript |
| Framework JS | VueJs |
| Framework CSS | CssPico |

Para el backend:

| Descripción | Tecnología |
| --- | --- |
| Lenguaje Principal | Python |
| Micro Framework | Flask |
| Framework CSS | CssPico |
| IA | OpenAI |

Para CI/CD usamos Vercel

### ¿Qué resultados se obtuvieron?

Una aplicación web funcional para resumir videos de YouTube.

### ¿Qué problemas se enfrentaron durante el desarrollo del proyecto?

- El despliegue de a aplicación: Al tratarse de un proyecto mono repositorio los servicios de despliegue como [Fly.io](http://Fly.io) tenían problemas al desplegar la aplicación, después de investigar y probar las *serverless functions* de [Vercel](https://vercel.com/) se logró desplegar tanto el backend como el frontend en un mismo proyecto.
- La obtención de los subtítulos de los videos: Para esto una opción era usar la API de YouTube, sin embargo algo mas accesible era usar alguna librería en python.