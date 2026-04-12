import { useEditUser } from "@/hooks/useEditUser";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type EdituserProps = {
  isVisible: boolean;
  onClose: () => void;
  user: any;
};

export default function EditUser({ isVisible, onClose, user }: EdituserProps) {
  const [renderModal, setRenderModal] = useState(isVisible);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { mutate: processEditName, isPending } = useEditUser();

  const [form, setForm] = useState({
    name: user ? user.name : "",
  });

  useEffect(() => {
    if (isVisible) {
      setRenderModal(true);
      setForm({
        name: user ? user.name : "",
      });
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 50,
            stiffness: 500,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setRenderModal(false));
    }
  }, [isVisible, slideAnim, fadeAnim, user]);

  if (!renderModal) return null;

  const handleInputChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = async () => {
    processEditName(form.name, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      visible={renderModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalWrapper}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.9}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.row}>
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your name"
                  placeholderTextColor="#78716C"
                  value={form.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  selectionColor="#FFFFFF"
                  maxLength={25}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                form.name.trim() === ""
                  ? {
                      ...styles.updateButton,
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                    }
                  : styles.updateButton,
              ]}
              activeOpacity={0.7}
              onPress={handleUpdate}
              disabled={form.name.trim() === ""}
            >
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1C1816",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    minHeight: SCREEN_HEIGHT * 0.88,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  flexItem: {
    flex: 1,
  },
  inputField: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    height: 60,
    fontSize: 16,
    color: "#FFFFFF",
  },
  inputLabel: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 14,
    color: "#A39B95",
    marginBottom: 8,
  },
  updateButton: {
    height: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  updateButtonText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#1C1816",
  },
});
