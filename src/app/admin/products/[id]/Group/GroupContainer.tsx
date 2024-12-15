import FormButton from "../FormButton.tsx";
import ImageContainer from "../Image/ImageContainer";
import VariantContainer from "../Variant/VariantContainer";
import GroupInfo from "./GroupInfo.tsx";

interface Props {
  sizes: any;
  setEditting: any;
  groupIndex: any;
  variantGroup: any;
  product: any;
  colors: any;
  editting: any;
  initialState: any;
}

export default function GroupContainer({
  sizes,
  setEditting,
  editting,
  groupIndex,
  variantGroup,
  product,
  colors,
  initialState,
}: Props) {
  return (
    <div key={groupIndex}>
      <GroupInfo
        variantGroup={variantGroup}
        colors={colors}
        editting={editting}
        setEditting={setEditting}
        initialState={initialState}
      />
      <ImageContainer
        editting={editting}
        setEditting={setEditting}
        product={product}
        variantGroup={variantGroup}
        groupIndex={groupIndex}
        initialState={initialState}
      />
      {variantGroup.variants.map((variant: any, variantIndex: number) => {
        return (
          <VariantContainer
            key={variantIndex}
            editting={editting}
            setEditting={setEditting}
            sizes={sizes}
            variant={variant}
            initialState={initialState}
          />
        );
      })}
    </div>
  );
}
