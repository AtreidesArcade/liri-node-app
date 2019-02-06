# liri-node-app

## Requirements
- Make a Node.js app that depends on user input from the command line
- Integrate Spotify, and OMDb APIs via the appropriate NPM modules
- Use API calls and parse through returned JSON objects, outputting them in a specified format
- Read commands and queries from file

## Technologies Used
- Node.js
- JavaScript
- Spotify API (via spotify npm module)
- OMDb API (via request npm module)

## Code Explanation
- What our app does depends on what the user types, and there are 3 main functions: (1) Spotify lookup for a song, (2) OMDb lookup for a movie, and (3) read command and query from another file
- The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
- The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)
- The program also reads from a file called "random.text" and executes the command and query found there using string and array methods
