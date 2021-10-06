import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager"
import axios from 'axios';
export default function App() {

  const [value,setValue] = useState()

  useEffect(()=>{
    RegisterBackgroundTask();
  },[])

  const handleAddTask = () => {
    const config = {
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ title : value });

    const api="api";
    axios.post(api,body,config).then((res)=>{
    console.log("Data is ",res.data)
    
    }).catch((err)=>{
      console.log(err,"error");
    })
  }

  const TASK_NAME = "BACKGROUND_TASK"
  TaskManager.defineTask(TASK_NAME, () => {
    try {
      // fetch data here...
      const receivedNewData = new Date().toString(); 
      console.log( receivedNewData)
      setValue(receivedNewData);
      return receivedNewData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData
    } catch (err) {
      return BackgroundFetch.Result.Failed
    }
  })
   const RegisterBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 5,
        stopOnTerminate: false,
        startOnBoot: true,
       
      })
      console.log("Task registered")
    } catch (err) {
      console.log("Task Register failed:", err)
    }
  }
  
  if(value){
    handleAddTask();
    console.log('function called')
   }
   else{
     console.log("function not calling")
   }


  return (
    <View style={styles.container}>
      <Text>hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
