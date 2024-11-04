//@ts-ignore
import { CracoAliasPlugin } from "react-app-alias";

export default function () {
  return {
    plugins: [
      {
        plugin: CracoAliasPlugin,
        options: {},
      },
    ],
  };
}
