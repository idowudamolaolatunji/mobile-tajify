import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


type Tab = {
    name: string;
    slug: string;
    subTabs: SubTab[];
};
  
type SubTab = {
    name: string;
    slug: string;
};

const tabs = [
    { name: "Tube", slug: "tube", subTabs: [
        { name: "Tube Shorts", slug: "tube-shorts" },
        { name: "Tube Max", slug: "tube-max" },
    ]},
    { name: "Audio", slug: "audio", subTabs: [
        { name: "Podcast", slug: "podcast" },
        { name: "Music", slug: "music" },
    ]},
    { name: "Image", slug: "image", subTabs: [] },
    { name: "Blog & Articles", slug: "blog-and-article", subTabs: [] },
    { name: "Book", slug: "book", subTabs: [] }
];
  

interface Props {
    handleOnChangeTabs: (tabSlug: string, subTabSlug: string | null ) => void;
}

function ChannelsMainTabs({ handleOnChangeTabs } : Props) {
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
    const [activeSubTab, setActiveSubTab] = useState<SubTab>(tabs[0].subTabs[0] || []);

    // WE HANDLE THE CHANGES LIKE A RESET ONLY WHEN WE SWITCH TABS
    const handleSetActiveTabs = function(tab: Tab) {
        if(tab.slug == activeTab.slug) return
        setActiveTab(tab);
        setActiveSubTab(tab?.subTabs[0] || [])
    }

    // WE PASS THE CURRENT ACTIVE TAB AND CURRENT ACTIVE SUB TAB
    useEffect(function() {
        handleOnChangeTabs(activeTab.slug, activeSubTab?.slug || null)
    }, [activeTab, activeSubTab])


  return (
    <>
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

        {activeTab?.subTabs?.length > 0 && (
            <View style={styles.subContainer}>
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.subTabsContainer}
                >
                {activeTab?.subTabs?.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.subTab, activeSubTab.slug == tab.slug ? styles.subTabActive : ""]}
                        onPress={() => setActiveSubTab(tab)}
                    >
                        <Text style={[typography.paragraph, activeSubTab.slug == tab.slug ? { color: "#000" } : {}]}>{tab.name}</Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        )}
    </>
  )
}

export default ChannelsMainTabs


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

    ///////////////////////////////////
    ///// SUBTAB STYLES ///////////////
    ///////////////////////////////////
    subContainer: {},
    subTabsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        display: "flex",
        alignItems: "center",
        gap: 15,
    },
    subTab: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: variables.colors.bgLight
    },
    subTabActive: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: variables.colors.white,
    },
})
