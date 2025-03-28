import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RichToolbar, RichEditor, actions } from "react-native-pell-rich-editor"

interface Props {
    label?: string;
    editorRef: React.RefObject<RichEditor>;
    onChange: (body: any ) => void;
}

export default function RichTextEditor({ label, editorRef, onChange } : Props) {
  return (
    <SafeAreaView style={{ width: "100%", gap: 10 }}>
        {label && <Text style={{ ...typography.paragraphBg, color: variables.colors.text }}>{label}</Text>}
        <View style={{ minHeight: 300 }}>
            <RichToolbar 
                actions={[
                    actions.setStrikethrough,
                    actions.removeFormat,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertOrderedList,
                    actions.blockquote,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.code,
                    actions.line,
                    actions.heading1,
                    actions.heading4,
                ]}
                iconMap={{
                    [actions.heading1]: ({tintColor} : { tintColor: any }) => <Text style={{ color: tintColor }}>H1</Text>,
                    [actions.heading4]: ({tintColor} : { tintColor: any }) => <Text style={{ color: tintColor }}>H4</Text>
                }}
                // getEditor={() => editorRef.current}
                // disable={false}
                style={styles.richBar}
                selectedIconTint={variables.colors.primary}
                flatContainerStyle={styles.listStyle}
                editor={editorRef}
            />
        </View>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <RichEditor
                ref={editorRef}
                containerStyle={styles.editorContainer}
                editorStyle={styles.editorContent}
                placeholder={"Write post"}
                onChange={onChange}
                // androidLayerType="software"
                androidHardwareAccelerationDisabled={true}
            />
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    richBar: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: variables.colors.bgDark
    },
    listStyle: {},

    editorContainer: {
        backgroundColor: "#fff",
        borderColor: variables.colors.border,
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    editorContent: {
        
    },
})
