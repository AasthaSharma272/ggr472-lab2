# GGR472 Lab 2 – Oceans: Shipping vs Ecology

This web map explores the spatial relationship between global shipping routes and marine protected areas (MPAs), highlighting how commercial maritime activity intersects with ocean conservation efforts.

The map was created using a custom basemap designed in **Mapbox Studio** and implemented with **Mapbox GL JS**. Shipping routes are visualized as line features and styled based on relative importance, while marine protected areas are represented as polygon features with interactive hover and toggle functionality.

To improve performance and ensure compatibility with web deployment, the global Marine Protected Areas dataset was simplified prior to use while preserving overall spatial patterns relevant to global shipping corridors.

## Features
- Custom ocean-focused basemap with muted land and reduced labels
- Data-driven styling of shipping routes by importance (color and width)
- Interactive marine protected areas with hover highlighting and popups
- Checkbox toggle to show or hide protected areas
- Legend explaining map symbology and interactivity

## Technologies Used
- Mapbox Studio
- Mapbox GL JS
- HTML, CSS, JavaScript

## Data Sources
- Global shipping routes (GeoJSON)
- World Database on Protected Areas (WDPA - GeoJSON), simplified for web use

## Deployment
This project is hosted using **GitHub Pages** and can be viewed at:

👉 *https://aasthasharma272.github.io/ggr472-lab2/*

---

*Developed for GGR472: Developing Web Maps, Geography & Planning, University of Toronto.*
