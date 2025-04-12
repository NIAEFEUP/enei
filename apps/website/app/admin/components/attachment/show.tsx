import { ValueGroup } from "@adminjs/design-system";
import type { Attachment } from "@jrmc/adonis-attachment";
import { flat, useTranslation, type BasePropertyProps } from "adminjs";

function ShowAttachment(props: BasePropertyProps) {
    const { translateProperty } = useTranslation();
    const property = props.property;
    const value = flat.get(props.record?.params, property.path) as Attachment | null;

    return (
        <ValueGroup label={translateProperty(property.label, property.resourceId)}>
          {value?.originalName}
        </ValueGroup>
      )
    }

export default ShowAttachment;