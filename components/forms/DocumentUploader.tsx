import React from 'react'

import * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import variables from '@/constants/variables';
import { typography } from '@/constants/typography';
import { AntDesign, Feather } from '@expo/vector-icons';

interface Props {
  label?: string;
  docType: string;
  selectedFile: any;
  setSelectedFile: (value: any) => void;
}


export default function DocumentUploader({ label, selectedFile, setSelectedFile, docType } : Props ) {

    const handlePickDocument = async function() {
        const result = await DocumentPicker.getDocumentAsync({
            type: docType == "music" ? 'audio/*' : 'pdf/*',
            multiple: false
        });

        if (!result.canceled) {
            console.log("===========================", result.assets)
            setSelectedFile(result.assets[0]);
        }
    };
    
    const onRemoveImage = function() {
        setSelectedFile(null)
    }
  



  return (
    <React.Fragment>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.container]}>
            <TouchableOpacity style={styles.addContainer} onPress={handlePickDocument}>
                {selectedFile ? (
                    <React.Fragment>
                        <Text style={{ color: variables.colors.background, fontSize: 12, width: "80%" }}>{selectedFile?.name}</Text>

                        <TouchableOpacity onPress={onRemoveImage} style={styles.remove}>
                            <AntDesign name="closecircle" size={24} color={variables.colors.text} />
                        </TouchableOpacity>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <AntDesign name="addfile" size={40} color={variables.colors.primary} />
                        <Text style={{ color: variables.colors.background, fontSize: 17 }}>Choose {docType}</Text>
                    </React.Fragment>
                )}
            </TouchableOpacity>
        </View>
    </React.Fragment>
  )
}



const styles = StyleSheet.create({
  container: {
      width: 150,
      height: 100,
      borderRadius: 6,
      backgroundColor: variables.colors.tintedWhite,
      position: "relative"
  },
  label: {
      ...typography.paragraphBg,
      color: variables.colors.text,
      marginBottom: 10,
  },
  images: {
      width: "100%",
      height: "100%"
  },
  addContainer: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
  },
  remove: {
      width: 40,
      height: 40,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#950606",
      position: "absolute",
      top: 0,
      right: 5,
  }
})