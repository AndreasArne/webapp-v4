import { Button } from "react-native";
// https://dbwebb.se/kunskap/ett-mobilanpassad-formular-v2#rn
// kan vi testa koden utan att göra mer än som står?
return (
    <View style={{...Base.base}}>
        <Text style={{ ...Typography.header2 }}>Inleveranser</Text>
        {listOfDeliveries}
        <Button
        title="Skapa ny inleverans"
        onPress={() => {
            navigation.navigation("Form");
        }}
        />
    </View>
);