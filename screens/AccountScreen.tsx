import { useEffect } from 'react';
import {View, Text, Button} from 'react-native';

export default function AccountScreen({navigation}: any){

        useEffect(() => {
        console.log("Rendering Account Screen");

        return()=> console.log("Unmounting Account Screen");
    }, [])

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>I am Setting Screen</Text>
        </View>
    )
}