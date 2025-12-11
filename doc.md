1. Introduction
This documentation describes the complete architecture and design of the Delice project, including the mobile client (Expo React Native), admin web panel (React), and Node.js/Express backend with MongoDB. It focuses on structure, responsibilities, data flow, and UML diagrams, without detailing concrete HTTP route or API specifications. The codebase uses a clear separation of concerns: controllers, services, DAOs, and models on the backend, and Redux-based state management on the clients.

2. High‑Level System Architecture
The system consists of three main subsystems:

Backend API server: Node.js + Express, MongoDB, Cloudinary integration for media, JWT auth, business activation workflows.
Mobile app (delice): Expo React Native application for end users and business users, managing reels and products via Redux slices.
Admin panel (admin): React web app for administrators to manage users and business activation requests.
2.1 System Architecture Diagram
flowchart LR
    subgraph ClientLayer [Client Layer]
        MobileApp[Delice Mobile App]
        AdminApp[Admin Web App]
    end

    subgraph BackendLayer [Backend API Layer]
        ExpressApp[Express Application]
        AuthModule[Auth Module]
        ProductModule[Product Module]
        ReelModule[Reel Module]
        BusinessModule[Business Module]
        UserAdminModule[User Admin Module]
        CloudinaryModule[Cloudinary Upload Module]
    end

    subgraph DataLayer [Data Layer]
        MongoDB[(MongoDB)]
        Cloudinary[(Cloudinary Storage)]
        Redis[(Redis OTP Store)]
    end

    MobileApp --> ExpressApp
    AdminApp --> ExpressApp

    ExpressApp --> AuthModule
    ExpressApp --> ProductModule
    ExpressApp --> ReelModule
    ExpressApp --> BusinessModule
    ExpressApp --> UserAdminModule
    ExpressApp --> CloudinaryModule

    AuthModule --> MongoDB
    ProductModule --> MongoDB
    ReelModule --> MongoDB
    BusinessModule --> MongoDB
    UserAdminModule --> MongoDB

    CloudinaryModule --> Cloudinary
    AuthModule --> Redis
3. Backend Overview
The backend entry point is server/index.js, which creates an HTTP server wrapping the Express app and listens on a configured port.

src/app.js (not fully shown but implied) wires:
Global middleware (JSON parsing, CORS, auth, etc.).
Route modules: auth, business, user admin, product, reel, cloudinary.
The backend follows a Controller → Service → DAO → Model layering pattern:
Controllers handle HTTP layer, validation, and response formatting.
Services contain business logic (e.g., advanced user search, auth, business activation).
DAOs encapsulate database access with Mongoose models.
Models define MongoDB schemas such as User, Product, and Reel.
3.1 Backend Layered Class Diagram
classDiagram
    class ExpressApp {
      +useMiddleware()
      +useRoutes()
      +listen()
    }

    class AuthController {
      +loginUser()
      +registerUser()
      +loginWithOtp()
      +forgotPassword()
      +resetPassword()
      +userProfile()
    }

    class BusinessController {
      +activationBusinessRequest()
      +activateBusinessAdmin()
    }

    class ProductController {
      +createProduct()
      +getAllProducts()
      +getProductById()
      +updateProduct()
      +deleteProduct()
    }

    class ReelController {
      +createReelController()
      +getReelByIdController()
      +getAllReelsController()
      +updateReelByIdController()
      +deleteReelByIdController()
    }

    class AdminUserController {
      +getAllUser()
      +getTypedUser()
      +getBusinessRequestedUser()
      +getAdvancedUsers()
      +softDeleteUser()
    }

    class AuthService {
      +registerService()
      +loginService()
      +loginWithOtpService()
      +forgotPasswordService()
      +resetPasswordService()
      +getUserProfileService()
    }

    class BusinessService {
      +requestBusinessActivationService()
      +approveBusinessActivationService()
    }

    class ProductService {
      +createProductService()
      +getAllProductsService()
      +getProductByIdService()
      +updateProductService()
      +deleteProductService()
    }

    class ReelService {
      +createReelService()
      +getReelByIdService()
      +getAllReelsService()
      +updateReelByIdService()
      +deleteReelByIdService()
    }

    class AdminUserService {
      +getAllUsersService()
      +getTypedUserService()
      +getBusinessRequestedUserService()
      +getAdvancedUsersService()
      +softDeleteUserService()
    }

    class UserDAO {
      +findUserByEmail()
      +findUserByUsername()
      +createUser()
      +verifyUser()
      +updateUserPassword()
      +updateUserByEmail()
      +getUsersByAccountTypeDAO()
      +getBusinessRequestedUsersDAO()
      +getAdvancedUsersDAO()
      +softDeleteUserByEmailDAO()
    }

    class ProductDAO {
      +createProductDAO()
      +findAllProductsDAO()
      +countProductsDAO()
      +getProductByIdDAO()
      +updateProductDAO()
      +deleteProductDAO()
    }

    class ReelDAO {
      +createReelDAO()
      +getReelByIdDAO()
      +getAllReelsDAO()
      +updateReelByIdDAO()
      +deleteReelByIdDAO()
    }

    class UserModel
    class ProductModel
    class ReelModel

    AuthController --> AuthService
    BusinessController --> BusinessService
    ProductController --> ProductService
    ReelController --> ReelService
    AdminUserController --> AdminUserService

    AuthService --> UserDAO
    BusinessService --> UserDAO
    AdminUserService --> UserDAO
    ProductService --> ProductDAO
    ReelService --> ReelDAO

    UserDAO --> UserModel
    ProductDAO --> ProductModel
    ReelDAO --> ReelModel

    ExpressApp --> AuthController
    ExpressApp --> BusinessController
    ExpressApp --> ProductController
    ExpressApp --> ReelController
    ExpressApp --> AdminUserController
