## Api response format


### Error 
```javascript
{
    "data": null,
    "message": "Rate limit exceeded for this API",
    "error": "rate_limit_exceeded",
    "meta": {}
}
```

```javascript
{
    "data": {
        "key": "value"
    },
    "message": "Data retrieved successfully.",
    "error": null,
    "meta": {
        "pagination": {
            "total": 100,
            "page": 1,
            "per_page": 10
        }
    }
}
```