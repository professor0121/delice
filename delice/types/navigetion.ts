export type ProductStackParamList = {
  ProductList: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
  ProductDetails: { productId: string };
};

export type ReelStackParamList={
  ReelList:undefined;
  CreateReel:undefined;
  EditReel:{reelId:string};
}