import ParkingLot from './parkinglot';

const chargeRate = 1;

const testRegistration1 = 'LUV2XLR8';
const testRegistration2 = 'B88B8BB8';
const testRegistration3 = '1MP54CH0';
const testRegistration4 = 'URLNF404';
const testRegistration5 = '1NV1Z18L';

describe('Parking Lot', () => {
  it('should return null when empty and a car attempts to exit', () => {
    const lot = new ParkingLot(1, chargeRate);
    expect(lot.exit(testRegistration1)).toBeNull();
  });

  it('should return null when the car exiting did not previously enter', () => {
    const lot = new ParkingLot(2, chargeRate);
    lot.enter(testRegistration1, 'blue');
    expect(lot.exit(testRegistration2)).toBeNull();
  });

  it('should return the slot allocated when a car enters', () => {
    const lot = new ParkingLot(1, chargeRate);
    expect(lot.enter(testRegistration1, 'blue')).toBe(1);
  });

  it('should return the charge when a car enters and subsequently exits', () => {
    const lot = new ParkingLot(1, chargeRate);
    lot.enter(testRegistration1, 'blue');
    expect(typeof lot.exit(testRegistration1)).toBe('number');
  });

  it('should assign the closest possible slot to a car when it enters', () => {
    const lot = new ParkingLot(5, chargeRate);
    lot.enter(testRegistration1, 'blue');
    lot.enter(testRegistration2, 'red');
    lot.enter(testRegistration3, 'green');
    lot.enter(testRegistration4, 'blue');
    lot.exit(testRegistration3);
    expect(lot.enter(testRegistration5, 'yellow')).toBe(3);
  });

  it('should return null when the lot is full and another car attempts to enter', () => {
    const lot = new ParkingLot(3, chargeRate);
    lot.enter(testRegistration1, 'blue');
    lot.enter(testRegistration2, 'red');
    lot.enter(testRegistration3, 'green');
    expect(lot.enter(testRegistration4, 'blue')).toBeNull();
  });

  it('should return the slot allocated to a given registration', () => {
    const lot = new ParkingLot(2, chargeRate);
    lot.enter(testRegistration1, 'blue');
    lot.enter(testRegistration2, 'red');
    expect(lot.getSlotOfCar(testRegistration2)).toBe(2);
  });

  it('should return all the cars parked of a given color', () => {
    const lot = new ParkingLot(5, chargeRate);
    lot.enter(testRegistration1, 'blue');
    lot.enter(testRegistration2, 'red');
    lot.enter(testRegistration3, 'green');
    lot.enter(testRegistration4, 'blue');
    expect(lot.getCarsByColor('blue')).toStrictEqual(
      new Set([testRegistration1, testRegistration4])
    );
    expect(lot.getCarsByColor('red')).toStrictEqual(
      new Set([testRegistration2])
    );
  });
});
