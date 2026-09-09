import { siteConfig } from "./siteConfig.js";

export const arrivalGuides = {
  "Midtown Manhattan": ["Plan from your actual starting point", "Midtown covers a large area. Check the route from your office, hotel, or station before choosing your appointment time; a neighborhood name alone is not a reliable travel estimate."],
  "Midtown East": ["An appointment around your workday", "Use your building's street entrance as the starting point for directions. Book the full service duration, including any removal or design extras, rather than assuming a manicure will fit into a short lunch break."],
  "Midtown NYC": ["Find the studio, not just the building", "Your appointment is at 875 3rd Ave on the Concourse Level. After checking directions to the address, allow time to reach the salon below street level. Call us if you need help finding the studio."],
  "Grand Central": ["Allow time after your train arrives", "Leave room between your scheduled train arrival and your appointment. The walk starts after you leave the terminal, and different exits change the route. Check directions from your chosen exit before setting off."],
  "Rockefeller Center": ["Leave room between Midtown plans", "Rockefeller Center includes several buildings and street entrances. Set directions from where you will actually leave, and check the full appointment duration before booking a performance, dinner, or return train afterward."],
  "Fifth Avenue": ["Use a specific Fifth Avenue address", "Fifth Avenue stretches far beyond the Midtown shopping district. Enter your store, hotel, or building in the map for a useful route. RM appointments take place on Third Avenue, not inside a Fifth Avenue location."],
  "Bryant Park": ["Choose your departure point at the park", "Start directions from the side of Bryant Park where you plan to leave, or from your nearby office or hotel. Allow time for the trip to Third Avenue and for finding our Concourse Level studio."],
  "Sutton Place": ["Make time for the complete appointment", "Check directions from your Sutton Place address and choose a service length that suits your day. For regular-polish pedicures, consider footwear and drying time before planning your trip home."],
  "Murray Hill": ["Plan the trip to our Midtown studio", "Enter your Murray Hill starting address in the map rather than using the neighborhood center. If you are combining hands and feet, compare the combo menu and leave time for the full appointment before your return plans."]
};

export function directionsFrom(area) {
  const url = new URL("https://www.google.com/maps/dir/");
  url.search = new URLSearchParams({ api: "1", origin: `${area}, Manhattan, New York`, destination: `${siteConfig.googleBusinessName}, ${siteConfig.address}`, travelmode: "walking" });
  return url.toString();
}
