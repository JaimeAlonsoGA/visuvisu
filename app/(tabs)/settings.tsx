import { Image } from "expo-image";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { ReactNode, useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { classes, totalSpecies } from "../../lib/species";
import { useSettings } from "../../lib/settings";
import { colors } from "../../lib/theme";

const REPO_URL = "https://github.com/JaimeAlonsoGA/visuvisu";
const PRIVACY_URL = `${REPO_URL}/blob/main/PRIVACY.md`;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="text-white/60 text-xs uppercase mb-2 px-1">{title}</Text>
      <View className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.surface }}>
        {children}
      </View>
    </View>
  );
}

function Row({ label, detail, right, onPress }: { label: string; detail?: string; right?: ReactNode; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between px-4 py-3 border-b border-white/10 active:opacity-70"
      accessibilityRole={onPress ? "button" : undefined}
    >
      <View className="flex-1 pr-3">
        <Text className="text-white text-base">{label}</Text>
        {detail ? <Text className="text-white/50 text-xs mt-0.5">{detail}</Text> : null}
      </View>
      {right}
    </Pressable>
  );
}

export default function Settings() {
  const { settings, update } = useSettings();
  const [clearing, setClearing] = useState(false);

  const clearCache = async () => {
    setClearing(true);
    try {
      await Promise.all([Image.clearDiskCache(), Image.clearMemoryCache()]);
      Alert.alert("Caché vaciada", "Las imágenes se volverán a descargar cuando las abras.");
    } finally {
      setClearing(false);
    }
  };

  const examCount = settings.examClasses.length;

  return (
    <View className="flex-1 bg-black">
      <ScreenHeader title="Ajustes" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Section title="Examen">
          <Row
            label="Mostrar nombre común"
            detail="Enseña el nombre común como pista antes de revelar la respuesta."
            right={
              <Switch
                value={settings.showCommonName}
                onValueChange={(showCommonName) => update({ showCommonName })}
                trackColor={{ true: colors.accent, false: "#555" }}
                thumbColor={settings.showCommonName ? colors.card : "#ccc"}
                accessibilityLabel="Mostrar nombre común"
              />
            }
          />
          <Row
            label="Categorías del examen"
            detail={
              examCount === classes.length
                ? "Todas las categorías"
                : `${examCount} de ${classes.length} categorías (cámbialas desde el filtro del examen)`
            }
            right={
              examCount !== classes.length ? (
                <Pressable onPress={() => update({ examClasses: classes.map((c) => c.id) })} hitSlop={8}>
                  <Text style={{ color: colors.accent }}>Todas</Text>
                </Pressable>
              ) : undefined
            }
          />
        </Section>

        <Section title="Almacenamiento">
          <Row
            label={clearing ? "Vaciando…" : "Vaciar caché de imágenes"}
            detail="Libera espacio. Las imágenes se guardan para poder repasar sin conexión."
            onPress={clearing ? undefined : clearCache}
          />
        </Section>

        <Section title="Acerca de">
          <Row label="Versión" right={<Text className="text-white/60">{Constants.expoConfig?.version}</Text>} />
          <Row label="Contenido" right={<Text className="text-white/60">{totalSpecies} especies · {classes.length} categorías</Text>} />
          <Row
            label="Créditos de las imágenes"
            detail="Fotografías con licencia libre, casi todas de Wikimedia Commons; autor y licencia se muestran al ampliar cada imagen."
          />
          <Row label="Política de privacidad" detail="El visu no recoge datos personales." onPress={() => Linking.openURL(PRIVACY_URL)} />
          <Row label="Código fuente" onPress={() => Linking.openURL(REPO_URL)} />
        </Section>
      </ScrollView>
    </View>
  );
}
