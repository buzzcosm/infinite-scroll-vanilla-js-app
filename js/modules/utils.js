// Helper Function to Set Attributes on DOM Elements
export function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}