const assert = require('chai').assert;
const MilitaryPlane = require('../planes/MilitaryPlane');
const PassengerPlane = require('../planes/PassengerPlane');
const Airport = require('../Airport');
const militaryType = require('../models/MilitaryType');
const ExperimentalPlane = require('../planes/ExperimentalPlane');
const experimentalTypes = require('../models/experimentalTypes');
const classificationLevel = require('../models/ClassificationLevel');

describe('Testing Airport', () => {
    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, militaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, militaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, militaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, militaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, militaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, militaryType.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, experimentalTypes.HIGH_ALTITUDE, classificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, experimentalTypes.VTOL, classificationLevel.TOP_SECRET),
    ];
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        let hasMilitaryPlanesWithTransportType = false;
        for (let militaryPlane of transportMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === militaryType.TRANSPORT) {
                hasMilitaryPlanesWithTransportType = true;
                break;
            }
        }
        assert.equal(hasMilitaryPlanesWithTransportType,true);
    });

    it('should check passenger plane with max capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.isFalse( expectedPlaneWithMaxPassengersCapacity === planeWithMaxPassengerCapacity);
    });

    it('should check currentPlane is higher than nextPlane', () => {
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        let planesSortedByMaxLoadCapacity = airport.getPlanes();
        let isNextPlaneHigherThanCurrent = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            let currentPlane = planesSortedByMaxLoadCapacity[i];
            let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
            if (currentPlane.getMaxLoadCapacity() > nextPlane.getMaxLoadCapacity()) {
                isNextPlaneHigherThanCurrent = false;
                break;
            }
        }
        assert.isTrue(isNextPlaneHigherThanCurrent);
    });

    it('should check test has at least one bomber in military planes', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        let isBomber = false;
        for (let militaryPlane of bomberMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === militaryType.BOMBER) {
                isBomber = true;
                assert.isTrue(isBomber);
            }
        }
    });

    it('should check that experimental planes has classification level higher than unclassified', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getExperimentalPlanes ();
        let hasUnclassifiedPlanes = false;
        for (let experimentalPlane of bomberMilitaryPlanes) {
            if (experimentalPlane.classificationLevel === classificationLevel.UNCLASSIFIED) {
                hasUnclassifiedPlanes = true;
            }
        assert.isFalse(hasUnclassifiedPlanes);
        }
    });
});
