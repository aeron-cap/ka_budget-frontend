import { accountTypes } from "@/constants/accountTypes";
import { Ionicons } from "@expo/vector-icons";

export type AccountTypeName = (typeof accountTypes)[number];

export type AccountTypeDetail = {
  icon: keyof typeof Ionicons.glyphMap;
};
