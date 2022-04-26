import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";
//                                  dict  setDict         func
export default function AuthFields({auth, setAuth, title, submit, navigation}) {
    return (
        <View>
        <Text style={Typography.header2}>{title}</Text>

        <Text style={Typography.list_head}>E-post</Text>
        <TextInput
            onChangeText={(content: string) => {
                setAuth({...auth, email: content})
            }}
            value={auth?.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={Forms.input}
            />

        <Text style={Typography.list_head}>Lösenord</Text>
        <TextInput 
            onChangeText={(content: string) => {
                setAuth({...auth, password: content})
            }}
            value={auth?.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            style={Forms.input}
            />

        <Button 
            title={title}
            onPress={() => {
                submit();
            }}
            />
        <Text></Text>
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