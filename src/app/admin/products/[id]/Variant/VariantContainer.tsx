import VariantInfo from "./VariantInfo.tsx";

interface Props {
  variant: any;
  sizes: any;
  editting: any;
  setEditting: any;
  initialState: any;
}

export default function VariantContainer({
  variant,
  sizes,
  editting,
  setEditting,
  initialState,
}: Props) {
  return (
    <VariantInfo
      variant={variant}
      sizes={sizes}
      editting={editting}
      initialState={initialState}
      setEditting={setEditting}
    />
  );
}
