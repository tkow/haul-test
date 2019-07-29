/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { Button, SafeAreaView, StatusBar,Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker'


const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button
          title={'popup test'}
          onPress={
            async ()=> {
              try {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.allFiles],
                });
                console.log(
                  res.uri,
                  res.type, // mime type
                  res.name,
                  res.size
                );
                if(Platform.OS==='android' && res.uri && res.uri.startsWith('content://')) {
                  const uri = decodeURIComponent(res.uri)
                  console.log(fetch)
                  let result = await fetch(res.uri)
                  const blob = await result.blob()
                  console.log(blob);
                  console.log(result)
                }
              } catch (err) {
                console.error(err)
                if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                  throw err;
                }
              }
            }
          }
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
