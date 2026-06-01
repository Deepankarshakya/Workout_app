import {View, StyleSheet} from 'react-native';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import { SequenceItems, SequenceType } from '../types/data';
import slugify from "@sindresorhus/slugify"

export default function PlannerScreen({navigation}: any){


    const handelFormSbmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItems ={
            slug: slugify(form.name + " " + Date.now(), {lowercase:true}),
            name: form.name,
            type: form.type as SequenceType,
            duration : Number(form.duration)
        };

        if(form.reps){
            sequenceItem.reps=Number(form.reps)
        }

        console.log(sequenceItem);
    }


    return(
        <View style={styles.container}>
            <ExerciseForm 
            onSubmit={handelFormSbmit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding:10,
    }
})