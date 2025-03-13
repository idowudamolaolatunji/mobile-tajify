import BookItem from '@/components/layouts/BookItem';
import NoItem from '@/components/layouts/NoItem';
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { BookType } from '@/types/type';
import { books } from '@/utils/data';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'



export default function Book() {
  const [searchQuery, setSearchQuery] = useState("");
  const [booksData, setBooksData] = useState<BookType[] | any>(books);
  const [refreshing, setRefreshing] = useState(false);

  
  const searchedResult = booksData.filter((item: BookType) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const data = searchQuery ? searchedResult : booksData;
  const handleRefreshing = function() {}


  return (
    <ScrollView refreshControl={
        <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
    }>
        <Text style={[typography.h4, { color: variables.colors.text, marginTop: 15, marginBottom: 10 }]}>Books and E-books</Text>

        <View style={styles.topBar}>
            <View style={styles.inpupBox}>
                <Ionicons name="search" size={20} color="#ccc" />
                <TextInput style={{ color: "#fff", fontSize: 16, fontWeight: "500", width: searchQuery.length > 0 ? "75%" : "100%" }} placeholder="Search for Books!" keyboardType="default" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor={variables.colors.bgLight} />
            </View>

            {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery("")}>
                    <Text style={{ fontSize: 18, color: "#b70f0f", fontWeight: 600 }}>Cancel</Text>
                </Pressable>
            )}
        </View>

        {(data.length > 0) ? (
            data.map((data: BookType) => (
                <BookItem data={data} key={data._id} />
            ))
        ) : (
            <NoItem title={`podcast for with the title "${searchQuery}" was`} />
        )}
        
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    topBar: {
        marginBottom: 15, 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inpupBox: {
        backgroundColor: "rgba(40, 40, 40, 0.5)",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6
    },
});
