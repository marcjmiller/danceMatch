# DanceMatch
Currently leveraging NextJS for API/Pages, MariaDB/MySQL databases.

### Setup
- Create an `.env.local` with your DB info formatted as follows:
```
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
```
- `npm run migrate` to create needed database tables
- `npm run dev` to start in Develop mode

### Tests
Testing is currently configured using Cypress.
- `npm test` will run all tests in the console
- `npm run test:cy` will open a cypress window


### API endpoints
`/api/style` - GET - returns all dance styles in the DB  
`/api/style/add` - POST - add a dance style  
`/api/style/${id}` - GET - get info on a style with matching ID  
`/api/song` - GET - returns all songs in the DB  
`/api/song/add` - POST - add a song  
`/api/song/${id}` - GET - get info on the song with matching ID  
`/api/song/byStyle/${style}` - GET - returns all songs that match the specified style (broken currently)  

### Pages
`/` - Index page, has a dropdown to get started by choosing a style    
`/songs` - Page with a list of all songs available  
`/songs/add` - Form to add songs to the database  
`/songs/search` - Form to search the songs database  
   
`/styles` - Page with a list of all dance styles available  
`/styles/add` - Form to add songs to the database  
`/styles/${id}` - Page with style info for the style with matching ID  