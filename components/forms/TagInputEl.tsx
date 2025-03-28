import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


interface Props {
    forHastTag?: boolean;
    placeholder?: string;
    label?: string;
    tags: string[];
    setTags: (value: string[]) => void;
}

export default function TagInputEl({ forHastTag=false, placeholder, label, tags, setTags } : Props) {
    
    const [text, setText] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const addTag = () => {
        if (text.trim() !== '') {
            const tag = text.startsWith('#') ? text.trim() : `#${text.trim()}`;
            
            if (editIndex !== null) {

                // If editing an existing tag
                const newTags = [...tags];
                newTags[editIndex] = forHastTag ? tag.replaceAll(" ", "").toLowerCase() : text.trim();
                setTags(newTags);
                setEditIndex(null);
            } else {

                // If adding a new tag
                setTags([...tags, forHastTag ? tag.replaceAll(" ", "").toLowerCase() : text.trim()]);
            }
            setText('');
        }
    };

    const removeTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const editTag = (index: number) => {
        const tagToEdit = tags[index];
        setText(tagToEdit);
        setEditIndex(index);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            {tags.length > 0 && (
                <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                    <View key={index} 
                        style={styles.tagWrapper}>
                        <TouchableOpacity 
                            onPress={() => editTag(index)} 
                            style={styles.tag}>
                            <Text style={styles.tagText}>
                                {tag}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => removeTag(index)} 
                            style={styles.removeButton}>
                            <AntDesign name="delete" size={18} color={variables.colors.text} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder || "Add a tag"}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={addTag}
                    placeholderTextColor={variables.colors.tintedWhite}
                />
                <TouchableOpacity onPress={addTag} 
                    style={[styles.addButton, { backgroundColor: text ? '#4CAF50' : '#4CAF5078' }]} disabled={!text}>
                    <Text style={styles.buttonText}>
                        {editIndex !== null ? 'Update' : 'Add'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 10,
    },
    label: {
        ...typography.paragraphBg,
        color: variables.colors.text,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 5,
        marginRight: 5,
    },
    tag: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    tagText: {
        ...typography.paragraph,
        color: 'black',
    },
    removeButton: {
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: '#E53935',
    },
    
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 18,
        backgroundColor: variables.colors.primaryTint2,
        borderRadius: 4,
        paddingHorizontal: 10
    },
    addButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
    },
    buttonText: {
        ...typography.paragraphBg
    },
});