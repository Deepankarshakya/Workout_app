import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {  initWorkouts } from "../storage/workout";



export default function useCachedResources(){
    const [isloadingComplete, setIsLoagingCompete] = useState(false);


    useEffect(() => {
        async function loadResourcesAndDataAsync(){
            try{
                await initWorkouts();
                await Font.loadAsync({
                    "Finland" : require("../assets/fonts/FinlandicaHeadline-Regular.ttf"),
                    "Finland-bold" : require("../assets/fonts/FinlandicaHeadline-Bold.ttf"),
                })
            } catch(e){
                console.warn(e);
            }finally{
                setIsLoagingCompete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, [])


    return isloadingComplete;
}


