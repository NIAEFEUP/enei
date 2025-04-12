import { DropZone, FormGroup, FormMessage } from "@adminjs/design-system";
import type { Attachment } from "@jrmc/adonis-attachment";
import { flat, PropertyLabel, useTranslation, type BasePropertyProps } from "adminjs";

function EditAttachment(props: BasePropertyProps) {
  const { tm } = useTranslation();
  const { property, onChange } = props;
  const value = flat.get(props.record?.params, property.path) as Attachment | null;
  const error = flat.get(props.record?.errors, property.path);
  const originalFile = value ? new File([], value.originalName, { type: value.mimeType }) : null;

  return (
    <FormGroup>
      <PropertyLabel property={property} />
      <DropZone 
        multiple={false}
        files={originalFile ? [originalFile] : []}
        onChange={(files) => {
          if (files.length > 0)
            onChange?.(property.path, files[0]);
          else
            onChange?.(property.path, null);
        }}
      />
      <FormMessage>{error && tm(error.message, property.resourceId)}</FormMessage>
    </FormGroup>
  );
}

export default EditAttachment;
