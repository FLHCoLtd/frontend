export interface BrandsOptions {
  domain: string;
  type: "icon" | "logo" | "icon@2x" | "logo@2x";
  useFallback?: boolean;
  darkOptimized?: boolean;
}

export const brandsUrl = (options: BrandsOptions): string => {
  if (options.domain === "ferqo_cc" || options.domain === "line_notify") {
    return `http://127.0.0.1:8123/local/icon/${options.domain}/${
      options.darkOptimized ? "dark_" : ""
    }${options.type}.png`;
  } 
    return `https://brands.home-assistant.io/${
      options.useFallback ? "_/" : ""
    }${options.domain}/${options.darkOptimized ? "dark_" : ""}${
      options.type
    }.png`;
  
};
