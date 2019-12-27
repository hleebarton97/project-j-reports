##### J-Reports RESTful API
# 📖 API Documentation

This API is a JSON based RESTful API. The HTTP methods used are `GET`, `POST`, `PUT`, and `DELETE` for identifying the action to be performed. These actions and their appropriate methods are specified in this documentation.

Authentication is performed against a user account attempting to utilize the API. The API is stateless and therefore sessionless, so the user authentication information must be sent with each API request (only an `admin` account may utilize the API).

The API may be tested using any simple HTTP client or framework, such as Postman.

# 📐 API Implementation

All responses are returned in a JSON format:
```javascript
{
    "data": [
        {
            "key": "value"
        },
        {
            "another_key": "another value"
        }
    ]
}
```
Proper words in a key are always seperated with underscores.

If a reponse only returns a single response, then data will not be an array, but a single object:
```javascript
{
    "data": {
        "key": "value",
        "another_key": "another value",
        "number_key": 1
    }
}
```

Successful responsees are sent with an HTTP response code of `2xx`.

In the case of an API request failure, a non-`2xx` HTTP response code will be sent in the following JSON format:
```javascript
{
    "error": {
        "message": "something happend",
        "status_code": 4xx
    }
}
```

If an API request fails due to a missing required parameter, the message property may be an object:
```javascript
{
    "error": {
        "message": {
            "id": "The id parameter is required."
        },
        "status_code": 422
    }
}
```

The message property should be checked if it is an object or a string before using the property to display request errors.

The only time the message property is used outside of an error is a successful DELETE request. A 200 HTTP response code will be sent with a message property in the following format:
```javascript
{
    "data": {
        "message": "<Item> deleted.",
    }
}
```

These are the HTTP status codes the API returns on a failed request:
| Status Code | Description |
| :--- | :--- |
| `401` | Unauthorized request (no auth header) |
| `403` | No access to API (not `admin`) |
| `404` | Item is not found |
| `422` | Configuration of request is not valid |
| `500` | Internal application errors (should be reported) |





















# 📬 API Endpoints

## Datasources

