# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admin (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  firstname text NOT NULL,
  lastname text NOT NULL,
  create_date timestamp with time zone NOT NULL DEFAULT now(),
  status boolean NOT NULL DEFAULT true,
  CONSTRAINT admin_pkey PRIMARY KEY (id),
  CONSTRAINT admin_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.configs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  key text NOT NULL UNIQUE,
  value boolean NOT NULL DEFAULT false,
  description text,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT configs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.coupons (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  status_show boolean NOT NULL DEFAULT true,
  status boolean NOT NULL DEFAULT true,
  create_by text NOT NULL,
  create_date timestamp with time zone NOT NULL DEFAULT now(),
  show_coupon_date timestamp with time zone,
  CONSTRAINT coupons_pkey PRIMARY KEY (id),
  CONSTRAINT fk_coupon_user FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  position text,
  reg_type text DEFAULT 'FORM'::text,
  user_type text NOT NULL,
  department text NOT NULL,
  create_by text NOT NULL,
  create_date timestamp with time zone NOT NULL DEFAULT now(),
  check_in_status boolean NOT NULL DEFAULT false,
  check_in_date timestamp with time zone,
  check_in_by text,
  show_coupon_status boolean NOT NULL DEFAULT false,
  show_coupon_date timestamp with time zone,
  show_coupon_by text,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT fk_users_auth FOREIGN KEY (id) REFERENCES auth.users(id)
);