---
title: Design a RESTful API
date: 2024-05-01
readingTime: 3 min read
tags: [restful, Design]
summary: The best practices to design an API following the RESTful standard
image: restful.png
---

## 1. Purpose

REST (REpresentational State Transfer) is an architectural style. It has its guiding principles and constraints. This blog will show the best practice that java developers must work on Spring Boot.

<img src="blog/img/restful.png" width="250" height="150">

## 2. What is a Resource in RESTful API

Resources are the core abstraction of REST, representing entities like users, products, or documents. Each resource has a unique identifier.

### 2.1 Singleton, Collection and Sub-collection Resources

Resources can be categorized into the following main types:

- **Singleton Resource**: Represents a single, unique instance of an entity.
- **Collection Resource**: Represents a group or list of related resources.
- **Sub-collection Resource**: A collection resource that is nested under another resource.

**Examples**:
- `/users` is a collection resource representing all users.
- `/users/123` is a singleton resource representing a specific user with ID 123.
- `/users/123/posts` is a sub-collection resource representing all posts by user 123.

## 3. Path and HTTP Methods in RESTful API

RESTful APIs use the following HTTP methods & Paths to manipulate resources:

| Method | URI | CRUD | Use case | Request body | Response body | Response status |
|-----|----------|------|-----------------|--------------|---------------|---------|
| POST   | `/users` | Create | Create a new user | `{"name":"Alice"...}` | `{"id":123}` | 201, 400 |
| GET    | `/users?name=Alice` | Read | List users having name `Alice` | | `[{"id":123...}...]` | 200 |
| GET    | `/users?`<br>`page=1&size=10&`<br>`sort=name,desc&`<br>`sort=age` | Read | List users for big data | | `{"content": [{"id":123...}...],`<br>`"page": {"size": 10,"number": 0,`<br>`"totalElements": 50,"totalPages": 5}}` | 200 |
| GET    | `/users/123` | Read | Get the details of the user | | `{"id":123...}` | 200, 404 |
| PUT    | `/users/123` | Update | Replace the user resource with updated data | `{"name":"Kris"...}` | | 204, 400, 404 |
| DELETE | `/users/123` | Delete | Delete the user resource | | | 204, 404 |
| PATCH  | `/users/123` | Partial Update | Update one or more fields for the user | `{"name":"Kris"...}` |  | 204, 400, 404 |

You can refer to the `response status` table to understand the their meaning:
| Response status | Description |
|--------|--------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |

There are some practices you can take them into consideration:

- You can use `200` instead of `204` for better client-side consistency.
- Resource Id should be a UUID instead of traditional auto-incrementing integers for avoiding security risks. Example: `/users/7d927ddc-59b3-4f4f-b576-78a96d92281f`
- For filter in GET method, you can use simple equality, logical Operators, Standard Query Languages like RSQL (RESTful Service Query Language) or OData (Open Data Protocol).
  + Simple equality: `/users?name=Kris`
  + Operator Suffixes: `/users?name[like]=20` or `name_like=20`
  + RSQL: `/users?filter=name=like=*Kris*;age=gt=20`
  + OData: `/users$$filter=contains(name,'Kris')`
- Field Selection: Allow clients to specify only the fields they need to reduce payload size.Example: GET `/users?fields=name,email`.- Embedding Relations: Use an embed or expand parameter to include related resources in a single call.Example: GET `/users/123?embed=role`

## 4. Exception of custom methods

If an API doesn't present an action CRUD, you can use hybrid REST/RPC pattern as a pragmatic approach, use clear, explicit verb at the end of your URI path using a POST method.

**Example**: 
- To activate a user account, use `POST /users/{userId}/activate`
- To execute an order, use `POST /orders/{orderId}/execute`

## 5. Conclusion

Understanding and properly implementing HTTP methods is crucial for designing effective RESTful APIs. Each method serves a specific purpose in resource manipulation, ensuring clear and consistent API behavior.

## 6. References

- [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [OData Filter] (https://www.odata.org/documentation/)
- [RSQL] (https://www.baeldung.com/rest-api-search-language-rsql-fiql)