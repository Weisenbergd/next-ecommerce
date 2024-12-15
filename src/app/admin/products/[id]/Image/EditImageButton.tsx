import { Button } from "@/components/ui/button";

interface Props {
  setDeleteImagesArray: any;
  editting: any;
  setEditting: any;
  groupIndex: number;
}

export default function EditImageButton({
  setDeleteImagesArray,
  editting,
  setEditting,
  groupIndex,
}: Props) {
  return (
    <div>
      <Button
        onClick={() => {
          setDeleteImagesArray([]);
          if (
            editting.category === "images" &&
            editting.target === groupIndex
          ) {
            setEditting({
              category: "",
              target: -1,
            });
          } else if (
            editting.category === "images" &&
            editting.target != groupIndex
          ) {
            setEditting({
              category: "images",
              target: groupIndex,
            });
          } else if (editting.category != "images") {
            setEditting({
              category: "images",
              target: groupIndex,
            });
          }
        }}
      >
        edit images!!!!
      </Button>
    </div>
  );
}
