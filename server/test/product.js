async function createProduct(){
   const res = await fetch("http://localhost:3000/api/products/create-product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "MacBook Pro",
      description: "Best laptop",
      price: 150000,
      productImageUrl: "https://cloudinary.com/image.jpg",
      productImageGalleryUrls: [
        "https://cloudinary.com/img1.jpg",
        "https://cloudinary.com/img2.jpg"
      ],
      addedBy: "675daaf21c98180ad1b75b8a",
      discountPercentage: 5,
      stockQuantity: 12
    })
  });

  const data = await res.json();
  console.log("Response:", data);
}

createProduct();
