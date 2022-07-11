export interface BrandsOptions {
  domain: string;
  type: "icon" | "logo" | "icon@2x" | "logo@2x";
  useFallback?: boolean;
  darkOptimized?: boolean;
}

export const brandsUrl = (options: BrandsOptions): string => `https://raw.githubusercontent.com/FLHCoLtd/hass-icon/main/components-icon/${
    options.domain
  }/${options.darkOptimized ? "dark_" : ""}${options.type}.png`;
