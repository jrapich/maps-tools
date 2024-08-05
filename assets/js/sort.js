//in this class we are going to pull the following coordinates data frm the RR json:
//"name" property from the "LABEL" key
//"longitude" property from the "geometry:x" key
//"latitude" property from the "geometry:y" key
/**
 * constructor to sort and store RR milepost gps data from ARCGIS.
 * @param {array} features pass the features array from the ARCGIS json object: json.features
 */
class RRsort {
  constructor(features) {
    this.rawData = features;
    this.mileposts = [];
  }
  /**
   * sorts the GPS data from the passed features object. returns an array of objects with name/latitude/longitude
   * @params none
   * @returns {array}
   */
  getGPS() {
    console.log("sorting RR gps milepost data...");
    for (let i = 0; i < this.rawData.length; i++) {
      this.mileposts.push({
        name: this.rawData[i].attributes.LABEL,
        latitude: this.rawData[i].geometry.y,
        longitude: this.rawData[i].geometry.x,
      });
    }
    console.log(`complete in ${this.rawData.length} interations`);
    return this.mileposts;
  }
  /**
   * call this method if you want only whole number mileposts,
   * i.e. remove 600.50, 600.75, etc
   * returns modified array generated by the getGPS() method
   * @params none
   * @returns {array}
   */
  wholeNumberMPsOnly() {
    const sortedMPs = [];
    for (let i = 0; i < this.mileposts.length; i++) {
      if (
        !this.mileposts[i].name.includes(".25") &&
        !this.mileposts[i].name.includes(".5") &&
        !this.mileposts[i].name.includes(".75")
      ) {
        sortedMPs.push(this.mileposts[i]);
      }
    }
    console.log(
      `sorted mileposts to whole numbers in ${this.mileposts.length} interations`
    );
    return sortedMPs;
  }
}

module.exports = { RRsort };
