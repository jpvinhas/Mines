import React from "react";
import { View,StyleSheet,Text,TouchableOpacity } from "react-native";

import Flag from "./Flag";

export default props => {
    return(
        <View style={styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity 
                    onPress={props.onFlagPress}
                    style= {styles.flagButton}>
                        <Flag bigger/>
                </TouchableOpacity>
                <Text style= {styles.flagsLeft}>= {props.flagsLeft}</Text>
            </View>
            <TouchableOpacity style = {styles.button}
                onPress={props.onNewGame}>
                    <Text style = {styles.buttonLabel}> Novo Jogo </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor: '#CCC',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    flagContainer:{
        flexDirection:'row',
    },
    flagButton:{
        marginTop: 8,
        minWidth: 30
    },
    flagsLeft:{
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
    },
    button:{
        paddingVertical:10,
        alignItems: 'center',
        backgroundColor: '#999',
        padding:5,
        borderRadius:10,
    },
    buttonLabel:{
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold',
    }
})