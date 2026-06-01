import {View, StyleSheet} from 'react-native';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import { SequenceItems, SequenceType } from '../types/data';
import slugify from "@sindresorhus/slugify"
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ExerciseItem from '../components/ExerciseItem';
import { PressableTextClose } from '../components/styled/pressableclose';

export default function PlannerScreen({navigation}: any){
    const [seqItems, setSeqItems] = useState<SequenceItems[]>([]);


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

        setSeqItems([...seqItems, sequenceItem]);
    }


    return(
        <View style={styles.container}>

            <ExerciseForm 
            onSubmit={handelFormSbmit}/>
            <FlatList
            data={seqItems}
            renderItem={({item, index}) =>
                <ExerciseItem item={item}>
                    <PressableTextClose 
                        text="Remove"
                        onPressIn={() => {
                            const items = [...seqItems]
                            items.splice(index, 1);
                            setSeqItems(items)

                        }}
                    />
                </ExerciseItem>
            }
            keyExtractor={item => item.slug}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding:10,
    }
})