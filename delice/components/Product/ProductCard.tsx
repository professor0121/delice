// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import api from "../../redux/api/axiosInstance";
// import { useNavigation, NavigationProp } from "@react-navigation/native";

// type RootStackParamList = {
//   ProductDetails: { product: any };
//   EditProduct: { product: any };
//   AddProduct: undefined;
// };

// export default function ProductCard({ product, onDeleted }: { product: any; onDeleted?: () => void }) {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/products/${product._id}`);
//       onDeleted && onDeleted();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete product");
//     }
//   };

//   return (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: product.productImageUrl || "https://cdn-icons-png.flaticon.com/512/833/833314.png" }}
//         style={styles.thumb}
//       />

//       <View style={{ flex: 1 }}>
//         <Text style={styles.title}>{product.title}</Text>
//         <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
//         <View style={styles.row}>
//           <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product })}>
//             <Text style={styles.link}>View</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("EditProduct", { product })}>
//             <Text style={styles.link}>Edit</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleDelete}>
//             <Text style={[styles.link, { color: "#ff4d4f" }]}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     padding: 12,
//     backgroundColor: "#111",
//     borderRadius: 10,
//     marginBottom: 12,
//     alignItems: "center",
//   },
//   thumb: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   title: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   price: { color: "#ddd", marginTop: 6 },
//   row: { flexDirection: "row", gap: 18, marginTop: 10 },
//   link: { color: "#4da6ff", marginRight: 20 },
// });

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAppDispatch } from "@/redux/hooks";
import { deleteProduct } from "@/redux/slice/product.slice";

type RootStackParamList = {
  ProductDetails: { product: any };
  EditProduct: { product: any };
  AddProduct: undefined;
};

export default function ProductCard({ product, onDeleted }: { product: any; onDeleted?: () => void }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteProduct(product._id));

    if (deleteProduct.fulfilled.match(result)) {
      onDeleted && onDeleted();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
      style={styles.cardInsideLink}
      onPress={() => navigation.navigate("ProductDetails", { product })}>
      <Image
        source={{ uri: product.productImageUrl || "https://cdn-icons-png.flaticon.com/512/833/833314.png" }}
        style={styles.thumb}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProduct", { product })}>
            <Text style={styles.link}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <Text style={[styles.link, { color: "#ff4d4f" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
          </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#111",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  cardInsideLink:{
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  price: { color: "#ddd", marginTop: 6 },
  row: { flexDirection: "row", gap: 18, marginTop: 10 },
  link: { color: "#4da6ff", marginRight: 20 },
});


