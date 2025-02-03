import { Feather } from "@expo/vector-icons";

export const icon: { [key: string]: (props: { color: string }) => JSX.Element } = {
  index: (props: { color: string }) => <Feather name="home" size={24} color={props.color} />,
  explore: (props: { color: string }) => <Feather name="heart" size={24} color={props.color} />,
  profile: (props: { color: string }) => <Feather name="user" size={24} color={props.color} />,
};