##### Get all datasources
```http
GET /api/v1/datasources
```
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource. |
| name | String | The name of the datasource. |
| connection_string | String | The location / path of the datasource. |
| username | String | The username required to access the datasource. |
| password | String | The password required to access the datasource. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": [
        {
            "id": 1,
            "name": "My New Datasource",
            "connection_string": "http://localhost:5000",
            "username": "datasource",
            "password": "pass"
        },
        {
            "id": 2,
            "name": "Another Datasource",
            "connection_string": "http://localhost:6000",
            "username": "datasource2",
            "password": "pass2"
        },
    ]
}
```
-------------------------------
##### Get individual datasource
```http
GET /api/v1/datasources/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource |
| name | String | The name of the datasource. |
| connection_string | String | The location / path of the datasource. |
| username | String | The username required to access the datasource. |
| password | String | The password required to access the datasource. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
            "id": 2,
            "name": "Another Datasource",
            "connection_string": "http://localhost:6000",
            "username": "datasource2",
            "password": "pass2"
        }
}
```
-------------------------------
##### Create a datasource
```http
POST /api/v1/datasources
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| name | String | A name for the new datasource. |
| connection_string | String | The location / path to the datasource. |
| username | String | The username required to access the datasource. |
| password | String | The password required to access the datasource. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource. |
| name | String | The name of the datasource. |
| connection_string | String | The location / path of the datasource. |
| username | String | The username required to access the datasource. |
| password | String | The password required to access the datasource. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 1,
        "name": "My New Datasource",
        "connection_string": "http://localhost:5000",
        "username": "datasource",
        "password": "pass"
    },
}
```
-------------------------------
##### Update a datasource
```http
PUT /api/v1/datasources/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource. |
| name `OPTIONAL` | String | A name for the new datasource. |
| connection_string `OPTIONAL` | String | The location / path to the datasource. |
| username `OPTIONAL` | String | The username required to access the datasource. |
| password `OPTIONAL` | String | The password required to access the datasource. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource. |
| name | String | The name of the datasource. |
| connection_string | String | The location / path of the datasource. |
| username | String | The username required to access the datasource. |
| password | String | The password required to access the datasource. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
            "id": 1,
            "name": "My Updated Datasource",
            "connection_string": "http://localhost:5000",
            "username": "datasource",
            "password": "pass"
        }
}
```
-------------------------------
##### Delete a datasource
```http
DELETE /api/v1/datasources/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the datasource. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| message | String | A message stating that the deletion was successful. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "message": "Datasource deleted.",
    }
}
```






















## Users

##### Get all users
```http
GET /api/v1/users
```
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user. |
| username | String | The username of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| groups | Array | An array of the groups that the user belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": [
        {
            "id": 1,
            "username": "aUser",
            "user_type_id": 1,
            "groups": []
        },
        {
            "id": 2,
            "username": "anotherUser",
            "user_type_id": 0,
            "groups": [
                {
                    "id": 1,
                    "name": "IT"
                },
                {
                    "id": 3,
                    "name": "Billing"
                }
            ]
        }
    ]
}
```
-------------------------------
##### Get individual user
```http
GET /api/v1/users/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user. |
| username | String | The username of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| groups | Array | An array of the groups that the user belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 2,
        "username": "anotherUser",
        "user_type_id": 0,
        "groups": [
            {
                "id": 1,
                "name": "IT"
            },
            {
                "id": 3,
                "name": "Billing"
            }
        ]
    }
}
```
-------------------------------
##### User login
```http
POST /api/v1/users/login
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| username | String | The username of the user. |
| password | String | Password of the user. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
| username | String | The username of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| groups | Array | An array of the groups that the user belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 1,
        "username": "aUser",
        "user_type_id": 1,
        "groups": []
    },
}
```
-------------------------------
##### Create a user
```http
POST /api/v1/users
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| username | String | The username of the user. |
| password | String | Password of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| group_ids | Array | An array of the internal group ids that the user belongs to. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
| username | String | The username of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| groups | Array | An array of the groups that the user belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 2,
        "username": "anotherUser",
        "user_type_id": 0,
        "groups": [
            {
                "id": 1,
                "name": "IT"
            },
            {
                "id": 3,
                "name": "Billing"
            }
        ]
    }
}
```
-------------------------------
##### Update a user
```http
PUT /api/v1/users/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
| username `OPTIONAL` | String | The username of the user. |
| password `OPTIONAL` | String | Encrypted password of the user. |
| user_type_id `OPTIONAL` | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| group_ids `OPTIONAL` | Array | An array of the internal group ids that the user belongs to. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
| username | String | The username of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| groups | Array | An array of the groups that the user belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 2,
        "username": "anotherUser",
        "user_type_id": 0,
        "groups": [
            {
                "id": 3,
                "name": "Billing"
            }
        ]
    }
}
```
-------------------------------
##### Delete a user
```http
DELETE /api/v1/users/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| message | String | A message stating that the deletion was successful. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "message": "User deleted.",
    }
}
```





















## Reports

##### Get all reports
```http
GET /api/v1/reports
```
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the report. |
| title | String | The title of the report. |
| desc | String | The description of the report. |
| query_string | String | The SQL query to run against the selected datasource. |
| datasource_id | Number | Internal ID of the datasource associated with the report. |
| result_metadata | Array | Array of objects representing column headers and data types from the datasource with properties: col_name, col_type, col_alias. |
| groups | Array | An array of the groups that the report belongs to. |

