const express = require('express');
const app = express();
const port = 3001; 
const pgp = require('pg-promise')();
const connectionString = 'postgres://postgres:postgres@localhost:5432/SportzEventProject'; 
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const db = pgp(connectionString);


app.post('/api/add-venue', async (req, res) => {
  try {
    const venueName = req.body.venueName;
    const venueLocation = req.body.sportsName;
    const venueDate = req.body.eventDate;
    const venueDuration = req.body.duration;
    const venuePrice = req.body.price;

   
    await db.none(
      'INSERT INTO "SportzEventSchema".venues (venue_name, Sports, event_date, duration, price) VALUES ($1, $2, $3, $4, $5)',
      [venueName, venueLocation, venueDate, venueDuration, venuePrice]
    );

    res.status(201).json({ message: 'Venue added successfully' });
  } catch (error) {
    console.error('Error:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/add-sports-inventory', async (req, res) => {
    try {
      const sportName = req.body.sportsName
      const inventoryItem  = req.body.sportsInventory;
  
      
      await db.none(
        'INSERT INTO "SportzEventSchema"."sportzeventInventory" ("sport_name", "inventory_item") VALUES ($1, $2)',
        [sportName, inventoryItem]
      );
  
      res.status(201).json({ message: 'Sports inventory added successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/sports-names', async (req, res) => {
    try {
      const sportsNames = await db.any('SELECT DISTINCT "sport_name" FROM "SportzEventSchema"."sportzeventInventory"');
      res.json(sportsNames);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
 
app.get('/api/venues/:selectedSport', async (req, res) => {
    try {
      const selectedSport = req.params.selectedSport;
      console.log('Received request for sport:', selectedSport); 
      
      const venues = await db.any(
        'SELECT venue_name FROM "SportzEventSchema"."venues" WHERE Sports = $1',
        [selectedSport]
      );
  
      res.json(venues);
    } catch (error) {
      console.error('Error fetching venue names:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/api/equipment/:selectedSport', async (req, res) => {
    try {
      const selectedSport = req.params.selectedSport;
  
      // Query the database to get equipment items based on the selected sport
      const equipmentItems = await db.any(
        'SELECT inventory_item FROM "SportzEventSchema"."sportzeventInventory" WHERE sport_name = $1',
        [selectedSport]
      );
  
      res.json(equipmentItems);
    } catch (error) {
      console.error('Error fetching equipment items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/api/employee-login', async (req, res) => {
    try {
      const username= req.body.userId;
      const password  = req.body.password;
        console.log(username)
      // Validate the input (e.g., check if username and password are not empty)
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      // Query the database to verify the credentials
      const employee = await db.oneOrNone(
        'SELECT * FROM "SportzEventSchema"."employee_credentials" WHERE user_id = $1',
        [username]
      );
      console.log(employee);
      
  
      if (!employee) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Verify the password (you should hash the stored password and compare hashes)
       if (password !== employee.password) {
         res.send("failed");
       }
       else{
            res.send('success')
       }
       
      // Successful login
      //res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Server route to handle booking requests
app.post('/api/booking-requests', async (req, res) => {
    try {
      const  sport  = req.body.sport;
      const venue  = req.body.venue;
      const equipment  = req.body.equipment;
  
      // Insert a new row into the booking_requests table
      await db.none(
        'INSERT INTO "SportzEventSchema".booking_requests (sport, venue, equipment, status) VALUES ($1, $2, $3, $4)',
        [sport, venue, equipment, 'Pending']
      );
      console.log(req.body);
      console.log(equipment)
  
      // Send a success response to the client
      res.json({ success: true, message: 'Booking request submitted successfully' });
    } catch (error) {
      console.error('Error:', error);
  
      // Send an error response to the client
      res.status(500).json({ success: false, error: 'Booking request failed' });
    }
  });
    
  app.get('/api/pending-booking-requests', async (req, res) => {
    try {
      // Query the database to fetch pending booking requests
      const pendingRequests = await db.any(
        'SELECT * FROM "SportzEventSchema".booking_requests WHERE status = $1',
        ['Pending']
      );
      res.json(pendingRequests);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/approve-booking-request/:bookingId', async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const action = req.body.action; // 'approve' or 'reject'
  
      // Update the status of the booking request based on the action
      await db.none(
        'UPDATE "SportzEventSchema".booking_requests SET status = $1 WHERE booking_id = $2',
        [action === 'approve' ? 'Approved' : 'Rejected', bookingId]
      );
  
      res.json({ success: true, message: 'Booking request updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Booking request update failed' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
