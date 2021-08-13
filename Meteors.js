import React, {Component} from 'react'
import { Text,View,StyleSheet,SafeAreaView,Platform,StatusBar,Alert,FlatList,Image,ImageBackground,Dimensions} from 'react-native'
import axios from "axios"

export default class MeteorsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            meteors:{}
        }
    }
    componentDidMount(){
        this.getMeteors()
    }
    getMeteors=()=>{
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=Agm6pwhlVeu6XzhQbIeq3tfQR3oCqXvHG0w5g4jq")
        .then(response=>this.setState({meteors:response.data.near_earth_objects}))
        .catch(error=>alert(error))
    }
    renderItem=({item})=>{
        let meteor=item
        let bg_img,speed,size
        if(meteor.threat_score<=30){
            bg_img=require("../assets/bg_image.png")
            speed=require("../assets/meteor_icon.png")
            size=100
        }
        else if(meteor.threat_score<=75){
            bg_img=require("../assets/bg_updates.jpg")
            speed=require("../assets/meteor_icon.png")
            size=150
        } 
        else {
            bg_img=require("../assets/meteor_bg.jpg")
            speed=require("../assets/meteor_icon.png")
            size=200
        }
        return(
            <ImageBackground source={bg_img} style={styles.backgroundImage}>
                <View styles={styles.giftcontainer}>
                    <Image source={speed} style={{width:size,height:size,alignSelf:"center"}}></Image>
                    <View>
                        <Text style={[styles.cardtittle,{marginTop:400,marginLeft:50}]}>{item.name}</Text>
                        <Text style={[styles.cardtext,{marginTop:20,marginLeft:50}]}> closest to earth- {item.close_approach_data[0].close_approach_date_full}</Text>
                        <Text style={[styles.cardtext,{marginTop:5,marginLeft:50}]}> minimum diameter(km)- {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                        <Text style={[styles.cardtext,{marginTop:5,marginLeft:50}]}> maximum diameter(km)- {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                        <Text style={[styles.cardtext,{marginTop:5,marginLeft:50}]}> velocity(km/h)- {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                        <Text style={[styles.cardtext,{marginTop:5,marginLeft:50}]}> missing earth by(km)- {item.close_approach_data[0].miss_distance.kilometers}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    keyExtractor=(item,index)=>index.toString()
    render(){
        if(Object.keys(this.state.meteors).length===0){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else{
            let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{return this.state.meteors[meteor_date]})
            let meteors=[].concat.apply([],meteor_arr)

            meteors.forEach(function(element) {
                let diameter=(element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
                let threatScore=(diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
                element.threat_score=threatScore
            });
            meteors.sort(function(a,b){
                return b.threat_score-a.threat_score
            })
            meteors=meteors.slice(0,5)
            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.androidSafeArea}/>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={meteors}
                    renderItem={this.renderItem}
                    horizontal={true}/>
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
        resizeMode:'cover',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    titlebar:{
        flex:0.15,
        justifyContent:"center",
        alignItems:"center"
    },
    titleText:{
        fontSize:30,
        fontWeight:"bold",
        color:"white"
    },
    meteorcontainer:{
        flex:0.7
    },
    map:{
        width:"100%",
        height:"100%"
    },
    listContainer:{
        flex:0.2,
        backgroundColor:"white",
        marginTop:-10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:30
    },
    infoText:{
        fontSize:15,
        color:"black",
        fontWeight:"bold"
    },
    cardtittle:{
        fontSize:20,
        marginBottom:10,
        fontWeight:"bold",
        color:"white"
    },
    cardtext:{
        color:"white",
    },
    giftcontainer:{
        justifyContent:'center',
        alignItems:"center",
        flex:1
    }

})

