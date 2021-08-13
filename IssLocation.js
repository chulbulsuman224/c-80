import React, {Component} from 'react'
import { Text,View,StyleSheet,ImageBackground,StatusBar,SafeAreaView,Image,Alert,Platform} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import axios from "axios"

export default class IssLocationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            location:{}
        }
    } 
    componentDidMount(){
        this.getIssLocation()
        try {
            setInterval(async()=>{this.getIssLocation()},5000)
        }
        catch(e){
            console.log(e)
        }
    }
    getIssLocation=()=>{
        axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response=>{this.setState({location:response.data})})
        .catch(error=>{alert(error.message)})
    }
    render(){
        if(Object.keys(this.state.location).length===0){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else{
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.androidSafeArea}/>
                <ImageBackground source={require('../assets/iss_bg.jpg')} style={styles.backgroundImage}>
                    <View style={styles.titlebar}>
                        <Text style={styles.titleText}>Iss Location</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map}
                        region={{
                            latitude:this.state.location.latitude,
                            longitude:this.state.location.longitude,
                            latitudeDelta:100,
                            longitudeDelta:100
                        }}>
                           
                        </MapView>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>latitude: {this.state.location.latitude}</Text>
                        <Text style={styles.infoText}>longitude: {this.state.location.longitude}</Text>
                        <Text style={styles.infoText}>altitude(km): {this.state.location.altitude}</Text>
                        <Text style={styles.infoText}>velocity(km/h): {this.state.location.velocity}</Text>
                    </View>
                    </ImageBackground>
            </View>
        )
    }
}
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    androidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },
    backgroundImage:{
        flex:1,
        resizeMode:'cover'
    },
    titleContainer:{
        flex:0.1,
        justifyContent:"center",
        alignItems:"center"
    },
    titleText:{
        fontSize:30,
        fontWeight:"bold",
        color:"white"
    },
    mapContainer:{
        flex:0.7,
    },
    map:{
        width:"100%",
        height:"100%"
    },
    infoContainer:{
        flex:0.2,
        backgroundColor:'white',
        marginTop:-10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:30
    },
    infoText:{
        fontSize:15,
        color:"black",
        fontWeight:"bold"
    }
})



