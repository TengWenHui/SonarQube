import reactPlugin from "eslint-plugin-react";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import babelParser from "@babel/eslint-parser";
import pluginSecurity from "eslint-plugin-security";
import securityNode from 'eslint-plugin-security-node';
import eslintPluginNoUnsanitized from 'eslint-plugin-no-unsanitized';

export default [
  // React source files
  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",

        babelOptions: {
          presets: ["@babel/preset-react"]
        }
      },

      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly"
      }
    },

   plugins: {
    react: reactPlugin,
    security: pluginSecurity,
    "security-node": securityNode,
    "no-unsanitized": eslintPluginNoUnsanitized
},

  rules: {
  ...reactPlugin.configs.recommended.rules,

  // React 17+ does not require React to be imported for JSX.
  "react/react-in-jsx-scope": "off",

  // Detect unsafe use of eval() with an expression.
  "security/detect-eval-with-expression": "error",
  "security-node/detect-crlf": "error",
  //...eslintPluginNoUnsanitized.configs.recommended.rules,
  "no-unsanitized/property": "error",
  "no-unsanitized/method": "error"
},

    settings: {
      react: {
        version: "detect"
      }
    }
  },

  // Jest and Testing Library test files
  {
    files: [
      "**/*.test.{js,jsx}",
      "**/*.spec.{js,jsx}",
      "**/__tests__/**/*.{js,jsx}"
    ],

    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",

        babelOptions: {
          presets: ["@babel/preset-react"]
        }
      },

      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        it: "readonly",
        jest: "readonly"
      }
    },

    plugins: {
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,

      "testing-library/await-async-events": "off"
    }
  },

  // Ignore generated and dependency folders
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "coverage/**",
      "reports/**"
    ]
  }
];
