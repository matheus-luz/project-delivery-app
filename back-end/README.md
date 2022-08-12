# API Endpoints
Essa API possui os endpoints abaixo:

<details>

|  | Método | Descrição |
|---|---|---|
| 01 | `POST - http://http://localhost:3001/admin` | . |
| 02 | `GET - http://http://localhost:3001/admin` | . |
| 03 | `DELETE - http://http://localhost:3001/admin` | . |
| 04 | `POST - http://localhost:3001/customer/checkout` | . |  
| 05 | `GET - http://localhost:3001/customer/products` | . |
| 06 | `GET - http://localhost:3001/customer/orders` | . |
| 07 | `GET - http://localhost:3001/customer/orders/:id` | . |
| 08 | `PATCH - http://localhost:3001/customer/orders/update/:id` | . |
| 09 | `POST - http://localhost:3001/login` | . |
| 10 | `POST - http://localhost:3001/register` | . |  
| 11 | `GET - http://localhost:3001/seller/orders` | . |
| 12 | `GET - http://localhost:3001/seller/orders/:id` | . |
| 13 | `PATCH - http://localhost:3001/seller/orders/update/:id` | . |  

</details>

## Validando token nas requisições

- Todo o endpoint que <strong>NÃO</strong> precisar validar o `token` terá o símbolo :x: ao lado. Para todos os demais, será necessário fazer a validação de credenciais de autenticação informadas no cabeçalho da requisição HTTP authorization.

<details>

- Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

            {
              "message": "Token not found"
            }

 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

            {
              "message": "Expired or invalid token"
            }

</details>

