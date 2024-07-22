import { getCategories, getColors } from "../_fetches/products";
import ShowHideWrapper from "../_components/ShowHideWrapper";
import FormAbstract from "../_components/Form/FormAbstract";
import { categoryForm, colorForm } from "../_components/Form/FormStructure";
import TableAbstract from "../_components/Table/TableAbstract";
import { categoryHead, colorHead } from "../_components/Table/TableStructure";
import {
  addCategories,
  deleteCategories,
  editCategories,
} from "../_actions/categories";
import { addColor, deleteColor, editColor } from "../_actions/colors";

export default async function page() {
  const categories = await getCategories();
  const colors = await getColors();

  return (
    <div>
      <div>
        <ShowHideWrapper x="Categories">
          <FormAbstract formStructure={categoryForm} action={addCategories} />
          <TableAbstract
            deleteAction={deleteCategories}
            editAction={editCategories}
            head={categoryHead}
            rows={categories}
            name="categories"
          />
        </ShowHideWrapper>
      </div>
      <div>
        <ShowHideWrapper x="Colors">
          ass
          <FormAbstract formStructure={colorForm} action={addColor} />
          <TableAbstract
            deleteAction={deleteColor}
            editAction={editColor}
            head={colorHead}
            rows={colors}
            name="colors"
          />
        </ShowHideWrapper>
      </div>
    </div>
  );
}
