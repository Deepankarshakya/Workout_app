import {View, StyleSheet} from 'react-native';
import WorkOutForm, { ExerciseForm } from '../components/WorkOutForm';

export default function PlannerScreen({navigation}: any){


    const handelFormSbmit = (form: ExerciseForm) => {
        alert(`${form.name} - ${form.duration}`)
    }


    return(
        <View style={styles.container}>
            <WorkOutForm 
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