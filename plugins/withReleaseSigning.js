// Signs local release builds with the upload key described by
// ~/.android-keys/visuvisu-upload.properties (never committed). Without that
// file, release builds fall back to the debug key, as in a fresh Expo prebuild.
const { withAppBuildGradle } = require("expo/config-plugins");

const MARKER = "// visu-release-signing";

module.exports = function withReleaseSigning(config) {
  return withAppBuildGradle(config, (cfg) => {
    let gradle = cfg.modResults.contents;
    if (gradle.includes(MARKER)) return cfg;

    gradle = gradle.replace(
      /signingConfigs \{/,
      `signingConfigs { ${MARKER}
        def visuKeyFile = new File(System.getProperty("user.home"), ".android-keys/visuvisu-upload.properties")
        if (visuKeyFile.exists()) {
            def visuKey = new Properties()
            visuKeyFile.withInputStream { visuKey.load(it) }
            upload {
                storeFile file(visuKey["VISU_UPLOAD_STORE_FILE"])
                storePassword visuKey["VISU_UPLOAD_STORE_PASSWORD"]
                keyAlias visuKey["VISU_UPLOAD_KEY_ALIAS"]
                keyPassword visuKey["VISU_UPLOAD_KEY_PASSWORD"]
            }
        }`
    );
    // Use the upload key for release when it exists.
    gradle = gradle.replace(
      /(release \{[^}]*?)signingConfig signingConfigs\.debug/,
      "$1signingConfig signingConfigs.findByName('upload') ?: signingConfigs.debug"
    );
    cfg.modResults.contents = gradle;
    return cfg;
  });
};