## Usando a API
Os exemplos a seguir utilizam o [Isomnia](https://insomnia.rest/) para fazer as requisições, no entanto você pode utilizar a ferramenta que preferir.

## I - Admin (`/admin`)
#### [POST `/admin`]

<details>

+ Request (application/json)
+ Body

          {
            "name": "newSeller012",
            "email": "newSeller@email.com",
            "role": "seller",
            "password": "%new-seller%"
          }

+ Response 201 Created (No body returned for response)

</details>

#### [GET `/admin`]

<details>

+ Response 200 Ok (application/json)

          [
            {
              "id": 2,
              "name": "Fulana Pereira",
              "email": "fulana@deliveryapp.com",
              "password": "3c28d2b0881bf46457a853e0b07531c6",
              "role": "seller"
            },
            {
              "id": 3,
              "name": "Cliente Zé Birita",
              "email": "zebirita@email.com",
              "password": "1c37466c159755ce1fa181bd247cb925",
              "role": "customer"
            },
            {
              "id": 4,
              "name": "newCustomer12",
              "email": "newCustomer@email.com",
              "password": "ad43b82182a8082c74e3cc2d1a88e20e",
              "role": "customer"
            },
            {
            "id": 5,
            "name": "newSeller012",
            "email": "newSeller@email.com",
            "password": "0f6461616ef3c8e2bd5c4f81801f1ff2",
            "role": "seller"
            }
          ]

</details>

#### [DELETE `/admin`]

<details>

+ Request (application/json)
+ Body

          {
            "id": 2
          }

+ Response 204 No Content (No body returned for response)

</details>

## II - Customer (`/customer`)
#### [POST `/customer/checkout`]

<details>

+ Request (application/json)
+ Body

          {
            "sellerId": 2,
            "totalPrice": 28.20,
            "deliveryAddress": "Rua dos Alfeneiros",
            "deliveryNumber": "4",
            "products": [
              {"productId": 1, "quantity": 6},
              {"productId": 4, "quantity": 2}
            ]
          }

+ Response 201 Created (application/json)

          {
            "message": "Sale successfully created"
          }

</details>

#### [GET `/customer/products`]

<details>

+ Response 200 Ok (application/json)

          [
            {
              "id": 1,
              "name": "Skol Lata 250ml",
              "price": "2.20",
              "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
            },
            {
              "id": 2,
              "name": "Heineken 600ml",
              "price": "7.50",
              "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
            },
            {
              "id": 3,
              "name": "Antarctica Pilsen 300ml",
              "price": "2.49",
              "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg"
            },
            {
              "id": 4,
              "name": "Brahma 600ml",
              "price": "7.50",
              "urlImage": "http://localhost:3001/images/brahma_600ml.jpg"
            },
            {
              "id": 5,
              "name": "Skol 269ml",
              "price": "2.19",
              "urlImage": "http://localhost:3001/images/skol_269ml.jpg"
            },
            {
              "id": 6,
              "name": "Skol Beats Senses 313ml",
              "price": "4.49",
              "urlImage": "http://localhost:3001/images/skol_beats_senses_313ml.jpg"
            },
            {
              "id": 7,
              "name": "Becks 330ml",
              "price": "4.99",
              "urlImage": "http://localhost:3001/images/becks_330ml.jpg"
            },
            {
              "id": 8,
              "name": "Brahma Duplo Malte 350ml",
              "price": "2.79",
              "urlImage": "http://localhost:3001/images/brahma_duplo_malte_350ml.jpg"
            },
            {
              "id": 9,
              "name": "Becks 600ml",
              "price": "8.89",
              "urlImage": "http://localhost:3001/images/becks_600ml.jpg"
            },
            {
              "id": 10,
              "name": "Skol Beats Senses 269ml",
              "price": "3.57",
              "urlImage": "http://localhost:3001/images/skol_beats_senses_269ml.jpg"
            },
            {
              "id": 11,
              "name": "Stella Artois 275ml",
              "price": "3.49",
              "urlImage": "http://localhost:3001/images/stella_artois_275ml.jpg"
            }
          ]

</details>

#### [GET `/customer/orders`]

<details>

+ Response 200 Ok (application/json)

          [
            {
              "user": {
                "id": 3,
                "name": "Cliente Zé Birita",
                "email": "zebirita@email.com",
                "role": "customer"
              },
              "seller": {
                "id": 2,
                "name": "Fulana Pereira",
                "email": "fulana@deliveryapp.com",
                "role": "seller"
              },
              "order": {
                "address": "Rua Liberdade",
                "adressNumber": "19",
                "saleDate": "01/07/2022",
                "totalPrice": "15.00",
                "status": "Em Trânsito"
              }
            },
            {
              "user": {
                "id": 3,
                "name": "Cliente Zé Birita",
                "email": "zebirita@email.com",
                "role": "customer"
              },
              "seller": {
                "id": 2,
                "name": "Fulana Pereira",
                "email": "fulana@deliveryapp.com",
                "role": "seller"
              },
              "order": {
                "address": "Rua Alfeneiros",
                "adressNumber": "14",
                "saleDate": "01/06/2022",
                "totalPrice": "9.70",
                "status": "Entregue"
              }
            }
          ]

</details>

#### [GET `/customer/orders/:id`]

<details>

+ Response 200 Ok (application/json)
  
          {
            "saleDate": "01/07/2022",
            "id": 1,
            "totalPrice": "15.00",
            "status": "Em Trânsito",
            "seller": {
              "name": "Fulana Pereira"
            },
            "products": [
              {
                "id": 2,
                "name": "Heineken 600ml",
                "price": "7.50",
                "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
                "salesProducts": {
                  "quantity": 1
                }
              },
              {
                "id": 4,
                "name": "Brahma 600ml",
                "price": "7.50",
                "urlImage": "http://localhost:3001/images/brahma_600ml.jpg",
                "salesProducts": {
                  "quantity": 1
                }
              }
            ]
          }

</details>

#### [PATCH `/customer/orders/update/:id`]

<details>

+ Response 200 Ok (application/json)

          {
            "message": "Updated"
          }
  
:warning: O pedido será atualizado para `Entregue`, não sendo necessária qualquer informação no corpo da requisição. Obs.: Mesmo que alguma informação seja passada, o status do pedido, ainda sim, será atualizado para `Entregue`, uma vez que esta é a única atualização de status que o `customer` pode efetuar.

</details>

## III - Login (`/login`)
#### [POST `/login`] :x:

<details>

+ Request (application/json)
+ Body
  
          {
            "email": "adm@deliveryapp.com",
            "password": "--adm2@21!!--"
          }

+ Response 200 Ok (application/json)

          {
            "name": "Delivery App Admin",
            "email": "adm@deliveryapp.com",
            "role": "administrator",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MSwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjYwMjgwMTIxLCJleHAiOjE2NjA4ODQ5MjF9.1j9MEbNaFI9y1Fv0vaMIM56wPNbH-df4subWyQd6OX4"
          }

</details>

## IV - Register (`/register`)
#### [POST `/register`] :x:

<details>

+ Request (application/json)
+ Body

          {
            "name": "newCustomer012",
            "email": "newCustomer@email.com",
            "password": "%new-customer%"
          }

+ Response 201 Created (application/json)

          {
            "name": "newCustomer012",
            "email": "newCustomer@email.com",
            "role": "customer",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NCwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTY2MDI3Nzg5NywiZXhwIjoxNjYwODgyNjk3fQ.KbyaKb69XywMwtEq0-CqpdJl8G0jkfJsnme8qAxg3So"
          }

</details>

## V - Seller (`/seller`)
#### [GET `/seller/orders`]

<details>

+ Response 200 Ok (application/json)

          [
            {
              "user": {
                "id": 3,
                "name": "Cliente Zé Birita",
                "email": "zebirita@email.com",
                "role": "customer"
              },
              "seller": {
                "id": 2,
                "name": "Fulana Pereira",
                "email": "fulana@deliveryapp.com",
                "role": "seller"
              },
              "order": {
                "address": "Rua Liberdade",
                "adressNumber": "19",
                "saleDate": "01/07/2022",
                "totalPrice": "15.00",
                "status": "Em Trânsito"
              }
            },
            {
              "user": {
                "id": 3,
                "name": "Cliente Zé Birita",
                "email": "zebirita@email.com",
                "role": "customer"
              },
              "seller": {
                "id": 2,
                "name": "Fulana Pereira",
                "email": "fulana@deliveryapp.com",
                "role": "seller"
              },
              "order": {
                "address": "Rua Alfeneiros",
                "adressNumber": "14",
                "saleDate": "01/06/2022",
                "totalPrice": "9.70",
                "status": "Entregue"
              }
            }
          ]

</details>

#### [GET `/seller/orders/:id`]

<details>

+ Response 200 Ok (application/json)

          {
            "saleDate": "01/07/2022",
            "id": 1,
            "totalPrice": "15.00",
            "status": "Em Trânsito",
            "seller": {
              "name": "Fulana Pereira"
            },
            "products": [
              {
                "id": 2,
                "name": "Heineken 600ml",
                "price": "7.50",
                "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
                "salesProducts": {
                  "quantity": 1
                }
              },
              {
                "id": 4,
                "name": "Brahma 600ml",
                "price": "7.50",
                "urlImage": "http://localhost:3001/images/brahma_600ml.jpg",
                "salesProducts": {
                  "quantity": 1
                }
              }
            ]
          }

</details>

#### [PATCH `/seller/orders/update/:id`]

<details>
  
+ Request (application/json)
+ Body

          {
	          "status": "Preparando"
          }

+ Response 200 Ok (application/json)

          {
            "message": "Updated"
          }
  
:warning: Para essa requisição será necessário informar em seu corpo o status do pedido, podendo ser este `Preparando` ou `Em Trânsito`.

</details>