##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": [
        {
            "id": 1,
            "title": "Fancy Report",
            "desc": "Get all products that cost less than $50.",
            "query_string": "SELECT * FROM Table WHERE Cost < {50;NUM;Product Price};",
            "datasource_id": 1,
            "result_metadata": [
                {
                    "col_name": "ID",
                    "col_type": "INTEGER",
                    "col_alias": "New ID Name"
                },
                {
                    "col_name":"Description",
                    "col_type": "VARCHAR",
                    "col_alias": "null"
                },
                {
                    "col_name": "Cost",
                    "col_type": "DECIMAL",
                    "col_alias": "null"
                },
            ],
            "groups": [
                {
                    "id": 1,
                    "name": "IT"
                },
                {
                    "id": 3,
                    "name": "Billing"
                }
            ]
        },
        {
            "id": 2,
            "title": "Another Report",
            "desc": "This report returns other data.",
            "query_string": "SELECT * FROM Table WHERE Cost < {50;NUM;Product Price};",
            "datasource_id": 2,
            "result_metadata": [
                {
                    "col_name": "ID",
                    "col_type": "INTEGER",
                    "col_alias": "New ID Name"
                },
                {
                    "col_name":"Description",
                    "col_type": "VARCHAR",
                    "col_alias": "null"
                },
                {
                    "col_name": "Cost",
                    "col_type": "DECIMAL",
                    "col_alias": "null"
                },
            ],
            "groups": [
                {
                    "id": 3,
                    "name": "Billing"
                }
            ]
        }
    ]
}
```
-------------------------------
##### Get individual report
```http
GET /api/v1/reports/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the report. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the report. |
| title | String | The title of the report. |
| desc | String | The description of the report. |
| query_string | String | The SQL query to run against the selected datasource. |
| datasource_id | Number | Internal ID of the datasource associated with the report. |
| result_metadata | Array | Array of objects representing column headers and data types from the datasource with properties: col_name, col_type, col_alias. |
| groups | Array | An array of the groups that the report belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 1,
        "title": "Fancy Report",
        "desc": "Get all products that cost less than $50.",
        "query_string": "SELECT * FROM Table WHERE Cost < {50;NUM;Product Price};",
        "datasource_id": 1,
        "result_metadata": [
            {
                "col_name": "ID",
                "col_type": "INTEGER",
                "col_alias": "New ID Name"
            },
            {
                "col_name":"Description",
                "col_type": "VARCHAR",
                "col_alias": "null"
            },
            {
                "col_name": "Cost",
                "col_type": "DECIMAL",
                "col_alias": "null"
            },
        ],
        "groups": [
            {
                "id": 1,
                "name": "IT"
            },
            {
                "id": 3,
                "name": "Billing"
            }
        ]
    },
}
```
-------------------------------
##### Test a Query
```http
POST /api/v1/reports/test
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| query_string | String | The SQL query to run against the selected datasource. |
| datasource_id | Object | The internal ID of the selected datasource. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| result_metadata | Array | Array of objects representing column headers and data types from the datasource with properties: col_name, col_type, col_alias. |
| result_set | Array | Array of objects representing a record from the datasource with properties from the col_name property of each object in the result_metadata array. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "result_metadata": [
            {
                "col_name": "ID",
                "col_type": "INTEGER",
                "col_alias": "null",
            },
            {
                "col_name": "Description",
                "col_type": "VARCHAR",
                "col_alias": "null",
            },
            {
                "col_name": "Cost",
                "col_type": "DECIMAL",
                "col_alias": "null",
            },
        ],
        "result_set": [
            {
                "Description": "table",
                "ID": "1",
                "Cost": "230.5000"
            },
            {
                "Description": "chair",
                "ID": "2",
                "Cost": "50.9900"
            }
        ]
    }
}
```

-------------------------------
##### Create a Report
```http
POST /api/v1/reports
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| title | String | The title of the report. |
| desc | String | The description of the report. |
| query_string | String | The SQL query to run against the selected datasource. |
| datasource_id | Number | The internal ID of the selected datasource. |
| result_metadata | Array | Updated array of objects representing column headers and data types from the datasource with properties: col_name, col_type, col_alias. |
| group_ids | Array | An array of the internal group ids that the report belongs to. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | ID of the created report. |
| title | String | The title of the report. |
| desc | String | The description of the report. |
| query_string | String | The SQL query to run against the selected datasource. |
| datasource_id | Number | Internal ID of the datasource associated with the report. |
| result_metadata | Array | Array of objects representing column headers and data types from the datasource with properties: col_name, col_type, col_alias. |
| groups | Array | An array of the groups that the report belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 1,
        "title": "Fancy Report",
        "desc": "Get all products that cost less than $50.",
        "query_string": "SELECT * FROM Table WHERE Cost < {50;NUM;Product Price};",
        "datasource_id": 1,
        "result_metadata": [
            {
                "col_name": "ID",
                "col_type": "INTEGER",
                "col_alias": "New ID Name",
            },
            {
                "col_name": "Description",
                "col_type": "VARCHAR",
                "col_alias": "null",
            },
            {
                "col_name": "Cost",
                "col_type": "DECIMAL",
                "col_alias": "null",
            },
        ],
        "groups": [
            {
                "id": 1,
                "name": "IT"
            },
            {
                "id": 3,
                "name": "Billing"
            }
        ]
    }
}
```
-------------------------------
##### Run a report
```http
POST /api/v1/reports/run
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| query_string | String | The SQL query to run against the selected datasource. |
| datasource_id | Number | The internal ID of the selected datasource. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| result_metadata | Array | Array of objects representing column headers and data types from the datasource with properties: col_name, col_type, col_alias. |
| result_set | Array | Array of objects representing a record from the datasource with properties from the col_name property of each object in the result_metadata Array. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "result_metadata": [
            {
                "col_name": "ID",
                "col_type": "INTEGER",
                "col_alias": "null",
            },
            {
                "col_name": "Description",
                "col_type": "VARCHAR",
                "col_alias": "null",
            },
            {
                "col_name": "Cost",
                "col_type": "DECIMAL",
                "col_alias": "null",
            },
        ],
        "result_set": [
            {
                "Description": "table",
                "ID": "1",
                "Cost": "230.5000"
            },
            {
                "Description": "chair",
                "ID": "2",
                "Cost": "50.9900"
            }
        ]
    }
}
-------------------------------
```
##### Update a report
```http
PUT /api/v1/reports/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
| title `OPTIONAL` | String | The title of the report. |
| desc `OPTIONAL` | String | The description of the report. |
| group_ids `OPTIONAL` | Array | An array of the internal group ids that the report belongs to. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the user |
| username | String | The username of the user. |
| user_type_id | Number | The type of user. [0=Default, 1=Admin] (permissions). |
| groups | Array | An array of the groups that the report belongs to. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 1,
        "title": "Updated Report",
        "desc": "Get all products that cost less than $50.",
        "query_string": "SELECT * FROM Table WHERE Cost < {50;NUM;Product Price};",
        "datasource_id": 1,
        "result_metadata": [
            {
                "col_name": "ID",
                "col_type": "INTEGER",
                "col_alias": "New ID Name",
            },
            {
                "col_name": "Description",
                "col_type": "VARCHAR",
                "col_alias": "null",
            },
            {
                "col_name": "Cost",
                "col_type": "DECIMAL",
                "col_alias": "null",
            },
        ],
        "groups": [
            {
                "id": 1,
                "name": "IT"
            }
        ]
    }
}
```
-------------------------------
##### Delete a report
```http
DELETE /api/v1/reports/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the report. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| message | String | A message stating that the deletion was successful. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "message": "Report deleted.",
    }
}
```





















## Groups

##### Get all groups
```http
GET /api/v1/groups
```
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
| name | String | The name of the group. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": [
        {
            "id": 1,
            "name": "Zabrak"
        },
        {
            "id": 2,
            "name": "Wookiee"
        },
        {
            "id": 3,
            "name": "Hutt"
        }
    ]
}
```
-------------------------------
##### Get individual group
```http
GET /api/v1/groups/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
| name | String | The name of the group. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 2,
        "name": "Wookiee"
    },
}
```
-------------------------------
##### Create a group
```http
POST /api/v1/groups
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| name | String | The name of the group. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
| name | String | The name of the group. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 4,
        "name": "New Group",
    },
}
```
-------------------------------
##### Update a group
```http
GET /api/v1/groups/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
| name | String | The name of the group. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
| name | String | The name of the group. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "id": 2,
        "name": "Ewok"
    },
}
```
-------------------------------
##### Delete a group
```http
DELETE /api/v1/groups/:id
```
##### Parameter
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Number | Internal ID of the group. |
##### Success 200
| Field | Type | Description |
| :--- | :--- | :--- |
| message | String | A message stating that the deletion was successful. |
##### Success-Response Example
```javascript
HTTP/1.1 200 OK
{
    "data": {
        "message": "Group deleted.",
    }
}
```