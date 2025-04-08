# GK Animates API Documentation

This document outlines the available API endpoints for the GK Animates website.

## Base URL

All API endpoints are relative to the base URL: `/api`

## Authentication

Currently, the API does not require authentication for read operations. Admin operations may require authentication in future versions.

## Endpoints

### Videos

#### Get Showreel

Retrieves the featured showreel video.

- **URL**: `/videos/showreel`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "videoId": "string"
  }
  ```

#### Get Featured Videos

Retrieves a list of featured videos.

- **URL**: `/videos/featured`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": "number",
      "videoId": "string",
      "title": "string",
      "description": "string",
      "thumbnailUrl": "string",
      "category": "string",
      "duration": "string",
      "publishedAt": "string"
    }
  ]
  ```

#### Get All Videos

Retrieves all videos.

- **URL**: `/videos/all`
- **Method**: `GET`
- **Response**: Array of video objects (same format as featured videos)

#### Get Videos by Category

Retrieves videos filtered by category.

- **URL**: `/videos/category/:category`
- **Method**: `GET`
- **URL Parameters**: `category` - The category to filter by
- **Response**: Array of video objects (same format as featured videos)

#### Get Longest Video

Retrieves the longest video.

- **URL**: `/videos/longest`
- **Method**: `GET`
- **Response**: Video object (same format as featured videos)

#### Get Video by ID

Retrieves a specific video by ID.

- **URL**: `/videos/:id`
- **Method**: `GET`
- **URL Parameters**: `id` - The ID of the video
- **Response**: Video object (same format as featured videos)

### Newsletter

#### Subscribe to Newsletter

Subscribes a user to the newsletter.

- **URL**: `/newsletter/subscribe`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "name": "string",
    "preferenceUpdates": "boolean",
    "preferenceNewsletter": "boolean"
  }
  ```
- **Response**:
  ```json
  {
    "id": "number",
    "email": "string",
    "name": "string",
    "subscribedAt": "string",
    "preferenceUpdates": "boolean",
    "preferenceNewsletter": "boolean"
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Request succeeded
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses include a JSON object with an `error` property containing a message:

```json
{
  "error": "Error message description"
}
```

## Rate Limiting

Currently, there are no rate limits implemented. However, excessive requests may be throttled in future versions.

## Data Formats

- All timestamps are in ISO 8601 format
- Video durations are formatted as MM:SS or H:MM:SS
