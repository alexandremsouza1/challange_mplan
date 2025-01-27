import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $notify: {
      success(entity: string): void;
      error(entity: string): void;
      warning(entity: string): void;
    };
  }
}
