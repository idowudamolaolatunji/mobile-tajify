import Header from "@/components/layouts/Header";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
// import { Table, Row, Rows } from "react-native-table-component/components";

export default function wallet() {
	const [refreshing, setRefreshing] = useState(false);
	const [transactions, setTransactions] = useState("");
	const [tableHead, setTableHead] = useState(['Head', 'Head2', 'Head3', 'Head4']);
	const [tableData, setTableData] = useState([
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
	]);

	const handleRefreshing = function() {}
	
	return (
		<React.Fragment>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />

			<ScrollView style={styles.container} refreshControl={
				<RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
			}>
				<Text style={[typography.h3, { color: variables.colors.text }]}>Bilal Ikudoro's Wallet</Text>

				<View style={styles.walletBox}>
					<Image style={styles.imgElement} source={require("../../../assets/images/pngs/favicon.png")} />

					<View style={styles.itemBox}>
						<Text style={[typography.h4, { color: variables.colors.text }]}>Naira (₦)</Text>
						<Text style={[typography.paragraph, { color: "#ddd" }]}>₦20,000</Text>
					</View>
					<View style={styles.itemBox}>
						<Text style={[typography.h4, { color: variables.colors.text }]}>Taji Coin</Text>
						<Text style={[typography.paragraph, { color: "#ddd" }]}>0.1111 Taji</Text>
					</View>
					<View style={styles.itemBox}>
						<Text style={[typography.h4, { color: variables.colors.text }]}>Vote Credit</Text>
						<Text style={[typography.paragraph, { color: "#ddd" }]}>50,000 VC</Text>
					</View> 
				</View>


				<View style={styles.actions}>
					<Pressable style={styles.actionButton}>
						<Text style={styles.actionText}>Deposit (₦)</Text>
					</Pressable>
					<Pressable style={styles.actionButton}>
						<Text style={styles.actionText}>Recieve Taji</Text>
					</Pressable>
					<Pressable style={styles.actionButton}>
						<Text style={styles.actionText}>Buy Credit</Text>
					</Pressable>
				</View>


				<View>
		
					<Text style={[typography.h4, { color: variables.colors.text }]}>Transactions</Text>

					{/* Table goes here... */}
					{/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
						<Row data={tableHead} style={styles.tableHead} textStyle={styles.tableText}/>
						<Rows data={tableData} textStyle={styles.tableText}/>
					</Table> */}
				</View>
			</ScrollView>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: variables.colors.background,
		flex: 1,
		paddingTop: 17,
		paddingHorizontal: 20
	},
	walletBox: {
		marginTop: 12,
		marginBottom: 20,
		height: 190,
		backgroundColor: variables.colors.primary,
		borderRadius: 4,
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	imgElement: {
		width: 160,
		height: 160,
		position: "absolute",
		bottom: 10,
		right: 10,
		opacity: 0.36
	},
	itemBox: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		gap: 2
	},
	actions: {
		alignSelf: "center",
		flexDirection: "row",
		gap: 15,
		marginBottom: 40,
	},
	actionButton: {
		backgroundColor: variables.colors.bgLight,
		padding: 10,
		borderRadius: 4
	},
	actionText: {
		fontSize: 18,
		color: variables.colors.text,
		fontWeight: 600
	},
	// TABLE STYLES
	tableHead: { height: 40, backgroundColor: '#f1f8ff' },
	tableText: { margin: 6 }
});