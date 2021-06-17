# DanceMatch
Currently leveraging NextJS for API/Pages, all data returned is static, no DB connections are made yet, but will be in future.


### Current API endpoints
`/api/dance` - returns all dance styles in the DB  
`/api/song` - returns all songs in the DB  
`/api/song/${style}` - returns all songs that match the specified style  

### Current Pages
`/` - Index page, has a dropdown to get started picking songs  
`/songs` - Page with a list of all songs available  
`/songs/${songId}` - returns info on a specified song with matching ID (incomplete)  
`/dances` - Page with a list of all dance styles available  