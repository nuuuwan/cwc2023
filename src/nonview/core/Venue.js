import { CWC23_VENUE_ID_LIST } from "../constants/CWC23_VENUE_ID_LIST";

export default class Venue {
  constructor(id) {
    this.id = id;
  }
  static getVenueIdx() {
    return CWC23_VENUE_ID_LIST.reduce((idx, venueID) => {
      idx[venueID] = new Venue(venueID);
      return idx;
    }, {});
  }
}

export const VENUE = Venue.getVenueIdx();
