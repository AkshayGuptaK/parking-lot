import autoBind from 'auto-bind';
import Heap from './heap';

type RegistrationNumber = string;
type Color = string;
type ParkingSlot = number;

interface Booking {
  slot: ParkingSlot;
  color: Color;
  entryTime: number;
}

/**
 * Parking Lot which records entry and exits of cars.
 * Allows retrieval of parking slot by car registration and all registrations of currently parked cars of a given color.
 */
export default class ParkingLot {
  slots: Heap<ParkingSlot>;
  bookings: Record<RegistrationNumber, Booking>;
  carsByColor: Record<Color, Set<RegistrationNumber>>;

  /**
   * Initializes an empty parking lot with no bookings
   * @param parkingSpaces - max parking lot capacity
   * @param chargeRate - cents per millisecond
   */
  constructor(parkingSpaces: number, private chargeRate: number) {
    autoBind(this);
    this.slots = new Heap((a, b) => a < b);
    this.initializeParkingSlots(parkingSpaces);
    this.bookings = {};
    this.carsByColor = {};
  }

  /**
   * Initialize the empty parking slots
   * @param parkingSpaces - max parking capacity
   */
  private initializeParkingSlots(parkingSpaces: number): void {
    for (let i = 1; i <= parkingSpaces; i++) {
      this.slots.add(i);
    }
  }

  /**
   * Attempts to allocate a parking slot to a new car and record its details if a slot is available
   * @param licensePlate - registration of entering car
   * @param color - color of entering car
   * @returns allocated parking slot or null if no slot is available
   */
  enter(licensePlate: RegistrationNumber, color: Color): number | null {
    const slot = this.slots.removeItem();
    if (slot == null) return null;
    this.bookings[licensePlate] = { slot, color, entryTime: Date.now() };
    if (this.carsByColor[color]) this.carsByColor[color].add(licensePlate);
    else this.carsByColor[color] = new Set([licensePlate]);
    return slot;
  }

  /**
   * Records the exit of a car from the lot and calculates the parking fee
   * @param licensePlate - registration of exiting car
   * @returns the parking fee or null if no parking entry is found
   */
  exit(licensePlate: RegistrationNumber): number | null {
    const booking = this.bookings[licensePlate];
    if (!booking) return null;
    this.slots.add(booking.slot);
    const timeElapsed = Date.now() - booking.entryTime;
    delete this.bookings[licensePlate];
    this.carsByColor[booking.color].delete(licensePlate);
    return timeElapsed * this.chargeRate;
  }

  /**
   * @param licensePlate - registration of queried car
   * @returns the parking slot of queried car if found
   */
  getSlotOfCar(licensePlate: RegistrationNumber): ParkingSlot {
    return this.bookings[licensePlate]?.slot;
  }

  /**
   * @param color - color being queried
   * @returns all registrations belonging to cars of that color currently parked
   */
  getCarsByColor(color: Color): Set<RegistrationNumber> {
    return this.carsByColor[color];
  }
}
