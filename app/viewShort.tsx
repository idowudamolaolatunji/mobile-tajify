import React from "react";
import { useDataContext } from "@/context/DataContext";
import ShortLayout from "@/components/layouts/ShortLayout";
import { TubeType } from "@/types/type";
import BackButton from "@/components/elements/BackButton";
import { SafeAreaView, View } from "react-native";
import variables from "@/constants/variables";

export default function ViewShort() {
	const { selectedData } : { selectedData : TubeType }  = useDataContext();

	return (
        <SafeAreaView style={{ flex: 1, position: "relative" }}>

            <ShortLayout short={selectedData} activeId={selectedData._id} />

        </SafeAreaView>
    );
}