4. Backend Modules
4.1 Authentication Module
The authentication module manages registration, login with password and OTP, password reset, and user profile retrieval. It depends on user DAO functions, password hashing utilities, OTP sending and verification via Redis, and JWT token generation.

Key responsibilities:

Register:
Prevent duplicate email and username.
Hash password and store user with account type.
Login:
Validate credentials with comparePassword.
Trigger OTP flow and validate OTP via Redis.
Password reset:
Send and verify OTP for forgot password, then update password via DAO.
User profile:
Resolve authenticated user by email, return user profile and token.
4.1.1 Login with OTP Sequence Diagram
sequenceDiagram
    participant Mobile as Mobile Client
    participant AuthController as Auth Controller
    participant AuthService as Auth Service
    participant UserDAO as User DAO
    participant Redis as Redis OTP
    participant Jwt as Jwt Utility

    Mobile->>AuthController: submit login data
    AuthController->>AuthService: loginService email password
    AuthService->>UserDAO: findUserByEmail
    UserDAO-->>AuthService: user
    AuthService->>AuthService: comparePassword and validate
    AuthService->>Redis: sendOTP to email
    AuthService-->>AuthController: prompt for otp
    Mobile->>AuthController: submit otp
    AuthController->>AuthService: verifyOtp email otp
    AuthService->>Redis: verifyOTP email otp
    Redis-->>AuthService: otp valid
    AuthService->>Jwt: generateToken userId
    Jwt-->>AuthService: token
    AuthService-->>AuthController: user and token
    AuthController-->>Mobile: auth success and token
4.2 Business Activation Module
This module allows business users to request account activation and admins to approve or reject. It uses isActivatedBusinessAccount and accountType fields on the user schema.

Business user request:
Authenticated business user triggers activation request; service updates user to requested status.
Admin approve:
Admin provides email of target user; service updates user to activated.
4.2.1 Business Activation Sequence
sequenceDiagram
    participant BusinessUser as Business User
    participant Mobile as Mobile Client
    participant BusinessController as Business Controller
    participant BusinessService as Business Service
    participant UserDAO as User DAO

    BusinessUser->>Mobile: tap request activation
    Mobile->>BusinessController: send activation request
    BusinessController->>BusinessService: requestBusinessActivationService email
    BusinessService->>UserDAO: findUserByEmail
    UserDAO-->>BusinessService: user
    BusinessService->>UserDAO: updateUserByEmail set isActivatedBusinessAccount Requested
    UserDAO-->>BusinessService: updated user
    BusinessService-->>BusinessController: updated user
    BusinessController-->>Mobile: request submitted

    Admin Note over BusinessController,UserDAO: Separate admin flow
4.3 Product Module
The product module manages business user products, including CRUD operations, filtering, pagination, and ownership checks.

Controller: Uses services for create, read, update, delete and sets the correct addedBy for business accounts.
Service: Applies query filters based on request and calls DAO methods.
DAO: Encapsulates Mongoose queries with population and pagination.
Key behaviors:

On listing, if user is business, req.query.addedBy is set to user id to restrict products to their own.
Uses findAllProductsDAO with filters, sort, skip, and limit.
4.4 Reel Module
The reel module connects short video reels to products and users, including search, filters, and trending sorts.

