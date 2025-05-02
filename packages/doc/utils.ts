import { Control } from "@storybook/blocks";
import { Platform } from "react-native";

export function range({ min, max, step }: { min: number; max: number; step: number; }) {
    return Platform.OS === 'web'
        ? { control: { type: 'range', min, max } satisfies Control }
        : {
            step,
            min,
            max,
            range: true,
        }
}