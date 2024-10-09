import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }

    setIsSubmiting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "An error occured");
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" />
          <Text className="text-xl text-white mt-10 font-psemibold">
            Sign Up to Aora
          </Text>
          <FormField
            title={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={"mt-10"}
          />
          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType={"email-address"}
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-7"}
            keyboardType={"password"}
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmiting}
          />
          <View className="justify-center pt-5 flex-row gap-2 ">
            <Text className="text-gray-100 font-pregular text-sm ">
              Have an account already?{" "}
              <Link
                href="/sign-in"
                className="text-secondary-200 font-psemibold"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
