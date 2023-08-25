import ar from "assets/locals/ar.json";

export default (label: string): string => {
  return (ar as any)[label];
};
