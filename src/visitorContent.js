import { arrivalGuides } from "./arrivalGuides.js";
import { getServiceById } from "./seoData.js";
import { siteConfig } from "./siteConfig.js";

// Appointment durations come from the service menu. Route notes describe planning
// choices, not unverified walking times, transit service, or additional locations.
const serviceTime = (id) => getServiceById(id)?.time || "the duration shown on Booksy";

const visitorGuides = {
  "/russian-manicure-midtown-manhattan": {
    area: "Midtown Manhattan",
    title: "Plan your manicure around your Midtown day.",
    serviceIds: ["russian-clear", "russian-hard-gel"],
    faqs: () => [
      ["How much time should I reserve for a manicure?", `The natural Russian manicure is listed at ${serviceTime("russian-clear")}, and the hard-gel manicure at ${serviceTime("russian-hard-gel")}. Add travel time from your actual Midtown address and check whether removal or artwork needs another service on your booking.`],
      ["Can I use a general Midtown travel estimate?", "Midtown includes many possible starting points. Check directions from your office, hotel, or station entrance to RM Nail Salon, then plan your next commitment around the complete appointment rather than the neighborhood name."]
    ]
  },
  "/russian-manicure-midtown-east": {
    area: "Midtown East",
    title: "Choose a service that fits your workday.",
    serviceIds: ["russian-clear", "russian-hard-gel", "nail-design"],
    faqs: () => [
      ["Will a Russian manicure fit into my lunch break?", `Compare your available time with the service itself: ${serviceTime("russian-clear")} for the natural manicure or ${serviceTime("russian-hard-gel")} for hard gel. These times do not include getting from your building to the Concourse Level studio. Check removal and design requirements before selecting a lunch appointment.`],
      ["What should I send before booking a detailed design?", "Send a reference photo and describe any product currently on your nails. Tell the studio about your next meeting or other time constraint before booking so you can select the appropriate service and artwork time."]
    ]
  },
  "/nail-salon-midtown-nyc": {
    area: "Midtown NYC",
    title: "Find the salon and reserve the complete service.",
    serviceIds: ["combo-clear", "hard-gel-smart-gel"],
    faqs: () => [
      ["Does the street address take me directly to the salon?", `Your appointment is at ${siteConfig.address}. Use the RM Nail Salon business pin and allow time to find the studio on the Concourse Level. Call ${siteConfig.phone} if you need help finding it.`],
      ["Can I combine hands and feet in one appointment?", `The natural-care manicure and pedicure combo is listed at ${serviceTime("combo-clear")}; the gel manicure and gel pedicure combo is ${serviceTime("hard-gel-smart-gel")}. Choose the corresponding combo on Booksy and review the available time before planning the rest of your day.`]
    ]
  },
  "/nail-salon-grand-central": {
    area: "Grand Central",
    title: "Leave room between your train and appointment.",
    serviceIds: ["smart-pedicure", "hard-gel-smart-gel"],
    faqs: () => [
      ["Should I book for the time my train arrives?", "Allow time to leave the terminal and travel to the salon after your train arrives. Use your chosen terminal exit as the starting point for directions, and check your journey again before traveling. A scheduled train arrival is not your arrival at the salon."],
      ["How should I plan a pedicure before my return train?", `The smart pedicure is listed at ${serviceTime("smart-pedicure")}; the gel manicure and gel pedicure combo takes ${serviceTime("hard-gel-smart-gel")}. Leave room afterward for any regular-polish drying needs and your trip back to the terminal. Ask the studio about suitable footwear when choosing your pedicure finish.`]
    ]
  },
  "/russian-manicure-grand-central": {
    area: "Grand Central",
    title: "Compare manicure options before your commute.",
    serviceIds: ["russian-clear", "russian-hard-gel", "gel-removal"],
    faqs: () => [
      ["Which manicure should I compare when I have a train to catch?", `Start with the natural manicure at ${serviceTime("russian-clear")} and hard gel at ${serviceTime("russian-hard-gel")}. Choose for the result you need, then allow enough time for the appointment and return journey. Do not assume a longer service can be shortened to fit a departure.`],
      ["Does old gel affect my appointment plan?", "It can affect which services you need to book. Tell the studio what is currently on your nails and ask whether removal must be added before choosing a time. This is particularly useful when your appointment sits between two train journeys."]
    ]
  },
  "/nail-salon-rockefeller-center": {
    area: "Rockefeller Center",
    title: "Plan nail care around your Midtown plans.",
    serviceIds: ["russian-hard-gel", "nail-design"],
    faqs: () => [
      ["Where should I start directions from Rockefeller Center?", "Use the building or street entrance you will actually leave. Check the journey to RM's Third Avenue studio before choosing an appointment ahead of a performance, dinner, or another timed reservation."],
      ["Can I include nail art before an event?", `The hard-gel manicure is listed at ${serviceTime("russian-hard-gel")}, and the standard nail-design add-on at ${serviceTime("nail-design")}. Share your design reference before booking: more involved artwork may need a different time allocation. Confirm the service and leave room for your onward journey.`]
    ]
  },
  "/nail-salon-fifth-avenue": {
    area: "Fifth Avenue",
    title: "Start with your store or hotel address.",
    serviceIds: ["russian-clear", "russian-hard-gel", "french"],
    faqs: () => [
      ["Is the salon located on Fifth Avenue?", `RM has one studio at ${siteConfig.address}, on Third Avenue. This page helps visitors traveling from Fifth Avenue. Enter your particular store, hotel, or office in directions because a general Fifth Avenue starting point may not match your trip.`],
      ["How do I plan a French manicure between shopping stops?", `Compare the underlying manicure service first, then add the French finish when booking. The menu lists hard gel at ${serviceTime("russian-hard-gel")} and the French add-on at ${serviceTime("french")}. Check your complete booking duration before scheduling your next stop.`]
    ]
  },
  "/nail-salon-bryant-park": {
    area: "Bryant Park",
    title: "Choose your departure point before booking.",
    serviceIds: ["smart-pedicure", "russian-hard-gel"],
    faqs: () => [
      ["How should I plan the journey from Bryant Park?", "Start directions from the side of the park where you expect to leave, or from your nearby office or hotel. Your appointment is at RM's Concourse Level studio on Third Avenue, so include the journey and time to find the salon in your plan."],
      ["What should I consider for a pedicure before more walking?", `The smart pedicure is listed at ${serviceTime("smart-pedicure")}. Discuss your polish choice, footwear, and any drying time with the studio before booking if you plan to continue walking or sightseeing afterward.`]
    ]
  },
  "/nail-salon-sutton-place": {
    area: "Sutton Place",
    title: "Choose the finish before planning your trip home.",
    serviceIds: ["russian-clear", "smart-pedicure", "combo-clear"],
    faqs: () => [
      ["Can I book natural nail care for both hands and feet?", `The natural-care manicure and pedicure combo is listed at ${serviceTime("combo-clear")}. Compare it with the separate manicure and pedicure services on Booksy, and confirm whether you want regular polish or a no-polish finish.`],
      ["What should I plan for the journey back to Sutton Place?", "Check directions from your actual Sutton Place address before traveling. If you choose regular polish on your toes, ask about drying time and suitable footwear so the finish fits your plans for getting home."]
    ]
  },
  "/nail-salon-murray-hill": {
    area: "Murray Hill",
    title: "Compare combo appointments before traveling.",
    serviceIds: ["combo-clear", "hard-gel-smart-gel"],
    faqs: () => [
      ["Is there a separate RM salon in Murray Hill?", `No. All RM appointments take place at ${siteConfig.address}. Enter your Murray Hill starting address in directions to plan the trip to our one Midtown studio.`],
      ["How much appointment time should I allow for hands and feet?", `The natural-care combo is listed at ${serviceTime("combo-clear")}; the gel manicure and gel pedicure combo is ${serviceTime("hard-gel-smart-gel")}. Compare those options before booking and allow additional time for travel and any separately selected extras.`]
    ]
  },
  "/russian-manicure-murray-hill": {
    area: "Murray Hill",
    title: "Plan a manicure visit that suits your routine.",
    serviceIds: ["russian-clear", "russian-hard-gel"],
    faqs: () => [
      ["How do I choose between natural and hard-gel manicure care?", `The natural Russian manicure is listed at ${serviceTime("russian-clear")}, while hard gel is ${serviceTime("russian-hard-gel")}. Compare the finish and product you want as well as the time available. Bring a reference and tell the studio about any existing gel before booking.`],
      ["What should I check before leaving Murray Hill?", "Confirm the booked service and time on Booksy, then check the route from your actual address to RM Nail Salon on Third Avenue. For a return visit, mention existing product or repairs in advance rather than assuming every manicure needs the same appointment length."]
    ]
  }
};

export function getVisitorContent(path) {
  const guide = visitorGuides[path];
  if (!guide) return null;
  return {
    title: guide.title,
    planning: arrivalGuides[guide.area]?.[1] || "",
    serviceIds: [...guide.serviceIds],
    faqs: guide.faqs()
  };
}
