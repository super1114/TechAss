Frontend Library : React, Mui
Backend : Node.js, Express


In this project we need backend because we should fetch data using api on backend side.
If we fetch data directly on frontend using api, it will occur the CORs issue.

CORs issue should be handled on backend.

First I implemented one backend endpoint to fetch business data using axios module.

Set API key in request header for Authentication endpoint.
Backend endpoint get 2 parameters from frontend (city, term) we can input it on frontend.

I set limit business results to return to 50 by setting limit parameter to 50.
(50 is max)

Filtering should be handled on frontend after fetching data from backend because there is no option (paramameter) to filter businesses by rating, transactions, review_count on yelp business search api.

I have implemented filtering data on frontend by using javascript functions and useEffect React hook.

*** To run this project, we need to have .env file with this key API_KEY

For backend running, run the command "node ./server/index"
For frontend running, run the command "npm start"

![image](https://user-images.githubusercontent.com/85962586/202782205-8a895f63-9d99-42b8-b21a-a8d882d4af63.png)
