import { StyleSheet, Text, View } from 'react-native';

const AddNewProduct = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AddNewProduct</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});

export default AddNewProduct;
