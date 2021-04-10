# parking-lot

A solution to the classic parking lot problem

Consider a parking lot which can hold up to N cars. Each slot is given a number starting at 1 increasing with increasing distance from the entry point in steps of one. Create an automated ticketing system that allows customers to use the parking lot without human intervention.When a car enters the parking lot, issue a ticket to the driver. The ticket issuing process includes documenting the registration number (number plate) and the colour of the car and allocating an available parking slot to the car before actually handing over a ticket to the driver (we assume that our customers are nice enough to always park in the slots allocated to them).

The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns the ticket which then marks the slot they were using as being available. The customer is charged a standard rate based on the time elapsed between entry and exit.Due to government regulation, the system should provide the facility to find out:

- Registration numbers of all cars of a particular colour.
- Slot number in which a car with a given registration number is parked.
