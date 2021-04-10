import fastify from 'fastify';
import ParkingLot, { RegistrationNumber, Color } from './parkinglot';

interface ParkingRequestPayload {
  license: RegistrationNumber;
  color: Color;
}

const parkingCapacity = 50;
const chargeRate = 0.01;

const parkingLot = new ParkingLot(parkingCapacity, chargeRate);

const server = fastify({
  logger: true,
});

server.get('/', (request, reply) => {
  reply.send('Park with us today!');
});

server.post('/api/v1/parking', (request, reply) => {
  const { license, color } = request.body as ParkingRequestPayload;
  const slot = parkingLot.enter(license, color);
  if (slot == null) reply.send('Sorry, we are full. Please try again later!');
  else
    reply.send(
      `Slot number ${slot} has been allocated for you. Thank you for parking with us!`
    );
});

server.delete('/api/v1/parking/:license', (request, reply) => {
  const license = (request.params as any).license;
  const charge = parkingLot.exit(license);
  if (charge == null)
    reply.send('No record of parking found, how did you get in??');
  else
    reply.send(`Please pay ${charge} dollars. Thank you for parking with us!`);
});

server.get('/api/v1/parking/:license', (request, reply) => {
  const license = (request.params as any).license;
  const slot = parkingLot.getSlotOfCar(license);
  if (slot == null)
    reply.send('There is no such car in our system. Snoop elsewhere!');
  else reply.send(`The requested car is parked in slot ${slot}`);
});

server.get('/api/v1/parking', (request, reply) => {
  const color = (request.query as any).color;
  const cars = parkingLot.getCarsByColor(color);
  if (cars == null)
    reply.send('There are no cars of that color in our system. We swear!');
  else reply.send(`The cars of the given color are ${Array.from(cars)}`);
});

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(`there was an error: ${err}`);
    throw err;
  }
  server.log.info(`server listening on ${address}`);
});
