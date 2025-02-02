import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'


type Tab = {
    name: string;
    slug: string;
};

const tabs = [
    { name: "Profiles", slug: "profiles" },
    { name: "Chat", slug: "chat" },
    { name: "Community", slug: "community" },
];
  

interface Props {
    handleOnChangeTabs: (tabSlug: string ) => void;
}

function ConnectMainTabs({ handleOnChangeTabs } : Props) {
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    // WE HANDLE THE CHANGES LIKE A RESET ONLY WHEN WE SWITCH TABS
    const handleSetActiveTabs = function(tab: Tab) {
        if(tab.slug == activeTab.slug) return
        setActiveTab(tab);
    }

    // WE PASS THE CURRENT ACTIVE TAB
    useEffect(function() {
        handleOnChangeTabs(activeTab.slug)
    }, [activeTab])


  return (
    <View style={styles.mainContainer}>
        <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
        >
            {tabs?.map((tab, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => handleSetActiveTabs(tab)}
                    style={[styles.tab, activeTab.slug == tab.slug ? styles.tabActive : ""]}
                >
                    <Text
                        style={[typography.paragraphBg, activeTab.slug === tab.slug ? { color: variables.colors.primary } : {}]}
                    >
                        {tab.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
  )
}

export default ConnectMainTabs


const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBlockColor: variables.colors.border,
    },
    tabsContainer: {
        paddingHorizontal: 16,
        display: "flex",
        alignItems: "center",
        gap: 15,
    },
    tab: {
        flex: 1,
    },
    tabActive: {
        borderBottomColor: variables.colors.primary,
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
})
