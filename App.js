import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Modal, TouchableHighlight, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const { width, height } = Dimensions.get('window');

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qr, setQR] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [flyerText, setFlyerText] = useState('');
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {

        if (type == 256) {
            setScanned(true);
            setQR(true);
            setModalVisible(true);
            setFlyerText(data);
            // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        }

    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#222222',
                // justifyContent: 'center'
            }}>
            <View style={styles.header}>
                <Text style={styles.logo}> Flyer </Text>
            </View>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, styles.camera]}
            >
                {!qr ? <Image style={[styles.rec]} source={require('./assets/rec.png')} /> : <></>}
            </BarCodeScanner>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.scanBtn} onPress={() => { setScanned(false); setQR(false) }}>
                    <Image
                        style={styles.qr}
                        source={require('./assets/qr.png')}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{flexGrow: 1, justifyContent: 'center'}}>
                    <View style={styles.centeredView}>
                        <ScrollView>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>
                                    {flyerText}
                                </Text>
                                <TouchableHighlight
                                    style={{ ...styles.openButton1, backgroundColor: '#2196F3' }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={styles.textStyle}>
                                        Close
                                    </Text>
                                </TouchableHighlight>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    logo: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold'
    },
    header: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanBtn: {
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        position: 'absolute',
        height: 50,
        width: '100%',
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: '700',
        color: '#222'
    },
    camera: {
        marginTop: -25,
        backgroundColor: '#222',
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qr: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    rec: {
        width: '75%',
        height: '75%',
        resizeMode: 'contain',
    },
    centeredView: {
        // alignItems: 'center', 
        // justifyContent: 'center', 
        margin: 20, 
        backgroundColor: '#6943FF', 
        borderRadius: 35,
        // height: height - 500
    },
    modalView: {
        alignItems: 'center',
        padding: 35,
    },
    openButton1: {
        backgroundColor: '#F194FF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 24
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
})


// import React, { useState } from 'react';
// import { Dimensions, Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';




// export default function App() {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>
//                 Hello World! When using the scanner component on one of the tabs managed by BottomTabNavigator, the scan should be paused when navigating to the other screens. You can suse React Navigation emits events “didFocus” and “willBlur” to pause/resume the component.
//                 sHello World! When using the scanner component on one of the tabs managed by BottomTabNavigator, the scan should be paused when navigating to the other screens. You can use React Navigation emits events “didFocus” and “willBlur” to pause/resume the component.
//             </Text>

//             <TouchableHighlight
//               style={{ ...styles.openButton1, backgroundColor: '#2196F3' }}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//               }}>
//               <Text style={styles.textStyle}>
//                   x
//               </Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>

//       <TouchableHighlight
//         style={styles.openButton}
//         onPress={() => {
//           setModalVisible(true);
//         }}>
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </TouchableHighlight>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     position: 'relative',
//     width: width - 40,
//     margin: 20,
//     backgroundColor: '#222',
//     borderRadius: 35,
//     padding: 35,
//     alignItems: 'center',
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//   },
//   openButton1: {
//     backgroundColor: '#F194FF',
//     borderRadius: 50,
//     position: 'absolute',
//     justifyContent: 'center',
//     height: 50,
//     width: 50,
//     right: -10,
//     top: -10
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',

//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#fff'
//   },
// });