Controller: Implements creation, retrieval, update, deletion, plus advanced filter logic like pagination, search, following-only, and trending sort.
Service: Delegates to DAO with built filter, skip, limit, and sort parameters.
DAO: Uses Mongoose to populate postedBy, reelProduct, likes, and comments.
Behaviors:

Business users see only their own reels unless filters indicate otherwise.
Supports search by caption, hashtags, and music name via regex.
Trending sort uses likesCount field.
4.4.1 Create Reel with Product Sequence
sequenceDiagram
    participant Mobile as Mobile Client
    participant UploadSlice as Upload Slice
    participant CloudinaryModule as Cloudinary Module
    participant ReelSlice as Reel Slice
    participant ReelController as Reel Controller
    participant ReelService as Reel Service
    participant ReelDAO as Reel DAO

    Mobile->>UploadSlice: dispatch uploadReelVideo file
    UploadSlice->>CloudinaryModule: upload single file
    CloudinaryModule-->>UploadSlice: return url
    UploadSlice-->>Mobile: reelVideo url stored in state

    Mobile->>ReelSlice: dispatch createReel title description videoUrl reelProduct postedBy
    ReelSlice->>ReelController: createReelController payload
    ReelController->>ReelService: createReelService payload with postedBy
    ReelService->>ReelDAO: createReelDAO reelData
    ReelDAO-->>ReelService: created reel
    ReelService-->>ReelController: reel
    ReelController-->>ReelSlice: created reel
    ReelSlice-->>Mobile: update reels list
4.5 Admin User Management Module
The admin module allows administrators to search and filter users, view business activation requests, and soft delete users.

Advanced search:
Filters on name, email, username, account type, and supports pagination, sort order, and soft delete filter.
Soft delete:
Uses isDeleted flags via softDeleteUserByEmailDAO while preserving records.
4.6 Cloudinary Upload Module
The Cloudinary upload module handles single and multiple file uploads, returning different payloads based on whether req.file or req.files is present.

For single uploads, returns { success, url, type }.
For multiple uploads, returns { success, urls }.
4.7 Middleware
Key middleware components:

userAuthMiddleware: Validates JWT tokens and attaches user to request for downstream use.
roleAuthMiddleware: Ensures user has required role such as Admin or Business.
accessProduct / accessReel: Ownership checks before modifying or deleting resources.
upload middleware: Wraps Multer for file uploads, used by Cloudinary routes.
5. Data Model and Database Design
The project uses MongoDB with Mongoose-defined schemas. Models include User, Product, Reel, and potentially Comment and other support collections.

5.1 Entity Relationship Diagram
erDiagram
    USER {
        String _id
        String firstName
        String lastName
        String email
        String password
        String userName
        String accountType
        String isActivatedBusinessAccount
        String mobileNumber
        Boolean isDeleted
    }

    PRODUCT {
        String _id
        String title
        String description
        Number price
        String productImageUrl
        String productImageGalleryUrls
        Number discountPercentage
        Number stockQuantity
        String addedBy
        Date createdAt
        Date updatedAt
    }

    REEL {
        String _id
        String title
        String description
        String videoUrl
        String reelProduct
        String postedBy
        Number likesCount
        Date createdAt
        Date updatedAt
    }

    COMMENT {
        String _id
        String text
        String author
        String reelId
        Date createdAt
    }

    USER ||--o{ PRODUCT : "adds"
    USER ||--o{ REEL : "posts"
    PRODUCT ||--o{ REEL : "linked in"
    USER ||--o{ COMMENT : "writes"
    REEL ||--o{ COMMENT : "has"
Note: Field names inferred from code (e.g., addedBy, reelProduct, postedBy, likesCount).

6. Mobile App (Delice) Architecture
The Delice mobile app is an Expo React Native project written in TypeScript and using Redux Toolkit. It manages UI screens for products and reels, integrating with the backend via a shared Axios instance.

Navigation:
Uses typed stack navigators, with stacks like ProductStackParamList and ReelStackParamList.
State Management:
Redux slices for products, reels, uploads, business activation, and auth.
Media Handling:
Uses expo-image-picker for reel video selection, then uploads via Cloudinary endpoints.
6.1 Mobile Layer Architecture Diagram
classDiagram
    class MobileApp {
      +navigation
      +reduxStore
      +screens
    }

    class ProductScreens {
      +ShowProducts()
      +AddProduct()
      +EditProduct()
      +ProductDetails()
    }

    class ReelScreens {
      +ShowReels()
      +CreatReel()
      +EditReel()
    }

    class AuthSlice {
      +user
      +token
      +login()
      +logout()
    }

    class ProductSlice {
      +products
      +product
      +createProduct()
      +getProducts()
     
