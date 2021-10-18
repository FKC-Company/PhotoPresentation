'use strict';

async function postData(url, data)  {
   const response = await fetch(SERVER + url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
   });
   return response.json(); // parses JSON response into native JavaScript objects
}