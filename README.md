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

1. `npx eas-cli login` con la cuenta de Expo propietaria del proyecto (`extra.eas.projectId`).
2. Crea la app en Play Console (`com.sonicode.visuvisu`) y completa la ficha con `store/listing.md`.
3. Crea una service account en Google Cloud con acceso a la API de Google Play Developer, invítala en Play Console (Usuarios y permisos → acceso a la app con permiso de publicar) y guarda su clave JSON como `play-service-account.json` en la raíz (está en `.gitignore`).
4. `npx eas-cli build -p android --profile production` (AAB firmado; EAS gestiona el keystore).
5. La **primera** subida de una app nueva debe hacerse a mano en Play Console (limitación de la API de Google). Descarga el `.aab` de EAS y súbelo a la pista de pruebas internas.
6. Las siguientes: `npx eas-cli submit -p android --profile production --latest` (sube a la pista interna como borrador).

Las cuentas personales creadas después de nov. 2023 deben pasar una prueba cerrada con ≥12 testers durante 14 días antes de poder publicar en producción.
