import React,{ useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View,TextInput, ScrollView,Image } from 'react-native';

export default function App() {
  const apikey="http://www.omdbapi.com/?apikey=5e0ae946"

  const [state,setstate]= useState({
  s:"search for movie",
  results:[],
  selected:{}
  });

  const search = () => {
    axios(apikey+"&s="+state.s)
    .then(({data})=>{
      let results=data.Search
      console.log(results)
      setstate(prevState=>{
        return{...prevState,results:results}
      }

      )
    })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie info</Text>
      <TextInput style={styles.searchbox}
      onChangeText={
        text=> setstate(prevState =>{
          return{...prevState, s:text}
        })
      }
      onSubmitEditing={search}
      value={state.s}
      />
      <ScrollView style={styles.results}>
       {state.results.map(result =>(
         <View key={result.imdbID} style={styles.result}>
           
           <Image 
           source={{uri:result.Poster}}
           style={{
             width:'100%',
             height:300,
             borderRadius:10,
           }}
           resizeMode="cover"
           />

         <Text style={styles.heading}>{result.Title}</Text>  
         </View>
       ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title:{
    color:'#FFF',
    fontSize:32,
    fontWeight:'700',
    padding:10,
    marginBottom:20,
  },
  searchbox:{
    fontSize:20,
    fontWeight:'300',
    padding:20,
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:10,
    marginBottom:40,
  },
  results:{
   flex:1,
  },
  result:{
    flex:1,
    width:'100%',
    marginBottom:20,
  },
  heading:{
    color:'#FFF',
    fontSize:18,
    fontWeight:'700',
    padding:20,
    backgroundColor:'#C422E4',
  }
});
