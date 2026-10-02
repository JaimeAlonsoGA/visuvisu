# El visu

Segunda versión de la app Visu para preparar el examen de visu de biología y geología.
Expo SDK 57 · React Native 0.86 · expo-router · NativeWind.

## Desarrollo

```bash
npm install
npm start            # Expo dev server (dev client)
npm test             # tests de datos y pantallas (jest-expo)
npm run typecheck
npx expo-doctor
```

## Estructura

- `app/` — rutas (expo-router). Solo pantallas: los componentes van en `components/`.
- `components/` — UI compartida (`ImageViewer` es el visor con zoom, único por pantalla).
- `lib/` — datos (`species.ts`), ajustes persistidos (`settings.tsx`), tipos y tema.
- `assets/species/data.json` — catálogo de especies.
- `scripts/fix-images.mjs` — normaliza las imágenes del catálogo (miniaturas de Wikimedia válidas, autor/licencia, sustituye enlaces rotos). Ejecutar tras editar el JSON y después `npm test`.
- `store/` — textos y gráficos de la ficha de Google Play.

## Publicar en Google Play

Requisitos (ya configurados en el Mac de desarrollo): Android SDK en `~/Library/Android/sdk`, JDK 21, `play-service-account.json` en la raíz (service account `sonicode@alchimix-418309`, gitignored) y un token de Expo (`EXPO_TOKEN`) de la cuenta `sonicode`.

```bash
# 1. AAB firmado con la clave de subida que guarda EAS (la que Play ya conoce).
#    El perfil production incrementa android.versionCode en app.json: haz commit después.
EXPO_TOKEN=... npx eas-cli build -p android --profile production --local --output dist/visuvisu.aab

# 2. Subir a una pista (internal | pruebas | production)
node scripts/play-upload.mjs dist/visuvisu.aab --track internal --status completed --notes "Novedades…"

# 3. Ficha de la tienda (textos, icono, gráfico, capturas de store/)
node scripts/play-listing.mjs
```

Mientras la app esté en estado borrador en Play, fuera de `internal` solo se aceptan releases `--status draft`.
Para probar en local: `npm run android` con el emulador `visu_pixel` abierto.
