# Dokan OAuth Module

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### API Documentation

```bash
<APP_URL>/api-doc
```

## OAuth Login Workflow
![image](https://user-images.githubusercontent.com/7611746/90690482-95d42680-e293-11ea-96c8-7c5fbecebad5.png)




Register an app from oauth admin and get `clientId` and `clientSecret`

**Get oAuth Code**

```
GET accounts.dokan.app/api/oauth/authorize
```

**Query parameters**

| Query name  | Description             |
| ----------- | ----------------------- |
| clientId    | Aplication client       |
| redirectUrl | Aplication redirect url |

### User will redirect back to client redirect url with `oauth code` like this

```
<registered_app_redirect_url>?oauth_code=xxxxxxx
```

### Get user info using `oauth_code`

This `oauth_code` can be use for only one

```
POST accounts.dokan.app/api/oauth/access_token
```

**Request body**
| Name | Description |
| ------------ | ----------------------- |
| clientId | Aplication client |
| oauth_code | Aplication clientSecret |
| redirectUrl | Aplication redirect url |

**Request Header**

```
{
    "Authorization": "Bearer <clientScret>"
}
```

## After validating everything user data will be in response

```
{
    "provider": "accounts.dokan.app",
    "version": "v0.0.1",
    "appName": "admin.dokan.app",
    "data": {
        "_id": "5f3d2631691fb60d28ae6a52",
        "name": "King Rayhan",
        "username": "rayhan",
        "email": "rayhan095@gmail.com",
        "id": "5f3d2631691fb60d28ae6a52"
    }
}
```
