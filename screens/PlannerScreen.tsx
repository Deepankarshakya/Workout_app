import {View, StyleSheet} from 'react-native';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import { SequenceItems, SequenceType } from '../types/data';

export default function PlannerScreen({navigation}: any){


    const handelFormSbmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItems ={
            slug: form.name + Date.now(),
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