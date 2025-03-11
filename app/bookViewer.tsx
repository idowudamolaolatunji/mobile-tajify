import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";
import { BookType } from "@/types/type";
import { useDataContext } from "@/context/DataContext";
import InfoBox from "@/components/layouts/InfoBox";
// import ReactNativeBlobUtil from 'react-native-blob-util'
// import PdfRendererView from "react-native-pdf-renderer";
// import PdfViewer from 'react-native-pdf';
// import PDFReader from 'rn-pdf-reader-js'

// import PdfRendererView from 'react-native-pdf-renderer';
import * as FileSystem from 'expo-file-system';


export default function BookViewer() {
    const { selectedData } : { selectedData: BookType } = useDataContext();
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState<string>();
    // const [pdfPath, setPdfPath] = useState("");

//     const onlineSource = { uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true };
//   const [pdfSource, setPdfSource] = useState(onlineSource);
//   const pdfRef = useRef();

    useEffect(function() {
        // async function fetchProcess() {
        //     setLoading(true);
    
        //     try {
        //         const res = await ReactNativeBlobUtil.config({ fileCache: true }).fetch("GET", "../assets/item.pdf");
        //         console.log(res)
        //         const path = res.path();
        //         console.log("path:", path);
        //         setPdfPath(path);
        //     } catch(err) {
        //         setLoading(false)
        //     } finally {
        //         setLoading(false)
        //     }
        // }

        // setLoading(true);

        // const fetchProcess = ReactNativeBlobUtil.config({ fileCache: true, appendExt: "pdf" }).fetch("GET", "../assets/item.pdf")
        // fetchProcess.then(res => {
        //     const path = res.path();
        //     console.log("path:", path);
        //     setPdfPath(path);

        // }).catch((_) => setLoading(false))

        // fetchProcess()
        // console.log(pdfPath)
    }, []);


  const downloadWithExpoFileSystem = useCallback(async () => {
    try {
      setLoading(true);
     
      const response = await FileSystem.downloadAsync(selectedData.file.url,
        FileSystem.documentDirectory + 'file.pdf',
      );
      setSource(response.uri);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    downloadWithExpoFileSystem();
  }, [downloadWithExpoFileSystem]);

	return (
		<View style={styles.pageContainer}>
			<BackButton showText />

            {/* {loading && (
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -50 }}>
                    <ActivityIndicator size={"large"} color={variables.colors.text} />
                </View>
            )}

            {(!pdfPath && !loading) && (
                <InfoBox text="An Error occured while loading the PDF file" />
            )}

            {(pdfPath && !loading) && (
                <PdfRendererView source={pdfPath} distanceBetweenPages={15} maxZoom={5} />
            )} */}


            {/* <Pdf source={{ uri: "../assets/item.pdf", cache: true }} style={styles.pdf} /> */}

            {/* <PdfViewer
        trustAllCerts={false}
        // ref={pdfRef} 
        source={pdfSource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      /> */}

        {/* <PDFReader
            source={{ uri: selectedData.file.url }}
            style={styles.pdf}
        /> */}


            {loading && (
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -50 }}>
                    <ActivityIndicator size={"large"} color={variables.colors.text} />
                </View>
            )}

            {(!source && !loading) && (
                <InfoBox text="An Error occured while loading the PDF file" />
            )}

            {/* {(source && !loading) && (
                <PdfRendererView
                    style={{backgroundColor: 'red'}}
                    source={source}
                    distanceBetweenPages={16}
                    maxZoom={20}
                    maxPageResolution={2048}
                    //   singlePage={singlePage}
                    onPageChange={(current, total) => {
                        console.log('onPageChange', {current, total});
                        // setCurrentPage(current);
                        // setTotalPages(total);
                    }}
                />
            )} */}
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: variables.colors.background,
		paddingHorizontal: 16,
	},
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
