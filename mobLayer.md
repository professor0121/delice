```mermaid
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
      +getProductById()
      +updateProduct()
      +deleteProduct()
    }

    class ReelSlice {
      +reels
      +currentReel
      +createReel()
      +getAllReels()
      +getReelById()
      +updateReel()
      +deleteReel()
    }

    class UploadSlice {
      +image
      +images
      +reelVideo
      +uploadImage()
      +uploadImages()
      +uploadReelVideo()
    }

    class BusinessSlice {
      +activationStatus
      +requestBusinessActivation()
    }

    MobileApp --> ProductScreens
    MobileApp --> ReelScreens
    MobileApp --> AuthSlice
    MobileApp --> ProductSlice
    MobileApp --> ReelSlice
    MobileApp --> UploadSlice
    MobileApp --> BusinessSlice

    ProductScreens --> ProductSlice
    ReelScreens --> ReelSlice
    ReelScreens --> UploadSlice
```