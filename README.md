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

Register an app from oauth admin and get `clientId` and `clientSecret`

**Get oAuth Code**

```
GET accounts.dokan.app/auth/oauth
```

**Query parameters**

| Query name  | Description             |
| ----------- | ----------------------- |
| clientId    | Aplication client       |
| redirectUrl | Aplication redirect url |

### User will redirect back to client redirect url with `oauth code` like this

```
https://admin.dokan.app/login?oauth_code=xxxxxxx
```

### Get user info using `oauth_code`

This `oauth_code` can be use for only one

```
https://admin.dokan.app/access_token
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

}
```
