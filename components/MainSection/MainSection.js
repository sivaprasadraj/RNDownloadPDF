import React, {useState} from 'react';
import {Button, Icon, Overlay} from 'react-native-elements';
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const MainSection = () => {
  const [loader, setLoader] = useState(false);
  function downloadPdf() {
    axios.post('https://downloadpdf.free.beeceptor.com').then(res => {
      writeToPdf(res.data);
      setLoader(false);
    });
  }
  async function writeToPdf(data) {
    const path = `${RNFetchBlob.fs.dirs.DocumentDir}/document.pdf`;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permission to save file into the file storage',
        message:
          'The app needs access to your file storage so you can download the file',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        'This app needs storage permission to download the PDF. Please provide permissions',
      );
      return;
    }
    const fileName = 'document.pdf';
    const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
    RNFetchBlob.fs
      .writeFile(filePath, data, 'base64')
      .then(() => {
        Alert.alert('PDF File downloaded successfully');
        return RNFetchBlob.android.addCompleteDownload({
          title: fileName,
          description: 'Download complete',
          mime: 'application/pdf',
          path: filePath,
          showNotification: true,
        });
      })
      .then(() =>
        RNFetchBlob.fs.scanFile([{path: filePath, mime: 'application/pdf'}]),
      );
  }
  return (
    <View style={styles.MainView}>
      <View>
        {loader ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <Button
          icon={<Icon name="cloud-download" size={25} color="white" />}
          title="  DOWNLOAD PDF "
          onPress={downloadPdf}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});
export default MainSection;
