# E-Parking-Website
This project is part of an internship at Polda, focused on developing a web-based E-Parking system. 
The website allows users to perform check-in and check-out activities at parking facilities and manages real-time parking capacity.

<img src="./src/public/img/logo_eparking.png" alt="Logo E-Parking" width="200" align="right">

> [Website Interface](#website-interface)

> [API Endpoint](#api-endpoint)

> [Installation and How To Use](#installation-and-how-to-use)

**Authors :**
| Name                              | NIM         | Universitas        |
| ----------------------------------|-------------|------------------- |
| Cherillya Rahmita Nurul Nucha     | 21106050029 | UIN Sunan Kalijaga |
| Qonita Muthmainnah                | 21106050018 | UIN Sunan Kalijaga |
| Levianita Rahmawati               | 21106050037 | UIN Sunan Kalijaga |

<br>

**Requirements & Tools :**
<br>
**Backend**: 
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
<br>
**Frontend**:
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=000000)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=000000)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
<br>
**Tools**: 
![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=XAMPP&logoColor=white)
![.ENV](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=000000)
<br>



## Website Interface
### Input Form Interface
> Visitors are asked to fill in the Visitor Guest Book, the personal data information include: vehicle license plate, visitor's full name, address, visitor's purpose, and    visitor's telephone number.
![input-form](https://github.com/user-attachments/assets/1aa2b649-8707-447f-ad83-21c47603d381)


### Choose Vehicle
> Choose vehicle after input data
![checkin](https://github.com/user-attachments/assets/5eb06afd-8c59-411c-8bc3-bbd9cecb94cc)


### Checkin Done
> Notification if check in is success
![checkin-done](https://github.com/user-attachments/assets/f162868d-6bec-4bbb-bc88-3c876d9e65c6)


### Vehicle Statistic
> The parking statistics page is divided into 2 types, namely for statistics for car and motorcycle vehicle types. This page displays information about the total initial parking capacity provided by POLDA DIY for visitors, the total visitors for each type of vehicle, and the total remaining parking capacity or that can be used by other visitors based on the type of vehicle to be selected.

|Motorcycle Statistic                                                                           |Car Statistic                                                            |
|-----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
|![stat-mot](https://github.com/user-attachments/assets/ff24b665-0aef-4bdc-8896-84d623eeadb5)|![stat-car](https://github.com/user-attachments/assets/2c9d9f31-34ee-46f5-98c3-d77f0633e76a)|


### All Guest Data
> The visitor data page is divided into 3 types, namely combined data for all visitors using both cars and motorbikes, data for visitors using cars, and data for visitors using motorbikes.
![guest-data](https://github.com/user-attachments/assets/58353fdc-29f0-4009-9051-c91e6214dd47)

|Motorcycle Guest Data                                                                        |Car Guest Data                                                           |
|---------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
|![guest-mot](https://github.com/user-attachments/assets/39513200-20a2-4ef7-999a-0254d04705e4)|![guest-car](https://github.com/user-attachments/assets/ef76b91c-b174-4637-b559-e2e71e720e04)|


### Checkout
> Visitors who have completed their business in the DIY POLDA area are asked to check out. This aims to update the data in the system so that the available parking capacity can be displayed in real-time. When checking out, visitors are asked to select the type of vehicle that matches the previous choice.
![checkout](https://github.com/user-attachments/assets/e2e161a9-ef90-4833-a273-cca97780130a)


### Checkout Form
> After that, the system will ask visitors to enter the vehicle license plate number to update the parking capacity in the system.
![form-checkout](https://github.com/user-attachments/assets/4d31e90a-f653-46bb-81ee-b54efce4b94d)


### Checkout Done
> Notification if check out is success.
![checkout-done](https://github.com/user-attachments/assets/a7a541fa-3a05-4ec1-9668-36d66be94dc6)


## API Endpoint
We created this API to make managing guest data simple and efficient. It provides functionality for recording guest check-ins and check-outs, tracking capacity, and viewing statistics based on different criteria.

|Endpoint    |Method |Description                                                                                         |
|-------------|--------|--------------------------------------------------------------------------------------------------|
|`/createTamu`|`POST`  |Create new guest data                                                                             |
|`/guestData`|`GET`    |Display all stored guest data                                                                     |
|`/guestByType`|`POST` |View guest information based on the type of vehicle                                               |
|`/kapasitas`|`POST`   |Track total and available parking capacity                                                        |
|`/statistik`|`POST`   |Display statistical data on total capacity, total visitors, and available capacity by vehicle type|
|`/checkoutTamu`|`POST`|Show a message indicating whether a guest has checked out or not                                  |


## Installation and How to Use
**1. Clone or download the source code**
   - Clone the repository using the following command:
     ```bash
     git clone [repository-URL]
     ```
   - Or, download the zip file and extract it to your desired folder

**2. Install dependencies**
  - Navigate to the project directory using the terminal or command prompt:
    ```bash
    cd e-parking-website
    ```
  - Install all dependencies listed in `package.json` using:
    ```bash
    npm install
    ```

**3. Configure the environment file**
  - Rename the `.env.example` file to `.env`
  - Ensure the variables in the `.env` file are configured correctly, such as user, password, database name, host, port, and API url

**4. Create the database**
  - Open phpMyAdmin or other MySQL client
  - Create a new database named `db-parking`

**5. Run the frontend**
  - To start the frontend development server, use the command:
    ```bash
    npm run start-dev
    ```
  - This will run the server using the `webpack.dev.js` configuration

**6. Run the backend**
  - To run the backend server with hot reload using `nodemon`, use the command:
    ```bash
    npm run dev
    ```
  - The server will use `server.js` as the entry point

**7. Access the application**
  - Access the application through the URL provided by the `webpack-dev-server`, that is http://localhost:9000
