import { CWC2023_VENUE_ID_LIST } from "../constants/CWC2023_VENUE_ID_LIST";

export default class Venue {
  constructor(id) {
    this.id = id;
  }
  static getVenueIdx() {
    return CWC2023_VENUE_ID_LIST.reduce((idx, venueID) => {
      idx[venueID] = new Venue(venueID);
      return idx;
    }, {});
  }
}

export const VENUE = Venue.getVenueIdx();
