import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";
//                                  dict  setDict         func
export default function AuthFields({auth, setAuth, title, submit, navigation}) {
    return (
        <View>
        <Text>{title}</Text>

        <Text>E-post</Text>
        <TextInput
            onChangeText={(content: string) => {
                setAuth({...auth, email: content})
            }}
            value={auth?.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            />

        <Text>Lösenord</Text>
        <TextInput 
            onChangeText={(content: string) => {
                setAuth({...auth, password: content})
            }}
            value={auth?.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            />

        <Button 
            title={title}
            onPress={() => {
                submit();
            }}
            />

        {title == "Logga in" &&
            <Button 
                title="Registrera"
                onPress={() => {
                    navigation.navigate("Register")
                }}
            />
        }

    </View>
    );
};