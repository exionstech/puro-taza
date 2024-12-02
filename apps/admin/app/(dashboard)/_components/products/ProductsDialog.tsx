import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import ProductForm, { InitialDataType, ProductsSchema } from "./ProductsForm";
import { z } from "zod";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: InitialDataType;
}

const ProductsDialog = ({
  open,
  setOpen,
  mode = "create",
  initialData,
}: Props) => {
  return (
    open && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-screen-2xl">
          <DialogTitle>
            {mode === "create" ? "Create" : "Update"} Product
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "create" ? "Add" : "Edit"} your products
            </p>
          </DialogTitle>
          <div>
            <ProductForm
              mode={mode}
              setOpen={setOpen}
              initialData={initialData}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default ProductsDialog;
