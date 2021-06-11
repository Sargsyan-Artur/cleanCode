const PassengerPlane = require('./planes/PassengerPlane');
const MilitaryPlane = require('./planes/MilitaryPlane');
const militaryType = require('./models/MilitaryType');
const experimentalPlane = require('./planes/ExperimentalPlane');

class Airport {
    constructor(planes) {
        this.planes = planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }

    getPassengerPlane() {
        const passengerPlanes = [];
        for (let plane of this.planes) {
            if (plane instanceof PassengerPlane) {
                passengerPlanes.push(plane);
            }
        }
        return passengerPlanes;
    }

    getMilitaryPlanes() {
        let militaryPlanes = [];
        for (let plane of this.planes) {
            if (plane instanceof MilitaryPlane) {
                militaryPlanes.push(plane);
            }
        }
        return militaryPlanes;
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPassengerPlane();
        let maxCapacity = passengerPlanes[0].getPassengersCapacity();
        for (let i = 0; i < passengerPlanes.length; i++) {
            if (passengerPlanes[i].getPassengersCapacity() > maxCapacity) {
                maxCapacity = passengerPlanes[i].getPassengersCapacity();
            }
        }
        return maxCapacity;
    }

    getTransportMilitaryPlanes() {
        let transportMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();
        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === militaryType.TRANSPORT) {
                transportMilitaryPlanes.push(militaryPlanes[i]);
            }
        }
        return transportMilitaryPlanes;
    }

    getBomberMilitaryPlanes() {
        let bomberMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();
        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === militaryType.BOMBER) {
                bomberMilitaryPlanes.push(militaryPlanes[i]);
            }
        }
        return bomberMilitaryPlanes;
    }

    getExperimentalPlanes() {
        let experimentalPlanes = [];
        for (let plane of this.planes) {
            if (plane instanceof experimentalPlane) {
                experimentalPlanes.push(plane);
            }
        }
        return experimentalPlanes;
    }

    sortByMaxDistance() {
        return this.planes.sort((a, b) => (a.getMaxFlightDistance() > b.getMaxFlightDistance()) ? 1 : -1);
    }

    sortByMaxSpeed() {
        return this.planes.sort((a, b) => (a.getMaxSpeed() > b.getMaxSpeed()) ? 1 : -1);
    }

    sortByMaxLoadCapacity() {
        return this.planes.sort((a, b) => (a.getMaxLoadCapacity() > b.getMaxLoadCapacity()) ? 1 : -1);
    }

    getPlanes() {
        return this.planes;
    }
}

module.exports = Airport;
