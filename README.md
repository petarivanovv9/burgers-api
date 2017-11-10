# Burgers API

## Description

## Get started

### ...

### ...

## Documentation

### Root Endpoint

The root endpoint should prefix all resources and is only accessible over HTTPS. CORS is also enabled.

```http://localhost:3000/api/v1/```

### Rate Limits

To make sure everyone can access the API reliably, each IP that makes a request has a rate limit of 3600 requests per hour.

This works out at 1 req/sec. This is an initial figure, if the servers hold up I will definitely consider bumping this number.

You can see what the rate limit is and how many requests are remaining by looking at the rate limit headers sent in the response.

```
x-ratelimit-limit: 3600 
x-ratelimit-remaining: 3587
```

### Parameters

All parameters are optional and without them the API will just return the burgers in ascending order from their ID. Parameters are passed in as a query string and can be chained together.

If a parameter is passed without a value it will return a 400 error.

```https://api.punkapi.com/v2/burgers?burger_name=```

### Pagination

Requests that return multiple items will be limited to 25 results by default. You can access other pages using the ```?page``` paramater, you can also increase the amount of burgers returned in each request by changing the ```?per_page``` paramater.

```http://localhost:3000/api/v1/burgers?page=2&per_page=5```

### Get Burgers

Gets burgers from the api, you can apply several filters using url paramaters, the available options are listed below.

```http://localhost:3000/api/v1/burgers```

### Get a Single Burger

Gets a burger from the api using the burgers id.

```http://localhost:3000/api/v1/burgers/<mongo_id>```

### Post a Single Burger

...

### Get a Random Burger

Gets a random burger from the API, this takes no paramaters.

```http://localhost:3000/api/v1/burgers/random```

### Example Response

All burger endpoints return a json array with a number of burger objects inside.
