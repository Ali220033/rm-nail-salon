const bookingConversion = {
  send_to: "AW-18148785181/d-CkCJGk5s0cEJ34gc5D",
  value: 1.0,
  currency: "USD"
};

const directionsConversion = {
  send_to: "AW-18148785181/dnC3CNi2480cEJ34gc5D",
  value: 1.0,
  currency: "USD"
};

function trackConversion(conversion) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "conversion", conversion);
}

export function trackBookingConversion() {
  trackConversion(bookingConversion);
}

export function trackDirectionsConversion() {
  trackConversion(directionsConversion);
}
