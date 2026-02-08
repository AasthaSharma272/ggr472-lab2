// Mapbox public access token required to load styles and data
mapboxgl.accessToken = 'pk.eyJ1IjoiYWFzdGhhMjcyIiwiYSI6ImNtbGNud3g4dDB5N2czZ3EwdmN3ejlidGMifQ.qxx3hONjiExrB-iCER2Hjw';

// Variable used to track the currently hovered Marine Protected Area
let hoveredMPAId = null;

// Initialize the Mapbox GL JS map
const map = new mapboxgl.Map({
  container: 'map',                             
  style: 'mapbox://styles/aastha272/cmlcoik07002e01rz14bp35nr', 
  projection: 'globe',                           
  zoom: 1,                                      
  center: [30, 15]                                // Center the globe over the Atlantic region
});

// Add standard navigation controls (zoom + rotation)
map.addControl(new mapboxgl.NavigationControl());

// Disable scroll zoom to avoid accidental zooming while scrolling the page
map.scrollZoom.disable();

// Wait until the basemap style has fully loaded before adding data layers
map.on("load", () => {

  // Add GeoJSON source containing Marine Protected Area polygons
  map.addSource("mpa-source", {
    type: "geojson",
    data: "data/WDPA_poly.geojson"
  });

  // Add fill layer to visualize Marine Protected Areas
  map.addLayer({
    id: "mpa-polygons",
    type: "fill",
    source: "mpa-source",
    paint: {
      // Change polygon color on hover using feature-state
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#7cffcb",   // Highlight color on hover
        "#54daee"    // Default MPA color
      ],

      // Increase opacity when hovered to emphasize interaction
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.6,
        0.35
      ],

      // Subtle outline to distinguish polygon boundaries
      "fill-outline-color": "#0b3c49"
    }
  });

  // Track mouse movement over MPAs to apply hover state
  map.on("mousemove", "mpa-polygons", (e) => {
    if (e.features.length > 0) {

      // Remove hover state from previously hovered feature
      if (hoveredMPAId !== null) {
        map.setFeatureState(
          { source: "mpa-source", id: hoveredMPAId },
          { hover: false }
        );
      }

      // Set hover state on the currently hovered feature
      hoveredMPAId = e.features[0].id;
      map.setFeatureState(
        { source: "mpa-source", id: hoveredMPAId },
        { hover: true }
      );
    }
  });

  // Remove hover state when the mouse leaves the MPA layer
  map.on("mouseleave", "mpa-polygons", () => {
    if (hoveredMPAId !== null) {
      map.setFeatureState(
        { source: "mpa-source", id: hoveredMPAId },
        { hover: false }
      );
    }
    hoveredMPAId = null;
  });

  // Get the checkbox element from the legend
  const mpaToggle = document.getElementById("mpa-toggle");

  // Toggle visibility of the MPA layer based on checkbox state
  mpaToggle.addEventListener("change", () => {
    const visibility = mpaToggle.checked ? "visible" : "none";
    map.setLayoutProperty("mpa-polygons", "visibility", visibility);
  });

  // Add GeoJSON source containing global shipping routes
  map.addSource("shipping-source", {
    type: "geojson",
    data: "data/Shipping_Lanes.geojson"
  });

  // Add line layer for shipping routes with data-driven styling
  map.addLayer({
    id: "shipping-lines",
    type: "line",
    source: "shipping-source",
    paint: {

      // Line color varies by shipping route importance
      "line-color": [
        "match",
        ["get", "Type"],
        "Major", "#ffb300",   // Major global corridors
        "Middle", "#dab867",  // Medium-importance routes
        "Minor", "#cbc0a9",   // Minor routes
        "#1f6f8b"             // Fallback color
      ],

      // Line width also varies by route importance
      "line-width": [
        "match",
        ["get", "Type"],
        "Major", 3.5,
        "Middle", 2,
        "Minor", 1,
        1
      ],

      // Slight transparency to reduce visual clutter
      "line-opacity": 0.85
    }
  });

  // Display a popup with MPA information when clicked
  map.on("click", "mpa-polygons", (e) => {
    const props = e.features[0].properties || {};

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<strong>${props.name || "Marine Protected Area"}</strong>`)
      .addTo(map);
  });

  // Change cursor to pointer when hovering over MPAs
  map.on("mouseenter", "mpa-polygons", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Reset cursor when leaving the MPA layer
  map.on("mouseleave", "mpa-polygons", () => {
    map.getCanvas().style.cursor = "";
  });

});
