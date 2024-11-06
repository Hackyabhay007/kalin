import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ProductPage = () => {
  const router = useRouter();
  const { product: productId } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        const client = new Client();
        client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
        const databases = new Databases(client);

        try {
          const response = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS_ID,
            productId
          );
          console.log('Fetched product data:', response);
          setProduct(response);
          setMainImage(response.mainImage);
        } catch (error) {
          console.error('Error fetching product data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="text-center my-10 animate-pulse">
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Nav />
        <div className="text-center my-10">
          <p>Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const mainImageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/6728694d000af27c9294/files/${mainImage}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`;

  const handleImageClick = (imageId) => setMainImage(imageId);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div>
      <Nav />
      <div className="max-w-5xl md:mx-auto p-10 flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Additional Images */}
        <div className='flex h-full gap-2'>
        <div className="w-1/5  flex flex-col space-y-2">
          {product.additionalImages && product.additionalImages.map((imageId) => (
            <Image
              key={imageId}
              src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/6728694d000af27c9294/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`}
              alt={product.name}
              width={100}
              height={100}
              className="cursor-pointer object-cover border rounded"
              onClick={() => handleImageClick(imageId)}
            />
          ))}
        </div>

        {/* Center Column: Main Image */}
        <div className="w-3/5">
          <Image src={mainImageUrl} alt={product.name} width={500} height={500} className="object-contain" />
          <p className=" text-justify text-gray-700 mt-4">{product.description}</p>
        </div>
</div>
        {/* Right Column: Product Details */}
        <div className="md:w-2/5 space-y-8">
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <hr className="border-gray-400" />
          <p className="text-2xl font-semibold text-gray-800">MRP: {product.price}</p>
          <hr className="border-gray-400" />

          {/* Size Options */}
          <div>
            <p className="font-semibold">Size:</p>
            <div className="flex space-x-2 mt-2">
              {product.sizes && product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded-none ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div>
            <p className="font-semibold">Color:</p>
            <div className="flex space-x-2 mt-2">
              {product.colors && product.colors.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded border"
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center space-x-3 mt-4">
            <button onClick={decreaseQuantity} className="px-2 py-1 border rounded-sm bg-black text-white">-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} className="px-2 py-1 border rounded-sm bg-black text-white">+</button>
          </div>

          {/* Buy Now and Add to Cart */}
          <div className="flex space-x-4 mt-6">
            <button className="w-1/2 px-6 py-2 bg-black text-white ">Buy Now</button>
            <button className="w-1/2 px-6 py-2 bg-gray-200 text-black ">Add to Cart</button>
          </div>

          {/* Shipping Information */}
          <div className="mt-8">
            <p className="text-sm font-semibold">Shipping all over India</p>
            <p className="text-sm text-gray-600">Estimated delivery within 2 to 5 business days | <span className="underline cursor-pointer">Update location</span></p>
            <div className="mt-4">
              <label className="block text-sm">Free Shipping All Over India</label>
              <div className="flex mt-2">
                <input
                  type="text"
                  placeholder="Enter pin code"
                  className="px-3 py-2 border rounded-none"
                />
                <button className="px-4 py-2 bg-black text-white rounded-none">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
